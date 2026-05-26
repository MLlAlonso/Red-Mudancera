<?php

namespace App\Modules\Notificacion\Events;

use App\Modules\Servicio\Models\Servicio;
use Illuminate\Support\Facades\Mail;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Mail\ServicioPorVencerMail;

class ServicioPorVencerEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Servicio por vencer';
    }

    public function getMessage(): string
    {
        /** @var Servicio $servicio */
        $servicio = $this->payload['servicio'];

        return "Tu servicio {$servicio->origen} → {$servicio->destino} vence en menos de 24 horas.";
    }

    public function getEmpresaId(): ?int
    {
        return $this->payload['empresa_id'];
    }

    public function shouldNotifyUsuarios(): bool
    {
        return true;
    }

    public function shouldSendEmail(): bool
    {
        return true;
    }

    public function getUrl(): ?string
    {
        $servicio = $this->payload['servicio'];
        return "/servicios/{$servicio->id}";
    }

    public function getType(): string
    {
        return 'alerta';
    }

    public function sendCustomEmail(): void
    {
        $empresa = Empresa::find(
            $this->getEmpresaId()
        );

        if (!$empresa) {
            return;
        }

        Mail::to($empresa->email)->queue(
            new ServicioPorVencerMail(
                $empresa,
                $this->payload['servicio']
            )
        );
    }
}
