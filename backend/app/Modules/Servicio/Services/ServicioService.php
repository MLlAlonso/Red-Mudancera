<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Empresa\Models\Empresa;
use Carbon\Carbon;

class ServicioService
{
    public function create(array $data, Empresa $empresa): Servicio
    {
        $this->checkAntiSpam($data, $empresa);

        if ($data['tipo'] === 'busco') {
            $inicio = Carbon::parse($data['inicio']);
            $fin = Carbon::parse($data['fin']);
        } else {
            $inicio = now();
            $fin = $this->calcularFechaFin($inicio, $data['rangoDias']);
        }

        return Servicio::create([
            'empresa_id' => $empresa->id,
            'tipo' => $data['tipo'],
            'volumen' => $data['volumen'] ?? null,
            'origen' => $data['origen'],
            'destino' => $data['destino'],
            'inicio' => $inicio,
            'fin' => $fin,
            'tipo_carga' => $data['tipo_carga'],
            'nota' => $data['nota'] ?? null,
            'responsable_nombre' => $data['responsable'] ?? null,
            'responsable_telefono' => $data['telefono'] ?? null,
            'importe' => $data['importe'] ?? null,
            'estado' => 'activo',
        ]);
    }

    protected function checkAntiSpam(array $data, Empresa $empresa): void
    {
        $desde = now()->subHours(24);

        $duplicados = Servicio::where('empresa_id', $empresa->id)
            ->where('origen', $data['origen'])
            ->where('destino', $data['destino'])
            ->where('created_at', '>=', $desde)
            ->count();

        if ($duplicados >= 2) {
            abort(422, 'No puedes publicar más de 2 servicios idénticos en 24 horas.');
        }
    }

    protected function calcularFechaFin($inicio, string $rango): Carbon
    {
        return match ($rango) {
            '1-7' => $inicio->copy()->addDays(7),
            '8-15' => $inicio->copy()->addDays(15),
            '15-30' => $inicio->copy()->addDays(30),
            '+30' => $inicio->copy()->addDays(45),
            default => $inicio->copy()->addDays(7),
        };
    }
}
