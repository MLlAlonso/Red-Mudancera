<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Services\StripeService;

class StripeCreditosController extends Controller
{
    protected StripeService $stripe;

    public function __construct(StripeService $stripe)
    {
        $this->stripe = $stripe;
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:impulso,profesional,crecimiento',
        ]);

        $plan = config("stripe_creditos.{$request->plan}");
        if (!$plan) {
            return response()->json(['error' => 'Plan inválido'], 400);
        }

        $empresa = $request->user();
        $session = $this->stripe->createPaymentSession(
            $plan['price_id'],
            config('app.frontend_url') . '/empresa/perfil?payment=success&type=creditos',
            config('app.frontend_url') . '/empresa/creditos?cancel=1',
            $empresa->email
        );

        return response()->json([
            'url' => $session->url
        ]);
    }
}