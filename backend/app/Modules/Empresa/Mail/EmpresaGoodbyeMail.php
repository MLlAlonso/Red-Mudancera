<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class EmpresaGoodbyeMail extends Mailable
{
    use Queueable, SerializesModels;

    public Empresa $empresa;

    public function __construct(Empresa $empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('Gracias por haber sido parte de Mudanza Fácil')
            ->view('emails.empresa_goodbye')
            ->with([
                'empresa' => $this->empresa,
            ]);
    }
}
