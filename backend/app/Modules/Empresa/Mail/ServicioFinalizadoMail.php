<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Servicio\Models\Servicio;

class ServicioFinalizadoMail extends Mailable
{
    use Queueable, SerializesModels;
    public Empresa $empresa;
    public Servicio $servicio;

    public function __construct(
        Empresa $empresa,
        Servicio $servicio
    ) {
        $this->empresa = $empresa;
        $this->servicio = $servicio;
    }

    public function build()
    {
        return $this->subject(
            'Servicio finalizado correctamente'
        )
            ->view('emails.servicio_finalizado');
    }
}