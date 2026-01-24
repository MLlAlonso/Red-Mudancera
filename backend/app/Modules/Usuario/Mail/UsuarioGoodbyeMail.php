<?php

namespace App\Modules\Usuario\Mail;
use Illuminate\Mail\Mailable;

class UsuarioGoodbyeMail extends Mailable
{
    public function build()
    {
        return $this->subject('Hasta pronto - Mudanza Fácil')
            ->view('emails.usuario_goodbye');
    }
}