<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Empresa\Mail\EmpresaGoodbyeMail;
use App\Modules\Usuario\Mail\UsuarioGoodbyeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Services\CloudinaryService;

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

        /**
         * Logo (opcional)
         */
        if ($request->hasFile('logo')) {
            $cloudinary = new CloudinaryService();
            // borrar logo anterior si existe
            $cloudinary->deleteByUrl($empresa->logo);
            $upload = $cloudinary->upload(
                $request->file('logo'),
                'empresas/logos'
            );

            $data['logo'] = $upload['url'];
        }

        /**
         * Password (opcional) SOLO si viene en el request
         */
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $empresa->update($data);
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
        Mail::to($empresa->email)->send(
            new EmpresaGoodbyeMail($empresa)
        );
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

        Mail::to($usuario->email)->send(new UsuarioGoodbyeMail());
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