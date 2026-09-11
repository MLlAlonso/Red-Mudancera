<?php

namespace App\Modules\SuperAdmin\Services;

use Carbon\Carbon;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class SuperAdminServiciosService
{
    /**
     * Obtiene toda la información necesaria para el dashboard de servicios del SuperAdmin.
     */
    public function obtenerDashboard(): array
    {
        $inicioMes = Carbon::now()->startOfMonth();
        $serviciosMes = \App\Modules\Servicio\Models\Servicio::where('created_at', '>=', $inicioMes);
        $serviciosActivos = \App\Modules\Servicio\Models\Servicio::where('estado', 'activo')->count();
        $serviciosAsignados = \App\Modules\Servicio\Models\Servicio::where('estado', 'asignado')->count();
        $serviciosFinalizados = \App\Modules\Servicio\Models\Servicio::where('estado', 'finalizado')->count();
        $rutaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('CONCAT(origen, " → ", destino) as ruta, COUNT(*) as total')->groupBy('ruta')->orderByDesc('total')->first();
        $origenTop = \App\Modules\Servicio\Models\Servicio::selectRaw('origen, COUNT(*) as total')->groupBy('origen')->orderByDesc('total')->first();
        $locales = \App\Modules\Servicio\Models\Servicio::whereColumn('origen', 'destino')->count();
        $foraneos = \App\Modules\Servicio\Models\Servicio::whereColumn('origen', '!=', 'destino')->count();
        $tipoCargaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('tipo_carga, COUNT(*) as total')->groupBy('tipo_carga')->orderByDesc('total')->first();
        $horaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('HOUR(created_at) as hora, COUNT(*) as total')->groupBy('hora')->orderByDesc('total')->first();
        $diaTop = \App\Modules\Servicio\Models\Servicio::selectRaw('DAYNAME(created_at) as dia, COUNT(*) as total')->groupBy('dia')->orderByDesc('total')->first();
        $contactosMes = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('created_at', '>=', $inicioMes);
        $solicitudesReportadas = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('reportada', true)->count();
        $solicitudesExpiradas = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::where('estado', 'expirado')->count();
        $comprasMes = LeadCompra::where('created_at', '>=', $inicioMes);
        $creditosConsumidosMes = LeadCompra::where('created_at',  '>=',  $inicioMes)->sum('tokens_pagados');
        $gananciaMes = LeadCompra::where('created_at', '>=',  $inicioMes)->sum('ganancia');
        $operacionesFinalizadas = LeadCompra::whereNotNull('finalizado_at')->count();
        $leadsExclusivosMes = LeadCompra::where('exclusivo', true)->where('created_at', '>=', $inicioMes)->count();
        $leadsExclusivos = LeadCompra::where('exclusivo',  true)->count();
        $leadsTotales = LeadCompra::count();
        $porcentajeExclusivos = $leadsTotales > 0 ? round(($leadsExclusivos / $leadsTotales) * 100)  : 0;
        $contactosLocales = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::whereColumn('origen', 'destino')->count();
        $contactosForaneos = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::whereColumn('origen', '!=', 'destino')->count();
        $tipoMudanzaTop = \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::selectRaw('tipo_mudanza, COUNT(*) as total')->groupBy('tipo_mudanza')->orderByDesc('total')->first();
        $creditosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');
        $partnersActivos = \App\Modules\PartnerReferral\Models\PartnerReferral::where('activo', true)->count();
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

    public function exportarSolicitudesMudanzaPorRango(string $fechaInicio, string $fechaFin)
    {
        $fechaInicio = Carbon::createFromFormat('Y-m-d', $fechaInicio)->startOfDay();
        $fechaFin = Carbon::createFromFormat('Y-m-d',  $fechaFin)->endOfDay();
        $solicitudes = SolicitudMudanza::query()->whereBetween('created_at', [$fechaInicio, $fechaFin])->orderBy('created_at')->get();
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Solicitudes');

        $headers = [
            'ID',
            'Origen',
            'Destino',
            'Distancia KM',
            'Tipo de vivienda',
            'Vivienda destino',
            'Pisos origen',
            'Elevador origen',
            'Acarreo origen',
            'Pisos destino',
            'Elevador destino',
            'Acarreo destino',
            'Fecha recolección',
            'Fecha límite visible',
            'Tipo de servicio',
            'Tipo de mudanza',
            'Nombre',
            'Email',
            'Teléfono',
            'Estado',
            'Partner referral ID',
            'Reportada',
            'Compras',
            'Creada',
        ];

        $sheet->fromArray($headers, null, 'A1');
        $fila = 2;

        foreach ($solicitudes as $solicitud) {
            $sheet->fromArray([
                $solicitud->id,
                $solicitud->origen,
                $solicitud->destino,
                $solicitud->distancia_km,
                $solicitud->tipo_vivienda,
                $solicitud->vivienda_destino,
                $solicitud->origen_pisos,
                $solicitud->origen_elevador,
                $solicitud->origen_acarreo,
                $solicitud->destino_pisos,
                $solicitud->destino_elevador,
                $solicitud->destino_acarreo,
                $solicitud->fecha_recoleccion,
                $solicitud->fecha_limite_visible,
                $solicitud->tipo_servicio,
                $solicitud->tipo_mudanza,
                $solicitud->nombre,
                $solicitud->email,
                $solicitud->telefono,
                $solicitud->estado,
                $solicitud->partner_referral_id,
                $solicitud->reportada ? 'Sí' : 'No',
                $solicitud->compras_count,
                $solicitud->created_at,
            ], null, "A{$fila}");

            $fila++;
        }

        for ($column = 1; $column <= 24; $column++) {
            $sheet->getColumnDimensionByColumn($column)->setAutoSize(true);
        }

        $sheet->freezePane('A2');
        $sheet->getStyle('A1:X1')->getFont()->setBold(true);
        $writer = new Xlsx($spreadsheet);

        $nombreArchivo = sprintf(
            'solicitudes-mudanza-%s-a-%s.xlsx',
            $fechaInicio->format('Y-m-d'),
            $fechaFin->format('Y-m-d')
        );

        return response()->streamDownload(
            function () use ($writer) {
                $writer->save('php://output');
            },
            $nombreArchivo,
            [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]
        );
    }
}
