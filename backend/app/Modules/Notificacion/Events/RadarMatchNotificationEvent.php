<?php

namespace App\Modules\Notificacion\Events;

class RadarMatchNotificationEvent extends BaseNotificationEvent
{
    protected int $empresaId;
    protected string $titulo;
    protected string $mensaje;

    public function __construct(
        int $empresaId,
        string $titulo,
        string $mensaje,
        array $data = []
    ) {
        parent::__construct($data);
        $this->empresaId = $empresaId;
        $this->titulo = $titulo;
        $this->mensaje = $mensaje;
    }

    public function getTitle(): string
    {
        return $this->titulo;
    }

    public function getMessage(): string
    {
        return $this->mensaje;
    }

    public function getEmpresaId(): ?int
    {
        return $this->empresaId;
    }

    public function getType(): string
    {
        return 'radar_match';
    }

    public function shouldNotifyUsuarios(): bool
    {
        return true;
    }

    public function getUrl(): ?string
    {
        return null; // luego puedes meter deep link
    }
}