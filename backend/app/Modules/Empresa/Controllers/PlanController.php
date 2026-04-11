<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Empresa\Services\PlanService;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\PlanChangedEvent;

class PlanController extends Controller
{
    protected PlanService $service;
    public function __construct(PlanService $service)
    {
        $this->service = $service;
    }

    /**
     * Cambiar plan de empresa
     */
    public function cambiarPlan(Request $request)
    {
        $request->validate([
            'plan' => 'required|string|in:free,conector,radar',
            'tipo' => 'nullable|string|in:mensual,anual',
            'recurrente' => 'nullable|boolean',
        ]);

        $empresa = $request->user();
        $plan = $request->plan;
        $tipo = $request->tipo ?? 'mensual';
        $recurrente = $request->recurrente ?? true;

        $empresa = $this->service->changePlan(
            $empresa,
            $plan,
            $tipo,
            $recurrente
        );

        // DISPARAR NOTIFICACIÓN
        app(NotificationDispatcher::class)->dispatch(
            new PlanChangedEvent(
                $empresa->id,
                $plan,
                $empresa->subInicio->format('d/m/Y'),
                $empresa->subFin->format('d/m/Y')
            )
        );

        return response()->json([
            'message' => 'Plan actualizado correctamente',
            'empresa' => $empresa
        ]);
    }
}
