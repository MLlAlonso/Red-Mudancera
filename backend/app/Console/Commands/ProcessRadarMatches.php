<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\Servicio\Services\MatchingService;
use Illuminate\Support\Facades\Mail;
use App\Modules\Servicio\Mail\RadarMatchesMail;
use App\Modules\Empresa\Models\Empresa;
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
        | SERVICIOS A PROCESAR
        |--------------------------------------------------------------------------
        */
        $servicios = Servicio::where('estado', 'activo')
            ->where(function ($q) use ($now) {
                $q->whereNull('last_radar_run_at')
                    ->orWhere('last_radar_run_at', '<=', $now->copy()->subMinutes(30));
            })
            ->get();

        foreach ($servicios as $servicio) {
            $created = $servicio->created_at;
            $minutes = $created->diffInMinutes($now);
            $stage = $servicio->radar_stage ?? 0;
            $shouldRun = false;
            $lastRun = $servicio->last_radar_run_at;
            $minutesSinceLastRun = $lastRun
                ? $lastRun->diffInMinutes($now)
                : null;

            /*
            |--------------------------------------------------------------------------
            | RADAR STAGE (PRIORIDAD)
            |--------------------------------------------------------------------------
            */
            switch ($stage) {
                case 0:
                    if ($minutes >= 5) {
                        $shouldRun = true;
                        $servicio->radar_stage = 1;
                    }
                    break;

                case 1:
                    if ($minutes >= 60 * 24) {
                        $shouldRun = true;
                        $servicio->radar_stage = 2;
                    }
                    break;

                case 2:
                    if ($minutes >= 60 * 24 * 3) {
                        $shouldRun = true;
                        $servicio->radar_stage = 3;
                    }
                    break;

                case 3:
                    if ($minutes >= 60 * 24 * 5) {
                        $shouldRun = true;
                        $servicio->radar_stage = 4;
                    }
                    break;

                case 4:
                    if ($minutes >= 60 * 24 * 7) {
                        $shouldRun = true;
                        $servicio->radar_stage = 5;
                    }
                    break;
            }

            /*
            |--------------------------------------------------------------------------
            | FRECUENCIA DINÁMICA
            |--------------------------------------------------------------------------
            */
            if (!$shouldRun) {
                if ($minutes < 60 * 24 * 4) {
                    $dynamicInterval = 60 * 12;
                } elseif ($minutes < 60 * 24 * 6) {
                    $dynamicInterval = 60 * 24;
                } else {
                    $dynamicInterval = 60 * 48;
                }

                if ($lastRun !== null && $minutesSinceLastRun < $dynamicInterval) {
                    continue;
                }
                $shouldRun = true;
            }

            /*
            |--------------------------------------------------------------------------
            | 🔥 EJECUTAR MATCHING
            |--------------------------------------------------------------------------
            */
            if ($shouldRun) {
                $this->info("Matching servicio {$servicio->id}");
                $matchingService->matchForServicio($servicio);
                $servicio->update([
                    'last_radar_run_at' => $now,
                    'radar_stage' => $servicio->radar_stage
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | MATCHES NO NOTIFICADOS (GLOBAL)
        |--------------------------------------------------------------------------
        */
        $matches = RadarMatch::where('notified', false)->get();
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
            $servicio = Servicio::find($servicioId);
            if (!$servicio) continue;
            $serviciosMatches = [];
            $solicitudesMatches = [];
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
                    empresaId: $servicio->empresa_id,
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
            $empresa = Empresa::find($servicio->empresa_id);
            if ($empresa && $empresa->email) {
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