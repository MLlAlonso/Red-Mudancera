<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Events\RadarMatchFound;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';

        /*
    |--------------------------------------------------------------------------
    | MATCHES SERVICIOS (LO QUE YA TENÍAS)
    |--------------------------------------------------------------------------
    */
        $candidatosServicios = Servicio::query()
            ->where('tipo', $tipoOpuesto)
            ->where('destino', $servicio->destino)
            ->where('estado', 'activo')
            ->where('empresa_id', '!=', $servicio->empresa_id)
            ->where('id', '!=', $servicio->id)
            ->limit(20)
            ->get();

        $matchesServicios = [];

        foreach ($candidatosServicios as $candidato) {

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

                // 🔔 Evento SOLO para servicios
                event(new RadarMatchFound($servicio, $candidato));
            }

            $matchesServicios[] = $candidato;
        }

        /*
    |--------------------------------------------------------------------------
    | MATCHES SOLICITUDES (NUEVO 🔥)
    |--------------------------------------------------------------------------
    */
        $matchesSolicitudes = [];

        // SOLO aplica cuando alguien BUSCA
        if ($servicio->tipo === 'busco') {

            $solicitudes = SolicitudMudanza::query()
                ->where('estado', 'activo')
                ->where('compras_count', '<', 3)
                ->where(function ($q) use ($servicio) {
                    $q->where(function ($q2) use ($servicio) {
                        $q2->where('origen', $servicio->origen)
                            ->where('destino', $servicio->destino);
                    })
                        ->orWhere(function ($q2) use ($servicio) {
                            $q2->where('origen', $servicio->destino)
                                ->where('destino', $servicio->origen);
                        });
                })
                ->limit(20)
                ->get();

            foreach ($solicitudes as $solicitud) {

                // 🔴 Aquí NO guardamos en service_matches
                // 🔴 Tampoco disparamos RadarMatchFound (otro tipo de evento después)

                $matchesSolicitudes[] = $solicitud;
            }
        }

        /*
    |--------------------------------------------------------------------------
    | RESPONSE FINAL
    |--------------------------------------------------------------------------
    */
        return [
            'servicios' => $matchesServicios,
            'solicitudes' => $matchesSolicitudes,
        ];
    }
}
