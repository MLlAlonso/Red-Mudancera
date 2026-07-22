<?php

namespace App\Modules\Tutorial\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Tutorial\Models\Tutorial;
use App\Modules\Tutorial\Services\TutorialService;

class TutorialController extends Controller
{
    protected TutorialService $service;

    public function __construct(TutorialService $service)
    {
        $this->service = $service;
    }

    /**
     * Obtener tutoriales
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => $this->service->getTutoriales($request->user())
        ]);
    }

    /**
     * Marcar tutorial visto
     */
    public function marcarComoVisto(Request $request, Tutorial $tutorial): \Illuminate\Http\JsonResponse
    {

        $this->service->marcarComoVisto($request->user(), $tutorial);
        return response()->json([
            'message' => 'Tutorial marcado como visto.'
        ]);
    }
}