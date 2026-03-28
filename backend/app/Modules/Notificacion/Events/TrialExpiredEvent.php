<?php

namespace App\Modules\Notificacion\Events;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Mail\TrialExpiredMail;
use Illuminate\Support\Facades\Mail;

class TrialExpiredEvent extends BaseNotificationEvent
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
        return 'Tu prueba ha terminado';
    }

    public function getMessage(): string
    {
        return "Tu prueba gratuita ha finalizado.\n\nTu cuenta sigue activa en modo Explorador, pero con acceso limitado.";
    }

    public function getUrl(): ?string
    {
        return '/empresa/planes';
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

    public function sendCustomEmail(): void
    {
        $empresa = Empresa::find($this->empresaId);
        if (!$empresa) return;

        Mail::to($empresa->email)->queue(
            new TrialExpiredMail($empresa)
        );
    }
}