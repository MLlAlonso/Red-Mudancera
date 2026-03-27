<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Empresa\Models\Empresa;
use Carbon\Carbon;
use Exception;

class PlanService
{
    /**
     * Cambiar plan de empresa
     */
    public function changePlan(Empresa $empresa, string $plan, string $tipo = 'mensual'): Empresa
    {
        $this->validatePlan($plan);
        $this->validateTipo($tipo);
        $inicio = now();

        $fin = match ($tipo) {
            'mensual' => $inicio->copy()->addMonth(),
            'anual' => $inicio->copy()->addYear(),
        };

        $empresa->update([
            'plan' => $plan,
            'subActiva' => true,
            'subInicio' => $inicio,
            'subFin' => $fin,
            'freeSince' => null,
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
}