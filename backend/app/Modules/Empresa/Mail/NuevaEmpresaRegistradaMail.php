<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class NuevaEmpresaRegistradaMail extends Mailable
{
    use Queueable, SerializesModels;

    public Empresa $empresa;

    public function __construct(Empresa $empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('Nueva empresa registrada en Mudanza Fácil')
            ->view('emails.nueva_empresa_registrada')
            ->with(['empresa' => $this->empresa,]);
    }
}
