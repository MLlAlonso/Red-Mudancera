<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\Empresa\Models\Empresa;

class LeadNotaService
{
    public function obtener(Empresa $empresa, int $solicitudId): LeadCompra
    {
        return LeadCompra::where('empresa_id', $empresa->id) ->where('solicitud_id', $solicitudId) ->firstOrFail();
    }

    public function guardar(Empresa $empresa, int $solicitudId, string $contenido): LeadCompra
    {
        $lead = $this->obtener($empresa, $solicitudId);
        $lead->update([ 'nota' => $contenido ]);
        return $lead;
    }
}