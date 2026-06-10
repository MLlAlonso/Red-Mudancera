<?php

namespace App\Modules\Notificacion\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Notificacion\Models\Notificacion;

class RealtimeToastController extends Controller
{
    public function latestEmpresa(Request $request)
    {
        $empresa = auth('empresa')->user();

        $toast = Notificacion::where( 'empresa_id', $empresa->id )
            ->where('toast_mostrado', false)
            ->where( 'created_at', '>=',now()->subHours(24))
            ->latest()
            ->first();

        return response()->json([ 'data' => $toast]);
    }

    public function markAsShown($id)
    {
        $empresa = auth('empresa')->user();
        $toast = Notificacion::where( 'empresa_id', $empresa->id )->findOrFail($id);

        $toast->update([
            'toast_mostrado' => true,
            'toast_mostrado_at' => now()
        ]);

        return response()->json([ 'success' => true]);
    }
}