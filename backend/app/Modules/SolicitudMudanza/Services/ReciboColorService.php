<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\Empresa\Models\Empresa;
use Illuminate\Validation\ValidationException;

class ReciboColorService
{
    private const DEFAULT_COLORS = [
        'primary' => '#09233E',
        'secondary' => '#ABB0B4',
        'accent' => '#1C8F6A',
        'background' => '#F4F7F6',
        'text' => '#202B35',
    ];

    /**
     * Obtener colores de la empresa.
     */
    public function obtener(Empresa $empresa): array
    {
        $personalizados = $empresa->recibo_colores ?? [];

        if (!is_array($personalizados)) {
            $personalizados = [];
        }

        return [
            'primary' => $this->colorValido($personalizados['primary'] ?? null) ? strtoupper($personalizados['primary']) : self::DEFAULT_COLORS['primary'],
            'secondary' => self::DEFAULT_COLORS['secondary'],
            'accent' => $this->colorValido($personalizados['accent'] ?? null) ? strtoupper($personalizados['accent']) : self::DEFAULT_COLORS['accent'],
            'background' => self::DEFAULT_COLORS['background'],
            'text' => self::DEFAULT_COLORS['text'],
        ];
    }

    public function guardar(Empresa $empresa, array $data): array
    {
        $primary = strtoupper($data['primary'] ?? '');
        $accent = strtoupper($data['accent'] ?? '');

        if (!$this->colorValido($primary) || !$this->colorValido($accent)) {
            throw ValidationException::withMessages(['colores' => 'Los colores deben tener un código HEX válido.',]);
        }

        $empresa->recibo_colores = ['primary' => $primary, 'accent' => $accent,];
        $empresa->save();
        return $this->obtener($empresa->fresh());
    }

    public function restablecer(Empresa $empresa): array
    {
        $empresa->recibo_colores = null;
        $empresa->save();
        return $this->obtener($empresa->fresh());
    }

    private function colorValido($color): bool
    {
        return is_string($color) && preg_match('/^#[0-9A-Fa-f]{6}$/', $color) === 1;
    }

    public function obtenerPredeterminados(): array
    {
        return [
            'primary' => self::DEFAULT_COLORS['primary'],
            'accent' => self::DEFAULT_COLORS['accent'],
        ];
    }
}
