<?php

namespace App\Modules\Notificacion\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Notificacion\Models\Notificacion;
use App\Modules\Notificacion\Models\NotificacionUsuario;

class NotificacionController extends Controller
{
    /*     public function index(Request $request)
    {
        $usuario = auth('usuario')->user();

        $notificaciones = NotificacionUsuario::with('notificacion')
            ->where('usuario_id', $usuario->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notificaciones);
    } */

    public function marcarLeida(int $id)
    {
        $registro = NotificacionUsuario::findOrFail($id);

        $registro->update([
            'leida' => true,
            'leida_at' => now(),
        ]);

        return response()->json(['success' => true]);
    }

    public function eliminar(int $id)
    {
        $registro = NotificacionUsuario::findOrFail($id);
        $registro->delete();

        return response()->json(['success' => true]);
    }

    /* 
        Funciones para la empresa
    */
    public function indexEmpresa()
    {
        $empresa = auth('empresa')->user();

        $notificaciones = Notificacion::where('empresa_id', $empresa->id)
            ->orderBy('leida_empresa')        // false primero
            ->orderBy('created_at', 'desc')   // más reciente arriba
            ->get();

        return response()->json($notificaciones);
    }

    public function marcarLeidaEmpresa(int $id)
    {
        $empresa = auth('empresa')->user();

        $notificacion = Notificacion::where('id', $id)
            ->where('empresa_id', $empresa->id)
            ->firstOrFail();

        if (! $notificacion->leida_empresa) {
            $ok = $notificacion->update([
                'leida_empresa' => true,
                'leida_empresa_at' => now(),
            ]);

            if (! $ok) {
                return response()->json([
                    'error' => 'UPDATE NO SE EJECUTÓ',
                ], 500);
            }
        }

        return response()->json([
            'success' => true,
            'leida_empresa' => $notificacion->fresh()->leida_empresa,
        ]);
    }

    public function eliminarEmpresa(int $id)
    {
        $empresa = auth('empresa')->user();

        $notificacion = Notificacion::where('id', $id)
            ->where('empresa_id', $empresa->id)
            ->firstOrFail();

        $notificacion->delete();

        return response()->json(['success' => true]);
    }

    /* 
        Funciones para el usuario
    */
    public function indexUsuario()
    {
        $usuario = auth('usuario')->user();

        $notificaciones = NotificacionUsuario::with('notificacion')
            ->where('usuario_id', $usuario->id)
            ->orderBy('leida')           // no leídas primero
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notificaciones);
    }

    public function marcarLeidaUsuario(int $id)
    {
        $usuario = auth('usuario')->user();

        $registro = NotificacionUsuario::where('id', $id)
            ->where('usuario_id', $usuario->id)
            ->firstOrFail();

        if (! $registro->leida) {
            $registro->update([
                'leida' => true,
                'leida_at' => now(),
            ]);
        }

        return response()->json([
            'success' => true,
            'leida' => $registro->fresh()->leida,
        ]);
    }

    public function eliminarUsuario(int $id)
    {
        $usuario = auth('usuario')->user();

        $registro = NotificacionUsuario::where('id', $id)
            ->where('usuario_id', $usuario->id)
            ->firstOrFail();

        $registro->delete();

        return response()->json(['success' => true]);
    }


    public function countEmpresa()
    {
        $empresa = auth('empresa')->user();

        $count = Notificacion::where('empresa_id', $empresa->id)
            ->where('leida_empresa', false)
            ->count();

        return response()->json([
            'count' => $count
        ]);
    }

    public function countUsuario()
    {
        $usuario = auth('usuario')->user();

        $count = NotificacionUsuario::where('usuario_id', $usuario->id)
            ->where('leida', false)
            ->count();

        return response()->json([
            'count' => $count
        ]);
    }
}
