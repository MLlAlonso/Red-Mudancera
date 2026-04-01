<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Events\RadarMatchFound;
use App\Modules\Empresa\Services\PlanService;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';
        $planService = app(PlanService::class);
        $empresa = $servicio->empresa;
        $config = $empresa->radarConfig;

        // =========================
        // INIT (evita errores)
        // =========================
        $matchesServicios = [];
        $matchesSolicitudes = [];

        /*
        |--------------------------------------------------------------------------
        | VALIDAR PLAN
        |--------------------------------------------------------------------------
        */
        if ($planService->isFree($empresa)) {
            return [
                'servicios' => [],
                'solicitudes' => [],
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | VALIDAR CONECTOR (ANTES DE TODO)
        |--------------------------------------------------------------------------
        */
        if ($planService->isConector($empresa)) {
            if (!$config || empty($config->ciudades)) {
                return [
                    'servicios' => [],
                    'solicitudes' => [],
                ];
            }

            // Si el destino NO está en sus ciudades → NO hay radar
            if (!in_array($servicio->destino, $config->ciudades)) {
                return [
                    'servicios' => [],
                    'solicitudes' => [],
                ];
            }
        }

        /*
        |--------------------------------------------------------------------------
        | MATCH SERVICIOS (SIEMPRE)
        |--------------------------------------------------------------------------
        */
        $candidatos = Servicio::query()
            ->where('tipo', $tipoOpuesto)
            ->where('estado', 'activo')
            ->where('empresa_id', '!=', $servicio->empresa_id)
            ->where('id', '!=', $servicio->id)
            ->where('destino', $servicio->destino)
            ->get();

        foreach ($candidatos as $candidato) {
            ServiceMatch::firstOrCreate([
                'servicio_id' => $servicio->id,
                'match_id' => $candidato->id,
            ]);

            $radar = RadarMatch::firstOrCreate([
                'servicio_id' => $servicio->id,
                'match_type' => 'servicio',
                'matched_servicio_id' => $candidato->id,
            ]);

            if ($radar->wasRecentlyCreated) {
                event(new RadarMatchFound($servicio, $candidato));
            }
            $matchesServicios[] = $candidato;
        }

        /*
        |--------------------------------------------------------------------------
        | MATCH SOLICITUDES (SOLO BUSCO)
        |--------------------------------------------------------------------------
        */
        if ($servicio->tipo === 'busco') {
            $solicitudes = SolicitudMudanza::query()
                ->where('estado', 'activo')
                ->where('compras_count', '<', 3)
                ->where('destino', $servicio->destino)
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