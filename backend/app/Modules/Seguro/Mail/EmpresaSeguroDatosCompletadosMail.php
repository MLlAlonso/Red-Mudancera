<?php

namespace App\Modules\Seguro\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class EmpresaSeguroDatosCompletadosMail extends Mailable
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
            ->subject( 'Tu empresa de mudanza completó los datos de tu expediente' )
            ->view('emails.seguro.empresa-datos-completados');
    }
}