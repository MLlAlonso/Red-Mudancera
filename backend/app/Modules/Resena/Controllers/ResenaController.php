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
            'url' => 'https://app.mudanzafacil.com.mx/resena/'
                . $empresaDestino->slug
                . '/'
                . $link->token
        ]);
    }

    public function validarLink($token)
    {
        $link = ResenaLink::where('token', $token)->first();

        if (!$link) {
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
        $link = ResenaLink::where('token', $token)->first();

        if (!$link) {
            return response()->json(['message' => 'Link inválido'], 404);
        }

        $empresaDestino = Empresa::find($link->empresa_destino_id);
        if (!$empresaDestino) {
            return response()->json(['message' => 'Empresa no encontrada'], 404);
        }
        $autor = $request->user();

        /*
    =================================
    CASO 1 — EMPRESA LOGUEADA
    =================================
    */

        if ($autor) {
            $request->validate([
                'comentario' => 'required|string|min:10|max:1000',
                'rating' => 'required|numeric|min:1|max:5',
            ]);

            $empresaOrigenId = $autor instanceof Empresa
                ? $autor->id
                : $autor->empresa_id;

            $resena = Resena::create([
                'empresa_origen_id' => $empresaOrigenId,
                'empresa_destino_id' => $empresaDestino->id,
                'comentario' => $request->comentario,
                'rating' => $request->rating,
                'fecha_resena' => now(),
            ]);
        }

        /*
    =================================
    CASO 2 — CLIENTE EXTERNO
    =================================
    */ else {
            $request->validate([
                'nombre' => 'required|string|min:3|max:150',
                'correo' => 'required|email|max:150',
                'comentario' => 'required|string|min:10|max:1000',
                'rating' => 'required|numeric|min:1|max:5',
            ]);

            /* ANTI SPAM 72h */
            $exists = Resena::where('correo_cliente', $request->correo)
                ->where('created_at', '>', now()->subHours(72))
                ->exists();
            if ($exists) {
                return response()->json([
                    'message' => 'Ya enviaste una reseña recientemente. Intenta en 72 horas.'
                ], 429);
            }

            $resena = Resena::create([
                'empresa_origen_id' => null,
                'empresa_destino_id' => $empresaDestino->id,
                'nombre_cliente' => $request->nombre,
                'correo_cliente' => $request->correo,
                'comentario' => $request->comentario,
                'rating' => $request->rating,
                'fecha_resena' => now(),
            ]);
        }

        /*
    =================================
    RECALCULAR REPUTACIÓN
    =================================
    */
        $this->recalcularReputacion($empresaDestino->id);
        /*
    =================================
    ENVIAR CORREO
    =================================
    */
        $autorNombre = $resena->nombre_cliente
            ?? optional(Empresa::find($resena->empresa_origen_id))->empresa
            ?? 'Cliente';
        $esCliente = $resena->empresa_origen_id === null;

        $linkRespuesta = null;
        if ($autor) {
            $respuesta = ResenaLink::create([
                'empresa_origen_id' => $empresaDestino->id,
                'empresa_destino_id' => $resena->empresa_origen_id,
                'resena_id' => $resena->id,
                'token' => Str::uuid(),
                'tipo' => 'response',
            ]);
            $empresaOrigen = Empresa::find($resena->empresa_origen_id);

            $linkRespuesta =
                'https://app.mudanzafacil.com.mx/resena/'
                . $empresaOrigen->slug
                . '/'
                . $respuesta->token;
        }

        Mail::to($empresaDestino->email)->send(
            new NuevaResenaMail(
                $autorNombre,
                $resena->comentario,
                $resena->rating,
                $linkRespuesta,
                $esCliente
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
