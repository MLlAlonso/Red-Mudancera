<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Empresa\Models\Empresa;
use App\Services\Google\GoogleDistanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;


class ServicioService
{
    public function create(array $data, Empresa $empresa): Servicio
    {
        $hoy = Carbon::today();

        if ($data['tipo'] === 'ofrezco') {
            $inicio = Carbon::today();
            $fin = $this->calcularFechaFin($inicio, $data['rangoDias'] ?? '1-7');
        } else {
            $inicio = Carbon::parse($data['inicio']);
            $fin = Carbon::parse($data['fin']);
        }

        $duplicadosHoy = Servicio::where('empresa_id', $empresa->id)
            ->where('tipo', $data['tipo'])
            ->where('volumen', $data['volumen'] ?? 0)
            ->where('origen', $data['origen'])
            ->where('destino', $data['destino'])
            ->whereDate('inicio', $inicio)
            ->whereDate('fin', $fin)
            ->where('tipo_carga', $data['tipo_carga'])
            ->whereDate('created_at', $hoy)
            ->count();

        if ($duplicadosHoy >= 2) {
            throw ValidationException::withMessages([
                'servicio' => [
                    'Ya has publicado este mismo servicio más de 2 veces hoy.'
                ],
            ]);
        }

        $distanciaKm = $this->distanceService->calcularKm(
            $data['origen'],
            $data['destino']
        );

        if ($distanciaKm === null) {
            Log::warning('Distancia no calculada', [
                'origen' => $data['origen'],
                'destino' => $data['destino'],
            ]);
        }

        return Servicio::create([
            'empresa_id' => $empresa->id,
            'tipo' => $data['tipo'],
            'volumen' => $data['volumen'] ?? null,
            'origen' => $data['origen'],
            'destino' => $data['destino'],
            'distancia_km' => $distanciaKm,
            'inicio' => $inicio,
            'fin' => $fin,
            'tipo_carga' => $data['tipo_carga'],
            'nota' => $data['nota'] ?? null,
            'responsable_nombre' => $data['responsable_nombre'] ?? null,
            'responsable_telefono' => $data['responsable_telefono'] ?? null,
            'importe' => $data['importe'] ?? null,
            'estado_carga' => $data['estado_carga'] ?? 'mi_almacen',
        ]);
    }

    /*  ==============================
         | CALCULAR FECHA FIN DEL SERVICIO
        ============================== */
    protected function calcularFechaFin(Carbon $inicio, string $rango): Carbon
    {
        return match ($rango) {
            '1-7' => $inicio->copy()->addDays(7),
            '8-15' => $inicio->copy()->addDays(15),
            '15-30' => $inicio->copy()->addDays(30),
            '+30' => $inicio->copy()->addDays(45),
            default => $inicio->copy()->addDays(7),
        };
    }

    /*  ==============================
         | CAMBIAR ESTADO SERVICIO
        ============================== */
    public function changeEstado(Servicio $servicio, string $estado): Servicio
    {
        $servicio->estado = $estado;
        $servicio->save();
        return $servicio;
    }

    protected GoogleDistanceService $distanceService;

    public function __construct(GoogleDistanceService $distanceService)
    {
        $this->distanceService = $distanceService;
    }
}
