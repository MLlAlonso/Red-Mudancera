<?php

namespace App\Modules\Notificacion\Events;

use Illuminate\Support\Facades\Mail;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Mail\PlanActivatedMail;

class PlanChangedEvent extends BaseNotificationEvent
{
    protected int $empresaId;
    protected string $plan;
    protected string $inicio;
    protected string $fin;

    public function __construct(int $empresaId, string $plan, $inicio, $fin)
    {
        parent::__construct();

        $this->empresaId = $empresaId;
        $this->plan = $plan;
        $this->inicio = $inicio;
        $this->fin = $fin;
    }

    public function getEmpresaId(): int
    {
        return $this->empresaId;
    }

    public function getTitle(): string
    {
        return 'Suscripción activada';
    }

    public function getMessage(): string
    {
        return "Felicidades 🎉 ahora formas parte del plan {$this->getPlanName()}.\n\n"
            . "Inicio: {$this->inicio}\n"
            . "Vigencia hasta: {$this->fin}";
    }

    public function getUrl(): ?string
    {
        return '/empresa/perfil';
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

    private function getPlanName(): string
    {
        return match ($this->plan) {
            'free' => 'Explorador',
            'conector' => 'Conector',
            'radar' => 'Radar',
            default => ucfirst($this->plan),
        };
    }

    public function sendCustomEmail(): void
    {
        $empresa = Empresa::find($this->empresaId);
        if (!$empresa) return;

        Mail::to($empresa->email)->queue(
            new PlanActivatedMail(
                $empresa,
                $this->plan,
                $this->inicio,
                $this->fin
            )
        );
    }
}