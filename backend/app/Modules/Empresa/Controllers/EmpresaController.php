<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(EmpresaUpdateRequest $request)
    {
        $empresa = $request->user();

        $empresa->update($request->validated());

        return response()->json([
            'message' => 'Empresa actualizada exitosamente',
            'empresa' => $empresa
        ]);
    }
}