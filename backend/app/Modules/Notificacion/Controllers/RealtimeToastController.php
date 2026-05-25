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
        $toast = Notificacion::where('empresa_id', $empresa->id )
            ->latest()
            ->first();

        return response()->json([
            'data' => $toast
        ]);
    }
}