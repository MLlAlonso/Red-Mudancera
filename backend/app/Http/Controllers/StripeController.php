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

    /**
     * ============================================
     * CHECKOUT
     * ============================================
     */
    public function checkout(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:conector,radar',
            'tipo' => 'required|in:mensual,anual',
        ]);

        $plan = $request->plan;
        $tipo = $request->tipo;
        $recurrente = $request->input('recurrente', true);

        // lógica de price
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
            config('app.frontend_url') . '/empresa/planes?success=1',
            config('app.frontend_url') . '/empresa/planes?cancel=1',
            $empresa->email
        );

        return response()->json([
            'url' => $session->url
        ]);
    }

    /**
     * ============================================
     * WEBHOOK (CEREBRO REAL DEL SISTEMA)
     * ============================================
     */
    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $secret
            );
        } catch (\Exception $e) {
            Log::error('Webhook inválido', ['error' => $e->getMessage()]);
            return response('Invalid signature', 400);
        }

        /**
         * ============================================
         * 1. CHECKOUT COMPLETADO (PRIMER PAGO)
         * ============================================
         */
        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            $empresa = Empresa::where(
                'email',
                $session->customer_email
            )->first();

            if (!$empresa) {
                Log::error('Empresa no encontrada en checkout');
                return response('ok', 200);
            }

            // guardar IDs de Stripe
            $empresa->update([
                'stripe_subscription_id' => $session->subscription,
                'stripe_customer_id' => $session->customer,
            ]);

            // obtener subscription real
            $subscription = \Stripe\Subscription::retrieve($session->subscription);

            $priceId = $subscription->items->data[0]->price->id ?? null;

            Log::info('PRICE ID DETECTADO', [
                'price_id' => $priceId
            ]);

            // mapear plan
            foreach (config('stripe_plans') as $plan => $tipos) {
                foreach ($tipos as $tipo => $id) {

                    if ($id === $priceId) {

                        app(PlanService::class)->changePlan(
                            $empresa,
                            $plan,
                            str_contains($tipo, 'anual') ? 'anual' : 'mensual',
                            str_contains($tipo, 'auto')
                        );

                        Log::info('PLAN CAMBIADO', [
                            'empresa' => $empresa->id,
                            'plan' => $plan,
                            'tipo' => $tipo
                        ]);
                    }
                }
            }
        }

        /**
         * ============================================
         * 2. RENOVACIÓN AUTOMÁTICA
         * ============================================
         */
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

        /**
         * ============================================
         * 3. PAGO FALLIDO
         * ============================================
         */
        if ($event->type === 'invoice.payment_failed') {
            $subscriptionId = $event->data->object->subscription;
            $empresa = Empresa::where('stripe_subscription_id', $subscriptionId)->first();

            if ($empresa) {

                $empresa->update([
                    'subActiva' => false
                ]);

                Log::warning('PAGO FALLIDO → PLAN DESACTIVADO', [
                    'empresa' => $empresa->id
                ]);
            }
        }

        /**
         * ============================================
         * 4. CANCELACIÓN
         * ============================================
         */
        if ($event->type === 'customer.subscription.deleted') {
            $subscriptionId = $event->data->object->id;
            $empresa = Empresa::where('stripe_subscription_id', $subscriptionId)->first();

            if ($empresa) {
                $empresa->update([
                    'subActiva' => false,
                    'plan' => 'free'
                ]);

                Log::info('SUSCRIPCIÓN CANCELADA', [
                    'empresa' => $empresa->id
                ]);
            }
        }

        return response('ok', 200);
    }

    /**
     * ============================================
     * CANCELAR DESDE TU APP
     * ============================================
     */
    public function cancel(Request $request)
    {
        $empresa = $request->user();

        if (!$empresa->stripe_subscription_id) {
            return response()->json(['error' => 'No subscription'], 400);
        }

        \Stripe\Subscription::update(
            $empresa->stripe_subscription_id,
            ['cancel_at_period_end' => true]
        );

        return response()->json([
            'message' => 'Se cancelará al final del periodo'
        ]);
    }
}