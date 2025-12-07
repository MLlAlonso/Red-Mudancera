<?php

namespace App\Modules\Usuario\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UsuarioVerificationCode extends Mailable
{
    use Queueable, SerializesModels;
    public $code;

    /**
     * Create a new message instance.
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Código de verificación - Red Mudancera')
                    ->view('emails.usuario_verification_code')
                    ->with([
                        'code' => $this->code
                    ]);
    }
}