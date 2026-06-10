<?php

namespace App\Modules\SuperAdmin\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Services\PlanService;
use App\Modules\PartnerReferral\Models\PartnerReferral;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use Illuminate\Support\Facades\DB;

class SuperAdminEmpresaController extends Controller
{
    protected PlanService $planService;

    public function __construct(PlanService $planService)
    {
        $this->planService = $planService;
    }

    /**
     * LISTAR EMPRESAS
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        // EMPRESAS
        $empresas = Empresa::query()
            ->when($search, function ($query) use ($search) {
                $query->where('empresa', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere(
                        'representante',
                        'LIKE',
                        "%{$search}%"
                    );
            })
            ->latest()
            ->take(200)
            ->get();

        // FECHAS
        $inicioMes = now()->startOfMonth();

        // MÉTRICAS
        $empresasTotal = Empresa::count();
        $empresasMes = Empresa::where('created_at', '>=', $inicioMes)->count();

        $trialsActivos = Empresa::where('isTrial', true)
            ->where('trialEndsAt', '>=', now())
            ->count();

        $premiumRadar = Empresa::where('plan', 'radar')->count();
        $premiumConector = Empresa::where('plan', 'conector')->count();
        $premiumTotal = $premiumRadar + $premiumConector;

        $sinVerificar = Empresa::where('verificado', false)->count();

        // LEADS / CRÉDITOS
        $leadsMes = LeadCompra::where('created_at', '>=', $inicioMes)->count();
        $creditosMes = LeadCompra::where('created_at', '>=', $inicioMes)->sum('tokens_pagados');

        // PARTNERS
        $partnersActivos = PartnerReferral::where('activo', true)->count();

        // ACTIVIDAD EMPRESAS
        $empresasActivasMes = Empresa::where('updated_at', '>=', $inicioMes)->count();
        $empresasInactivas = $empresasTotal - $empresasActivasMes;

        return response()->json([
            'data' => $empresas,

            'metrics' => [
                'empresas_total' => $empresasTotal,
                'empresas_mes' => $empresasMes,
                'trials_activos' => $trialsActivos,
                'premium_total' => $premiumTotal,
                'premium_radar' => $premiumRadar,
                'premium_conector' => $premiumConector,
                'sin_verificar' => $sinVerificar,
                'leads_mes' => $leadsMes,
                'creditos_mes' => $creditosMes,
                'partners_activos' => $partnersActivos,
                'empresas_activas_mes' => $empresasActivasMes,
                'empresas_inactivas' => $empresasInactivas,
            ]
        ]);
    }

    /**
     * AGREGAR CRÉDITOS
     */
    public function addCreditos(Request $request, $id)
    {
        $request->validate(['creditos' => 'required|integer|min:1']);
        $empresa = Empresa::findOrFail($id);
        $empresa->tokens += $request->creditos;
        $empresa->save();

        return response()->json([
            'message' => 'Créditos agregados',
            'tokens' => $empresa->tokens
        ]);
    }

    /**
     * CAMBIAR PLAN
     */
    public function changePlan(Request $request, $id)
    {
        $request->validate(['plan' => 'required|string|in:free,conector,radar']);
        $empresa = Empresa::findOrFail($id);

        $this->planService->changePlan(
            $empresa,
            $request->plan,
            'mensual',
            false
        );

        return response()->json([
            'message' => 'Plan actualizado'
        ]);
    }

    /**
     * VERIFICAR EMPRESA MANUALMENTE
     */
    public function verifyEmpresa($id)
    {
        $empresa = Empresa::findOrFail($id);

        if ($empresa->verificado) {
            return response()->json([
                'message' => 'La empresa ya está verificada'
            ]);
        }

        $empresa->update([
            'verificado' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Empresa verificada correctamente'
        ]);
    }

    /**
     * CREAR PARTNER
     */
    public function createPartner(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:150',
            'logo' => 'nullable|url'
        ]);

        $slug = Str::slug($request->nombre);

        $partner = PartnerReferral::create([
            'nombre' => $request->nombre,
            'slug' => $slug,
            'logo' => $request->logo,
            'access_token' => Str::random(40),
            'activo' => true,
        ]);

        return response()->json([
            'message' => 'Partner creado',
            'partner' => $partner
        ]);
    }

    public function destroyEmpresa($id)
    {
        $empresa = Empresa::findOrFail($id);

        DB::transaction(function () use ($empresa) {
            $empresa->usuarios()->delete();
            $empresa->servicios()->delete();
            $empresa->notificaciones()->delete();
            $empresa->leadCompras()->delete();
            $empresa->imagenes()->delete();
            $empresa->radarConfig()->delete();
            $empresa->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Empresa eliminada correctamente'
        ]);
    }
}
