<?php

namespace App\Modules\Servicio\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Services\MatchingService;

class RadarController extends Controller
{
    public function match(Request $request)
    {
        $servicioId = $request->input('servicio_id');
        if (!$servicioId) {
            return response()->json([
                'message' => 'servicio_id es requerido'
            ], 400);
        }

        $servicio = Servicio::find($servicioId);
        if (!$servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado'
            ], 404);
        }

        $matchingService = new MatchingService();
        $matches = $matchingService->matchForServicio($servicio);
        return response()->json([
            'servicio' => $servicio->id,
            'matches_servicios_count' => count($matches['servicios']),
            'matches_solicitudes_count' => count($matches['solicitudes']),
            'matches' => $matches
        ]);
    }

    // Enviar correo
    public function resumenMatches()
    {
        $empresa = auth('empresa')->user();
        $serviciosIds = \App\Modules\Servicio\Models\Servicio::where('empresa_id', $empresa->id)
            ->pluck('id');
        $matches = \App\Modules\Servicio\Models\RadarMatch::whereIn('servicio_id', $serviciosIds)
            ->where('notified', false)
            ->get();

        $grouped = $matches->groupBy('servicio_id');
        $response = [];
        foreach ($grouped as $servicioId => $items) {
            $response[] = [
                'servicio_id' => $servicioId,
                'count' => $items->count()
            ];
        }

        return response()->json([
            'total' => $matches->count(),
            'por_servicio' => $response
        ]);
    }
}