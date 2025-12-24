<?php

namespace App\Modules\Servicio\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Requests\StoreServicioRequest;
use App\Modules\Servicio\Requests\ChangeEstadoServicioRequest;
use App\Modules\Servicio\Services\ServicioService;
use App\Modules\Servicio\Repositories\ServicioRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    protected ServicioService $servicioService;
    protected ServicioRepository $servicioRepository;

    public function __construct(
        ServicioService $servicioService,
        ServicioRepository $servicioRepository
    ) {
        $this->servicioService = $servicioService;
        $this->servicioRepository = $servicioRepository;
    }

    /**
     * GET /api/servicios
     */
    public function index(Request $request): JsonResponse
    {
        $servicios = $this->servicioRepository->search($request->all());
        return response()->json([
            'data' => $servicios->items(),
            'meta' => [
                'current_page' => $servicios->currentPage(),
                'last_page' => $servicios->lastPage(),
                'per_page' => $servicios->perPage(),
                'total' => $servicios->total(),
            ]
        ]);
    }

    /**
     * GET /api/servicios/{id}
     */
    public function show($id)
    {
        $servicio = Servicio::with('empresa')->find($id);

        if (! $servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado'
            ], 404);
        }

        return response()->json($servicio);
    }


    /**
     * POST /api/servicios
     */
    public function store(StoreServicioRequest $request): JsonResponse
    {
        $empresa = auth()->user();
        $servicio = $this->servicioService->create(
            $request->validated(),
            $empresa
        );

        return response()->json([
            'message' => 'Servicio creado correctamente.',
            'data' => $servicio
        ], 201);
    }

    /**
     * PATCH /api/servicios/{id}/estado
     */
    public function changeEstado(
        ChangeEstadoServicioRequest $request,
        int $id
    ): JsonResponse {
        $servicio = $this->servicioRepository->findById($id);

        if (!$servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado.'
            ], 404);
        }

        $servicio = $this->servicioService->changeEstado(
            $servicio,
            $request->estado
        );

        return response()->json([
            'message' => 'Estado del servicio actualizado.',
            'data' => $servicio
        ]);
    }

    /**
     * DELETE /api/servicios/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $servicio = $this->servicioRepository->findById($id);
        if (!$servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado.'
            ], 404);
        }

        $servicio->delete();
        return response()->json([
            'message' => 'Servicio eliminado correctamente.'
        ]);
    }

    public function update(StoreServicioRequest $request, int $id): JsonResponse
    {
        $empresa = auth()->user();
        $servicio = $this->servicioRepository->findById($id);

        if (!$servicio) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        if ($servicio->empresa_id !== $empresa->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $servicio->update($request->validated());

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $servicio->fresh()
        ]);
    }
}
