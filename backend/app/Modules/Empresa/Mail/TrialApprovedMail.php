<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TrialApprovedMail extends Mailable
{
    use Queueable, SerializesModels;
    public $empresa;

    public function __construct($empresa)
    {
        $this->empresa = $empresa;
    }

    public function build()
    {
        return $this->subject('🎉 Tu cuenta ha sido verificada')
            ->view('emails.trial_approved')
            ->with([
                'empresa' => $this->empresa,
                'inicio' => now()->format('d/m/Y'),
                'fin' => now()->addDays(30)->format('d/m/Y'),
            ]);
    }
}