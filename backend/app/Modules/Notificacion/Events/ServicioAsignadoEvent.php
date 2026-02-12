<?php

namespace App\Modules\Notificacion\Events;
use App\Modules\Servicio\Models\Servicio;

class ServicioAsignadoEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Servicio asignado';
    }

    public function getMessage(): string
    {
        /** @var Servicio $servicio */
        $servicio = $this->payload['servicio'];
        return "Tu servicio {$servicio->origen} → {$servicio->destino} fue asignado.";
    }

    public function getEmpresaId(): ?int
    {
        return $this->payload['empresa_id'];
    }

    public function shouldNotifyUsuarios(): bool
    {
        return true;
    }

    public function getUrl(): ?string
    {
        $servicio = $this->payload['servicio'];
        return "/servicios/{$servicio->id}";
    }
}