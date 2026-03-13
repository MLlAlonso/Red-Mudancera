<?php

namespace App\Modules\Empresa\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\CreditosAgregadosEvent;
use App\Modules\Empresa\Mail\CompraCreditosMail;

class CreditosController extends Controller
{
    private array $planes = [
        'impulso' => [
            'creditos' => 100,
            'precio' => 790
        ],
        'profesional' => [
            'creditos' => 250,
            'precio' => 1890
        ],
        'crecimiento' => [
            'creditos' => 600,
            'precio' => 4290
        ]
    ];

    public function comprar(Request $request)
    {
        $request->validate([
            'plan' => 'required|string'
        ]);

        $empresa = Auth::user();
        if (!isset($this->planes[$request->plan])) {
            return response()->json([
                'message' => 'Plan inválido'
            ], 400);
        }
        $plan = $this->planes[$request->plan];

        // agregar créditos
        $empresa->tokens += $plan['creditos'];
        $empresa->save();

        // generar folio
        $folio = strtoupper('CR-' . uniqid());

        // evento notificación
        app(NotificationDispatcher::class)->dispatch(
            new CreditosAgregadosEvent(
                $empresa->id,
                $plan['creditos']
            )
        );

        // enviar correo
        Mail::to($empresa->email)->send(
            new CompraCreditosMail(
                $empresa,
                $request->plan,
                $plan['creditos'],
                $plan['precio'],
                $folio
            )
        );

        return response()->json([
            'message' => 'Créditos agregados correctamente',
            'creditos' => $plan['creditos'],
            'folio' => $folio
        ]);
    }
}