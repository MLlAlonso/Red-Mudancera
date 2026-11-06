<?php

namespace App\Modules\DashboardExterno\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use Carbon\Carbon;

class DashboardExternoService
{
    public function obtenerDashboard(): array
    {
        $inicioMes = Carbon::now()->startOfMonth();
        $empresasTotal = Empresa::count();
        $empresasMes = Empresa::where('created_at', '>=', $inicioMes)->count();

        $ultimasEmpresas = Empresa::query()
            ->latest()
            ->take(10)
            ->get(['id', 'empresa', 'plan', 'created_at', 'verificado',]);

        $solicitudesActivas = SolicitudMudanza::where('estado',  'activo')->count();

        $ultimosContactos = SolicitudMudanza::query()
            ->latest()
            ->take(25)
            ->get(['id', 'origen', 'destino', 'tipo_mudanza',  'fecha_recoleccion', 'estado', 'created_at',]);

        $comprasMes = LeadCompra::where('created_at',  '>=', $inicioMes)->count();
        $creditosConsumidosMes = LeadCompra::where('created_at', '>=',  $inicioMes)->sum('tokens_pagados');

        $ultimasCompras = LeadCompra::query()
            ->with(['empresa:id,empresa', 'solicitud:id,origen,destino',])
            ->latest()
            ->take(20)
            ->get()
            ->map(function ($compra) {
                return [
                    'id' => $compra->id,

                    'empresa' => [
                        'id' => $compra->empresa?->id,
                        'nombre' => $compra->empresa?->empresa,
                    ],

                    'solicitud' => [
                        'id' => $compra->solicitud?->id,
                        'origen' => $compra->solicitud?->origen,
                        'destino' => $compra->solicitud?->destino,
                    ],

                    'creditos_consumidos' => (int) $compra->tokens_pagados,
                    'exclusivo' => (bool) $compra->exclusivo,
                    'created_at' => $compra->created_at,
                ];
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */
        return [
            'success' => true,
            'generated_at' => Carbon::now()->toIso8601String(),
            'periodo' => [
                'inicio' => $inicioMes->toDateString(),
                'fin' => Carbon::now()->toDateString(),
            ],

            'metrics' => [
                'empresas_total' => $empresasTotal,
                'empresas_mes' => $empresasMes,
                'solicitudes_activas' => $solicitudesActivas,
                'compras_mes' => $comprasMes,
                'creditos_consumidos_mes' => (int) $creditosConsumidosMes,
            ],

            'ultimos_contactos' => $ultimosContactos,
            'ultimas_compras' => $ultimasCompras,
            'ultimas_empresas' => $ultimasEmpresas,
        ];
    }
}