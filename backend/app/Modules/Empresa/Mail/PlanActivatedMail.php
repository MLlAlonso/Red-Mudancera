<?php

namespace App\Modules\Empresa\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class PlanActivatedMail extends Mailable
{
    use Queueable, SerializesModels;
    public Empresa $empresa;
    public string $plan;
    public string $inicio;
    public string $fin;

    public function __construct($empresa, $plan, $inicio, $fin)
    {
        $this->empresa = $empresa;
        $this->plan = ucfirst($plan);
        $this->inicio = $inicio;
        $this->fin = $fin;
    }

    public function build()
    {
        return $this->subject('Tu suscripción ha sido activada')
            ->view('emails.plan_activated')
            ->with([
                'empresa' => $this->empresa,
                'plan' => $this->plan,
                'inicio' => $this->inicio,
                'fin' => $this->fin,
            ]);
    }
}