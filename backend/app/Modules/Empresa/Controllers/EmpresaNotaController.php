<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Empresa\Services\EmpresaNotaService;

class EmpresaNotaController extends Controller
{
    protected EmpresaNotaService $service;

    public function __construct(EmpresaNotaService $service)
    {
        $this->service = $service;
    }

    /**
     * Obtener nota.
     */
    public function show(Request $request)
    {
        $empresa = $request->user();
        $nota = $this->service->getNota($empresa);

        return response()->json([
            'empresa_id' => $empresa->id,
            'nota_empresa_id' => $nota->empresa_id,
            'contenido' => $nota->contenido,
            'nota' => $nota,
        ]);
    }

    /**
     * Guardar nota.
     */
    public function store(Request $request)
    {
        $request->validate(['contenido' => 'nullable|string']);
        $empresa = $request->user();
        $nota = $this->service->guardarNota($empresa, $request->contenido ?? '');

        return response()->json([
            'success' => true,
            'message' => 'Nota guardada correctamente.',
            'data' => $nota
        ]);
    }
}
