<?php

namespace App\Modules\Notificacion\Channels;

use App\Services\OneSignalService;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Models\NotificationPreference;
use App\Modules\Notificacion\Models\NotificationMetric;
use App\Modules\Usuario\Models\Usuario;

class PushChannel implements NotificationChannelInterface
{
    protected OneSignalService $push;

    public function __construct(OneSignalService $push)
    {
        $this->push = $push;
    }

    public function send(BaseNotificationEvent $event): void
    {
        $empresaId = $event->getEmpresaId();

        if (!$empresaId) {
            return;
        }

        if (!$event->shouldNotifyUsuarios()) {
            return;
        }

        $usuarios = Usuario::where('empresa_id', $empresaId) ->where('activoEmpresa', true) ->get();
        $shouldSend = false;

        foreach ($usuarios as $usuario) {
            $pref = NotificationPreference::where([
                'usuario_id' => $usuario->id,
                'tipo' => $event->getType(),
                'canal' => 'push',
            ])->first();

            // si NO existe preferencia → permitir
            if (!$pref || $pref->activo) {
                $shouldSend = true;
                break;
            }
        }

        if (!$shouldSend) {
            return;
        }

        $this->push->sendToEmpresa(
            (string)$empresaId,
            $event->getTitle(),
            $event->getMessage(),
            $event->getUrl()
        );

        NotificationMetric::create([
            'notificacion_id' => null,
            'tipo' => $event->getType(),
            'canal' => 'push',
            'evento' => 'sent',
        ]);
    }
}
