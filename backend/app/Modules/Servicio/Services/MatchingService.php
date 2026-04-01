<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServiceMatch;
use App\Modules\Servicio\Models\RadarMatch;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Events\RadarMatchFound;
use App\Modules\Empresa\Services\PlanService;
use App\Modules\Empresa\Models\EmpresaRadarConfig;

class MatchingService
{
    public function matchForServicio(Servicio $servicio)
    {
        $tipoOpuesto = $servicio->tipo === 'busco' ? 'ofrezco' : 'busco';
        $planService = app(PlanService::class);
        $empresa = $servicio->empresa;
        $config = $empresa->radarConfig;

        /*
        |--------------------------------------------------------------------------
        | MATCH SERVICIOS
        |--------------------------------------------------------------------------
        */
        $query = Servicio::query()
            ->where('tipo', $tipoOpuesto)
            ->where('estado', 'activo')
            ->where('empresa_id', '!=', $servicio->empresa_id)
            ->where('id', '!=', $servicio->id);

        /*
        |--------------------------------------------------------------------------
        | FILTRO POR PLAN
        |--------------------------------------------------------------------------
        */
        if ($planService->isFree($empresa)) {
            return [
                'servicios' => [],
                'solicitudes' => [],
            ];
        }

        if ($planService->isConector($empresa)) {
            // Si no tiene config → no hay radar
            if (!$config || empty($config->ciudades)) {
                return [
                    'servicios' => [],
                    'solicitudes' => [],
                ];
            }

            $query->whereIn('destino', $config->ciudades);
        } else {
            // radar (pro) → normal
            $query->where('destino', $servicio->destino);
        }

        $candidatos = $query->get();
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
            $querySolicitudes = SolicitudMudanza::query()
                ->where('estado', 'activo')
                ->where('compras_count', '<', 3);

            if ($planService->isFree($empresa)) {
                return [
                    'servicios' => [],
                    'solicitudes' => [],
                ];
            }

            if ($planService->isConector($empresa)) {
                if (!$config || empty($config->ciudades)) {
                    return [
                        'servicios' => [],
                        'solicitudes' => [],
                    ];
                }
                $querySolicitudes->whereIn('destino', $config->ciudades);
            } else {
                $querySolicitudes->where('destino', $servicio->destino);
            }

            $solicitudes = $querySolicitudes->get();

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