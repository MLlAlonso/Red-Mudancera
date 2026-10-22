<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Requests\GuardarMensajeWhatsappRequest;
use App\Modules\Empresa\Services\EmpresaMensajeWhatsappService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EmpresaMensajeWhatsappController extends Controller
{
    public function __construct(private readonly EmpresaMensajeWhatsappService $service) {}

    public function index(Request $request)
    {
        $tipo = $request->query('tipo_contacto');

        if ($tipo !== null && !in_array($tipo, ['empresa_empresa', 'empresa_cliente'], true)) {
            throw ValidationException::withMessages(['tipo_contacto' => ['El tipo de contacto no es válido.'],]);
        }

        return response()->json([
            'data' => $this->service->listar($request->user(), $tipo),
        ]);
    }

    public function store(GuardarMensajeWhatsappRequest $request)
    {
        $mensaje = $this->service->crear($request->user(), $request->validated());

        return response()->json([
            'message' => 'Plantilla creada correctamente.',
            'data' => $mensaje,
        ], 201);
    }

    public function update(GuardarMensajeWhatsappRequest $request, int $id)
    {
        $mensaje = $this->service->actualizar($request->user(), $id,  $request->validated());

        return response()->json([
            'message' => 'Plantilla actualizada correctamente.',
            'data' => $mensaje,
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $this->service->eliminar($request->user(), $id);
        return response()->json([ 'message' => 'Plantilla eliminada correctamente.', ]);
    }
}