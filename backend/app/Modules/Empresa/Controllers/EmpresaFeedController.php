<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Services\EmpresaFeedService;
use Illuminate\Http\JsonResponse;

class EmpresaFeedController extends Controller
{
    protected EmpresaFeedService $service;

    public function __construct(EmpresaFeedService $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $empresa = auth()->user();
        $feed = $this->service->getFeed($empresa->id);
        return response()->json([
            'data' => $feed
        ]);
    }
}
