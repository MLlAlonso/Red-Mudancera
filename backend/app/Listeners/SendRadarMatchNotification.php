<?php

namespace App\Listeners;
use App\Events\RadarMatchFound;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\RadarMatchNotificationEvent;

class SendRadarMatchNotification
{
    public function handle(RadarMatchFound $event)
    {
        $dispatcher = app(NotificationDispatcher::class);
        $servicio = $event->servicio;
        $match = $event->match;

        // Empresa A
        $dispatcher->dispatch(
            new RadarMatchNotificationEvent(
                empresaId: $servicio->empresa_id,
                titulo: 'Nueva oportunidad en tu ruta',
                mensaje: 'Hay una carga o cliente que coincide con tu servicio, revísala antes de que alguien más la tome.',
                data: [
                    'servicio_id' => $servicio->id,
                    'match_id' => $match->id,
                ]
            )
        );

        // Empresa B
        $dispatcher->dispatch(
            new RadarMatchNotificationEvent(
                empresaId: $match->empresa_id,
                titulo: 'Nueva oportunidad en tu ruta',
                mensaje: 'Hay una carga o cliente que coincide con tu servicio, revísala antes de que alguien más la tome.',
                data: [
                    'servicio_id' => $match->id,
                    'match_id' => $servicio->id,
                ]
            )
        );
    }
}