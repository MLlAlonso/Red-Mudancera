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
        $compras = LeadCompra::whereIn(
            'solicitud_id',
            $solicitudesIds
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year);

        $solicitudesVendidas = $compras
            ->distinct('solicitud_id')
            ->count();

        $ventasExclusivas = (clone $compras)
            ->where('exclusivo', true)
            ->count();

        $ventasNormales = (clone $compras)
            ->where('exclusivo', false)
            ->count();

        $creditosGenerados = 0;

        foreach ((clone $compras)->get() as $compra) {

            $solicitud = SolicitudMudanza::find(
                $compra->solicitud_id
            );

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
                ($solicitudesVendidas / $solicitudesGeneradas) * 100,
                1
            )
            : 0;

        $averageTokens = $solicitudesVendidas > 0
            ? round(
                $creditosGenerados / $solicitudesVendidas,
                1
            )
            : 0;

        $averageSalesPerRequest = $solicitudesGeneradas > 0
            ? round(
                (
                    $ventasNormales +
                    $ventasExclusivas
                ) / $solicitudesGeneradas,
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
                    'solicitudes_vendidas' => $solicitudesVendidas,
                    'ventas_exclusivas' => $ventasExclusivas,
                    'ventas_normales' => $ventasNormales,
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
        $compras = LeadCompra::whereIn(
            'solicitud_id',
            $solicitudesIds
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year);

        $solicitudesVendidas = $compras
            ->distinct('solicitud_id')
            ->count();

        $creditosGenerados = 0;

        foreach ((clone $compras)->get() as $compra) {
            $solicitud = SolicitudMudanza::find(
                $compra->solicitud_id
            );

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

        $averageTokens = $solicitudesVendidas > 0
            ? round(
                $creditosGenerados / $solicitudesVendidas,
                1
            )
            : 0;

        $averageSalesPerRequest = $solicitudesGeneradas > 0
            ? round(
                (
                    $solicitudesVendidas
                ) / $solicitudesGeneradas,
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
            'solicitudesVendidas' => $solicitudesVendidas,
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
