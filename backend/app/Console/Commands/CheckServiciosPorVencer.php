<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\ServicioPorVencerEvent;
use Carbon\Carbon;

class CheckServiciosPorVencer extends Command
{
    protected $signature = 'notificaciones:check-expiring';
    protected $description = 'Verifica servicios que vencen en 24 horas';

    public function handle(): void
    {
        $now = Carbon::now();
        $limit = $now->copy()->addDay();

        $servicios = Servicio::where('estado', 'activo')
            ->where('expiration_notified', false)
            ->whereBetween('fin', [$now, $limit])
            ->get();

        foreach ($servicios as $servicio) {

            app(NotificationDispatcher::class)->dispatch(
                new ServicioPorVencerEvent([
                    'empresa_id' => $servicio->empresa_id,
                    'servicio' => $servicio,
                ])
            );

            $servicio->update([
                'expiration_notified' => true
            ]);
        }
    }
}