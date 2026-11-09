<?php

namespace App\Modules\DashboardExterno\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class DashboardExternoService
{
    /**
     * Dashboard general existente.
     */
    public function obtenerDashboard(): array
    {
        $inicioMes = Carbon::now()->startOfMonth();
        $empresasTotal = Empresa::count();
        $empresasMes = Empresa::where('created_at', '>=', $inicioMes)->count();
        $ultimasEmpresas = Empresa::query()->latest()->take(10)->get(['id', 'empresa', 'plan', 'created_at', 'verificado',]);
        $solicitudesActivas = SolicitudMudanza::where('estado', 'activo')->count();

        $ultimosContactos = SolicitudMudanza::query()
            ->latest()
            ->take(50)
            ->get([
                'id',
                'origen',
                'destino',
                'tipo_mudanza',
                'fecha_recoleccion',
                'estado',
                'created_at',
            ]);

        $comprasMes = LeadCompra::where('created_at', '>=', $inicioMes)->count();

        $creditosConsumidosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');

        $ultimasCompras = LeadCompra::query()
            ->with(['empresa:id,empresa', 'solicitud:id,origen,destino',])
            ->latest()
            ->take(50)
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

    /**
     * Histórico externo con filtros, paginación y agrupación.
     */
    public function obtenerHistorico(array $filtros): array
    {
        $desde = Carbon::createFromFormat('Y-m-d', $filtros['desde'])->startOfDay();
        $hasta = Carbon::createFromFormat('Y-m-d', $filtros['hasta'])->endOfDay();
        $entidad = $filtros['entidad'];
        $agrupar = $filtros['agrupar'];
        $page = (int) $filtros['page'];
        $perPage = (int) $filtros['per_page'];

        // Consulta base
        $consulta = $this->crearConsultaHistorica($entidad, $desde, $hasta);
        // Agrupación histórica
        $agrupacion = $this->obtenerAgrupacionSql($agrupar);

        $conteos = (clone $consulta)
            ->selectRaw("{$agrupacion} as periodo")
            ->selectRaw('COUNT(*) as total')
            ->groupByRaw($agrupacion)
            ->orderBy('periodo')
            ->get()
            ->map(function ($registro) {
                return [
                    'periodo' => $registro->periodo,
                    'total' => (int) $registro->total,
                ];
            })
            ->values();

        //Detalle paginado
        $paginador = (clone $consulta)
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate($perPage, ['*'], 'page', $page);

        $detalle = $paginador->getCollection()
            ->map(function ($registro) use ($entidad) {
                return $this->mapearRegistroHistorico($registro, $entidad);
            })
            ->values();

        return [
            'success' => true,
            'generated_at' => Carbon::now()->toIso8601String(),
            'entidad' => $entidad,

            'periodo' => [
                'desde' => $desde->toDateString(),
                'hasta' => $hasta->toDateString(),
            ],

            'agrupacion' => $agrupar,

            'resumen' => [
                'total_registros' => $paginador->total(),
                'conteos' => $conteos,
            ],

            'paginacion' => [
                'pagina_actual' => $paginador->currentPage(),
                'por_pagina' => $paginador->perPage(),
                'total_registros' => $paginador->total(),
                'ultima_pagina' => $paginador->lastPage(),
                'tiene_pagina_anterior' => $paginador->previousPageUrl() !== null,
                'tiene_pagina_siguiente' => $paginador->nextPageUrl() !== null,
            ],

            'detalle' => $detalle,
        ];
    }

    /**
     * Construye la consulta base según la entidad.
     * Todas las consultas históricas se concentran aquí.
     */
    private function crearConsultaHistorica(string $entidad, Carbon $desde, Carbon $hasta): Builder
    {
        return match ($entidad) {
            'contactos' => LeadCompra::query()
                ->with(['empresa:id,empresa', 'solicitud:id,origen,destino,tipo_mudanza,fecha_recoleccion,estado',])
                ->whereBetween('created_at', [$desde, $hasta]),

            'compras' => LeadCompra::query()
                ->with(['empresa:id,empresa', 'solicitud:id,origen,destino,tipo_mudanza,fecha_recoleccion,estado',])
                ->whereBetween('created_at', [$desde, $hasta]),

            'empresas' => Empresa::query()->whereBetween('created_at', [$desde, $hasta]),
            'solicitudes' => SolicitudMudanza::query()->whereBetween('created_at', [$desde, $hasta]),
        };
    }

    /**
     * Expresiones SQL permitidas para agrupación.
     * Se utilizan expresiones predefinidas para evitar insertar parámetros arbitrarios en SQL.
     */
    private function obtenerAgrupacionSql(string $agrupar): string
    {
        return match ($agrupar) {
            'dia' => 'DATE(created_at)',
            'semana' => 'DATE_SUB( DATE(created_at), INTERVAL WEEKDAY(created_at) DAY )',
            'mes' => "DATE_FORMAT(created_at, '%Y-%m-01')",
        };
    }

    /**
     * Transforma cada registro según la entidad consultada.
     */
    private function mapearRegistroHistorico( $registro, string $entidad ): array {
        return match ($entidad) {
            'contactos' => [
                'id' => $registro->id,

                'empresa' => [
                    'id' => $registro->empresa?->id,
                    'nombre' => $registro->empresa?->empresa,
                ],

                'contacto' => [
                    'id' => $registro->solicitud?->id,
                    'origen' => $registro->solicitud?->origen,
                    'destino' => $registro->solicitud?->destino,
                    'tipo' => $registro->solicitud?->tipo_mudanza,
                    'fecha_recoleccion' => $registro->solicitud?->fecha_recoleccion,
                    'estatus' => $registro->solicitud?->estado,
                ],

                'adquirido_en' => $registro->created_at,
            ],

            'compras' => [
                'id' => $registro->id,

                'empresa' => [
                    'id' => $registro->empresa?->id,
                    'nombre' => $registro->empresa?->empresa,
                ],

                'solicitud' => [
                    'id' => $registro->solicitud?->id,
                    'origen' => $registro->solicitud?->origen,
                    'destino' => $registro->solicitud?->destino,
                    'tipo' => $registro->solicitud?->tipo_mudanza,
                    'fecha_recoleccion' => $registro->solicitud?->fecha_recoleccion,
                    'estatus' => $registro->solicitud?->estado,
                ],

                'creditos_consumidos' => (int) $registro->tokens_pagados,
                'exclusivo' => (bool) $registro->exclusivo,
                'created_at' => $registro->created_at,
            ],

            'empresas' => [
                'id' => $registro->id,
                'nombre' => $registro->empresa,
                'plan' => $registro->plan,
                'verificado' => $registro->verificado,
                'created_at' => $registro->created_at,
            ],

            'solicitudes' => [
                'id' => $registro->id,
                'origen' => $registro->origen,
                'destino' => $registro->destino,
                'tipo' => $registro->tipo_mudanza,
                'fecha_recoleccion' => $registro->fecha_recoleccion,
                'estatus' => $registro->estado,
                'created_at' => $registro->created_at,
            ],
        };
    }
}