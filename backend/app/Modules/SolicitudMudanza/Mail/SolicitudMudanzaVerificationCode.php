<?php

namespace App\Modules\SolicitudMudanza\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SolicitudMudanzaVerificationCode extends Mailable
{
    use Queueable, SerializesModels;
    public $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function build()
    {
        return $this->subject('Código de verificación - Busco Mudanza')
            ->view('emails.solicitud_mudanza_verification_code')
            ->with([
                'code' => $this->code,
            ]);
    }
}