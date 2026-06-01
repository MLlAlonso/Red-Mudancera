<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OneSignalService
{
    public function sendToEmpresa( string $empresaId, string $title, string $message, ?string $url = null ): void {
        $response = Http::withHeaders([
            'Authorization' => 'Key ' . env('ONESIGNAL_REST_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post(
            'https://api.onesignal.com/notifications',
            [
                'app_id' => env('ONESIGNAL_APP_ID'),

                'include_aliases' => [
                    'external_id' => [
                        $empresaId
                    ]
                ],

                'target_channel' => 'push',
                'headings' => [ 'en' => $title ],
                'contents' => [ 'en' => $message ],
                'url' => $url,
            ]
        );

        Log::info('OneSignal Push', [
            'empresa_id' => $empresaId,
            'status' => $response->status(),
            'body' => $response->json(),
        ]);
    }
}