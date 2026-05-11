<?php

namespace App\Modules\PartnerReferral\Controllers;

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

        $month = $request->query('month', now()->month);

        $year = $request->query('year', now()->year);

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

        $creditosGenerados = (clone $compras)
            ->sum('tokens_pagados');

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

                    'solicitudes_generadas' =>
                        $solicitudesGeneradas,

                    'solicitudes_vendidas' =>
                        $solicitudesVendidas,

                    'ventas_exclusivas' =>
                        $ventasExclusivas,

                    'ventas_normales' =>
                        $ventasNormales,

                    'creditos_generados' =>
                        $creditosGenerados,
                ]
            ]
        ]);
    }
}