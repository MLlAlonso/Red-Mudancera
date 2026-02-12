<?php

namespace App\Modules\Notificacion\Channels;
use App\Modules\Notificacion\Events\BaseNotificationEvent;

interface NotificationChannelInterface
{
    public function send(BaseNotificationEvent $event): void;
}