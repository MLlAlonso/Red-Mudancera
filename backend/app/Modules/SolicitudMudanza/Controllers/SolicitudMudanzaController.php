<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Services\SolicitudMudanzaService;
use App\Modules\SolicitudMudanza\Requests\StoreSolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\VerifySolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\ReenviarCodigoSolicitudRequest;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Modules\SolicitudMudanza\Models\LeadCompra;

use Illuminate\Http\Request;
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
            'message' => 'Código de verificación enviado.',
            'data' => [
                'id' => $solicitud->id,
                'telefono' => $solicitud->telefono,
            ]
        ], 201);
    }

    public function verificar(VerifySolicitudMudanzaRequest $request): JsonResponse
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
    }

    public function index(): JsonResponse
    {
        $solicitudes = SolicitudMudanza::where('estado', 'activo')
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
            ->findOrFail($id);

        return response()->json($solicitud);
    }

    public function comprar(Request $request, $id): JsonResponse
    {
        $empresa = Auth::guard('empresa')->user();

        if (!$empresa) {
            return response()->json(['message' => 'No autenticado'], 401);
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

        $esPrimeraVenta = $totalVentas === 0;
        $tokensNecesarios = $request->boolean('exclusivo') ? 2 : 1;

        if ($empresa->tokens < $tokensNecesarios) {
            return response()->json([
                'message' => 'Tokens insuficientes'
            ], 422);
        }

        DB::transaction(function () use ($empresa, $id, $tokensNecesarios, $request, $solicitud) {

            LeadCompra::create([
                'solicitud_id' => $id,
                'empresa_id' => $empresa->id,
                'exclusivo' => $request->boolean('exclusivo'),
                'tokens_pagados' => $tokensNecesarios,
            ]);

            $empresa->decrement('tokens', $tokensNecesarios);
            $solicitud->increment('compras_count');
        });

        return response()->json([
            'message' => 'Lead adquirido correctamente'
        ]);
    }
}