<?php

namespace App\Modules\Notificacion\Channels;
use App\Modules\Notificacion\Models\Notificacion;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Notificacion\Models\NotificationMetric;

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

        NotificationMetric::create([
            'notificacion_id' => $notificacion->id,
            'tipo' => $event->getType(),
            'canal' => 'database',
            'evento' => 'sent',
        ]);

        if ($event->shouldNotifyUsuarios()) {

            $usuarios = Usuario::where('empresa_id', $empresaId)
                ->where('activoEmpresa', true)
                ->get();

            $userIds = $usuarios->pluck('id')->toArray();

            // Traer preferencias activas en una sola consulta
            $preferenciasDesactivadas = \App\Modules\Notificacion\Models\NotificationPreference::whereIn('usuario_id', $userIds)
                ->where('tipo', $event->getType())
                ->where('canal', 'database')
                ->where('activo', false)
                ->pluck('usuario_id')
                ->toArray();

            foreach ($usuarios as $usuario) {
                if (in_array($usuario->id, $preferenciasDesactivadas)) {
                    continue;
                }
                $notificacion->usuarios()->syncWithoutDetaching([$usuario->id]);
            }
        }
    }
}