<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class CheckPlanPermission
{
    public function handle(Request $request, Closure $next, string $permission,) 
    {
        $empresa = $request->user() ?? $request->user('sanctum');

        if (!$empresa) {
            return response()->json([
                'error' => 'No autenticado'
            ], 401);
        }

        $plan = $empresa->plan ?? 'explorador';
        $plan = strtolower($plan);

        // RESTRICCIONES PLAN EXPLORADOR
        if (in_array($plan, ['explorador', 'free'])) {
            $blockedPermissions = [
                'create_servicio',
                'edit_servicio',
                'contactar',
                'comprar_lead',
                'comprar_exclusivo',
                'radar',
                'change_estado',
                'buy_credits',
                'add_users',
            ];

            if (in_array($permission, $blockedPermissions)) {
                return response()->json([
                    'error' => 'PLAN_LIMIT',
                    'message' => 'Estás viendo oportunidades reales dentro de la plataforma, pero para poder contactar, publicar o comprar contactos necesitamos verificar tu empresa.',
                    'required_plan' => 'conector'
                ], 403);
            }
        }
        return $next($request);
    }
}