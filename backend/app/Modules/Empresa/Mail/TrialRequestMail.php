<?php

namespace App\Modules\Empresa\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TrialRequestMail extends Mailable
{
    use Queueable, SerializesModels;
    public $trial;

    public function __construct($trial)
    {
        $this->trial = $trial;
    }

    public function build()
    {
        return $this->subject('Nueva solicitud de prueba gratuita')
            ->view('emails.trial_request', [
                'trial' => $this->trial
            ]);
    }
}