<?php

namespace App\Modules\DashboardExterno\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidarDashboardApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $apiKeyConfigurada = config('services.dashboard_externo.api_key');
        $apiKeyRecibida = $request->header('X-API-Key');

        if (empty($apiKeyConfigurada) || empty($apiKeyRecibida) || !hash_equals($apiKeyConfigurada, $apiKeyRecibida)) {
            return response()->json(['success' => false, 'message' => 'No autorizado.',], 401);
        }

        return $next($request);
    }
}