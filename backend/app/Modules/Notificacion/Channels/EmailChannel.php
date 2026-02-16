<?php

namespace App\Modules\Notificacion\Channels;

use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Empresa\Models\Empresa;
use Illuminate\Support\Facades\Log;
use App\Jobs\SendNotificationEmailJob;

class EmailChannel implements NotificationChannelInterface
{
    public function send(BaseNotificationEvent $event): void
    {
        if (!$event->shouldSendEmail()) {
            return;
        }

        $empresaId = $event->getEmpresaId();

        if (!$empresaId) {
            return;
        }

        SendNotificationEmailJob::dispatch([
            'empresa_id' => $empresaId,
            'title' => $event->getTitle(),
            'message' => $event->getMessage(),
        ]);
    }
}