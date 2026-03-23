<?php

namespace App\Modules\Servicio\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Servicio\Models\Servicio;
use Illuminate\Contracts\Queue\ShouldQueue;

class RadarMatchesMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public Empresa $empresa;
    public Servicio $servicio;
    public array $serviciosMatches;
    public array $solicitudesMatches;

    public function __construct(
        Empresa $empresa,
        Servicio $servicio,
        array $serviciosMatches,
        array $solicitudesMatches
    ) {
        $this->empresa = $empresa;
        $this->servicio = $servicio;
        $this->serviciosMatches = $serviciosMatches;
        $this->solicitudesMatches = $solicitudesMatches;
    }

    public function build()
    {
        return $this->subject('Nuevas coincidencias para tu ruta')
            ->view('emails.radar_matches')
            ->with([
                'empresa' => $this->empresa,
                'servicio' => $this->servicio,
                'serviciosMatches' => $this->serviciosMatches,
                'solicitudesMatches' => $this->solicitudesMatches,
            ]);
    }
}