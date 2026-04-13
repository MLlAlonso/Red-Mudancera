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
    }

    public function build()
    {
        $telefono = preg_replace('/[^0-9]/', '', $this->solicitud->telefono);

        // Asegurar formato internacional (México = 52)
        if (strlen($telefono) === 10) {
            $telefono = '52' . $telefono;
        }

        $mensaje = "Hola, apreciable {$this->solicitud->nombre}.\n"
            . "Te contacto del área de seguros de carga en seguimiento a tu solicitud para proteger tu mudanza de {$this->solicitud->origen} a {$this->solicitud->destino}.\n"
            . "Con gusto puedo explicarte brevemente en una llamada cómo funcionan las coberturas de la póliza, qué incluye y resolver cualquier duda que tengas.\n"
            . "¿Tienes unos minutos ahora o prefieres que agendemos en un horario específico para más tarde?";

        $whatsappUrl = "https://wa.me/{$telefono}?text=" . urlencode($mensaje);

        return $this->subject('Cliente interesado en seguro de mudanza')
            ->view('emails.solicitud_seguro', [
                'whatsappUrl' => $whatsappUrl
            ]);
    }
}
