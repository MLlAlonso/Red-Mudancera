<?php

namespace App\Modules\Empresa\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class TrialExpiredMail extends Mailable
{
    use Queueable, SerializesModels;
    public Empresa $empresa;

    public function __construct($empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject("Tu prueba terminó")
            ->view('emails.trial_expired')
            ->with([
                'empresa' => $this->empresa,
            ]);
    }
}