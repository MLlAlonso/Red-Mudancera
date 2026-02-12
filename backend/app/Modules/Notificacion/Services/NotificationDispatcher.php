<?php

namespace App\Modules\Notificacion\Services;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Channels\DatabaseChannel;

class NotificationDispatcher
{
    protected array $channels = [];

    public function __construct(
        DatabaseChannel $databaseChannel
        // Aquí luego se inyectaran EmailChannel, PushChannel, etc.
    ) {
        $this->channels = [
            $databaseChannel,
            // nuevos canales se agregan aquí
        ];
    }

    public function dispatch(BaseNotificationEvent $event): void
    {
        foreach ($this->channels as $channel) {
            $channel->send($event);
        }
    }
}