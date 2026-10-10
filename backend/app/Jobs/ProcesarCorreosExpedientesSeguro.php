<?php

namespace App\Jobs;

use App\Modules\Seguro\Mail\InvitacionExpedienteSeguroMail;
use App\Modules\Seguro\Mail\RecordatorioExpedienteSeguroMail;
use App\Modules\Seguro\Mail\VideoExpedienteSeguroMail;
use App\Modules\Seguro\Services\ExpedienteSeguroService;
use App\Modules\Seguro\Mail\SegundoRecordatorioExpedienteSeguroMail;
use App\Modules\Seguro\Mail\TercerRecordatorioExpedienteSeguroMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProcesarCorreosExpedientesSeguro implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public function handle(ExpedienteSeguroService $service): void
    {
        /*
        |--------------------------------------------------------------------------
        | Video - 24 horas
        |--------------------------------------------------------------------------
        */
        $expedientesVideo = $service->obtenerExpedientesParaVideo();

        foreach ($expedientesVideo as $expediente) {
            if (in_array($expediente->estado, ['completado', 'cancelado'], true)) {
                continue;
            }

            try {
                Mail::to($expediente->email)->send(new VideoExpedienteSeguroMail($expediente));
                $service->marcarVideoEnviado($expediente);

                Log::info('Correo de video de expediente de seguro enviado.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('Error enviando correo de video de expediente de seguro.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Invitación - 48 horas
        |--------------------------------------------------------------------------
        */
        $expedientesIniciales = $service->obtenerExpedientesParaInvitacionInicial();

        foreach ($expedientesIniciales as $expediente) {
            if (in_array($expediente->estado, ['completado', 'cancelado'], true)) {
                continue;
            }

            try {
                Mail::to($expediente->email)->send(new InvitacionExpedienteSeguroMail($expediente));
                $service->marcarInvitacionEnviada($expediente);

                Log::info('Invitación inicial de expediente de seguro enviada.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('Error enviando invitación inicial de expediente de seguro.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Recordatorio - 5 días
        |--------------------------------------------------------------------------
        */
        $expedientesRecordatorio = $service->obtenerExpedientesParaRecordatorio();

        foreach ($expedientesRecordatorio as $expediente) {
            if (in_array($expediente->estado, ['completado', 'cancelado'], true)) {
                continue;
            }

            try {
                Mail::to($expediente->email)->send(new RecordatorioExpedienteSeguroMail($expediente));
                $service->marcarRecordatorioEnviado($expediente);

                Log::info('Recordatorio de expediente de seguro enviado.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('Error enviando recordatorio de expediente de seguro.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Segundo recordatorio - 10 días
        |--------------------------------------------------------------------------
        */
        $expedientesSegundoRecordatorio = $service->obtenerExpedientesParaSegundoRecordatorio();

        foreach ($expedientesSegundoRecordatorio as $expediente) {
            if (in_array($expediente->estado, ['completado', 'cancelado'], true)) {
                continue;
            }

            try {
                Mail::to($expediente->email)->send( new SegundoRecordatorioExpedienteSeguroMail($expediente) );
                $service->marcarSegundoRecordatorioEnviado($expediente);

                Log::info('Segundo recordatorio de expediente de seguro enviado.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('Error enviando segundo recordatorio de expediente de seguro.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Tercer recordatorio - 15 días
        |--------------------------------------------------------------------------
        */
        $expedientesTercerRecordatorio = $service->obtenerExpedientesParaTercerRecordatorio();

        foreach ($expedientesTercerRecordatorio as $expediente) {
            if (in_array($expediente->estado, ['completado', 'cancelado'], true)) {
                continue;
            }

            try {
                Mail::to($expediente->email)->send( new TercerRecordatorioExpedienteSeguroMail($expediente) );
                $service->marcarTercerRecordatorioEnviado($expediente);

                Log::info('Tercer recordatorio de expediente de seguro enviado.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('Error enviando tercer recordatorio de expediente de seguro.', [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}