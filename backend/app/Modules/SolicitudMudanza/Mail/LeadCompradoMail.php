<?php

namespace App\Modules\SolicitudMudanza\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;
use Carbon\Carbon;

class LeadCompradoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $solicitud;
    public $empresa;
    public $tipoCompra;
    public $tokensPagados;
    public $folio;
    public $fechaCompra;

    public function __construct($solicitud, $empresa, $tipoCompra, $tokensPagados)
    {
        $this->solicitud = $solicitud;
        $this->empresa = $empresa;
        $this->tipoCompra = $tipoCompra;
        $this->tokensPagados = $tokensPagados;

        $this->folio = 'MUDFAC-' . str_pad($solicitud->id, 6, '0', STR_PAD_LEFT);

        $this->fechaCompra = Carbon::now()
            ->locale('es')
            ->isoFormat('D [de] MMMM [de] YYYY · HH:mm [hrs]');
    }

    public function build()
    {
        return $this->subject('Contacto adquirido correctamente - Mudanza Fácil')
            ->view('emails.lead_comprado');
    }
}