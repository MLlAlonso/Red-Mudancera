<?php

namespace App\Modules\Notificacion\Events;

use Illuminate\Support\Facades\Log;

class CreditosAgregadosEvent extends BaseNotificationEvent
{
    public int $empresaId;
    public int $cantidad;

    public function __construct(int $empresaId, int $cantidad)
    {
        parent::__construct();

        $this->empresaId = $empresaId;
        $this->cantidad = $cantidad;
    }

    public function getEmpresaId(): int
    {
        return $this->empresaId;
    }

    public function getTitle(): string
    {
        return 'Créditos añadidos';
    }

    public function getMessage(): string
    {
        return "{$this->cantidad} créditos acaban de llegar a tu cuenta. ¡Es el momento perfecto para usarlos!";
    }

    public function getUrl(): ?string
    {
        return '/empresa/dashboard';
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
