<?php

namespace App\Modules\Notificacion\Events;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Mail\TrialEndingMail;
use Illuminate\Support\Facades\Mail;

class TrialEndingTomorrowEvent extends BaseNotificationEvent
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
        return 'Tu acceso termina mañana';
    }

    public function getMessage(): string
    {
        return "Tu prueba gratuita termina mañana.\n\nActiva un plan hoy para no perder acceso a las coincidencias y oportunidades.";
    }

    public function getUrl(): ?string
    {
        return '/empresa/planes';
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

    public function sendCustomEmail(): void
    {
        $empresa = Empresa::find($this->empresaId);
        if (!$empresa) return;

        Mail::to($empresa->email)->queue(
            new TrialEndingMail($empresa, 1)
        );
    }
}