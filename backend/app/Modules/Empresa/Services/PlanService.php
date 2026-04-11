<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Empresa\Models\Empresa;
use Carbon\Carbon;
use Exception;

// TODO: usar $recurrente cuando integremos Stripe

class PlanService
{
    /**
     * Cambiar plan de empresa
     */
    public function changePlan(Empresa $empresa, string $plan, string $tipo = 'mensual', bool $recurrente = true): Empresa
    {
        $this->validatePlan($plan);
        $this->validateTipo($tipo);
        $inicio = now();

        if ($tipo === 'anual') {
            $fin = $inicio->copy()->addYear();
        } else {
            $fin = $inicio->copy()->addMonth();
        }

        $empresa->update([
            'plan' => $plan,
            'subActiva' => true,
            'subInicio' => $inicio,
            'subFin' => $fin,
            'freeSince' => null,
            'isTrial' => false,
            'trialEndsAt' => null,
        ]);

        return $empresa->fresh();
    }

    /**
     * Validar plan
     */
    private function validatePlan(string $plan): void
    {
        $planesValidos = ['free', 'conector', 'radar'];
        if (!in_array($plan, $planesValidos)) {
            throw new Exception('Plan inválido');
        }
    }

    /**
     * Validar tipo de suscripción
     */
    private function validateTipo(string $tipo): void
    {
        $tiposValidos = ['mensual', 'anual'];
        if (!in_array($tipo, $tiposValidos)) {
            throw new Exception('Tipo de suscripción inválido');
        }
    }

    public function isFree(Empresa $empresa): bool
    {
        return $empresa->plan === 'free';
    }

    public function isConector(Empresa $empresa): bool
    {
        return $empresa->plan === 'conector';
    }

    public function isRadar(Empresa $empresa): bool
    {
        return $empresa->plan === 'radar';
    }

    /**
     * Radar activo?
     */
    public function canUseRadar(Empresa $empresa): bool
    {
        return in_array($empresa->plan, ['conector', 'radar']);
    }

    /**
     * Límite de ciudades
     */
    public function getRadarCitiesLimit(Empresa $empresa): int
    {
        return $this->isConector($empresa) ? 2 : 999;
    }

    /**
     * Delay en minutos (0 = real time)
     */
    public function getRadarDelay(Empresa $empresa): int
    {
        return $this->isConector($empresa) ? 30 : 0;
    }

    /**
     * Puede cambiar ciudades?
     */
    public function canChangeCities(Empresa $empresa, $config): bool
    {
        if (!$this->isConector($empresa)) return true;
        if (!$config || !$config->updated_at) return true;
        return $config->updated_at->addDays(30)->isPast();
    }
}
