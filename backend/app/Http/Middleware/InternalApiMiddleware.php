<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class InternalApiMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $internalToken = $request->header('X-INTERNAL-TOKEN');
        if (!$internalToken || $internalToken !== config('app.internal_api_token')) {
            return response()->json([
                'message' => 'Unauthorized (internal)'
            ], 401);
        }
        return $next($request);
    }
}