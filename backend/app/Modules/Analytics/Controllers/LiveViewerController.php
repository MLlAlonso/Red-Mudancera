<?php

namespace App\Modules\Analytics\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modules\Analytics\Models\LiveViewer;

class LiveViewerController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | TRACK VIEW
    |--------------------------------------------------------------------------
    */
    public function track(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:servicio,contacto',
            'registro_id' => 'required|integer',
        ]);

        $sessionId = $request->ip()
            . '_'
            . $request->userAgent();

        LiveViewer::updateOrCreate(
            [
                'tipo' => $request->tipo,
                'registro_id' => $request->registro_id,
                'session_id' => $sessionId,
            ],
            [
                'last_seen_at' => now(),
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | LIMPIAR INACTIVOS > 30 SEG
        |--------------------------------------------------------------------------
        */
        LiveViewer::where( 'last_seen_at', '<', now()->subSeconds(30) )->delete();

        /*
        |--------------------------------------------------------------------------
        | COUNT
        |--------------------------------------------------------------------------
        */
        $count = LiveViewer::where( 'tipo', $request->tipo )
            ->where( 'registro_id', $request->registro_id )
            ->count();

        return response()->json([
            'count' => $count
        ]);
    }
}