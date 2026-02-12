<?php
namespace App\Modules\Notificacion\Events;

abstract class BaseNotificationEvent
{
    protected array $payload;
    public function __construct(array $payload = [])
    {
        $this->payload = $payload;
    }

    abstract public function getTitle(): string;
    abstract public function getMessage(): string;
    abstract public function getEmpresaId(): ?int;
    abstract public function shouldNotifyUsuarios(): bool;
    abstract public function getUrl(): ?string;

    public function getPayload(): array
    {
        return $this->payload;
    }
}