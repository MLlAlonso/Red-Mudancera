<?php

namespace App\Modules\Usuario\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Usuario\Requests\UsuarioUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Retorna el usuario autenticado (y valida que sea un Usuario)
     */
    public function me()
    {
        $user = auth()->user();

        if (! $user instanceof Usuario) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        return response()->json([
            'usuario' => $user
        ]);
    }

    /**
     * Actualizar perfil
     */
    public function update(UsuarioUpdateRequest $request)
    {
        $user = auth()->user();

        if (! $user instanceof Usuario) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        if ($request->filled('password')) {
            $request->merge(['password' => Hash::make($request->password)]);
        }

        $user->update($request->validated());

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
        $user = auth()->user();

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