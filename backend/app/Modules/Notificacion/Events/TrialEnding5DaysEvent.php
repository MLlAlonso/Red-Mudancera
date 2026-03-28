<?php

namespace App\Modules\Notificacion\Events;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Mail\TrialEndingMail;
use Illuminate\Support\Facades\Mail;

class TrialEnding5DaysEvent extends BaseNotificationEvent
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
        return 'Tu prueba termina en 5 días';
    }

    public function getMessage(): string
    {
        return "Tu acceso a Radar finalizará en 5 días.\n\nActiva un plan para seguir recibiendo oportunidades sin interrupciones.";
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
            new TrialEndingMail($empresa, 5)
        );
    }
}