<?php

namespace App\Modules\Seguro\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class InvitacionExpedienteSeguroMail extends Mailable
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
            ->subject('Completa tu expediente de seguro - ' . $this->expediente->folio)
            ->view('emails.seguro.invitacion');
    }
}