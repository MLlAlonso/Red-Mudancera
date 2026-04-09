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
        $this->solicitud->inventario = strip_tags($solicitud->inventario);
    }

    public function build()
    {
        return $this->subject('Cliente interesado en seguro de mudanza')
            ->view('emails.solicitud_seguro');
    }
}