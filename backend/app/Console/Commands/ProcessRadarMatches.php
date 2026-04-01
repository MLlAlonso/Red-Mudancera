<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\Servicio\Services\MatchingService;
use Illuminate\Support\Facades\Mail;
use App\Modules\Servicio\Mail\RadarMatchesMail;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\RadarMatchNotificationEvent;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class ProcessRadarMatches extends Command
{
    protected $signature = 'radar:process';
    protected $description = 'Procesa radar matches y envía notificaciones agrupadas';

    public function handle()
    {
        $this->info('Procesando radar...');
        $matchingService = new MatchingService();
        $now = now();

        /*
        |--------------------------------------------------------------------------
        | SERVICIOS A PROCESAR (OPTIMIZADO)
        |--------------------------------------------------------------------------
        */
        Servicio::where('estado', 'activo')
            ->whereHas('empresa', function ($q) {
                $q->whereIn('plan', ['conector', 'radar']);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('last_radar_run_at')
                  ->orWhere('last_radar_run_at', '<=', $now->copy()->subHour());
            })
            ->chunk(100, function ($servicios) use ($matchingService, $now) {

                foreach ($servicios as $servicio) {
                    $this->info("Matching servicio {$servicio->id}");
                    $matchingService->matchForServicio($servicio);
                    $servicio->update([
                        'last_radar_run_at' => $now
                    ]);
                }
            });

        /*
        |--------------------------------------------------------------------------
        | MATCHES NO NOTIFICADOS (SOLO HOY)
        |--------------------------------------------------------------------------
        */
        $matches = RadarMatch::where('notified', false)
            ->whereDate('created_at', today())
            ->get();
        if ($matches->isEmpty()) {
            $this->info('No hay matches nuevos');
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | AGRUPAR POR SERVICIO
        |--------------------------------------------------------------------------
        */
        $grouped = $matches->groupBy('servicio_id');

        foreach ($grouped as $servicioId => $items) {
            $servicio = Servicio::with('empresa')->find($servicioId);
            if (!$servicio || !$servicio->empresa) continue;

            $empresa = $servicio->empresa;

            /*
            |--------------------------------------------------------------------------
            | OBTENER MATCHES
            |--------------------------------------------------------------------------
            */
            $serviciosMatches = Servicio::whereIn(
                'id',
                $items->where('match_type', 'servicio')->pluck('matched_servicio_id')
            )->get();

            $solicitudesMatches = SolicitudMudanza::whereIn(
                'id',
                $items->where('match_type', 'solicitud')->pluck('solicitud_id')
            )->get();

            $totalMatches = $serviciosMatches->count() + $solicitudesMatches->count();
            if ($totalMatches === 0) continue;

            /*
            |--------------------------------------------------------------------------
            | NOTIFICACIÓN FRONTEND
            |--------------------------------------------------------------------------
            */
            app(NotificationDispatcher::class)->dispatch(
                new RadarMatchNotificationEvent(
                    empresaId: $empresa->id,
                    titulo: 'Tienes nuevas coincidencias disponibles',
                    mensaje: 'Encontramos nuevas oportunidades. Revisa tu correo para ver los detalles.',
                    data: [
                        'servicio_id' => $servicio->id,
                    ]
                )
            );

            /*
            |--------------------------------------------------------------------------
            | EMAIL
            |--------------------------------------------------------------------------
            */
            if ($empresa->email) {
                Mail::to($empresa->email)->send(
                    new RadarMatchesMail(
                        $empresa,
                        $servicio,
                        $serviciosMatches,
                        $solicitudesMatches
                    )
                );
            }

            /*
            |--------------------------------------------------------------------------
            | MARCAR COMO NOTIFICADO
            |--------------------------------------------------------------------------
            */
            RadarMatch::whereIn('id', $items->pluck('id'))
                ->update(['notified' => true]);
        }

        $this->info('Radar procesado correctamente');
    }
}