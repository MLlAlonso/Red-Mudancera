<?php

namespace App\Modules\Notificacion\Services;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Channels\DatabaseChannel;
use App\Modules\Notificacion\Channels\EmailChannel;
use App\Modules\Notificacion\Channels\PushChannel;

class NotificationDispatcher
{
    protected array $channels = [];
    public function __construct(
        DatabaseChannel $databaseChannel,
        EmailChannel $emailChannel,
        PushChannel $pushChannel
    ) {
        $this->channels = [
            $databaseChannel,
            $emailChannel,
            $pushChannel,
        ];
    }

    public function dispatch(BaseNotificationEvent $event): void
    {
        $hasCustomEmail = method_exists($event, 'sendCustomEmail');
        foreach ($this->channels as $channel) {
            // Evitar doble email
            if ($hasCustomEmail && $channel instanceof \App\Modules\Notificacion\Channels\EmailChannel) {
                continue;
            }
            $channel->send($event);
        }

        // email personalizado
        if ($hasCustomEmail) {
            $event->sendCustomEmail();
        }
    }
}