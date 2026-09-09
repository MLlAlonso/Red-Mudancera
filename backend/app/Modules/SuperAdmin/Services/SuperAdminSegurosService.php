<?php

namespace App\Modules\SuperAdmin\Services;

use App\Modules\Seguro\Models\ExpedienteSeguro;
use Carbon\Carbon;

class SuperAdminSegurosService
{
    public function obtenerExpedientes(string $search = '', ?string $month = null, string $modalidad = 'todas'): array
    {
        $hoy = now();
        $mesActual = $hoy->copy()->startOfMonth();
        $mesAnterior = $hoy->copy()->subMonth()->startOfMonth();
        $mesSeleccionado = $month ? Carbon::createFromFormat('Y-m', $month)->startOfMonth() : $mesActual->copy();

        if (!$mesSeleccionado->equalTo($mesActual) && !$mesSeleccionado->equalTo($mesAnterior)) {
            $mesSeleccionado = $mesActual->copy();
        }

        $inicio = $mesSeleccionado->copy()->startOfMonth();
        $fin = $mesSeleccionado->copy()->endOfMonth();
        $query = ExpedienteSeguro::query()->whereBetween('created_at', [$inicio, $fin]);
        $search = trim($search);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('folio', 'like', "%{$search}%")->orWhere('nombre', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($modalidad === 'asistida') {
            $query->where('modalidad_datos', 'asistida');
        }

        if ($modalidad === 'estandar') {
            $query->where(function ($q) {
                $q->where('modalidad_datos', 'autogestion') ->orWhereNull('modalidad_datos');
            });
        }

        $baseMetrics = clone $query;

        $metrics = [
            'nuevos' => (clone $baseMetrics) ->where('estado', 'nuevo') ->count(),
            'esperando_cliente' => (clone $baseMetrics) ->where('estado', 'esperando_cliente') ->count(),
            'capturando' => (clone $baseMetrics) ->where('estado', 'capturando') ->count(),
            'revision' => (clone $baseMetrics) ->where('estado', 'revision') ->count(),
            'completados' => (clone $baseMetrics) ->where('estado', 'completado') ->count(),
        ];

        $ordenEstados = [
            'nuevo' => 1,
            'esperando_cliente' => 2,
            'capturando' => 3,
            'revision' => 4,
            'completado' => 5,
            'cancelado' => 6,
        ];

        $expedientes = $query
            ->get()
            ->sortBy(function ($expediente) use ($ordenEstados) { return $ordenEstados[$expediente->estado] ?? 99; })
            ->values()
            ->map(function ($expediente) {
                return [
                    'id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'estado' => $expediente->estado,
                    'progreso' => $expediente->progreso,
                    'nombre' => $expediente->nombre,
                    'email' => $expediente->email,
                    'telefono' => $expediente->telefono,
                    'origen' => $expediente->origen,
                    'destino' => $expediente->destino,
                    'es_externo' => $expediente->es_externo,
                    'tipo_seguro' => $expediente->tipo_seguro,
                    'modalidad_datos' => $expediente->modalidad_datos,
                    'forma_proporcion_datos' => $expediente->forma_proporcion_datos,
                    'asistencia_empresa_mudanza' => $expediente->asistencia_empresa_mudanza,
                    'created_at' => $expediente->created_at->format('d/m/Y H:i'),
                ];
            })
            ->values();

        $periods = [
            [
                'value' => $mesActual->format('Y-m'),
                'label' => $this->nombreMes($mesActual),
            ],
            [
                'value' => $mesAnterior->format('Y-m'),
                'label' => $this->nombreMes($mesAnterior),
            ],
        ];

        return [
            'metrics' => $metrics,
            'data' => $expedientes,
            'periods' => $periods,
            'selected_month' => $mesSeleccionado->format('Y-m'),
        ];
    }

    private function nombreMes(Carbon $fecha): string
    {
        $meses = [
            1 => 'Enero',
            2 => 'Febrero',
            3 => 'Marzo',
            4 => 'Abril',
            5 => 'Mayo',
            6 => 'Junio',
            7 => 'Julio',
            8 => 'Agosto',
            9 => 'Septiembre',
            10 => 'Octubre',
            11 => 'Noviembre',
            12 => 'Diciembre',
        ];

        return $meses[$fecha->month] . ' ' . $fecha->year;
    }
}