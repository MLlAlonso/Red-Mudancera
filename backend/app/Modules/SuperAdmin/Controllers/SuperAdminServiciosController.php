<?php

namespace App\Modules\SuperAdmin\Controllers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\PartnerReferral\Models\PartnerReferral;
use App\Modules\SuperAdmin\Services\SuperAdminServiciosService;

class SuperAdminServiciosController extends Controller
{
    public function __construct(
        protected SuperAdminServiciosService $serviciosService
    ) {}

    public function dashboard()
    {
        $inicioMes = Carbon::now()->startOfMonth();

        // SERVICIOS
        $serviciosMes = Servicio::where('created_at', '>=', $inicioMes);
        $serviciosActivos = Servicio::where('estado', 'activo')->count();
        $serviciosAsignados = Servicio::where('estado', 'asignado')->count();
        $serviciosFinalizados = Servicio::where('estado', 'finalizado')->count();

        // RUTA MÁS REPETIDA
        $rutaTop = Servicio::selectRaw('CONCAT(origen, " → ", destino) as ruta, COUNT(*) as total')
            ->groupBy('ruta')
            ->orderByDesc('total')
            ->first();

        // ORIGEN MÁS FRECUENTE
        $origenTop = Servicio::selectRaw('origen, COUNT(*) as total')
            ->groupBy('origen')
            ->orderByDesc('total')
            ->first();

        // LOCALES VS FORÁNEOS
        $locales = Servicio::whereColumn('origen', 'destino')->count();
        $foraneos = Servicio::whereColumn('origen', '!=', 'destino')->count();

        // TIPO CARGA
        $tipoCargaTop = Servicio::selectRaw('tipo_carga, COUNT(*) as total')
            ->groupBy('tipo_carga')
            ->orderByDesc('total')
            ->first();

        // HORARIO MÁS ACTIVO
        $horaTop = Servicio::selectRaw('HOUR(created_at) as hora, COUNT(*) as total')
            ->groupBy('hora')
            ->orderByDesc('total')
            ->first();

        // DÍA MÁS ACTIVO
        $diaTop = Servicio::selectRaw('DAYNAME(created_at) as dia, COUNT(*) as total')
            ->groupBy('dia')
            ->orderByDesc('total')
            ->first();

        // CONTACTOS
        $contactosMes = SolicitudMudanza::where('created_at', '>=', $inicioMes);
        $solicitudesReportadas = SolicitudMudanza::where('reportada', true)->count();
        $solicitudesExpiradas = SolicitudMudanza::where('estado', 'expirado')->count();
        $comprasMes = LeadCompra::where('created_at', '>=', $inicioMes);

        // CRÉDITOS CONSUMIDOS
        $creditosConsumidosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');

        // GANANCIA GENERADA
        $gananciaMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('ganancia');

        // OPERACIONES FINALIZADAS
        $operacionesFinalizadas = LeadCompra::whereNotNull('finalizado_at')->count();

        // LEADS EXCLUSIVOS MES
        $leadsExclusivosMes = LeadCompra::where('exclusivo', true)
            ->where('created_at', '>=', $inicioMes)
            ->count();

        // LEADS EXCLUSIVOS
        $leadsExclusivos = LeadCompra::where('exclusivo', true)->count();
        $leadsTotales = LeadCompra::count();

        $porcentajeExclusivos =
            $leadsTotales > 0
            ? round(
                ($leadsExclusivos / $leadsTotales) * 100
            )
            : 0;

        // CONTACTOS LOCALES/FORÁNEOS
        $contactosLocales = SolicitudMudanza::whereColumn('origen', 'destino')->count();
        $contactosForaneos = SolicitudMudanza::whereColumn('origen', '!=', 'destino')->count();

        // TIPO MUDANZA
        $tipoMudanzaTop = SolicitudMudanza::selectRaw('tipo_mudanza, COUNT(*) as total')
            ->groupBy('tipo_mudanza')
            ->orderByDesc('total')
            ->first();

        // OPERACIÓN
        $creditosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');
        $partnersActivos = PartnerReferral::where('activo',  true)->count();

        // MATCHINGS
        $matchingsMes = Servicio::where('estado', 'asignado')
            ->where('updated_at', '>=', $inicioMes)
            ->count();

        return response()->json([
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

            'ultimos_servicios' => Servicio::with('empresa')
                ->latest()
                ->take(20)
                ->get(),

            'ultimos_contactos' => SolicitudMudanza::latest()
                ->take(25)
                ->get(),
        ]);
    }

    public function empresasCompradoras()
    {
        return response()->json(['data' => $this->serviciosService->empresasCompradorasDelMes(),]);
    }

    public function ultimasCompras()
    {
        return response()->json(['data' => $this->serviciosService->ultimasCompras(),]);
    }

    public function comprasPorEmpresa($empresaId)
    {
        return response()->json(
            $this->serviciosService->comprasPorEmpresaDelMes((int) $empresaId)
        );
    }
}