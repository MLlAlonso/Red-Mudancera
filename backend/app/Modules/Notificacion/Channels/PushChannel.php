<?php

namespace App\Modules\Notificacion\Channels;

use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Models\NotificationPreference;
use App\Modules\Notificacion\Models\NotificationMetric;
use App\Modules\Usuario\Models\Usuario;
use Illuminate\Support\Facades\Log;

class PushChannel implements NotificationChannelInterface
{
    public function send(BaseNotificationEvent $event): void
    {
        $empresaId = $event->getEmpresaId();
        if (!$empresaId) {
            return;
        }

        if (!$event->shouldNotifyUsuarios()) {
            return;
        }

        $usuarios = Usuario::where('empresa_id', $empresaId)
            ->where('activoEmpresa', true)
            ->get();

        foreach ($usuarios as $usuario) {
            $pref = NotificationPreference::where([
                'usuario_id' => $usuario->id,
                'tipo' => $event->getType(),
                'canal' => 'push',
            ])->first();

            if ($pref && !$pref->activo) {
                continue;
            }

            // Aquí irá envío real cuando conectemos Web Push
            Log::info('Push estructural disparado', [
                'usuario_id' => $usuario->id,
                'titulo' => $event->getTitle(),
                'mensaje' => $event->getMessage(),
            ]);

            NotificationMetric::create([
                'notificacion_id' => null,
                'tipo' => $event->getType(),
                'canal' => 'push',
                'evento' => 'sent',
            ]);
        }
    }
}
