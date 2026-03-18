<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Events\RadarMatchFound;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';
        $candidatos = Servicio::query()
            ->where('tipo', $tipoOpuesto)
            ->where('destino', $servicio->destino)
            ->where('estado', 'activo')
            ->where('empresa_id', '!=', $servicio->empresa_id)
            ->where('id', '!=', $servicio->id)
            ->limit(20)
            ->get();
        $matchesGuardados = [];

        foreach ($candidatos as $candidato) {
            $existe = ServiceMatch::where(function ($q) use ($servicio, $candidato) {
                $q->where('servicio_id', $servicio->id)
                    ->where('match_id', $candidato->id);
            })->orWhere(function ($q) use ($servicio, $candidato) {
                $q->where('servicio_id', $candidato->id)
                    ->where('match_id', $servicio->id);
            })->exists();

            if (!$existe) {
                ServiceMatch::create([
                    'servicio_id' => $servicio->id,
                    'match_id' => $candidato->id,
                ]);

                // DISPARAR EVENTO
                event(new RadarMatchFound($servicio, $candidato));
            }
            $matchesGuardados[] = $candidato;
        }
        return $matchesGuardados;
    }
}
