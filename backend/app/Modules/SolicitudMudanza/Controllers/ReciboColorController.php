<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SolicitudMudanza\Requests\UpdateReciboColoresRequest;
use App\Modules\SolicitudMudanza\Services\ReciboColorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReciboColorController extends Controller
{
    public function __construct(private ReciboColorService $service) {}

    /**
     * Obtener colores actuales.
     */
    public function show(Request $request): JsonResponse
    {
        $empresa = auth('empresa')->user();

        return response()->json([
            'colores' => $this->service->obtener($empresa),
            'predeterminados' => $this->service->obtenerPredeterminados(),
        ]);
    }

    public function update(UpdateReciboColoresRequest $request): JsonResponse
    {
        $empresa = auth('empresa')->user();
        $colores = $this->service->guardar($empresa, $request->validated());

        return response()->json([
            'message' => 'Los colores del recibo se actualizaron correctamente.',
            'colores' => $colores,
        ]);
    }

    public function reset(): JsonResponse
    {
        $empresa = auth('empresa')->user();
        $colores = $this->service->restablecer($empresa);

        return response()->json([
            'message' => 'Se restablecieron los colores originales de Mudanza Fácil.',
            'colores' => $colores,
        ]);
    }
}