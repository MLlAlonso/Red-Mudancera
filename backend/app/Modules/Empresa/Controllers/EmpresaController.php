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
        $empresa = $request->user();

        // 🔥 SIEMPRE agregar logo_url
        $empresa->append('logo_url');

        return response()->json($empresa);
    }

    public function update(EmpresaUpdateRequest $request)
    {
        $empresa = $request->user();
        $data = $request->validated();

        // Imagen del logo
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $data['logo'] = $path;
        }

        $empresa->update($data);

        // 🔥 logo_url SIEMPRE incluido en la respuesta
        $empresa->append('logo_url');

        return response()->json([
            'message' => 'Empresa actualizada correctamente',
            'empresa' => $empresa
        ]);
    }

    public function destroy(Request $request)
    {
        $empresa = $request->user();

        $empresa->tokens()->delete();
        $empresa->delete();

        return response()->json([
            'message' => 'La empresa ha sido eliminada permanentemente.'
        ]);
    }
}
