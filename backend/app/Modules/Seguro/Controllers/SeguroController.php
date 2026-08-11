<?php

namespace App\Modules\Seguro\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Seguro\Services\SeguroService;
use App\Modules\Seguro\Services\ExpedienteSeguroService;
use App\Modules\Seguro\Requests\GuardarPasoUnoSeguroRequest;
use Illuminate\Http\JsonResponse;

class SeguroController extends Controller
{
    protected SeguroService $service;

    protected ExpedienteSeguroService $expedienteService;

    public function __construct(SeguroService $service, ExpedienteSeguroService $expedienteService)
    {
        $this->service = $service;
        $this->expedienteService = $expedienteService;
    }

    /**
     * Obtener expediente mediante folio. Endpoint público.
     */
    public function continuar(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        /*
        |--------------------------------------------------------------------------
        | Expediente no encontrado
        |--------------------------------------------------------------------------
        */
        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Expediente cancelado
        |--------------------------------------------------------------------------
        */
        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado y ya no está disponible.'
            ], 410);
        }

        /*
        |--------------------------------------------------------------------------
        | Expediente completado
        |--------------------------------------------------------------------------
        */
        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.',
                'data' => [
                    'folio' => $expediente->folio,
                    'estado' => $expediente->estado,
                    'progreso' => $expediente->progreso,
                ]
            ], 409);
        }

        /*
        |--------------------------------------------------------------------------
        | Información pública del expediente
        |--------------------------------------------------------------------------
        */
        return response()->json([
            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,

                /*
                |--------------------------------------------------------------------------
                | Cliente
                |--------------------------------------------------------------------------
                */
                'nombre' => $expediente->nombre,
                'email' => $expediente->email,
                'telefono' => $expediente->telefono,

                /*
                |--------------------------------------------------------------------------
                | Mudanza
                |--------------------------------------------------------------------------
                */
                'origen' => $expediente->origen,
                'destino' => $expediente->destino,
                'inventario' => $expediente->inventario,
                'fecha_recoleccion' => $expediente->fecha_recoleccion,

                /*
                |--------------------------------------------------------------------------
                | Seguro
                |--------------------------------------------------------------------------
                */
                'tipo_seguro' => $expediente->tipo_seguro,
                'valor_menaje' => $expediente->valor_menaje,
                'valor_automovil' => $expediente->valor_automovil,
                'prima_estimada' => $expediente->prima_estimada,

                /*
                |--------------------------------------------------------------------------
                | Datos de la empresa / unidad
                |--------------------------------------------------------------------------
                */
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'fecha_salida' => $expediente->fecha_salida,
                'fecha_llegada' => $expediente->fecha_llegada,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,

                /*
                |--------------------------------------------------------------------------
                | Control
                |--------------------------------------------------------------------------
                */
                'es_externo' => $expediente->es_externo,
                'cliente_inicio_at' => $expediente->cliente_inicio_at,
                'cliente_finalizo_at' => $expediente->cliente_finalizo_at,
                'ultimo_autoguardado_at' => $expediente->ultimo_autoguardado_at,
            ]
        ]);
    }

    /**
     * Iniciar captura del expediente.
     */
    public function iniciar(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        /*
        |--------------------------------------------------------------------------
        | Expediente no encontrado
        |--------------------------------------------------------------------------
        */
        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Expediente cancelado
        |--------------------------------------------------------------------------
        */
        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        /*
        |--------------------------------------------------------------------------
        | Expediente completado
        |--------------------------------------------------------------------------
        */
        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.'
            ], 409);
        }

        /*
        |--------------------------------------------------------------------------
        | Iniciar captura
        |--------------------------------------------------------------------------
        */
        $expediente = $this->expedienteService->iniciarCaptura($expediente);

        return response()->json([
            'message' => 'Expediente iniciado correctamente.',

            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'cliente_inicio_at' => $expediente->cliente_inicio_at,
            ]
        ]);
    }

    /**
     * Guardar Paso 1 del expediente: POST /api/seguros/{folio}/paso-1
     */
    public function guardarPasoUno(GuardarPasoUnoSeguroRequest $request, string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' =>
                'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' =>
                'Este expediente ya fue completado.'
            ], 409);
        }

        /*
        | Validar estado, el cliente debe haber iniciado el expediente.
        */
        if (!in_array($expediente->estado, ['capturando', 'revision',], true)) {
            return response()->json([
                'message' =>
                'El expediente todavía no está disponible para captura.'
            ], 409);
        }

        /*
        |--------------------------------------------------------------------------
        | Validaciones
        |--------------------------------------------------------------------------
        */
        $data = $request->validated();

        if (in_array($data['tipo_seguro'], ['menaje', 'menaje_auto',], true)  && empty($data['valor_menaje'])) {
            return response()->json([
                'message' =>
                'Debes indicar el valor del menaje.'
            ], 422);
        }

        if (in_array($data['tipo_seguro'], ['automovil', 'menaje_auto',], true) && empty($data['valor_automovil'])) {
            return response()->json([
                'message' =>
                'Debes indicar el valor del automóvil.'
            ], 422);
        }

        $expediente = $this->expedienteService->guardarPasoUno($expediente, $data);

        return response()->json([
            'message' => 'La información del seguro fue guardada correctamente.',

            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'tipo_seguro' => $expediente->tipo_seguro,
                'valor_menaje' => $expediente->valor_menaje,
                'valor_automovil' => $expediente->valor_automovil,
                'prima_estimada' => $expediente->prima_estimada,
            ]
        ]);
    }
}