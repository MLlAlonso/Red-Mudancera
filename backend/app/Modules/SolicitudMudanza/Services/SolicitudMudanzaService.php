<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Mail\SolicitudMudanzaResumen;
use App\Modules\SolicitudMudanza\Mail\SolicitudMudanzaVerificationCode;
use App\Services\Google\GoogleDistanceService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Services\WhatsAppService;

class SolicitudMudanzaService
{
    protected GoogleDistanceService $distanceService;
    protected WhatsAppService $whatsAppService;

    public function __construct(
        GoogleDistanceService $distanceService,
        WhatsAppService $whatsAppService
    ) {
        $this->distanceService = $distanceService;
        $this->whatsAppService = $whatsAppService;
    }

    public function crear(array $data): SolicitudMudanza
    {
        return DB::transaction(function () use ($data) {
            $this->limpiarPendientesAntiguos($data['email']);
            // Anti-duplicación estricta
            $this->validarDuplicado($data);
            // Anti spam 24 horas
            $this->validarAntiSpam($data);
            // Calcular distancia
            $distanciaKm = $this->calcularDistancia($data['origen'], $data['destino']);

            $tipoServicio = ( $distanciaKm !== null &&  $distanciaKm <= 50)
                ? 'local'
                : 'foranea';
            $fechaLimite = $this->calcularFechaLimite($data['fecha_recoleccion']);
            $empresaReferenteId = null;
            $partnerReferralId = null;

            $slug = $data['empresa_referente_slug'] ?? null;

            /*
            |---------------------------------------------------
            | Si el frontend no envía slug, lo sacamos del URL
            |---------------------------------------------------
            */
            if (!$slug) {
                $referer = request()->headers->get('referer');
                if ($referer) {
                    if (preg_match('/solicitar-mudanza\/([^\/]+)/', $referer, $matches)) {
                        $slug = $matches[1];
                    }
                }
            }

            Log::info('Slug final usado', [
                'slug' => $slug
            ]);

            if ($slug) {

                /*
    |--------------------------------------------------------------------------
    | Buscar partner
    |--------------------------------------------------------------------------
    */
                $partner = \App\Modules\PartnerReferral\Models\PartnerReferral::where(
                    'slug',
                    $slug
                )
                    ->where('activo', true)
                    ->first();

                if ($partner) {

                    $partnerReferralId = $partner->id;
                } else {

                    /*
        |--------------------------------------------------------------------------
        | Compatibilidad con sistema viejo
        |--------------------------------------------------------------------------
        */
                    $empresa = \App\Modules\Empresa\Models\Empresa::all()
                        ->first(function ($empresa) use ($slug) {

                            return \Illuminate\Support\Str::slug(
                                $empresa->empresa
                            ) === $slug;
                        });

                    if ($empresa) {
                        $empresaReferenteId = $empresa->id;
                    }
                }
            }

            $inventarioLimpio = $this->limpiarInventario(
                $data['inventario']
            );

            // Crear registro
            $solicitud = SolicitudMudanza::create([
                'origen' => $data['origen'],
                'destino' => $data['destino'],
                'distancia_km' => $distanciaKm,
                'tipo_vivienda' => $data['tipo_vivienda'],
                'inventario' => $inventarioLimpio,
                'fecha_recoleccion' => $data['fecha_recoleccion'],
                'tipo_mudanza' => $data['tipo_mudanza'],
                'nombre' => $data['nombre'],
                'email' => $data['email'],
                'telefono' => $data['telefono'],
                'codigo_verificacion' => null,
                'codigo_expira_en' => null,
                'estado' => 'activo',
                'telefono_verificado' => true,
                'tipo_servicio' => $tipoServicio,
                'fecha_limite_visible' => $fechaLimite,
                'origen_pisos' => $data['origen_pisos'] ?? null,
                'origen_elevador' => $data['origen_elevador'] ?? null,
                'origen_acarreo' => $data['origen_acarreo'] ?? null,
                'destino_pisos' => $data['destino_pisos'] ?? null,
                'destino_elevador' => $data['destino_elevador'] ?? null,
                'destino_acarreo' => $data['destino_acarreo'] ?? null,
                'vivienda_destino' => $data['vivienda_destino'],
                'referido_por_empresa_id' => $empresaReferenteId,
                'ip_address' => request()->ip(),
                'partner_referral_id' => $partnerReferralId,
                'report_token' => Str::uuid(),
            ]);

            Mail::to($solicitud->email)
                ->later(
                    now()->addSeconds(15),
                    new SolicitudMudanzaResumen($solicitud)
                );

            return $solicitud;
        });
    }

    private function limpiarInventario(string $text): string
    {
        // Convertir div, p, br en separadores
        $text = preg_replace('/<(\/)?(div|p|br)[^>]*>/i', ', ', $text);
        // Eliminar cualquier HTML restante
        $text = strip_tags($text);
        // Normalizar espacios y comas
        $text = preg_replace('/\s*,\s*/', ', ', $text);

        return trim($text, ', ');
    }

    private function validarDuplicado(array $data): void
    {
        $existe = SolicitudMudanza::where('origen', $data['origen'])
            ->where('destino', $data['destino'])
            ->where('tipo_vivienda', $data['tipo_vivienda'])
            ->where('inventario', $data['inventario'])
            ->where('fecha_recoleccion', $data['fecha_recoleccion'])
            ->where('tipo_mudanza', $data['tipo_mudanza'])
            ->where('telefono', $data['telefono'])
            ->where('estado', 'activo')
            ->exists();

        if ($existe) {
            abort(422, 'Ya existe una solicitud activa con estas especificaciones. Si considera que es un error, contacte a soporte@mudanzafacil.com.mx');
        }
    }

    private function validarAntiSpam(array $data): void
    {
        // EXCEPCIÓN ADMIN
        if (strtolower($data['email']) === 'intermudanza@gmail.com') {
            return;
        }
        $hace24Horas = now()->subHours(24);

        // SOLO solicitudes ACTIVAS (verificadas)
        $queryBase = SolicitudMudanza::where('email', $data['email'])
            ->where('estado', 'activo')
            ->where('created_at', '>=', $hace24Horas);

        if ($queryBase->exists()) {
            $mismoTelefono = (clone $queryBase)
                ->where('telefono', $data['telefono'])
                ->exists();

            if ($mismoTelefono) {
                abort(429, 'Ya enviaste una solicitud en las últimas 24 horas con este correo y teléfono. Intenta nuevamente mañana.');
            }
            abort(429, 'Ya enviaste una solicitud en las últimas 24 horas con este correo. Intenta nuevamente mañana.');
        }
    }

    private function calcularDistancia(string $origen, string $destino): ?int
    {
        try {
            $km = $this->distanceService->calcularKm($origen, $destino);
            if ($km === null) {
                Log::warning('No se pudo calcular distancia para solicitud de mudanza', [
                    'origen' => $origen,
                    'destino' => $destino
                ]);
                return null;
            }
            return $km;
        } catch (\Exception $e) {
            Log::error('Error al calcular distancia en solicitud de mudanza', [
                'origen' => $origen,
                'destino' => $destino,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    private function calcularFechaLimite(string $fechaSeleccionada): ?string
    {
        $hoy = now();
        $dias = match ($fechaSeleccionada) {
            '1-7' => 7,
            '8-15' => 15,
            '15-30' => 30,
            '30+' => 90,
            'lo_antes_posible' => 6,
            default => 7,
        };
        // +1 día extra
        return $hoy->addDays($dias + 1)->toDateString();
    }

    private function limpiarPendientesAntiguos(string $email): void
    {
        SolicitudMudanza::where('email', $email)
            ->where('estado', 'pendiente')
            ->where('codigo_expira_en', '<', now())
            ->delete();
    }
}
