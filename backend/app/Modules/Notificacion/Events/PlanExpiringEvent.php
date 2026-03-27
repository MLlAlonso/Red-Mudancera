<?php

namespace App\Modules\Notificacion\Events;

class PlanExpiringEvent extends BaseNotificationEvent
{
    protected int $empresaId;
    protected string $fecha;

    public function __construct(int $empresaId, $fecha)
    {
        parent::__construct();

        $this->empresaId = $empresaId;
        $this->fecha = \Carbon\Carbon::parse($fecha)->format('d/m/Y');
    }

    public function getEmpresaId(): int
    {
        return $this->empresaId;
    }

    public function getTitle(): string
    {
        return 'Tu suscripción está por vencer';
    }

    public function getMessage(): string
    {
        return "Tu suscripción vence el {$this->fecha}.\n\nRenueva para no perder acceso a las oportunidades de la red.";
    }

    public function getUrl(): ?string
    {
        return '/empresa/creditos';
    }

    public function getType(): string
    {
        return 'alerta';
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