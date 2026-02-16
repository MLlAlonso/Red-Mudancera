<?php

namespace App\Modules\Notificacion\Events;

use App\Modules\Servicio\Models\Servicio;

class ServicioPublicadoEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Nuevo servicio publicado';
    }

    public function getMessage(): string
    {
        /** @var Servicio $servicio */
        $servicio = $this->payload['servicio'];
        return "Publicaste un servicio de {$servicio->origen} a {$servicio->destino}";
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

    public function getType(): string
    {
        return 'info';
    }
}