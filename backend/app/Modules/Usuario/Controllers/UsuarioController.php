<?php

namespace App\Modules\Usuario\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Usuario\Requests\UsuarioUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsuarioController extends Controller
{
    /**
     * Retorna el usuario autenticado (y valida que sea un Usuario)
     */
    public function me()
    {
        $user = Auth::user();

        if (! $user instanceof Usuario) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        $user->load('empresa');
        $empresa = $user->empresa;

        return response()->json([
            'usuario' => [
                'id'        => $user->id,
                'nombre'    => $user->nombre,
                'email'     => $user->email,
                'telefono'  => $user->telefono,
                'avatar'    => $user->avatar,
                'rol'       => $user->rol,
                'activo'    => $user->activoEmpresa,
                'created_at' => $user->created_at,
            ],
            'empresa' => $empresa ? [
                'nombre'       => $empresa->empresa,
                'descripcion'  => $empresa->descripcion,
                'base'         => $empresa->base,
                'reputacion'   => $empresa->reputacion,
                'acuerdos'     => $empresa->numServicios,
                'logo'         => $empresa->logo_url,
            ] : null
        ]);
    }

    /**
     * Actualizar perfil
     */
    public function update(UsuarioUpdateRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $path;
        }

        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'usuario' => $user
        ]);
    }

    /**
     * Eliminar usuario (real)
     */
    public function destroy()
    {
        $user = Auth::user();
        if (! $user instanceof Usuario) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        // borrar tokens
        $user->tokens()->delete();
        // borrar user
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    /**
     * Listar usuarios de la misma empresa
     */
    public function listByEmpresa()
    {
        $user = Auth::user();
        if (!$user instanceof Usuario) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        // Obtener usuarios de la misma empresa
        $usuarios = Usuario::where('empresa_id', $user->empresa_id)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'usuarios' => $usuarios
        ]);
    }
}