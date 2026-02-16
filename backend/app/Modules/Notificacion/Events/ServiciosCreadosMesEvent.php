<?php

namespace App\Modules\Notificacion\Events;

class ServiciosCreadosMesEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Actividad destacada';
    }

    public function getMessage(): string
    {
        $cantidad = $this->payload['cantidad'];
        return "¡Se han creado {$cantidad} servicios este mes en la red!";
    }

    public function getEmpresaId(): ?int
    {
        return $this->payload['empresa_id'];
    }

    public function shouldNotifyUsuarios(): bool
    {
        return false;
    }

    public function getUrl(): ?string
    {
        return null;
    }
}