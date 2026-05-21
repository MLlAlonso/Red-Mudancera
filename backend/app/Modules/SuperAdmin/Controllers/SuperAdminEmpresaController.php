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

    public function __construct(
        PlanService $planService
    ) {
        $this->planService = $planService;
    }

    /**
     * LISTAR EMPRESAS
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $empresas = Empresa::query()

            ->when($search, function ($query) use ($search) {
                $query->where('empresa', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('representante', 'LIKE', "%{$search}%");
            })
            ->latest()
            ->take(50)
            ->get();

        return response()->json([
            'data' => $empresas,

            'metrics' => [
                'trials_activos' => Empresa::where('isTrial', true)->where('trialEndsAt', '>=', now())->count(),
                'premium_radar' => Empresa::where('plan', 'radar')->count(),
                'premium_conector' => Empresa::where('plan', 'conector')->count(),
                'leads_mes' => LeadCompra::whereMonth('created_at', Carbon::now()->month)->count(),
                'sin_verificar' => Empresa::where('verificado', false)->count(),
                'empresas_mes' => Empresa::whereMonth('created_at', Carbon::now()->month)->count(),
            ]
        ]);
    }

    /**
     * AGREGAR CRÉDITOS
     */
    public function addCreditos(Request $request, $id)
    {
        $request->validate([
            'creditos' => 'required|integer|min:1'
        ]);

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
        $request->validate([
            'plan' => 'required|string|in:free,conector,radar'
        ]);

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
