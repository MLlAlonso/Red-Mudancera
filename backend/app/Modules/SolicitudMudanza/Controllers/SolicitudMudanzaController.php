<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Services\SolicitudMudanzaService;
use App\Modules\SolicitudMudanza\Requests\StoreSolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\VerifySolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Requests\ReenviarCodigoSolicitudRequest;
use Illuminate\Http\JsonResponse;

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
            ->latest()
            ->paginate(10);
        return response()->json($solicitudes);
    }
}