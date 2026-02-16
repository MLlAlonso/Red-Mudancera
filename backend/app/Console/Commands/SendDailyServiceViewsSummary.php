<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Modules\Servicio\Models\ServiceView;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Empresa\Models\Empresa;
use App\Jobs\SendNotificationEmailJob;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SendDailyServiceViewsSummary extends Command
{
    protected $signature = 'notificaciones:daily-views-summary';
    protected $description = 'Envía resumen diario de empresas que vieron servicios';

    public function handle(): void
    {
        $hoy = Carbon::today();

        // Obtener vistas del día agrupadas por servicio
        $views = ServiceView::whereDate('viewed_at', $hoy)
            ->select('servicio_id')
            ->distinct()
            ->pluck('servicio_id');

        foreach ($views as $servicioId) {

            $servicio = Servicio::find($servicioId);
            if (!$servicio) {
                continue;
            }

            // Empresas únicas que vieron el servicio hoy
            $empresas = ServiceView::where('servicio_id', $servicioId)
                ->whereDate('viewed_at', $hoy)
                ->distinct()
                ->pluck('empresa_id');

            if ($empresas->isEmpty()) {
                continue;
            }

            $empresaDueña = Empresa::find($servicio->empresa_id);
            if (!$empresaDueña) {
                continue;
            }

            // Construir mensaje
            $lista = Empresa::whereIn('id', $empresas)
                ->get()
                ->map(function ($empresa) {
                    return "- {$empresa->nombre} ( /empresa/{$empresa->id} )";
                })
                ->implode("\n");

            $mensaje = "Resumen diario de vistas para tu servicio:\n\n"
                . "{$servicio->origen} → {$servicio->destino}\n\n"
                . "Empresas que lo vieron hoy:\n\n"
                . $lista;

            // Enviar email vía Job
            SendNotificationEmailJob::dispatch([
                'empresa_id' => $empresaDueña->id,
                'title' => 'Resumen diario de vistas',
                'message' => $mensaje,
            ]);
        }

        // Opcional: borrar registros del día ya procesados
        ServiceView::whereDate('viewed_at', $hoy)->delete();
    }
}