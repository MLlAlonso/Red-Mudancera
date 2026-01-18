<?php

namespace App\Modules\Resena\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Resena\Models\Resena;
use App\Modules\Resena\Models\ResenaLink;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Modules\Resena\Mail\NuevaResenaMail;

class ResenaController extends Controller
{
    public function generarLink(Request $request)
    {
        $empresaDestino = $request->user();

        $link = ResenaLink::create([
            'empresa_origen_id' => null, // aún no sabemos quién reseña
            'empresa_destino_id' => $empresaDestino->id,
            'token' => Str::uuid(),
        ]);

        return response()->json([
            'url' => env('FRONTEND_URL') . 'app.mudanzafacil.com.mx/resena/' . $link->token
        ]);
    }

    public function validarLink($token)
    {
        $link = ResenaLink::where('token', $token)->first();

        if (!$link || $link->usado) {
            return response()->json([
                'message' => 'El enlace de reseña no es válido o ya fue usado'
            ], 404);
        }

        $empresa = Empresa::find($link->empresa_destino_id);

        if (!$empresa) {
            return response()->json([
                'message' => 'La empresa asociada a este enlace no existe'
            ], 404);
        }

        return response()->json([
            'empresa' => [
                'id' => $empresa->id,
                'empresa' => $empresa->empresa
            ]
        ]);
    }

    public function store(Request $request, $token)
    {
        $request->validate([
            'comentario' => 'required|string|min:10|max:1000',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        // Empresa que está autenticada y escribe la reseña
        $empresaOrigen = $request->user();

        // Buscar el link
        $link = ResenaLink::where('token', $token)->first();

        if (!$link || $link->usado) {
            return response()->json([
                'message' => 'El enlace de reseña no es válido o ya fue usado'
            ], 404);
        }

        // Evitar que una empresa se reseñe a sí misma
        if ($empresaOrigen->id === $link->empresa_destino_id) {
            return response()->json([
                'message' => 'No puedes reseñar a tu propia empresa'
            ], 403);
        }

        // Validar que no exista ya una reseña hoy entre las mismas empresas
        $yaHoy = Resena::where('empresa_origen_id', $empresaOrigen->id)
            ->where('empresa_destino_id', $link->empresa_destino_id)
            ->whereDate('fecha_resena', now())
            ->exists();

        if ($yaHoy) {
            return response()->json([
                'message' => 'Solo puedes dejar una reseña por día a esta empresa'
            ], 422);
        }

        // Crear la reseña
        Resena::create([
            'empresa_origen_id' => $empresaOrigen->id,
            'empresa_destino_id' => $link->empresa_destino_id,
            'comentario' => $request->comentario,
            'rating' => $request->rating,
            'fecha_resena' => now(),
        ]);

        // Marcar el link como usado y guardar quién reseñó
        $link->update([
            'empresa_origen_id' => $empresaOrigen->id,
            'usado' => true,
        ]);

        // Recalcular reputación de la empresa destino
        $this->recalcularReputacion($link->empresa_destino_id);

        // Enviar email a la empresa que recibió la reseña
        $empresaDestino = Empresa::find($link->empresa_destino_id);

        if ($empresaDestino) {
            Mail::to($empresaDestino->email)->send(
                new NuevaResenaMail(
                    $empresaOrigen->empresa,
                    $request->comentario,
                    $request->rating,
                    null
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Reseña enviada correctamente'
        ]);
    }

    private function recalcularReputacion($empresaId)
    {
        $avg = Resena::where('empresa_destino_id', $empresaId)->avg('rating');
        $count = Resena::where('empresa_destino_id', $empresaId)->count();

        Empresa::where('id', $empresaId)->update([
            'reputacion' => round($avg, 2),
            'numServicios' => $count
        ]);
    }

    public function listar($empresaId, Request $request)
    {
        $limit = $request->query('limit');

        $query = Resena::where('empresa_destino_id', $empresaId)
            ->orderBy('created_at', 'DESC');

        if ($limit) {
            $query->limit((int)$limit);
        }

        $resenas = $query->get()->map(function ($resena) {
            return [
                'id' => $resena->id,
                'empresa' => optional(
                    Empresa::find($resena->empresa_origen_id)
                )->empresa ?? 'Cliente',
                'fecha' => $resena->created_at->format('d/m/Y'),
                'rating' => $resena->rating,
                'comentario' => $resena->comentario,
            ];
        });


        return response()->json($resenas);
    }
}
