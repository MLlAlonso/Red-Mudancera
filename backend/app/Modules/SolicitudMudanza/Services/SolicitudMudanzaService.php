<?php

namespace App\Modules\SolicitudMudanza\Services;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Services\Google\GoogleDistanceService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SolicitudMudanzaService
{
    protected GoogleDistanceService $distanceService;

    public function __construct(GoogleDistanceService $distanceService)
    {
        $this->distanceService = $distanceService;
    }

    public function crear(array $data): SolicitudMudanza
    {
        return DB::transaction(function () use ($data) {

            // Anti-duplicación estricta
            $this->validarDuplicado($data);

            // Calcular distancia
            $distanciaKm = $this->calcularDistancia($data['origen'], $data['destino']);

            // Generar código de verificación
            $codigo = $this->generarCodigo();

            // Crear registro
            $solicitud = SolicitudMudanza::create([
                'origen' => $data['origen'],
                'destino' => $data['destino'],
                'distancia_km' => $distanciaKm,
                'tipo_vivienda' => $data['tipo_vivienda'],
                'inventario' => $data['inventario'],
                'fecha_recoleccion' => $data['fecha_recoleccion'],
                'tipo_mudanza' => $data['tipo_mudanza'],
                'nombre' => $data['nombre'],
                'email' => $data['email'],
                'telefono' => $data['telefono'],
                'codigo_verificacion' => $codigo,
                'estado' => 'pendiente',
                'telefono_verificado' => false,
                'ip_address' => request()->ip(),
            ]);

            // Aquí luego enviaremos SMS real
            // $this->enviarSms($solicitud->telefono, $codigo);

            return $solicitud;
        });
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

    private function generarCodigo(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }
}