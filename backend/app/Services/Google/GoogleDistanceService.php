<?php

namespace App\Services\Google;

use Illuminate\Support\Facades\Http;

class GoogleDistanceService
{
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.google_maps.key');
    }

    /**
     * Calcula distancia en KM entre origen y destino
     */
    public function calcularKm(string $origen, string $destino): ?int
    {
        if (! $this->apiKey) {
            return null;
        }

        $response = Http::get(
            'https://maps.googleapis.com/maps/api/distancematrix/json',
            [
                'origins' => $origen,
                'destinations' => $destino,
                'region' => 'mx',
                'language' => 'es',
                'key' => $this->apiKey,
            ]
        );

        if (! $response->successful()) {
            return null;
        }

        $data = $response->json();

        $element = $data['rows'][0]['elements'][0] ?? null;

        if (! $element || $element['status'] !== 'OK') {
            return null;
        }

        // Google devuelve metros
        $metros = $element['distance']['value'];

        return (int) round($metros / 1000);
    }
}
