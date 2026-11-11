<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\Empresa\Models\Empresa;

class ReciboColorService
{
    private const DEFAULT_COLORS = [
        'primary' => '#09233E',
        'secondary' => '#ABB0B4',
        'accent' => '#1C8F6A',
        'background' => '#F4F7F6',
        'text' => '#202B35',
    ];

    public function obtener(Empresa $empresa): array
    {
        $personalizados = $empresa->recibo_colores ?? [];
        $colores = array_merge(self::DEFAULT_COLORS, $personalizados);

        foreach ($colores as $color) {
            if (!is_string($color) || !preg_match('/^#[0-9A-Fa-f]{6}$/', $color)) {
                return self::DEFAULT_COLORS;
            }
        }

        return $colores;
    }
}