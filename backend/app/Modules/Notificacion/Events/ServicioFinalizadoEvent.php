<?php

namespace App\Modules\Notificacion\Events;
use App\Modules\Servicio\Models\Servicio;

class ServicioFinalizadoEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Servicio finalizado';
    }

    public function getMessage(): string
    {
        /** @var Servicio $servicio */
        $servicio = $this->payload['servicio'];
        return "El servicio de {$servicio->origen} a {$servicio->destino} fue finalizado.";
        /* return "El servicio de {$servicio->origen} a {$servicio->destino} fue finalizado. Ganancia: $ {$servicio->ganancia}"; */
    }

    public function getEmpresaId(): ?int
    {
        return $this->payload['empresa_id'];
    }

    public function shouldNotifyUsuarios(): bool
    {
        return true; // también notifica a usuarios
    }

    public function getUrl(): ?string
    {
        $servicio = $this->payload['servicio'];
        return "/servicios/{$servicio->id}";
    }
}