<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\PlanExpiringEvent;
use App\Modules\Notificacion\Events\PlanExpiredEvent;
use App\Modules\Notificacion\Events\FreePlanInactiveEvent;
use App\Modules\Notificacion\Events\TrialEnding5DaysEvent;
use App\Modules\Notificacion\Events\TrialEndingTomorrowEvent;
use App\Modules\Notificacion\Events\TrialExpiredEvent;

class CheckSubscriptions extends Command
{
    protected $signature = 'subscriptions:check';
    protected $description = 'Verifica suscripciones y maneja expiraciones';

    public function handle()
    {
        $empresas = Empresa::all();

        foreach ($empresas as $empresa) {
            /**
             * ============================
             * Prueba gratuita
             * ============================
             */

            if ($empresa->isTrial && $empresa->trialEndsAt) {
                $diasRestantes = now()->diffInDays($empresa->trialEndsAt, false);

                if ($diasRestantes === 5) {
                    app(NotificationDispatcher::class)->dispatch(
                        new TrialEnding5DaysEvent($empresa->id)
                    );
                }

                if ($diasRestantes === 1) {
                    app(NotificationDispatcher::class)->dispatch(
                        new TrialEndingTomorrowEvent($empresa->id)
                    );
                }

                if ($diasRestantes < 0) {
                    $empresa->update([
                        'plan' => 'free',
                        'subActiva' => false,
                        'freeSince' => now(),
                        'isTrial' => false,
                    ]);

                    app(NotificationDispatcher::class)->dispatch(
                        new TrialExpiredEvent($empresa->id)
                    );
                }
            }

            /**
             * ============================
             * PLANES DE PAGO
             * ============================
             */
            if (!$empresa->isTrial && $empresa->plan !== 'free' && $empresa->subActiva) {
                $diasRestantes = now()->diffInDays($empresa->subFin, false);
                // Aviso 3 días antes
                if ($diasRestantes === 3) {
                    app(NotificationDispatcher::class)->dispatch(
                        new PlanExpiringEvent($empresa->id, $empresa->subFin)
                    );
                }

                // Expiración
                if ($diasRestantes < 0) {
                    $empresa->update([
                        'plan' => 'free',
                        'subActiva' => false,
                        'freeSince' => now(),
                    ]);

                    app(NotificationDispatcher::class)->dispatch(
                        new PlanExpiredEvent($empresa->id)
                    );
                }
            }

            /**
             * ============================
             * PLAN FREE (INACTIVIDAD)
             * ============================
             */
            if ($empresa->plan === 'free') {
                if (!$empresa->freeSince) continue;
                $diasFree = now()->diffInDays($empresa->freeSince);
                // Aviso en día 45
                if ($diasFree === 45) {
                    $fechaLimite = now()->addDays(15);
                    app(NotificationDispatcher::class)->dispatch(
                        new FreePlanInactiveEvent(
                            $empresa->id,
                            $fechaLimite
                        )
                    );
                }

                // Eliminación en día 60
                if ($diasFree >= 60) {
                    $empresa->tokens()->delete();
                    $empresa->delete();
                }
            }
        }
        return Command::SUCCESS;
    }
}