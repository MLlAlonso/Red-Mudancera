<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class CreditosBajosMail extends Mailable
{
    use Queueable, SerializesModels;

    public Empresa $empresa;

    public function __construct(Empresa $empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('Te quedan pocos créditos disponibles')
            ->view('emails.creditos_bajos')
            ->with([
                'empresa' => $this->empresa,
            ]);
    }
}