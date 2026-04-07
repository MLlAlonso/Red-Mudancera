<?php

namespace App\Modules\Empresa\Services;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\TrialRequest;

class TrialService
{
    public function canRequestTrial(Empresa $empresa): bool
    {
        // tuvo trial activo o aprobado
        if ($empresa->isTrial) {
            return false;
        }

        // ya pagó → no puede pedir trial
        if (in_array($empresa->plan, ['conector', 'radar'])) {
            return false;
        }

        $last = TrialRequest::where('empresa_id', $empresa->id)
            ->latest()
            ->first();

        if (!$last) return true;

        // solo puede reintentar si fue rechazado
        return $last->status === 'rechazado';
    }
}