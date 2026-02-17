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
        foreach ($this->channels as $channel) {
            $channel->send($event);
        }
    }
}