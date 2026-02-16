<?php

namespace App\Modules\Notificacion\Channels;
use App\Modules\Notificacion\Models\Notificacion;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Notificacion\Events\BaseNotificationEvent;

class DatabaseChannel implements NotificationChannelInterface
{
    public function send(BaseNotificationEvent $event): void
    {
        $empresaId = $event->getEmpresaId();
        if (!$empresaId) {
            return;
        }

        $notificacion = Notificacion::create([
            'empresa_id' => $empresaId,
            'titulo' => $event->getTitle(),
            'mensaje' => $event->getMessage(),
            'tipo' => $event->getType(),
            'url_destino' => $event->getUrl(),
            'creado_por' => 'system',
        ]);

        if ($event->shouldNotifyUsuarios()) {
            $usuarios = Usuario::where('empresa_id', $empresaId)
                ->where('activoEmpresa', true)
                ->pluck('id');

            $notificacion->usuarios()->syncWithoutDetaching(
                $usuarios->toArray()
            );
        }
    }
}