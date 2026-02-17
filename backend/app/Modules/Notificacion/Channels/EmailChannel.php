<?php

namespace App\Modules\Notificacion\Channels;

use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Models\NotificationMetric;
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

        // Evento individual (no replicar a usuarios)
        if (!$event->shouldNotifyUsuarios()) {

            SendNotificationEmailJob::dispatch([
                'empresa_id' => $empresaId,
                'title' => $event->getTitle(),
                'message' => $event->getMessage(),
            ]);

            NotificationMetric::create([
                'notificacion_id' => null,
                'tipo' => $event->getType(),
                'canal' => 'email',
                'evento' => 'sent',
            ]);

            return;
        }

        // Evento empresarial (replicar según preferencias)

        $usuarios = Usuario::where('empresa_id', $empresaId)
            ->where('activoEmpresa', true)
            ->get();

        $permitido = false;

        foreach ($usuarios as $usuario) {

            $pref = \App\Modules\Notificacion\Models\NotificationPreference::where([
                'usuario_id' => $usuario->id,
                'tipo' => $event->getType(),
                'canal' => 'email',
            ])->first();

            if (!$pref || $pref->activo) {
                $permitido = true;
                break;
            }
        }

        if (!$permitido) {
            return;
        }

        SendNotificationEmailJob::dispatch([
            'empresa_id' => $empresaId,
            'title' => $event->getTitle(),
            'message' => $event->getMessage(),
        ]);

        NotificationMetric::create([
            'notificacion_id' => null,
            'tipo' => $event->getType(),
            'canal' => 'email',
            'evento' => 'sent',
        ]);
    }
}
