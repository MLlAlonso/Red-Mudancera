<?php

namespace App\Modules\Notificacion\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PushSubscription;

class PushSubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $empresa = $request->user();

        $request->validate([
            'endpoint' => 'required',
            'keys.p256dh' => 'required',
            'keys.auth' => 'required',
        ]);

        PushSubscription::updateOrCreate(
            [
                'endpoint' => $request->endpoint,
            ],
            [
                'empresa_id' => $empresa->id,
                'p256dh' => $request->keys['p256dh'],
                'auth' => $request->keys['auth'],
            ]
        );

        return response()->json(['ok' => true]);
    }
}