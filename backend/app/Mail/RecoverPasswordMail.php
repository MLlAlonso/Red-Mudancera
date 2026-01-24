<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class RecoverPasswordMail extends Mailable
{
    public $password;
    public $hasUsuario;
    public $hasEmpresa;

    public function __construct($password, $hasUsuario, $hasEmpresa)
    {
        $this->password   = $password;
        $this->hasUsuario = $hasUsuario;
        $this->hasEmpresa = $hasEmpresa;
    }

    public function build()
    {
        return $this->subject('Recuperación de contraseña - Mudanza Facil')
            ->view('emails.recover_password');
    }
}