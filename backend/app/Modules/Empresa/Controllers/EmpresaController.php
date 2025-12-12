<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use App\Modules\Usuario\Models\Usuario;
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

    public function usuariosEmpresa(Request $request)
    {
        $empresa = $request->user(); // token de empresa

        $usuarios = Usuario::where('empresa_id', $empresa->id)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json(['usuarios' => $usuarios]);
    }

    public function eliminarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = \App\Modules\Usuario\Models\Usuario::where('id', $id)
            ->where('empresa_id', $empresa->id)
            ->first();

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->tokens()->delete();
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function pausarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = \App\Modules\Usuario\Models\Usuario::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Pausar usuario
        $usuario->activoEmpresa = false;
        $usuario->save();

        return response()->json(['message' => 'Usuario pausado correctamente']);
    }

    public function reanudarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = \App\Modules\Usuario\Models\Usuario::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Reanudar usuario
        $usuario->activoEmpresa = true;
        $usuario->save();

        return response()->json(['message' => 'Usuario reanudado correctamente']);
    }
}
