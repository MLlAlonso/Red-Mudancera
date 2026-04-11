<?php

namespace App\Modules\Empresa\Services;

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

        if ($tipo === 'anual') { return $p['anual']; }

        // mensual
        return $recurrente ? $p['mensual_auto'] : $p['mensual'];
    }
}