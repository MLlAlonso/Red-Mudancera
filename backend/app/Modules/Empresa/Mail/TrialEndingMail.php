<?php

namespace App\Modules\Empresa\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class TrialEndingMail extends Mailable
{
    use Queueable, SerializesModels;
    public Empresa $empresa;
    public int $dias;

    public function __construct($empresa, $dias)
    {
        $this->empresa = $empresa;
        $this->dias = $dias;
    }

    public function build()
    {
        return $this->subject("Tu prueba termina en {$this->dias} días")
            ->view('emails.trial_ending')
            ->with([
                'empresa' => $this->empresa,
                'dias' => $this->dias,
            ]);
    }
}