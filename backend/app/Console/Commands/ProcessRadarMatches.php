<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\Servicio\Services\MatchingService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\RadarMatchNotificationEvent;
use Illuminate\Support\Facades\Mail;
use App\Modules\Servicio\Mail\RadarMatchesMail;
use App\Modules\Empresa\Models\Empresa;

class ProcessRadarMatches extends Command
{
    protected $signature = 'radar:process';
    protected $description = 'Procesa radar matches y envía notificaciones agrupadas';

    public function handle()
    {
        $this->info('Procesando radar...');
        $matchingService = new MatchingService();

        /*
        |--------------------------------------------------------------------------
        | Ejecutar matching en ventanas de tiempo
        |--------------------------------------------------------------------------
        */
        $servicios = Servicio::where('estado', 'activo')->get();
        foreach ($servicios as $servicio) {
            $created = Carbon::parse($servicio->created_at);
            $now = Carbon::now();
            $minutes = $created->diffInMinutes($now);
            $hours = $created->diffInHours($now);
            $days = $created->diffInDays($now);
            if (
                $minutes === 5 ||
                $hours === 24 ||
                $days === 3 ||
                $days === 5 ||
                $days === 7
            ) {
                $this->info("Ejecutando matching para servicio {$servicio->id}");
                $matchingService->matchForServicio($servicio);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Obtener matches no notificados
        |--------------------------------------------------------------------------
        */
        $matches = RadarMatch::where('notified', false)->get();
        if ($matches->isEmpty()) {
            $this->info('No hay matches nuevos');
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Agrupar por servicio
        |--------------------------------------------------------------------------
        */
        $grouped = $matches->groupBy('servicio_id');
        foreach ($grouped as $servicioId => $items) {
            $servicio = Servicio::find($servicioId);
            if (!$servicio) continue;
            $serviciosMatches = [];
            $solicitudesMatches = [];
            foreach ($items as $item) {
                if ($item->match_type === 'servicio') {
                    $serviciosMatches[] = $item->matched_servicio_id;
                } else {
                    $solicitudesMatches[] = $item->solicitud_id;
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Enviar correo (placeholder por ahora)
            |--------------------------------------------------------------------------
            */
            $dispatcher = app(NotificationDispatcher::class);
            $totalMatches = count($serviciosMatches) + count($solicitudesMatches);
            $origen = $servicio->origen;
            $destino = $servicio->destino;

            $dispatcher->dispatch(
                new RadarMatchNotificationEvent(
                    empresaId: $servicio->empresa_id,
                    titulo: 'Nuevas coincidencias encontradas',
                    mensaje: "Se encontraron {$totalMatches} coincidencias para tu ruta {$origen} → {$destino},  consulta tu correo para mayor detalle",
                    data: [
                        'servicio_id' => $servicio->id,
                        'servicios_matches' => $serviciosMatches,
                        'solicitudes_matches' => $solicitudesMatches,
                    ]
                )
            );

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
            | Marcar como notificados
            |--------------------------------------------------------------------------
            */
            RadarMatch::whereIn('id', $items->pluck('id'))->update([
                'notified' => true
            ]);
        }
        $this->info('Radar procesado correctamente');
    }
}
