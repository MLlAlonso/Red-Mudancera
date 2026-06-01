<?php

namespace App\Modules\Notificacion\Controllers;

use App\Http\Controllers\Controller;
use App\Services\OneSignalService;

class TestPushController extends Controller
{
    public function send( OneSignalService $push ) {
        $empresa = auth('empresa')->user();

        $push->sendToEmpresa(
            $empresa->id,
            '🔔 Notificaciones activadas',
            'Las notificaciones push están activas correctamente.',
            '/empresa/notificaciones'
        );

        return response()->json([
            'ok' => true
        ]);
    }
}