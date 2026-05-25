<?php

namespace App\Modules\SuperAdmin\Controllers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\PartnerReferral\Models\PartnerReferral;

class SuperAdminAnalyticsController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | SERVICIOS ANALYTICS
    |--------------------------------------------------------------------------
    */
    public function servicios()
    {
        $inicioMes = now()->startOfMonth();

        // RUTAS MÁS REPETIDAS
        $rutasTop = Servicio::selectRaw(" origen, destino, COUNT(*) as total ")
            ->groupBy('origen', 'destino')
            ->orderByDesc('total')
            ->take(10)
            ->get();

        // ORIGEN MÁS FRECUENTE
        $origenTop = Servicio::selectRaw(" origen, COUNT(*) as total ")
            ->groupBy('origen')
            ->orderByDesc('total')
            ->first();

        // TIPO CARGA TOP
        $tipoCargaTop = Servicio::selectRaw(" tipo_carga, COUNT(*) as total ")
            ->groupBy('tipo_carga')
            ->orderByDesc('total')
            ->first();

        // HORARIO MÁS ACTIVO
        $horaTop = Servicio::selectRaw(" HOUR(created_at) as hora, COUNT(*) as total ")
            ->groupBy('hora')
            ->orderByDesc('total')
            ->first();

        // DÍA MÁS ACTIVO
        $diaTop = Servicio::selectRaw(" DAYNAME(created_at) as dia, COUNT(*) as total ")
            ->groupBy('dia')
            ->orderByDesc('total')
            ->first();

        // LOCALES VS FORÁNEOS
        $locales = Servicio::whereRaw(" LOWER(origen) = LOWER(destino) ")->count();
        $foraneos = Servicio::whereRaw(" LOWER(origen) != LOWER(destino) ")->count();

        // LEADS EXCLUSIVOS
        $exclusivos = LeadCompra::where(
            'exclusivo',
            true
        )->count();

        $totalLeads = LeadCompra::count();

        // TIPO MUDANZA TOP
        $tipoMudanzaTop = SolicitudMudanza::selectRaw(" tipo_mudanza, COUNT(*) as total ")
            ->groupBy('tipo_mudanza')
            ->orderByDesc('total')
            ->first();

        // SCORE CIUDADES
        $ciudades = Servicio::select( 'destino', DB::raw('COUNT(*) as total') )
            ->groupBy('destino')
            ->get()
            ->map(function ($item) {
                $compras = LeadCompra::join( 'solicitudes_mudanza', 'lead_compras.solicitud_id', '=', 'solicitudes_mudanza.id' )
                    ->where( 'solicitudes_mudanza.destino', $item->destino )
                    ->count();

                $score = ($item->total * 0.7) + ($compras * 0.3);

                return [
                    'ciudad' => $item->destino,
                    'score' => round($score)
                ];
            })
            ->sortByDesc('score')
            ->take(10)
            ->values();

        return response()->json([
            'metrics' => [
                'rutas_top' => $rutasTop,
                'origen_top' => $origenTop,
                'tipo_carga_top' => $tipoCargaTop,
                'hora_top' => $horaTop,
                'dia_top' => $diaTop,
                'servicios_locales' => $locales,
                'servicios_foraneos' => $foraneos,
                'leads_exclusivos' => $exclusivos,
                'porcentaje_exclusivos' =>
                $totalLeads > 0
                    ? round(
                        ($exclusivos / $totalLeads) * 100,
                        1
                    )
                    : 0,

                'tipo_mudanza_top' =>$tipoMudanzaTop,
                'score_ciudades' =>$ciudades,
            ]
        ]);
    }
}