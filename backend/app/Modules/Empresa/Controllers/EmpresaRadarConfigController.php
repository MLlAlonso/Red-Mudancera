<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Empresa\Models\EmpresaRadarConfig;
use App\Modules\Empresa\Services\PlanService;

class EmpresaRadarConfigController extends Controller
{
    public function update(Request $request)
    {
        $empresa = $request->user();

        /*
        |--------------------------------------------------------------------------
        | VALIDAR PLAN (solo conector puede usar config)
        |--------------------------------------------------------------------------
        */
        $planService = app(PlanService::class);

        if (!$planService->isConector($empresa)) {
            return response()->json([
                'message' => 'Solo el plan Conector puede configurar ciudades'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN INPUT
        |--------------------------------------------------------------------------
        */
        $request->validate([
            'ciudades' => 'required|array|min:1|max:2',
            'ciudades.*' => 'string|max:100'
        ]);

        /*
        |--------------------------------------------------------------------------
        | LIMPIAR DUPLICADOS
        |--------------------------------------------------------------------------
        */
        $ciudades = array_values(array_unique($request->ciudades));

        /*
        |--------------------------------------------------------------------------
        | VALIDAR LÍMITE POR PLAN
        |--------------------------------------------------------------------------
        */
        $limit = $planService->getRadarCitiesLimit($empresa);

        if (count($ciudades) > $limit) {
            return response()->json([
                'message' => "Tu plan permite máximo {$limit} ciudades"
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | OBTENER O CREAR CONFIG
        |--------------------------------------------------------------------------
        */
        $config = EmpresaRadarConfig::where('empresa_id', $empresa->id)->first();
        if (!$config) {

            $config = EmpresaRadarConfig::create([
                'empresa_id' => $empresa->id,
                'ciudades' => $ciudades
            ]);

            return response()->json([
                'message' => 'Configuración de radar creada',
                'data' => $config
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | VALIDAR COOLDOWN (30 días)
        |--------------------------------------------------------------------------
        */
        if (!$planService->canChangeCities($empresa, $config)) {
            return response()->json([
                'message' => 'Tu plan permite actualizar rutas una vez cada 30 días'
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | ACTUALIZAR
        |--------------------------------------------------------------------------
        */
        $config->update([
            'ciudades' => $ciudades
        ]);

        return response()->json([
            'message' => 'Configuración de radar actualizada',
            'data' => $config
        ]);
    }

    public function show(Request $request)
    {
        $empresa = $request->user();
        $config = EmpresaRadarConfig::where('empresa_id', $empresa->id)->first();
        return response()->json([
            'config' => $config
        ]);
    }
}