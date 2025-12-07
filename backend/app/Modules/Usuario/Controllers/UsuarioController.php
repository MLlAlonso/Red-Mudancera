<?php

namespace App\Modules\Usuario\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Usuario\Requests\UsuarioUpdateRequest;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * USUARIO AUTENTICADO
     */
    public function me()
    {
        return response()->json([
            'usuario' => auth()->user()
        ]);
    }

    /**
     * ACTUALIZAR PERFIL
     */
    public function update(UsuarioUpdateRequest $request)
    {
        $usuario = auth()->user();

        if ($request->filled('password')) {
            $request->merge([
                'password' => Hash::make($request->password)
            ]);
        }

        $usuario->update($request->validated());

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'usuario' => $usuario
        ]);
    }
}