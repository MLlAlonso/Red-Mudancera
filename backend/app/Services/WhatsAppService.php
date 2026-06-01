<?php

namespace App\Services;

use Twilio\Rest\Client;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected Client $client;
    protected string $from;

    public function __construct()
    {
        $this->client = new Client(
            config('services.twilio.sid'),
            config('services.twilio.token')
        );
        $this->from = config('services.twilio.whatsapp_from');
    }

    /*
    |--------------------------------------------------------------------------
    | Enviar código de verificación
    |--------------------------------------------------------------------------
    */
    public function sendVerificationCode(string $telefono, string $codigo): void
    {
        try {
            // Limpiar teléfono
            $telefono = preg_replace('/\D/', '', $telefono);

            // México
            if (!str_starts_with($telefono, '521')) {
                $telefono = '521' . ltrim($telefono, '0');
            }

            // Mensaje
            $mensaje =
                "Gracias por confiar en *Mudanza Fácil*\n\n" .

                "Tu código de verificación es:\n\n" .

                "🔐 *{$codigo}*\n\n" .

                "⏳ Este código es válido por 5 minutos.\n\n" .

                "✅ Evitamos solicitudes falsas o duplicadas\n" .
                "✅ Solo empresas reales podrán cotizarte\n" .
                "✅ Recibes opciones más rápidas y confiables\n\n" .

                "Si no realizaste esta solicitud, puedes ignorar este mensaje.\n\n" .

                "📩 soporte@mudanzafacil.com.mx";

            // Enviar WhatsApp
            $this->client->messages->create(
                "whatsapp:+{$telefono}",
                [
                    'from' => $this->from,
                    'body' => $mensaje,
                ]
            );

            Log::info('WhatsApp enviado correctamente', [
                'telefono' => $telefono
            ]);
        } catch (\Throwable $e) {
            Log::error('Error enviando WhatsApp', [
                'telefono' => $telefono,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }
}
