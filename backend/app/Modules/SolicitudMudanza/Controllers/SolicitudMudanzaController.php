<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Services\SolicitudMudanzaService;
use App\Modules\SolicitudMudanza\Requests\StoreSolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\VerifySolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\ReenviarCodigoSolicitudRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Mail\LeadCompradoMail;
use Laravel\Sanctum\PersonalAccessToken;
use App\Modules\Empresa\Models\Empresa;

class SolicitudMudanzaController extends Controller
{
    protected SolicitudMudanzaService $service;
    public function __construct(SolicitudMudanzaService $service)
    {
        $this->service = $service;
    }

    /**
     * Crear nueva solicitud (Busco Mudanza)
     */
    public function store(StoreSolicitudMudanzaRequest $request): JsonResponse
    {
        $solicitud = $this->service->crear($request->validated());
        return response()->json([
            'message' => 'Solicitud publicada correctamente.',
            'data' => [
                'id' => $solicitud->id,
                'telefono' => $solicitud->telefono,
            ]
        ], 201);
    }

/*     public function verificar(VerifySolicitudMudanzaRequest $request): JsonResponse
    {
        $solicitud = $this->service->verificar(
            $request->id,
            $request->codigo
        );

        return response()->json([
            'message' => 'Solicitud publicada correctamente. Algún agente se pondrá en contacto con usted.',
            'data' => [
                'id' => $solicitud->id,
                'estado' => $solicitud->estado
            ]
        ]);
    }

    public function reenviarCodigo(ReenviarCodigoSolicitudRequest $request): JsonResponse
    {
        $this->service->reenviarCodigo($request->id);
        return response()->json([
            'message' => 'Nuevo código enviado correctamente.'
        ]);
    } */

    public function index(): JsonResponse
    {
        $solicitudes = SolicitudMudanza::where('estado', 'activo')->where('reportada', false)
            ->whereDoesntHave('compras', function ($q) {
                $q->where('exclusivo', true);
            })
            ->whereDate('fecha_limite_visible', '>=', now())
            ->where('compras_count', '<', 3)
            ->latest()
            ->get();

        return response()->json($solicitudes);
    }

    public function show($id): JsonResponse
    {
        $solicitud = SolicitudMudanza::where('estado', 'activo')
            ->where('reportada', false)
            ->findOrFail($id);

        $empresa = Auth::guard('empresa')->user();
        $haComprado = false;
        $fueExclusivo = false;

        if ($empresa) {
            $compra = LeadCompra::where('empresa_id', $empresa->id)
                ->where('solicitud_id', $id)
                ->first();

            if ($compra) {
                $haComprado = true;
                $fueExclusivo = $compra->exclusivo;
            }
        }

        if (!$haComprado) {
            $solicitud->makeHidden([
                'telefono',
                'email',
                'nombre',
            ]);
        }

        return response()->json([
            'data' => $solicitud,
            'ha_comprado' => $haComprado,
            'fue_exclusivo' => $fueExclusivo
        ]);
    }

    public function comprar(Request $request, $id): JsonResponse
    {
        $empresa = Auth::guard('empresa')->user();

        if (!$empresa) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $plan = strtolower($empresa->plan ?? 'explorador');
        $esExclusivo = $request->boolean('exclusivo');

        // BLOQUEO: PLAN CONECTOR NO PUEDE EXCLUSIVO
        if ($plan === 'conector' && $esExclusivo) {
            return response()->json([
                'error' => 'PLAN_LIMIT_EXCLUSIVO',
                'message' => 'Tu plan actual no permite comprar contactos exclusivos. Activa Radar para acceder a esta ventaja.',
                'required_plan' => 'radar'
            ], 403);
        }

        $solicitud = SolicitudMudanza::findOrFail($id);

        // Ya lo compró esta empresa?
        $yaComprado = LeadCompra::where('empresa_id', $empresa->id)
            ->where('solicitud_id', $id)
            ->exists();

        if ($yaComprado) {
            return response()->json(['message' => 'Ya adquiriste este lead'], 422);
        }

        // Cuántas veces se ha vendido
        $totalVentas = LeadCompra::where('solicitud_id', $id)->count();

        if ($solicitud->compras_count >= 3) {
            return response()->json(['message' => 'Lead agotado'], 422);
        }

        // Validación de exclusivo por negocio
        if ($esExclusivo && $totalVentas > 0) {
            return response()->json([
                'message' => 'Este lead ya fue adquirido. No puede comprarse como exclusivo.'
            ], 422);
        }

        // PRECIOS
        $tipo = $solicitud->tipo_servicio;

        $tokensNecesarios = match (true) {
            $tipo === 'local' && !$esExclusivo => 6,
            $tipo === 'local' && $esExclusivo => 30,
            $tipo === 'foranea' && !$esExclusivo => 15,
            $tipo === 'foranea' && $esExclusivo => 35,
            default => 15
        };

        if ($empresa->tokens < $tokensNecesarios) {
            return response()->json([
                'message' => 'Tokens insuficientes'
            ], 422);
        }

        DB::transaction(function () use ($empresa, $id, $tokensNecesarios, $esExclusivo, $solicitud) {
            LeadCompra::create([
                'solicitud_id' => $id,
                'empresa_id' => $empresa->id,
                'exclusivo' => $esExclusivo,
                'tokens_pagados' => $tokensNecesarios,
            ]);

            $empresa->decrement('tokens', $tokensNecesarios);
            $solicitud->increment('compras_count');

            app(\App\Modules\SolicitudMudanza\Services\ReferralService::class)
                ->procesarRecompensa($solicitud->fresh());
        });

        Mail::to($empresa->email)->send(
            new LeadCompradoMail(
                $solicitud,
                $empresa,
                $esExclusivo,
                $tokensNecesarios
            )
        );

        return response()->json([
            'message' => 'Lead adquirido correctamente'
        ]);
    }

    public function solicitarSeguro(Request $request): JsonResponse
    {
        $solicitud = SolicitudMudanza::findOrFail($request->id);

        Mail::to([
            'intermudanza@gmail.com',
            'atnclientes@segurosdecarga.com',
            'ventas12@segurosdecarga.com'
        ])->send(
            new \App\Modules\SolicitudMudanza\Mail\SolicitudSeguroMail($solicitud)
        );

        return response()->json([
            'message' => 'Solicitud de seguro enviada correctamente'
        ]);
    }

    public function solicitarSeguroExterno(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email',
            'telefono' => 'required|string|max:20',
            'origen' => 'required|string',
            'destino' => 'required|string',
            'inventario' => 'required|string|min:10',
        ]);

        $fakeSolicitud = (object) $data;

        Mail::to([
            'intermudanza@gmail.com',
            'atnclientes@segurosdecarga.com',
            'ventas12@segurosdecarga.com'
        ])->send(
            new \App\Modules\SolicitudMudanza\Mail\SolicitudSeguroMail($fakeSolicitud)
        );

        return response()->json([
            'message' => 'Solicitud enviada correctamente'
        ]);
    }

    public function cancelar($id)
    {
        $solicitud = SolicitudMudanza::findOrFail($id);

        if ($solicitud->estado === 'pendiente') {
            $solicitud->delete();
        }

        return response()->json(['message' => 'Solicitud cancelada']);
    }

    public function reportar(string $token)
    {
        $solicitud = SolicitudMudanza::where(
            'report_token',
            $token
        )->first();

        if (!$solicitud) {
            return response()->json([
                'message' => 'Solicitud no encontrada'
            ], 404);
        }

        $solicitud->update([
            'reportada' => true,
        ]);

        return response()->json([
            'message' => 'Solicitud reportada correctamente'
        ]);
    }
}
