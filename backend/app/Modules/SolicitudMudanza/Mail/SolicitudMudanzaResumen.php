<?php

namespace App\Modules\SolicitudMudanza\Mail;

use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Carbon\Carbon;

class SolicitudMudanzaResumen extends Mailable
{
    use Queueable, SerializesModels;
    public $solicitud;

    public function __construct($solicitud)
    {
        // Clonar para no modificar el original en memoria
        $this->solicitud = clone $solicitud;
        // Normalizar HTML del inventario
        $clean = $solicitud->inventario;
        // Convertir TODOS los tags de bloque a separador
        $clean = preg_replace('/<(\/)?(div|p|br)[^>]*>/i', ', ', $clean);
        // Eliminar cualquier etiqueta restante
        $clean = strip_tags($clean);
        // Normalizar comas y espacios
        $clean = preg_replace('/\s*,\s*/', ', ', $clean);
        $clean = trim($clean, ', ');

        $this->solicitud->inventario = $clean;
    }

    public function build()
    {
        $clean = $this->solicitud->inventario;
        $clean = preg_replace('/<(\/)?(div|p|br)[^>]*>/i', ', ', $clean);
        $clean = strip_tags($clean);
        $clean = preg_replace('/\s*,\s*/', ', ', $clean);
        $clean = trim($clean, ', ');

        $this->solicitud->inventario = $clean;
        $folio = 'MUDFAC-' . str_pad($this->solicitud->id, 6, '0', STR_PAD_LEFT);

        $fecha = \Carbon\Carbon::parse($this->solicitud->created_at)
            ->locale('es')
            ->isoFormat('D [de] MMMM [de] YYYY · HH:mm [hrs]');

        return $this->subject('Solicitud publicada correctamente - Mudanza Fácil')
            ->html(view('emails.solicitud_mudanza_resumen', [
                'solicitud' => $this->solicitud,
                'folio' => $folio,
                'fecha_formateada' => $fecha,
            ])->render());
    }
}