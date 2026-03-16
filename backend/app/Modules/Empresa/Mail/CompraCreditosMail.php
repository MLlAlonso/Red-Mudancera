<?php

namespace App\Modules\Empresa\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Empresa\Models\Empresa;

class CompraCreditosMail extends Mailable
{
    use Queueable, SerializesModels;
    public Empresa $empresa;
    public string $plan;
    public int $creditos;
    public int $precio;
    public string $folio;
    public string $fecha;

    public function __construct($empresa, $plan, $creditos, $precio, $folio)
    {
        $this->empresa = $empresa;
        $this->plan = ucfirst($plan);
        $this->creditos = $creditos;
        $this->precio = $precio;
        $this->folio = $folio;
        $this->fecha = now()->format('d/m/Y H:i');
    }

    public function build()
    {
        return $this->subject('Tus créditos ya están disponibles')
            ->view('emails.compra_creditos')
            ->with([
                'empresa' => $this->empresa,
                'plan' => $this->plan,
                'creditos' => $this->creditos,
                'precio' => $this->precio,
                'folio' => $this->folio,
                'fecha' => $this->fecha,
            ]);
    }
}