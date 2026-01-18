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

        $empresaDestino = Empresa::find($link->empresa_destino_id);

        if (!$empresaDestino) {
            return response()->json([
                'message' => 'La empresa asociada a este enlace no existe'
            ], 404);
        }

        return response()->json([
            'empresa_destino' => [
                'id' => $empresaDestino->id,
                'empresa' => $empresaDestino->empresa
            ]
        ]);
    }


    public function store(Request $request, $token)
    {
        $request->validate([
            'comentario' => 'required|string|min:10|max:1000',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $autor = $request->user(); // Empresa o Usuario
        $link = ResenaLink::where('token', $token)->first();

        if (!$link || $link->usado) {
            return response()->json(['message' => 'Link inválido'], 404);
        }

        // Detectar empresa origen
        $empresaOrigenId = $autor instanceof Empresa
            ? $autor->id
            : $autor->empresa_id;

        if (!$empresaOrigenId) {
            return response()->json(['message' => 'Usuario sin empresa asociada'], 403);
        }

        // Crear reseña
        $resena = Resena::create([
            'empresa_origen_id' => $empresaOrigenId,
            'empresa_destino_id' => $link->empresa_destino_id,
            'comentario' => $request->comentario,
            'rating' => $request->rating,
            'fecha_resena' => now(),
        ]);

        $link->update([
            'usado' => true,
            'empresa_origen_id' => $empresaOrigenId,
        ]);

        $this->recalcularReputacion($link->empresa_destino_id);

        // Crear link de respuesta SOLO si quien reseñó fue empresa
        $linkRespuesta = null;

        if ($autor instanceof Empresa) {
            $respuesta = ResenaLink::create([
                'empresa_origen_id' => $link->empresa_destino_id,
                'empresa_destino_id' => $empresaOrigenId,
                'resena_id' => $resena->id,
                'token' => Str::uuid(),
                'tipo' => 'response',
            ]);

            $linkRespuesta = 'https://app.mudanzafacil.com.mx/resena/' . $token;
        }

        // Enviar correo
        $empresaDestino = Empresa::find($link->empresa_destino_id);

        Mail::to($empresaDestino->email)->send(
            new NuevaResenaMail(
                Empresa::find($empresaOrigenId)->empresa,
                $request->comentario,
                $request->rating,
                $linkRespuesta
            )
        );

        return response()->json(['success' => true]);
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
