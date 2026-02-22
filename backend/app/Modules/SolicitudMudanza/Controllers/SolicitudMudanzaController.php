<?php

namespace App\Modules\SolicitudMudanza\Controllers;
use App\Http\Controllers\Controller;
use App\Modules\SolicitudMudanza\Requests\StoreSolicitudMudanzaRequest;
use App\Modules\SolicitudMudanza\Services\SolicitudMudanzaService;
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
}