<?php

namespace App\Modules\Notificacion\Services;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Channels\DatabaseChannel;
use App\Modules\Notificacion\Channels\EmailChannel;

class NotificationDispatcher
{
    protected array $channels = [];
    public function __construct(
        DatabaseChannel $databaseChannel,
        EmailChannel $emailChannel
    ) {
        $this->channels = [
            $databaseChannel,
            $emailChannel,
        ];
    }

    public function dispatch(BaseNotificationEvent $event): void
    {
        foreach ($this->channels as $channel) {
            $channel->send($event);
        }
    }
}