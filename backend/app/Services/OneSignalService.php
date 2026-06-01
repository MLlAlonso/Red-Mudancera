<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OneSignalService
{
    public function sendToEmpresa( int $empresaId, string $title, string $message, ?string $url = null ): void {
        $response = Http::withHeaders([
            'Authorization' => 'Key ' . env('ONESIGNAL_REST_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post(
            'https://api.onesignal.com/notifications',
            [
                'app_id' => env('ONESIGNAL_APP_ID'),

                'filters' => [
                    [
                        'field' => 'tag',
                        'key' => 'empresa_id',
                        'relation' => '=',
                        'value' => (string)$empresaId,
                    ]
                ],

                'headings' => [ 'en' => $title, ],
                'contents' => [ 'en' => $message, ],
                'url' => $url,
            ]
        );

        Log::info(
            'OneSignal Response',
            [
                'status' => $response->status(),
                'body' => $response->json(),
            ]
        );
    }
}