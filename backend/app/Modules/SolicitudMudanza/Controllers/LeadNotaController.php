<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\SolicitudMudanza\Services\LeadNotaService;

class LeadNotaController extends Controller
{
    public function __construct(protected LeadNotaService $service) {}

    public function show(Request $request, $id)
    {
        $lead = $this->service->obtener($request->user(), $id);

        return response()->json([
            'contenido' => $lead->nota ?? ''
        ]);
    }

    public function store(Request $request, $id)
    {
        $request->validate([
            'contenido' => 'nullable|string'
        ]);

        $lead = $this->service->guardar(
            $request->user(),
            $id,
            $request->contenido ?? ''
        );

        return response()->json([
            'success' => true,
            'data' => $lead
        ]);
    }
}