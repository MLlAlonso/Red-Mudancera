<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class EmpresaWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public Empresa $empresa;

    public function __construct(Empresa $empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('¡Bienvenido a Mudanza Fácil!')
            ->view('emails.empresa_welcome')
            ->with([
                'empresa' => $this->empresa,
            ]);
    }
}
