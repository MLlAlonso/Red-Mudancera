<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StripeService;
use Illuminate\Support\Facades\Log;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Services\PlanService;

class StripeController extends Controller
{
    protected StripeService $stripe;

    public function __construct(StripeService $stripe)
    {
        $this->stripe = $stripe;
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:conector,radar',
            'tipo' => 'required|in:mensual,anual',
        ]);

        $plan = $request->plan;
        $tipo = $request->tipo;
        $recurrente = $request->input('recurrente', true);

        $key = $tipo === 'mensual'
            ? ($recurrente ? 'mensual_auto' : 'mensual')
            : 'anual';

        $priceId = config("stripe_plans.$plan.$key");

        if (!$priceId) {
            return response()->json(['error' => 'Price no encontrado'], 400);
        }

        $empresa = $request->user();

        $session = $this->stripe->createCheckoutSession(
            $priceId,
            config('app.frontend_url') . '/empresa/perfil?payment=success&type=plan',
            config('app.frontend_url') . '/empresa/planes?cancel=1',
            $empresa->email
        );

        return response()->json([
            'url' => $session->url
        ]);
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $secret
            );
        } catch (\Exception $e) {
            Log::error('Webhook inválido', [
                'error' => $e->getMessage(),
                'secret' => $secret,
                'signature' => $sigHeader
            ]);

            return response('Invalid signature', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            $empresa = Empresa::where(
                'email',
                $session->customer_email
            )->first();

            if (!$empresa) {
                Log::error('Empresa no encontrada');
                return response('ok', 200);
            }

            // ============================
            // CRÉDITOS (PAGO ÚNICO)
            // ============================
            if ($session->mode === 'payment') {

                $lineItems = \Stripe\Checkout\Session::allLineItems($session->id);
                $priceId = $lineItems->data[0]->price->id ?? null;

                Log::info('PRICE CREDITOS', ['price_id' => $priceId]);

                foreach (config('stripe_creditos') as $key => $plan) {
                    if ($plan['price_id'] === $priceId) {
                        $empresa->tokens += $plan['creditos'];
                        $empresa->save();

                        app(\App\Modules\Notificacion\Services\NotificationDispatcher::class)
                            ->dispatch(
                                new \App\Modules\Notificacion\Events\CreditosAgregadosEvent(
                                    $empresa->id,
                                    $plan['creditos']
                                )
                            );

                        \Mail::to($empresa->email)->send(
                            new \App\Modules\Empresa\Mail\CompraCreditosMail(
                                $empresa,
                                $key,
                                $plan['creditos'],
                                0,
                                strtoupper('CR-' . uniqid())
                            )
                        );

                        Log::info('CRÉDITOS AGREGADOS', [
                            'empresa' => $empresa->id,
                            'creditos' => $plan['creditos']
                        ]);
                    }
                }
            }

            // ============================
            // SUSCRIPCIONES
            // ============================
            if ($session->mode === 'subscription') {

                $empresa->update([
                    'stripe_subscription_id' => $session->subscription,
                    'stripe_customer_id' => $session->customer,
                ]);

                $subscription = \Stripe\Subscription::retrieve($session->subscription);
                $priceId = $subscription->items->data[0]->price->id ?? null;
                Log::info('PRICE PLAN', ['price_id' => $priceId]);

                foreach (config('stripe_plans') as $planName => $tipos) {
                    foreach ($tipos as $tipo => $id) {

                        if ($id === $priceId) {
                            $empresa = app(PlanService::class)->changePlan(
                                $empresa,
                                $planName,
                                str_contains($tipo, 'anual') ? 'anual' : 'mensual',
                                str_contains($tipo, 'auto')
                            );

                            $empresa->refresh();

                            app(\App\Modules\Notificacion\Services\NotificationDispatcher::class)
                                ->dispatch(
                                    new \App\Modules\Notificacion\Events\PlanChangedEvent(
                                        $empresa->id,
                                        $planName,
                                        optional($empresa->subInicio)->format('d/m/Y'),
                                        optional($empresa->subFin)->format('d/m/Y')
                                    )
                                );

                            Log::info('PLAN CAMBIADO', [
                                'empresa' => $empresa->id,
                                'plan' => $planName,
                                'tipo' => $tipo
                            ]);
                        }
                    }
                }
            }
        }

        // ============================
        // RENOVACIÓN
        // ============================
        if ($event->type === 'invoice.payment_succeeded') {
            $subscriptionId = $event->data->object->subscription;
            $empresa = Empresa::where('stripe_subscription_id', $subscriptionId)->first();

            if ($empresa) {
                $empresa->update([
                    'subActiva' => true,
                    'subFin' => now()->addMonth()
                ]);

                Log::info('RENOVACIÓN EXITOSA', [
                    'empresa' => $empresa->id
                ]);
            }
        }

        // ============================
        // CANCELACIÓN PROGRAMADA
        // ============================
        if ($event->type === 'customer.subscription.updated') {
            $subscription = $event->data->object;

            $empresa = Empresa::where(
                'stripe_subscription_id',
                $subscription->id
            )->first();

            if ($empresa) {
                $empresa->update([
                    'cancel_at_period_end' => $subscription->cancel_at_period_end
                ]);
                Log::info('ESTADO CANCELACIÓN ACTUALIZADO', [
                    'empresa' => $empresa->id,
                    'cancel_at_period_end' => $subscription->cancel_at_period_end
                ]);
            }
        }

        // ============================
        // FALLA DE PAGO
        // ============================
        if ($event->type === 'invoice.payment_failed') {
            $subscriptionId = $event->data->object->subscription;
            $empresa = Empresa::where('stripe_subscription_id', $subscriptionId)->first();

            if ($empresa) {
                $empresa->update(['subActiva' => false]);
                Log::warning('PAGO FALLIDO', [
                    'empresa' => $empresa->id
                ]);
            }
        }
        return response('ok', 200);
    }

    public function cancel(Request $request)
    {
        $empresa = $request->user();

        if (!$empresa->stripe_subscription_id) {
            return response()->json(['error' => 'No subscription'], 400);
        }

        try {
            \Stripe\Subscription::update(
                $empresa->stripe_subscription_id,
                ['cancel_at_period_end' => true]
            );

            return response()->json([
                'message' => 'Se cancelará al final del periodo'
            ]);
        } catch (\Exception $e) {
            Log::error('ERROR CANCEL STRIPE', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Error al cancelar suscripción'
            ], 500);
        }
    }
}
