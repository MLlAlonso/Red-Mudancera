<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\Notificacion\Events\CreditosAgregadosEvent;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Notificacion\Services\NotificationDispatcher;

class ReferralService
{
    public function procesarRecompensa(SolicitudMudanza $solicitud)
    {
        if (!$solicitud->referido_por_empresa_id) {
            return;
        }

        $empresa = Empresa::find($solicitud->referido_por_empresa_id);
        if (!$empresa) {
            return;
        }

        $compras = $solicitud->compras_count;
        $tipoServicio = $solicitud->tipo_servicio;

        // Obtener última compra
        $ultimaCompra = $solicitud->compras()
            ->latest()
            ->first();

        $esExclusiva = $ultimaCompra?->exclusivo ?? false;

        /*
    |--------------------------------------------------------------------------
    | PRIMERA VENTA
    |--------------------------------------------------------------------------
    */
        if ($compras === 1) {
            // Si se compró como exclusiva
            if ($esExclusiva) {
                $creditos = match ($tipoServicio) {
                    'local' => 5,
                    'foranea' => 13,
                    default => 0
                };
            } else {
                $creditos = match ($tipoServicio) {
                    'local' => 3,
                    'foranea' => 8,
                    default => 0
                };
            }

            if ($creditos > 0) {
                $empresa->incrementQuietly('tokens', $creditos);

                app(NotificationDispatcher::class)->dispatch(
                    new CreditosAgregadosEvent(
                        $empresa->id,
                        $creditos
                    )
                );
            }
        }

        /*
    |--------------------------------------------------------------------------
    | BONO POR ALTA DEMANDA (3 ventas)
    |--------------------------------------------------------------------------
    */
        if ($compras === 3) {
            $bono = match ($tipoServicio) {
                'local' => 3,
                'foranea' => 7,
                default => 0
            };
            if ($bono > 0) {
                $empresa->incrementQuietly('tokens', $bono);

                app(NotificationDispatcher::class)->dispatch(
                    new CreditosAgregadosEvent(
                        $empresa->id,
                        $bono
                    )
                );
            }
        }
    }
}