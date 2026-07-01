<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\SolicitudMudanza\Models\LeadCompra;

class LeadOperacionController extends Controller
{
    public function changeEstado(Request $request, $id)
    {
        $empresa = auth('empresa')->user();
        $lead = LeadCompra::where('empresa_id', $empresa->id) ->where('solicitud_id', $id) ->firstOrFail();

        $validated = $request->validate([
            'estado' => 'required|in:activo,asignado,en_proceso,perdido,finalizado',
            'ganancia' => 'required_if:estado,finalizado|numeric|min:0'
        ]);

        $data = [
            'estado_operacion' => $validated['estado']
        ];

        if ($validated['estado'] === 'finalizado') {
            $data['ganancia'] = round($validated['ganancia'], 2);
            $data['finalizado_at'] = now();
        }

        $lead->update($data);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $lead->solicitud_id,
                'estado_operacion' => $lead->estado_operacion,
                'ganancia' => $lead->ganancia,
                'finalizado_at' => $lead->finalizado_at
            ]
        ]);
    }

    public function ocultar($id)
    {
        $empresa = auth('empresa')->user();

        $lead = LeadCompra::where('empresa_id', $empresa->id)
            ->where('solicitud_id', $id)
            ->firstOrFail();

        $lead->update([ 'oculto' => true ]);

        return response()->json([
            'success' => true
        ]);
    }
}