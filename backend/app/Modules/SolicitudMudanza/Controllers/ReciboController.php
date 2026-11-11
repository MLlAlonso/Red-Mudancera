<?php

namespace App\Modules\SolicitudMudanza\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\SolicitudMudanza\Services\ReciboService;
use App\Modules\SolicitudMudanza\Services\ReciboPdfService;
use App\Modules\SolicitudMudanza\Services\FirmaReciboService;
use App\Modules\SolicitudMudanza\Requests\StoreReciboRequest;
use App\Modules\SolicitudMudanza\Requests\UpdateFirmaReciboRequest;
use App\Modules\Empresa\Models\Empresa;

class ReciboController extends Controller
{
    public function __construct(
        private ReciboService $service,
        private ReciboPdfService $pdfService,
        private FirmaReciboService $firmaService
    ) {}

    public function datos($solicitudId)
    {
        return response()->json($this->service->obtenerDatos(auth('empresa')->user(), $solicitudId));
    }

    public function store(StoreReciboRequest $request, $solicitudId)
    {
        $recibo = $this->service->crear(auth('empresa')->user(), $solicitudId, $request->validated());
        return response()->json(['message' => 'Recibo generado correctamente.',  'data' => $recibo,], 201);
    }

    public function index($solicitudId)
    {
        return response()->json(['data' => $this->service->listar(auth('empresa')->user(), $solicitudId),]);
    }

    public function download($id)
    {
        $recibo = $this->service->obtenerPorEmpresa(auth('empresa')->user(), $id);
        return response()->download($this->pdfService->obtenerRuta($recibo), $recibo->folio . '.pdf', ['Content-Type' => 'application/pdf']);
    }

    public function firma(UpdateFirmaReciboRequest $request)
    {
        $path = $this->firmaService->guardarFirma(auth('empresa')->user(), $request->validated()['firma']);
        return response()->json(['message' => 'Firma actualizada correctamente.', 'path' => $path,]);
    }

    public function eliminarFirma()
    {
        $this->firmaService->eliminarFirma(auth('empresa')->user());
        return response()->json(['message' => 'Firma eliminada correctamente.',]);
    }
}