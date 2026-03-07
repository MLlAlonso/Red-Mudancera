<?php

namespace App\Modules\Resena\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NuevaResenaMail extends Mailable
{
    public function __construct(
        public $empresaOrigen,
        public $comentario,
        public $rating,
        public $linkRespuesta
    ) {}

    public function build()
    {
        return $this->subject('Has recibido una nueva reseña - Mudanza Fácil')
            ->view('emails.nueva-resena');
    }
}