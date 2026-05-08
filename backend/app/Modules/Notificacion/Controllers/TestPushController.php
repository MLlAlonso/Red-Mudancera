<?php

namespace App\Modules\Notificacion\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WebPushService;

class TestPushController extends Controller
{
    public function send(Request $request, WebPushService $push)
    {
        $empresa = $request->user();

        $push->sendToEmpresa(
            $empresa->id,
            "🚚 Nueva oportunidad",
            "Tienes una nueva coincidencia disponible"
        );

        return response()->json(['ok' => true]);
    }
}