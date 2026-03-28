<?php

namespace App\Modules\Empresa\Services;
use Carbon\Carbon;

class PricingService
{
    protected array $precios = [
        'conector' => [
            'mensual' => 649,
            'mensual_auto' => 616,
            'anual' => 6599,
        ],
        'radar' => [
            'mensual' => 899,
            'mensual_auto' => 854,
            'anual' => 9199,
        ],
    ];

    public function calcular(string $plan, string $tipo, bool $recurrente = true): int
    {
        if (!isset($this->precios[$plan])) {
            throw new \Exception('Plan inválido');
        }

        $p = $this->precios[$plan];

        // ANUAL PRORRATEADO
        if ($tipo === 'anual') {
            return $this->calcularAnualProrrateado($plan);
        }

        // mensual
        return $recurrente ? $p['mensual_auto'] : $p['mensual'];
    }

    private function calcularAnualProrrateado(string $plan): int
    {
        $p = $this->precios[$plan];
        $mesActual = Carbon::now()->month;
        $mesesRestantes = 12 - $mesActual + 1;
        $precioPorMes = $p['anual'] / 12;
        return round($precioPorMes * $mesesRestantes);
    }
}