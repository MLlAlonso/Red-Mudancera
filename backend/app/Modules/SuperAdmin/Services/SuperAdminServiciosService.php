<?php

namespace App\Modules\SuperAdmin\Services;

use Carbon\Carbon;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\SolicitudMudanza\Models\LeadCompra;

class SuperAdminServiciosService
{
    /**
     * Obtiene toda la información necesaria para el dashboard de servicios del SuperAdmin.
     */
    public function obtenerDashboard(): array
    {
        $inicioMes = Carbon::now()->startOfMonth();

        // SERVICIOS
        $serviciosMes = \App\Modules\Servicio\Models\Servicio::where('created_at', '>=', $inicioMes);
        $serviciosActivos = \App\Modules\Servicio\Models\Servicio::where('estado', 'activo')->count();
        $serviciosAsignados = \App\Modules\Servicio\Models\Servicio::where('estado', 'asignado')->count();
        $serviciosFinalizados = \App\Modules\Servicio\Models\Servicio::where('estado', 'finalizado')->count();

        // RUTA MÁS REPETIDA
        $rutaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('CONCAT(origen, " → ", destino) as ruta, COUNT(*) as total')
            ->groupBy('ruta')
            ->orderByDesc('total')
            ->first();

        // ORIGEN MÁS FRECUENTE
        $origenTop = \App\Modules\Servicio\Models\Servicio::selectRaw('origen, COUNT(*) as total')
            ->groupBy('origen')
            ->orderByDesc('total')
            ->first();

        // LOCALES VS FORÁNEOS
        $locales = \App\Modules\Servicio\Models\Servicio::whereColumn('origen', 'destino')->count();

        $foraneos = \App\Modules\Servicio\Models\Servicio::whereColumn('origen', '!=', 'destino')->count();

        // TIPO CARGA
        $tipoCargaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('tipo_carga, COUNT(*) as total')
            ->groupBy('tipo_carga')
            ->orderByDesc('total')
            ->first();

        // HORARIO MÁS ACTIVO
        $horaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('HOUR(created_at) as hora, COUNT(*) as total')
            ->groupBy('hora')
            ->orderByDesc('total')
            ->first();

        // DÍA MÁS ACTIVO
        $diaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('DAYNAME(created_at) as dia, COUNT(*) as total')
            ->groupBy('dia')
            ->orderByDesc('total')
            ->first();

        // CONTACTOS
        $contactosMes = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('created_at', '>=', $inicioMes);
        $solicitudesReportadas = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('reportada', true)->count();
        $solicitudesExpiradas = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('estado', 'expirado')->count();
        $comprasMes = LeadCompra::where('created_at', '>=', $inicioMes);

        // CRÉDITOS CONSUMIDOS
        $creditosConsumidosMes = LeadCompra::where('created_at',  '>=',  $inicioMes)->sum('tokens_pagados');

        // GANANCIA GENERADA
        $gananciaMes = LeadCompra::where('created_at', '>=',  $inicioMes)->sum('ganancia');

        // OPERACIONES FINALIZADAS
        $operacionesFinalizadas = LeadCompra::whereNotNull('finalizado_at')->count();

        // LEADS EXCLUSIVOS MES
        $leadsExclusivosMes = LeadCompra::where('exclusivo', true)->where('created_at', '>=', $inicioMes)->count();

        // LEADS EXCLUSIVOS
        $leadsExclusivos = LeadCompra::where('exclusivo',  true)->count();
        $leadsTotales = LeadCompra::count();
        $porcentajeExclusivos = $leadsTotales > 0 ? round(($leadsExclusivos / $leadsTotales) * 100)  : 0;

        // CONTACTOS LOCALES/FORÁNEOS
        $contactosLocales = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::whereColumn('origen', 'destino')->count();
        $contactosForaneos = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::whereColumn('origen', '!=', 'destino')->count();

        // TIPO MUDANZA
        $tipoMudanzaTop = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::selectRaw('tipo_mudanza, COUNT(*) as total')
            ->groupBy('tipo_mudanza')
            ->orderByDesc('total')
            ->first();

        // OPERACIÓN
        $creditosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');
        $partnersActivos = \App\Modules\PartnerReferral\Models\PartnerReferral::where('activo', true)->count();

        // MATCHINGS
        $matchingsMes = \App\Modules\Servicio\Models\Servicio::where('estado', 'asignado')->where('updated_at', '>=', $inicioMes)->count();

        return [
            'metrics' => [
                'servicios' => [
                    'publicados_mes' => $serviciosMes->count(),
                    'servicios_activos' => $serviciosActivos,
                    'servicios_asignados' => $serviciosAsignados,
                    'servicios_finalizados' => $serviciosFinalizados,
                    'ruta_top' => $rutaTop?->ruta,
                    'origen_top' => $origenTop?->origen,
                    'locales' => $locales,
                    'foraneos' => $foraneos,
                    'tipo_carga_top' => $tipoCargaTop?->tipo_carga,
                    'hora_top' => $horaTop?->hora,
                    'dia_top' => $diaTop?->dia,
                ],

                'contactos' => [
                    'publicados_mes' => $contactosMes->count(),
                    'comprados_mes' => $comprasMes->count(),
                    'exclusivos' => $leadsExclusivos,
                    'porcentaje_exclusivos' => $porcentajeExclusivos,
                    'locales' => $contactosLocales,
                    'foraneos' => $contactosForaneos,
                    'tipo_mudanza_top' => $tipoMudanzaTop?->tipo_mudanza,
                    'leads_exclusivos' => $leadsExclusivos,
                    'porcentaje_exclusivos' => $porcentajeExclusivos,
                    'solicitudes_reportadas' => $solicitudesReportadas,
                    'solicitudes_expiradas' => $solicitudesExpiradas,
                ],

                'negocio' => [
                    'creditos_consumidos_mes' => $creditosConsumidosMes,
                    'ganancia_mes' => round($gananciaMes, 2),
                    'operaciones_finalizadas' => $operacionesFinalizadas,
                    'leads_exclusivos_mes' => $leadsExclusivosMes,
                ],

                'operacion' => [
                    'creditos_mes' => $creditosMes,
                    'partners_activos' => $partnersActivos,
                    'matchings_mes' => $matchingsMes,
                ]
            ],

            'ultimos_servicios' => \App\Modules\Servicio\Models\Servicio::with('empresa')->latest()->take(20)->get(),
            'ultimos_contactos' => \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::latest()->take(25)->get(),
        ];
    }

    /**
     * Empresas que realizaron al menos una compra  de leads durante el mes actual.
     */
    public function empresasCompradorasDelMes()
    {
        $inicioMes = Carbon::now()->startOfMonth();

        return Empresa::query()
            ->whereHas('leadCompras', function ($query) use ($inicioMes) {
                $query->where('created_at', '>=', $inicioMes);
            })
            ->withCount(['leadCompras as compras_mes' => function ($query) use ($inicioMes) {
                $query->where('created_at', '>=', $inicioMes);
            }])
            ->withSum(['leadCompras as creditos_consumidos_mes' => function ($query) use ($inicioMes) {
                $query->where('created_at', '>=', $inicioMes);
            }], 'tokens_pagados')
            ->orderByDesc('compras_mes')
            ->get()
            ->map(function ($empresa) {
                return [
                    'id' => $empresa->id,
                    'empresa' => $empresa->empresa,
                    'logo' => $empresa->logo_url ?? $empresa->logo ?? null,
                    'compras_mes' => (int) $empresa->compras_mes,
                    'creditos_consumidos_mes' => (int) ($empresa->creditos_consumidos_mes ?? 0),
                ];
            })
            ->values();
    }

    /**
     * Obtiene las últimas compras de leads realizadas.
     */
    public function ultimasCompras(int $limit = 20)
    {
        return LeadCompra::query()
            ->with(['empresa:id,empresa,logo', 'solicitud:id,nombre,origen,destino,tipo_mudanza'])
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function ($compra) {
                return [
                    'id' => $compra->id,
                    'empresa' => [
                        'id' => $compra->empresa?->id,
                        'nombre' => $compra->empresa?->empresa,
                        'logo' => $compra->empresa?->logo_url ?? $compra->empresa?->logo ?? null,
                    ],
                    'lead' => [
                        'id' => $compra->solicitud?->id,
                        'nombre' => $compra->solicitud?->nombre,
                        'origen' => $compra->solicitud?->origen,
                        'destino' => $compra->solicitud?->destino,
                        'tipo_mudanza' => $compra->solicitud?->tipo_mudanza,
                    ],
                    'tokens_pagados' => (int) $compra->tokens_pagados,
                    'exclusivo' => (bool) $compra->exclusivo,
                    'estado_operacion' => $compra->estado_operacion,
                    'ganancia' => $compra->ganancia,
                    'created_at' => $compra->created_at,
                ];
            });
    }

    /**
     * Obtiene los leads comprados por una empresa  durante el mes actual.
     */
    public function comprasPorEmpresaDelMes(int $empresaId)
    {
        $inicioMes = Carbon::now()->startOfMonth();
        $empresa = Empresa::query()->select('id', 'empresa', 'logo')->findOrFail($empresaId);

        $compras = LeadCompra::query()
            ->where('empresa_id', $empresaId)
            ->where('created_at', '>=', $inicioMes)
            ->with(['solicitud:id,nombre,email,telefono,origen,destino,tipo_mudanza,fecha_recoleccion,estado'])
            ->latest()
            ->get()
            ->map(function ($compra) {
                return [
                    'id' => $compra->id,
                    'lead' => [
                        'id' => $compra->solicitud?->id,
                        'nombre' => $compra->solicitud?->nombre,
                        'email' => $compra->solicitud?->email,
                        'telefono' => $compra->solicitud?->telefono,
                        'origen' => $compra->solicitud?->origen,
                        'destino' => $compra->solicitud?->destino,
                        'tipo_mudanza' => $compra->solicitud?->tipo_mudanza,
                        'fecha_recoleccion' => $compra->solicitud?->fecha_recoleccion,
                        'estado' => $compra->solicitud?->estado,
                    ],
                    'tokens_pagados' => (int) $compra->tokens_pagados,
                    'exclusivo' => (bool) $compra->exclusivo,
                    'estado_operacion' => $compra->estado_operacion,
                    'ganancia' => $compra->ganancia,
                    'created_at' => $compra->created_at,
                ];
            });

        return [
            'empresa' => [
                'id' => $empresa->id,
                'nombre' => $empresa->empresa,
                'logo' => $empresa->logo_url ?? $empresa->logo ?? null,
            ],

            'mes' => Carbon::now()->format('Y-m'),

            'resumen' => [
                'compras' => $compras->count(),
                'creditos_consumidos' => $compras->sum('tokens_pagados'),
            ],

            'compras' => $compras->values(),
        ];
    }
}