<?php

namespace App\Services;

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
use App\Models\PushSubscription;

class WebPushService
{
    protected $webPush;
    public function __construct()
    {
        $this->webPush = new WebPush([
            'VAPID' => [
                'subject' => config('services.webpush.subject'),
                'publicKey' => config('services.webpush.public_key'),
                'privateKey' => config('services.webpush.private_key'),
            ],
        ]);
    }

    public function sendToEmpresa($empresaId, $title, $body)
    {
        $subs = PushSubscription::where('empresa_id', $empresaId)->get();
        foreach ($subs as $sub) {
            $subscription = Subscription::create([
                'endpoint' => $sub->endpoint,
                'keys' => [
                    'p256dh' => $sub->p256dh,
                    'auth' => $sub->auth,
                ],
            ]);

            $this->webPush->queueNotification(
                $subscription,
                json_encode([
                    'title' => $title,
                    'body' => $body,
                ])
            );
        }

        foreach ($this->webPush->flush() as $report) {
            if (!$report->isSuccess()) {
                PushSubscription::where('endpoint', $report->getEndpoint())->delete();
            }
        }
    }
}