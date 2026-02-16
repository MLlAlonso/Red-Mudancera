<?php

namespace App\Modules\Notificacion\Events;

use App\Modules\Servicio\Models\Servicio;

class ServicioVistoEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Servicio visto';
    }

    public function getMessage(): string
    {
        /** @var Servicio $servicio */
        $servicio = $this->payload['servicio'];
        $cantidad = $this->payload['cantidad'];
        return "{$cantidad} empresas han visto tu servicio ({$servicio->origen} - {$servicio->destino})";
    }

    public function getEmpresaId(): ?int
    {
        return $this->payload['empresa_id'];
    }

    public function shouldNotifyUsuarios(): bool
    {
        return false; // solo empresa
    }

    public function getUrl(): ?string
    {
        $servicio = $this->payload['servicio'];
        return "/servicios/{$servicio->id}";
    }

    public function getType(): string
    {
        return 'sistema';
    }
}
