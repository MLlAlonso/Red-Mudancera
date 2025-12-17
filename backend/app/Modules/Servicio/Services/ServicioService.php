<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Empresa\Models\Empresa;
use Carbon\Carbon;

class ServicioService
{
    /**
     * Crear servicio con reglas de negocio
     */
    public function create(array $data, Empresa $empresa): Servicio
    {
        // Anti-spam
        $this->checkAntiSpam($data, $empresa);

        return Servicio::create([
            'empresa_id' => $empresa->id,
            'tipo'       => $data['tipo'],
            'volumen'    => $data['volumen'],
            'origen'     => $data['origen'],
            'destino'    => $data['destino'],
            'inicio'     => $data['inicio'],
            'fin'        => $data['fin'],
            'tipo_carga' => $data['tipo_carga'] ?? 'libre',
            'nota'       => $data['nota'] ?? null,
            'estado'     => 'activo',
        ]);
    }

    /**
     * Regla Anti-Spam:
     * Máx. 2 servicios idénticos en 24 horas
     */
    protected function checkAntiSpam(array $data, Empresa $empresa): void
    {
        $desde = Carbon::now()->subHours(24);

        $duplicados = Servicio::where('empresa_id', $empresa->id)
            ->where('volumen', $data['volumen'])
            ->where('origen', $data['origen'])
            ->where('destino', $data['destino'])
            ->where('created_at', '>=', $desde)
            ->count();

        if ($duplicados >= 2) {
            abort(422, 'No puedes publicar más de 2 servicios idénticos en 24 horas.');
        }
    }

    /**
     * Cambio de estado del servicio
     */
    public function changeEstado(Servicio $servicio, string $nuevoEstado): Servicio
    {
        if ($servicio->estaFinalizado()) {
            abort(422, 'Un servicio finalizado no puede modificarse.');
        }

        $transicionesValidas = [
            'activo'    => ['asignado'],
            'asignado'  => ['finalizado'],
        ];

        if (!isset($transicionesValidas[$servicio->estado]) ||
            !in_array($nuevoEstado, $transicionesValidas[$servicio->estado])) {
            abort(422, 'Transición de estado no permitida.');
        }

        $servicio->update([
            'estado' => $nuevoEstado
        ]);

        return $servicio;
    }
}
