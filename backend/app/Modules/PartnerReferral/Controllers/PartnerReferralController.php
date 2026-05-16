<?php

namespace App\Modules\PartnerReferral\Controllers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\PartnerReferral\Models\PartnerReferral;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Models\LeadCompra;

class PartnerReferralController extends Controller
{
    public function show(Request $request, $slug)
    {
        $partner = PartnerReferral::where('slug', $slug)
            ->where('activo', true)
            ->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | Mes seleccionado
        |--------------------------------------------------------------------------
        */
        $month = (int) $request->query(
            'month',
            now()->month
        );

        $year = (int) $request->query(
            'year',
            now()->year
        );

        /*
        |--------------------------------------------------------------------------
        | Solicitudes generadas
        |--------------------------------------------------------------------------
        */
        $solicitudesIds = SolicitudMudanza::where(
            'partner_referral_id',
            $partner->id
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->pluck('id');

        $solicitudesGeneradas = $solicitudesIds->count();

        /*
        |--------------------------------------------------------------------------
        | Compras
        |--------------------------------------------------------------------------
        */
        $compras = LeadCompra::with('solicitud')
            ->whereIn(
                'solicitud_id',
                $solicitudesIds
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year);

        $solicitudesConVenta = $compras
            ->distinct('solicitud_id')
            ->count();

        $comprasRealizadas = SolicitudMudanza::where(
            'partner_referral_id',
            $partner->id
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('compras_count');

        $creditosGenerados = 0;

        foreach ((clone $compras)->get() as $compra) {
            $solicitud = $compra->solicitud;

            if (!$solicitud) {
                continue;
            }

            $tipo = $solicitud->tipo_servicio;
            $esExclusivo = $compra->exclusivo;

            $monto = match (true) {
                $tipo === 'local' && !$esExclusivo => 6,
                $tipo === 'local' && $esExclusivo => 30,
                $tipo === 'foranea' && !$esExclusivo => 15,
                $tipo === 'foranea' && $esExclusivo => 35,
                default => 15
            };

            $creditosGenerados += $monto;
        }

        $conversionRate = $solicitudesGeneradas > 0
            ? round(
                ($solicitudesConVenta / $solicitudesGeneradas) * 100,
                1
            )
            : 0;

        $averageTokens = $comprasRealizadas > 0
            ? round(
                $creditosGenerados / $comprasRealizadas,
                1
            )
            : 0;

        $averageSalesPerRequest = $solicitudesGeneradas > 0
            ? round(
                $comprasRealizadas /
                    $solicitudesGeneradas,
                2
            )
            : 0;

        /*
        |--------------------------------------------------------------------------
        | Últimas solicitudes
        |--------------------------------------------------------------------------
        */
        $latestRequests = SolicitudMudanza::where(
            'partner_referral_id',
            $partner->id
        )
            ->latest()
            ->take(5)
            ->get([
                'id',
                'origen',
                'destino',
                'tipo_servicio',
                'created_at'
            ]);

        return response()->json([
            'data' => [
                'partner' => [
                    'nombre' => $partner->nombre,
                    'slug' => $partner->slug,
                    'logo' => $partner->logo,
                ],

                'periodo' => [
                    'month' => (int) $month,
                    'year' => (int) $year,
                ],

                'metricas' => [
                    'solicitudes_generadas' => $solicitudesGeneradas,
                    'compras_realizadas' => $comprasRealizadas,
                    'creditos_generados' => $creditosGenerados,
                    'conversion_rate' => $conversionRate,
                    'average_tokens' => $averageTokens,
                    'average_sales_per_request' => $averageSalesPerRequest,
                ],

                'latest_requests' => $latestRequests,
            ]
        ]);
    }

    public function exportPdf(Request $request, $slug)
    {
        $partner = PartnerReferral::where('slug', $slug)
            ->where('activo', true)
            ->firstOrFail();

        $month = (int) $request->query(
            'month',
            now()->month
        );

        $year = (int) $request->query(
            'year',
            now()->year
        );

        /*
        |--------------------------------------------------------------------------
        | Solicitudes
        |--------------------------------------------------------------------------
        */
        $solicitudesIds = SolicitudMudanza::where(
            'partner_referral_id',
            $partner->id
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->pluck('id');
        $solicitudesGeneradas = $solicitudesIds->count();

        /*
        |--------------------------------------------------------------------------
        | Compras
        |--------------------------------------------------------------------------
        */
        $compras = LeadCompra::with('solicitud')
            ->whereIn(
                'solicitud_id',
                $solicitudesIds
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year);

        $solicitudesConVenta = $compras
            ->distinct('solicitud_id')
            ->count();

        $creditosGenerados = 0;

        $comprasRealizadas = SolicitudMudanza::where(
            'partner_referral_id',
            $partner->id
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('compras_count');

        foreach ((clone $compras)->get() as $compra) {
            $solicitud = $compra->solicitud;

            if (!$solicitud) {
                continue;
            }

            $tipo = $solicitud->tipo_servicio;
            $esExclusivo = $compra->exclusivo;

            $monto = match (true) {
                $tipo === 'local' && !$esExclusivo => 6,
                $tipo === 'local' && $esExclusivo => 30,
                $tipo === 'foranea' && !$esExclusivo => 15,
                $tipo === 'foranea' && $esExclusivo => 35,
                default => 15
            };

            $creditosGenerados += $monto;
        }

        $averageTokens = $comprasRealizadas > 0
            ? round(
                $creditosGenerados / $comprasRealizadas,
                1
            )
            : 0;

        $averageSalesPerRequest = $solicitudesGeneradas > 0
            ? round(
                $comprasRealizadas /
                    $solicitudesGeneradas,
                2
            )
            : 0;

        /*
        |--------------------------------------------------------------------------
        | Mes nombre
        |--------------------------------------------------------------------------
        */
        Carbon::setLocale('es');
        $monthName = Carbon::create()
            ->month((int) $month)
            ->translatedFormat('F');

        /*
        |--------------------------------------------------------------------------
        | PDF
        |--------------------------------------------------------------------------
        */
        $pdf = app('dompdf.wrapper');

        $pdf->loadView('pdf.partner-dashboard', [
            'partner' => $partner,
            'month' => $month,
            'year' => $year,
            'monthName' => ucfirst($monthName),
            'solicitudesGeneradas' => $solicitudesGeneradas,
            'comprasRealizadas' => $comprasRealizadas,
            'creditosGenerados' => $creditosGenerados,
            'averageTokens' => $averageTokens,
            'averageSalesPerRequest' => $averageSalesPerRequest,
        ]);

        return $pdf->download(
            'partner_' .
                $partner->slug .
                '_' .
                str_pad($month, 2, '0', STR_PAD_LEFT) .
                '_' .
                $year .
                '.pdf'
        );
    }
}
