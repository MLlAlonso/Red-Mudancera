<?php

namespace App\Modules\SolicitudMudanza\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;

class SolicitudSeguroMail extends Mailable
{
    use Queueable, SerializesModels;
    public $solicitud;

    public function __construct($solicitud)
    {
        $this->solicitud = clone $solicitud;
        // limpiar HTML
        $clean = strip_tags($solicitud->inventario);
        $clean = preg_replace('/\r\n|\r|\n/', ', ', $clean);
        $clean = preg_replace('/\s*,\s*/', ', ', $clean);
        $clean = trim(preg_replace('/\s+/', ' ', $clean), ', ');

        $this->solicitud->inventario = $clean;

        $this->solicitud->fecha_recoleccion = match ($solicitud->fecha_recoleccion ?? '') {
            '1-7' => '1 a 7 días',
            '8-15' => '8 a 15 días',
            '15-30' => '15 a 30 días',
            '30+' => 'Más de 30 días',
            'lo_antes_posible' => 'Lo antes posible',
            default => 'No especificado',
        };
    }

    public function build()
    {
        $telefono = preg_replace('/[^0-9]/', '', $this->solicitud->telefono);

        // Asegurar formato internacional (México = 52)
        if (strlen($telefono) === 10) {
            $telefono = '52' . $telefono;
        }

        $mensaje = "Hola {$this->solicitud->nombre}, soy Víctor Alemán, asesor de seguros con Chubb.\n"
            . "Vi que estás organizando una mudanza de {$this->solicitud->origen} a {$this->solicitud->destino} y que solicitaste información.\n"
            . "Sé que ahorita tu prioridad es elegir la empresa, así que no te distraigo con eso. Cuando ya la tengas elegida, aquí estaré para asegurarla.\n"
            . "Contratar directo tiene beneficios grandes que casi nadie conoce hasta que ya es tarde, y te acompaño en todo el proceso, no nada más en la venta. \n"
            . "Guarda mi número, en su momento te contacto.";

        $whatsappUrl = "https://wa.me/{$telefono}?text=" . urlencode($mensaje);

        return $this->subject('Cliente interesado en seguro de mudanza')
            ->view('emails.solicitud_seguro', [
                'whatsappUrl' => $whatsappUrl
            ]);
    }
}
