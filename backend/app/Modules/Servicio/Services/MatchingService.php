<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Events\RadarMatchFound;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';

        /*
        |--------------------------------------------------------------------------
        | MATCH SERVICIOS
        |--------------------------------------------------------------------------
        */
        $candidatos = Servicio::query()
            ->where('tipo', $tipoOpuesto)
            ->where('estado', 'activo')
            ->where('empresa_id', '!=', $servicio->empresa_id)
            ->where('id', '!=', $servicio->id)
            ->where(function ($q) use ($servicio) {
                $q->where(function ($q2) use ($servicio) {
                    $q2->where('origen', $servicio->origen)
                       ->where('destino', $servicio->destino);
                })->orWhere(function ($q2) use ($servicio) {
                    $q2->where('origen', $servicio->destino)
                       ->where('destino', $servicio->origen);
                });
            })
            ->get();

        $matchesServicios = [];

        foreach ($candidatos as $candidato) {

            // SIEMPRE crea o reutiliza
            ServiceMatch::firstOrCreate([
                'servicio_id' => $servicio->id,
                'match_id' => $candidato->id,
            ]);

            $radar = RadarMatch::firstOrCreate([
                'servicio_id' => $servicio->id,
                'match_type' => 'servicio',
                'matched_servicio_id' => $candidato->id,
            ]);

            // SOLO dispara evento si es NUEVO
            if ($radar->wasRecentlyCreated) {
                event(new RadarMatchFound($servicio, $candidato));
            }

            $matchesServicios[] = $candidato;
        }

        /*
        |--------------------------------------------------------------------------
        | MATCH SOLICITUDES
        |--------------------------------------------------------------------------
        */
        $matchesSolicitudes = [];

        if ($servicio->tipo === 'busco') {

            $solicitudes = SolicitudMudanza::query()
                ->where('estado', 'activo')
                ->where('compras_count', '<', 3)
                ->where(function ($q) use ($servicio) {
                    $q->where(function ($q2) use ($servicio) {
                        $q2->where('origen', $servicio->origen)
                           ->where('destino', $servicio->destino);
                    })->orWhere(function ($q2) use ($servicio) {
                        $q2->where('origen', $servicio->destino)
                           ->where('destino', $servicio->origen);
                    });
                })
                ->get();

            foreach ($solicitudes as $solicitud) {

                RadarMatch::firstOrCreate([
                    'servicio_id' => $servicio->id,
                    'match_type' => 'solicitud',
                    'solicitud_id' => $solicitud->id,
                ]);

                $matchesSolicitudes[] = $solicitud;
            }
        }

        return [
            'servicios' => $matchesServicios,
            'solicitudes' => $matchesSolicitudes,
        ];
    }
}