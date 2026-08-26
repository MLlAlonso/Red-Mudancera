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

    public function __construct(GoogleDistanceService $distanceService, WhatsAppService $whatsAppService)
    {
        $this->distanceService = $distanceService;
        $this->whatsAppService = $whatsAppService;
    }

    public function crear(array $data): SolicitudMudanza
    {
        return DB::transaction(function () use ($data) {
            $this->limpiarPendientesAntiguos($data['email']);
            $this->validarDuplicado($data);
            $this->validarAntiSpam($data);

            $distanciaKm = $this->calcularDistancia($data['origen'], $data['destino']);
            $tipoServicio = ($distanciaKm !== null && $distanciaKm <= 50) ? 'local' : 'foranea';
            $fechaLimite = $this->calcularFechaLimite($data['fecha_recoleccion']);
            $empresaReferenteId = null;
            $partnerReferralId = null;
            $empresaPrivadaId = null;
            $esPrivado = false;
            $slug = $data['empresa_referente_slug'] ?? null;

            if (!$slug) {
                $referer = request()->headers->get('referer');
                if ($referer && preg_match('#/([^/]+)/solicitar-mudanza#',  $referer, $matches)) {
                    $slug = $matches[1];
                }
            }
            // Log::info('Slug final usado', ['slug' => $slug]);

            if ($slug) {
                $empresaPrivada = \App\Modules\Empresa\Models\Empresa::where('slug',  $slug)->first();

                if ($empresaPrivada) {
                    $empresaPrivadaId = $empresaPrivada->id;
                    $esPrivado = true;
                } else {
                    $partner = \App\Modules\PartnerReferral\Models\PartnerReferral::where('slug', $slug)->where('activo', true)->first();
                    if ($partner) {
                        $partnerReferralId = $partner->id;
                    } else {
                        $empresa = \App\Modules\Empresa\Models\Empresa::all()->first(function ($empresa) use ($slug) {
                            return \Illuminate\Support\Str::slug($empresa->empresa) === $slug;
                        });

                        if ($empresa) {
                            $empresaReferenteId = $empresa->id;
                        }
                    }
                }
            }

            $inventarioLimpio = $this->limpiarInventario($data['inventario']);

            /*  Log::info("LEAD PRIVADO", [
                "slug" => $slug,
                "empresa_privada_id" => $empresaPrivadaId,
                "es_privado" => $esPrivado,
            ]); */

            $solicitud = SolicitudMudanza::create([
                'origen' => $data['origen'],
                'destino' => $data['destino'],
                'distancia_km' => $distanciaKm,
                'tipo_vivienda' => $data['tipo_vivienda'],
                'vivienda_destino' => $data['vivienda_destino'],
                'origen_pisos' => $data['origen_pisos'] ?? null,
                'origen_elevador' => $data['origen_elevador'] ?? null,
                'origen_acarreo' => $data['origen_acarreo'] ?? null,
                'destino_pisos' => $data['destino_pisos'] ?? null,
                'destino_elevador' => $data['destino_elevador'] ?? null,
                'destino_acarreo' => $data['destino_acarreo'] ?? null,
                'inventario' => $inventarioLimpio,
                'fecha_recoleccion' => $data['fecha_recoleccion'],
                'fecha_limite_visible' => $fechaLimite,
                'tipo_servicio' => $tipoServicio,
                'tipo_mudanza' => $data['tipo_mudanza'],
                'nombre' => $data['nombre'],
                'email' => $data['email'],
                'telefono' => $data['telefono'],
                'codigo_verificacion' => null,
                'codigo_expira_en' => null,
                'telefono_verificado' => true,
                'estado' => 'activo',
                'referido_por_empresa_id' => $empresaReferenteId,
                'partner_referral_id' => $partnerReferralId,
                'es_privado' => $esPrivado,
                'empresa_privada_id' => $empresaPrivadaId,
                'ip_address' => request()->ip(),
                'report_token' => Str::uuid(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | SI ES LEAD PRIVADO CREARLO DIRECTAMENTE EN EL CRM
            |--------------------------------------------------------------------------
            */
            if ($solicitud->es_privado &&  $solicitud->empresa_privada_id) {
                \App\Modules\SolicitudMudanza\Models\LeadCompra::create([
                    'empresa_id' => $solicitud->empresa_privada_id,
                    'solicitud_id' => $solicitud->id,
                    'tokens_pagados' => 0,
                    'estado_operacion' => 'activo',
                    'ganancia' => null,
                    'oculto' => false,
                    'exclusivo' => true,
                ]);
            }

            Mail::to($solicitud->email)->later(now()->addSeconds(15),   new SolicitudMudanzaResumen($solicitud));
            return $solicitud;
        });
    }

    private function limpiarInventario(string $text): string
    {
        $text = preg_replace('/<(\/)?(div|p|br)[^>]*>/i', ', ', $text);
        $text = strip_tags($text);
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
        if (strtolower($data['email']) === 'intermudanza@gmail.com') {
            return;
        }
        $hace24Horas = now()->subHours(24);
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