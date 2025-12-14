<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use App\Modules\Usuario\Models\Usuario;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Obtener perfil de la empresa autenticada
     */
    public function me(Request $request)
    {
        $empresa = $request->user();

        if (! $empresa) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Asegurar logo_url siempre
        $empresa->append('logo_url');
        return response()->json($empresa);
    }

    /**
     * Actualizar datos de la empresa
     */
    public function update(EmpresaUpdateRequest $request)
    {
        $empresa = $request->user();
        $data = $request->validated();

        // Subir logo (PUBLICO)
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $data['logo'] = $path;
        }

        $empresa->update($data);

        // Forzar atributo calculado
        $empresa->append('logo_url');

        return response()->json([
            'message' => 'Empresa actualizada correctamente',
            'empresa' => $empresa
        ]);
    }

    /**
     * Eliminar empresa
     */
    public function destroy(Request $request)
    {
        $empresa = $request->user();
        $empresa->tokens()->delete();
        $empresa->delete();

        return response()->json([
            'message' => 'La empresa ha sido eliminada permanentemente.'
        ]);
    }

    /**
     * Listar usuarios de la empresa
     */
    public function usuariosEmpresa(Request $request)
    {
        $empresa = $request->user();

        $usuarios = Usuario::where('empresa_id', $empresa->id)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json(['usuarios' => $usuarios]);
    }

    /**
     * Eliminar usuario de la empresa
     */
    public function eliminarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = Usuario::where('id', $id)
            ->where('empresa_id', $empresa->id)
            ->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->tokens()->delete();
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    /**
     * Pausar usuario
     */
    public function pausarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = Usuario::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->activoEmpresa = false;
        $usuario->save();

        return response()->json(['message' => 'Usuario pausado correctamente']);
    }

    /**
     * Reanudar usuario
     */
    public function reanudarUsuario($id, Request $request)
    {
        $empresa = $request->user();

        $usuario = Usuario::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->activoEmpresa = true;
        $usuario->save();

        return response()->json(['message' => 'Usuario reanudado correctamente']);
    }
}