<?php

namespace App\Modules\SuperAdmin\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Modules\Empresa\Mail\TrialApprovedMail;
use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\TrialRequest;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class SuperAdminController extends Controller
{
    /**
     * DASHBOARD
     */
    public function dashboard()
    {
        $inicioMes = now()->startOfMonth();

        return response()->json([

            /*
        |--------------------------------------------------------------------------
        | MÉTRICAS
        |--------------------------------------------------------------------------
        */

            'empresas' => Empresa::count(),

            'servicios_activos' => Servicio::where(
                'estado',
                'activo'
            )->count(),

            'solicitudes_activas' => SolicitudMudanza::where(
                'estado',
                'activo'
            )->count(),

            'verificaciones_pendientes' => TrialRequest::where(
                'status',
                'pendiente'
            )->count(),

            /*
        |--------------------------------------------------------------------------
        | CRÉDITOS CONSUMIDOS MES
        |--------------------------------------------------------------------------
        */

            'creditos_mes' => LeadCompra::where(
                'created_at',
                '>=',
                $inicioMes
            )->sum('tokens_pagados'),

            /*
        |--------------------------------------------------------------------------
        | ÚLTIMAS EMPRESAS
        |--------------------------------------------------------------------------
        */

            'ultimas_empresas' => Empresa::latest()
                ->take(10)
                ->get([
                    'id',
                    'empresa',
                    'email',
                    'logo',
                    'plan',
                    'created_at',
                    'verificado',
                    'isTrial'
                ]),
        ]);
    }

    /**
     * LISTA TRIAL REQUESTS
     */
    public function trialRequests()
    {
        $trials = TrialRequest::with('empresa')
            ->latest()
            ->get();

        return response()->json([
            'data' => $trials
        ]);
    }

    /**
     * APROBAR TRIAL
     */
    public function approveTrial($id)
    {
        $trial = TrialRequest::findOrFail($id);

        $trial->update([
            'status' => 'aprobado'
        ]);

        $empresa = $trial->empresa()->first();

        if (!$empresa) {

            return response()->json([
                'message' => 'Empresa no encontrada'
            ], 404);
        }

        $empresa->update([
            'isTrial' => true,
            'trialEndsAt' => now()->addDays(30),
            'plan' => 'radar',
            'subActiva' => true,
            'subInicio' => now(),
            'subFin' => now()->addDays(30),
        ]);

        try {

            Mail::to($empresa->email)->send(
                new TrialApprovedMail($empresa)
            );
        } catch (\Throwable $e) {

            Log::error(
                'Error enviando correo trial aprobado: '
                    . $e->getMessage()
            );
        }

        return response()->json([
            'message' => 'Trial aprobado correctamente'
        ]);
    }

    /**
     * RECHAZAR TRIAL
     */
    public function rejectTrial($id)
    {
        $trial = TrialRequest::findOrFail($id);
        $trial->update([
            'status' => 'rechazado'
        ]);

        return response()->json([
            'message' => 'Trial rechazado'
        ]);
    }
}
