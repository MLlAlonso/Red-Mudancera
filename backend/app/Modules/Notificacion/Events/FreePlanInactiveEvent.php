<?php

namespace App\Modules\Notificacion\Events;

use Carbon\Carbon;

class FreePlanInactiveEvent extends BaseNotificationEvent
{
    protected int $empresaId;
    protected string $fechaLimite;

    public function __construct(int $empresaId, $fechaLimite)
    {
        parent::__construct();
        $this->empresaId = $empresaId;
        $this->fechaLimite = Carbon::parse($fechaLimite)->format('d/m/Y');
    }

    public function getEmpresaId(): int
    {
        return $this->empresaId;
    }

    public function getTitle(): string
    {
        return 'Tu cuenta será eliminada pronto';
    }

    public function getMessage(): string
    {
        return "Tu cuenta lleva tiempo inactiva en el plan Explorador.\n\n"
            . "Si no activas un plan antes del {$this->fechaLimite}, tu cuenta será eliminada permanentemente.";
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