<?php

namespace App\Modules\Empresa\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modules\Empresa\Services\EmpresaConfiguracionDocumentosService;

class EmpresaConfiguracionDocumentosController extends Controller
{
    protected EmpresaConfiguracionDocumentosService $configuracionService;

    public function __construct(EmpresaConfiguracionDocumentosService $configuracionService)
    {
        $this->configuracionService = $configuracionService;
    }

    public function show(Request $request)
    {
        $empresa = $request->user();
        $configuracion = $this->configuracionService->obtener($empresa);

        return response()->json([
            'success' => true,
            'empresa' => [
                'empresa' => $empresa->empresa,
                'nombre_comercial' => $configuracion['nombre_comercial'],
                'logo_url' => $empresa->logo_url,
            ],
            'configuracion' => $configuracion,
        ]);
    }

    public function update(Request $request)
    {
        $empresa = $request->user();

        $datos = $request->validate([
            'nombre_comercial' => ['required', 'string', 'max:150',],
            'clausulas' => ['required', 'array',],
            'clausulas.politica_seguro' => ['nullable', 'string', 'max:5000',],
            'clausulas.incluye_servicio' => ['nullable', 'string', 'max:5000',],
            'clausulas.condiciones_pago_cancelacion' => ['nullable', 'string', 'max:5000',],
            'seguro_porcentaje' => ['required', 'numeric', 'min:0', 'max:100',],
            'pie_pagina' => ['nullable', 'string', 'max:2000',],
        ]);

        $configuracion = $this->configuracionService->actualizar($empresa, $datos);

        return response()->json([
            'success' => true,
            'message' => 'La configuración de documentos se actualizó correctamente.',
            'configuracion' => $configuracion,
        ]);
    }
}