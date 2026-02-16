<?php

namespace App\Modules\Notificacion\Events;

class LoginEmpresaEvent extends BaseNotificationEvent
{
    public function getTitle(): string
    {
        return 'Inicio de sesión detectado';
    }

    public function getMessage(): string
    {
        return "Se detectó un inicio de sesión en tu cuenta el " . now()->format('d/m/Y H:i');
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

    public function shouldSendEmail(): bool
    {
        return true;
    }
}