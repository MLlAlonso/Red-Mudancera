<?php

namespace App\Modules\Seguro\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class VideoExpedienteSeguroMail extends Mailable
{
    use Queueable, SerializesModels;

    public ExpedienteSeguro $expediente;

    public function __construct(ExpedienteSeguro $expediente)
    {
        $this->expediente = $expediente;
    }

    public function build()
    {
        return $this
            ->subject( 'Mudanza Fácil: conoce cómo funciona tu seguro - '  . $this->expediente->folio )
            ->view('emails.seguro.video');
    }
}