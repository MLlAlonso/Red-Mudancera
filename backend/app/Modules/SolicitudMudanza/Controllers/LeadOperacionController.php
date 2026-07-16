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
        $lead = LeadCompra::where('empresa_id', $empresa->id)->where('solicitud_id', $id)->firstOrFail();

        $validated = $request->validate([
            'estado' => 'required|in:activo,asignado,en_proceso,sin_respuesta,perdido,finalizado',
            'ganancia' => 'required_if:estado,finalizado|numeric|min:0'
        ]);

        $data = ['estado_operacion' => $validated['estado']];

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
        $lead = LeadCompra::where('empresa_id', $empresa->id)->where('solicitud_id', $id)->firstOrFail();

        if (!$lead) {
            return response()->json([
                "message" => "Contacto no encontrado."
            ], 404);
        }

        $lead->update([
            'estado_operacion' => 'perdido',
            'ganancia' => 0,
            'oculto' => true,
            'finalizado_at' => now(),
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
    public function ponerEnVenta($id)
    {
        $empresa = auth('empresa')->user();
        $lead = LeadCompra::where('empresa_id',  $empresa->id)->where('solicitud_id',  $id)->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | SOLO PENDIENTE O SIN RESPUESTA
        |--------------------------------------------------------------------------
        */
        if (!in_array($lead->estado_operacion, ['activo', 'sin_respuesta'])) {
            return response()->json([
                'message' => 'Solo puedes poner a la venta contactos pendientes o sin respuesta.'
            ], 422);
        }
        $solicitud = $lead->solicitud;

        /*
        |--------------------------------------------------------------------------
        | SOLO LEADS PRIVADOS
        |--------------------------------------------------------------------------
        */
        if (!$solicitud->es_privado) {
            return response()->json([
                "message" =>
                "Solo los contactos obtenidos mediante tu formulario privado pueden volver a publicarse."
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | LIBERAR CONTACTO
        |--------------------------------------------------------------------------
        */
        if (!$lead->exists) {
            return response()->json([
                "message" => "Contacto no encontrado."
            ], 404);
        }
        $lead->delete();

        /*
        |--------------------------------------------------------------------------
        | REINICIAR CONTADOR
        |--------------------------------------------------------------------------
        */
        $solicitud->update([
            "compras_count" => 0,
            "es_privado" => false,
            "empresa_privada_id" => null,
            "puesto_venta_at" => now(),
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}