<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Events\RadarMatchFound;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';

        /*
    |--------------------------------------------------------------------------
    | MATCHES SERVICIOS
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
            $existe = RadarMatch::where([
                'servicio_id' => $servicio->id,
                'match_type' => 'servicio',
                'matched_servicio_id' => $candidato->id,
            ])->exists();

            if (!$existe) {
                // guardar relación real
                ServiceMatch::firstOrCreate([
                    'servicio_id' => $servicio->id,
                    'match_id' => $candidato->id,
                ]);
                // guardar en radar (tracking)
                RadarMatch::create([
                    'servicio_id' => $servicio->id,
                    'match_type' => 'servicio',
                    'matched_servicio_id' => $candidato->id,
                ]);
            }

            $matchesServicios[] = $candidato;
        }

        /*
    |--------------------------------------------------------------------------
    | MATCHES SOLICITUDES
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
                $existe = RadarMatch::where([
                    'servicio_id' => $servicio->id,
                    'match_type' => 'solicitud',
                    'solicitud_id' => $solicitud->id,
                ])->exists();

                if (!$existe) {
                    RadarMatch::create([
                        'servicio_id' => $servicio->id,
                        'match_type' => 'solicitud',
                        'solicitud_id' => $solicitud->id,
                    ]);
                }
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