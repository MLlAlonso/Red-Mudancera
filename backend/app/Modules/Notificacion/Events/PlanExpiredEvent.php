<?php

namespace App\Modules\Notificacion\Events;

class PlanExpiredEvent extends BaseNotificationEvent
{
    protected int $empresaId;

    public function __construct(int $empresaId)
    {
        parent::__construct();

        $this->empresaId = $empresaId;
    }

    public function getEmpresaId(): int
    {
        return $this->empresaId;
    }

    public function getTitle(): string
    {
        return 'Tu suscripción ha expirado';
    }

    public function getMessage(): string
    {
        return "Tu suscripción ha finalizado y has sido movido al plan Explorador.\n\nActiva un plan para seguir generando oportunidades.";
    }

    public function getUrl(): ?string
    {
        return '/empresa/creditos';
    }

    public function getType(): string
    {
        return 'sistema';
    }

    public function shouldNotifyUsuarios(): bool
    {
        return true;
    }

    public function shouldSendEmail(): bool
    {
        return true;
    }
}