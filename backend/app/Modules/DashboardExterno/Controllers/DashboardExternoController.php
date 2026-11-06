<?php

namespace App\Modules\DashboardExterno\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\DashboardExterno\Services\DashboardExternoService;
use Illuminate\Http\JsonResponse;

class DashboardExternoController extends Controller
{
    public function __construct(protected DashboardExternoService $dashboardService) {}

    /**
     * Dashboard de consulta externa.
     */
    public function index(): JsonResponse
    {
        return response()->json($this->dashboardService->obtenerDashboard());
    }
}