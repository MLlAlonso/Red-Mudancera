<?php

namespace App\Modules\Usuario\Mail;
use Illuminate\Mail\Mailable;

class UsuarioWelcomeMail extends Mailable
{
    public $empresa;

    public function __construct($empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('Bienvenido a Mudanza Fácil')
            ->view('emails.usuario_welcome');
    }
}