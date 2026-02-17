<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Modules\Notificacion\Events\BaseNotificationEvent;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Empresa\Models\Empresa;
use Illuminate\Support\Facades\Log;

class SendNotificationEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected array $eventData;

    public function __construct(array $eventData)
    {
        $this->eventData = $eventData;
    }

    public function handle(): void
    {
        try {
            $empresa = Empresa::find($this->eventData['empresa_id']);
            if (!$empresa) {
                return;
            }

            $usuarios = Usuario::where('empresa_id', $empresa->id)
                ->where('activoEmpresa', true)
                ->get();

            Log::info('Email enviado (simulado)', [
                'empresa' => $empresa->email ?? null,
                'usuarios' => $usuarios->pluck('email'),
                'titulo' => $this->eventData['title'],
                'mensaje' => $this->eventData['message'],
            ]);
        } catch (\Throwable $e) {

            \App\Modules\Notificacion\Models\NotificationMetric::create([
                'notificacion_id' => null,
                'tipo' => 'sistema',
                'canal' => 'email',
                'evento' => 'failed',
            ]);

            throw $e;
        }

        /*
        Aquí irá integración con Resend
        */
    }
}