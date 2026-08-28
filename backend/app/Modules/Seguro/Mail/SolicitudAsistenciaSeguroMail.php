<?php

namespace App\Modules\Seguro\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class SolicitudAsistenciaSeguroMail extends Mailable
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
            ->subject(
                'Mudanza Fácil: solicitud de póliza asistida - '
                    . $this->expediente->folio
            )
            ->view('emails.seguro.solicitud-asistencia');
    }
}
