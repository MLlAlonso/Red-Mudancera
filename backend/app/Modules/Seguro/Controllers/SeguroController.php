<?php

namespace App\Modules\Seguro\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Seguro\Services\SeguroService;
use App\Modules\Seguro\Services\ExpedienteSeguroService;
use App\Modules\Seguro\Requests\GuardarPasoUnoSeguroRequest;
use App\Modules\Seguro\Requests\GuardarPasoDosSeguroRequest;
use App\Modules\Seguro\Requests\GuardarPasoTresSeguroRequest;
use Illuminate\Http\JsonResponse;
use App\Modules\Seguro\Requests\GuardarDatosEmpresaSeguroRequest;
use App\Modules\Seguro\Mail\EmpresaSeguroDatosCompletadosMail;
use App\Modules\Seguro\Mail\SeguroExpedienteFinalizadoMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SeguroController extends Controller
{
    protected SeguroService $service;
    protected ExpedienteSeguroService $expedienteService;

    public function __construct(SeguroService $service, ExpedienteSeguroService $expedienteService)
    {
        $this->service = $service;
        $this->expedienteService = $expedienteService;
    }

    public function continuar(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado y ya no está disponible.'
            ], 410);
        }

        return response()->json([
            'data' => [
                /*
            |--------------------------------------------------------------------------
            | Identificación
            |--------------------------------------------------------------------------
            */
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
            | Empresa / Unidad
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
                'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at,
                'ultimo_autoguardado_at' => $expediente->ultimo_autoguardado_at,
            ]
        ]);
    }

    public function iniciar(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.'
            ], 409);
        }

        $expediente =  $this->expedienteService->iniciarCaptura($expediente);

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
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.'
            ], 409);
        }

        if (in_array($expediente->estado, ['nuevo', 'correo_programado', 'esperando_cliente'], true)) {
            $expediente = $this->expedienteService->iniciarCaptura($expediente);
        }

        if (!in_array($expediente->estado, ['capturando', 'revision'], true)) {
            return response()->json([
                'message' => 'El expediente todavía no está disponible para captura.',
                'estado_actual' => $expediente->estado,
            ], 409);
        }

        $data = $request->validated();

        if (in_array($data['tipo_seguro'], ['menaje', 'menaje_auto'], true) && empty($data['valor_menaje'])) {
            return response()->json([
                'message' => 'Debes indicar el valor del menaje.'
            ], 422);
        }

        if (in_array($data['tipo_seguro'], ['automovil', 'menaje_auto'], true)  && empty($data['valor_automovil'])) {
            return response()->json([
                'message' => 'Debes indicar el valor del automóvil.'
            ], 422);
        }

        $expediente = $this->expedienteService->guardarPasoUno($expediente,  $data);

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

    public function guardarPasoDos(GuardarPasoDosSeguroRequest $request, string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' =>  'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' =>  'Este expediente ya fue completado.'
            ], 409);
        }

        if (!in_array($expediente->estado,  ['capturando', 'revision'],  true)) {
            return response()->json([
                'message' =>  'El expediente todavía no está disponible para captura.'
            ], 409);
        }

        $data = $request->validated();
        $expediente =  $this->expedienteService->guardarPasoDos($expediente, $data);

        return response()->json([
            'message' => 'Los datos del cliente fueron guardados correctamente.',

            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'nombre' => $expediente->nombre,
                'email' => $expediente->email,
                'telefono' => $expediente->telefono,
            ]
        ]);
    }

    public function guardarPasoTres(GuardarPasoTresSeguroRequest $request, string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.'
            ], 409);
        }

        if ($expediente->progreso < 66) {
            return response()->json([
                'message' =>
                'Debes completar los pasos anteriores antes de continuar.'
            ], 409);
        }

        $data = $request->validated();
        $expediente = $this->expedienteService->guardarPasoTres($expediente, $data);

        return response()->json([
            'message' => 'La información de la mudanza fue guardada correctamente.',

            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'origen' => $expediente->origen,
                'destino' => $expediente->destino,
                'fecha_salida' => $expediente->fecha_salida,
                'fecha_llegada' => $expediente->fecha_llegada,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
            ]
        ]);
    }

    public function generarEnlaceEmpresa(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.'
            ], 409);
        }

        $expediente = $this->expedienteService->generarAccesoEmpresa($expediente);

        return response()->json([
            'message' => 'Enlace generado correctamente.',
            'data' => [
                'url' => config('app.frontend_url')
                    . '/seguros/empresa/'
                    . $expediente->empresa_access_token,
            ],
        ]);
    }

    public function obtenerFormularioEmpresa(string $token): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorTokenEmpresa($token);

        if (!$expediente) {
            return response()->json([
                'message' => 'El enlace solicitado no es válido.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ya no está disponible.'
            ], 410);
        }

        return response()->json([
            'data' => [
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
                'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at,
            ]
        ]);
    }

    public function guardarDatosEmpresa(GuardarDatosEmpresaSeguroRequest $request, string $token): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorTokenEmpresa($token);

        if (!$expediente) {
            return response()->json([
                'message' => 'El enlace solicitado no es válido.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ya no está disponible.'
            ], 410);
        }

        $expediente = $this->expedienteService->guardarDatosEmpresa($expediente,  $request->validated());

        return response()->json([
            'message' => 'Información guardada correctamente.',
            'data' => [
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
            ]
        ]);
    }

    public function finalizarDatosEmpresa(string $token): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorTokenEmpresa($token);

        if (!$expediente) {
            return response()->json([
                'message' => 'El enlace solicitado no es válido.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ya no está disponible.'
            ], 410);
        }

        $campos = ['empresa_mudanza', 'propietario_unidad', 'marca_unidad', 'modelo_unidad', 'placas', 'chofer',];

        foreach ($campos as $campo) {
            if (empty($expediente->{$campo})) {
                return response()->json([
                    'message' => 'La información de la unidad todavía está incompleta.'
                ], 422);
            }
        }

        $primeraFinalizacion = is_null($expediente->empresa_datos_finalizados_at);
        $expediente = $this->expedienteService->finalizarDatosEmpresa($expediente);

        if ($primeraFinalizacion && $expediente->email) {
            Mail::to($expediente->email)->send(new EmpresaSeguroDatosCompletadosMail($expediente));
        }

        return response()->json([
            'message' => $primeraFinalizacion ? 'Los datos fueron finalizados y el cliente ha sido notificado.' : 'Los datos fueron actualizados correctamente.',
            'notificado' => $primeraFinalizacion,
            'data' => [
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
                'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at,
            ],
        ]);
    }

    public function finalizarExpediente(string $folio): JsonResponse
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->estado === 'completado') {
            return response()->json([
                'message' => 'Este expediente ya fue completado.',

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
                    'fecha_salida' => $expediente->fecha_salida,
                    'fecha_llegada' => $expediente->fecha_llegada,

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
            | Unidad
            |--------------------------------------------------------------------------
            */
                    'empresa_mudanza' => $expediente->empresa_mudanza,
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
                    'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at,
                    'ultimo_autoguardado_at' => $expediente->ultimo_autoguardado_at,
                ],
            ]);
        }

        if ($expediente->progreso < 100) {
            return response()->json([
                'message' => 'Debes completar toda la información del expediente antes de finalizarlo.'
            ], 422);
        }

        $camposEmpresa = ['empresa_mudanza', 'propietario_unidad', 'marca_unidad', 'modelo_unidad', 'placas', 'chofer',];

        foreach ($camposEmpresa as $campo) {
            if (empty($expediente->{$campo})) {
                return response()->json([
                    'message' => 'La información de la unidad todavía está incompleta.'
                ], 422);
            }
        }

        $expediente = $this->expedienteService->finalizarExpediente($expediente);

        $destinatarios = [
            'intermudanza@gmail.com',
            'Segurosmudanzafacil@gmail.com',
            'ventas12@segurosdecarga.com',
        ];

        Mail::to($destinatarios)->send(new SeguroExpedienteFinalizadoMail($expediente));

        return response()->json([
            'message' =>
            'Tu expediente fue finalizado correctamente.',
            'data' => [
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'nombre' => $expediente->nombre,
                'email' => $expediente->email,
                'telefono' => $expediente->telefono,
                'origen' => $expediente->origen,
                'destino' => $expediente->destino,
                'inventario' => $expediente->inventario,
                'fecha_recoleccion' => $expediente->fecha_recoleccion,
                'tipo_seguro' => $expediente->tipo_seguro,
                'valor_menaje' => $expediente->valor_menaje,
                'valor_automovil' => $expediente->valor_automovil,
                'prima_estimada' => $expediente->prima_estimada,
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
                'cliente_finalizo_at' => $expediente->cliente_finalizo_at,
            ],
        ]);
    }

    public function descargarPdf(string $folio)
    {
        $expediente = $this->expedienteService->obtenerPorFolio($folio);

        if (!$expediente) {
            return response()->json([
                'message' => 'El expediente solicitado no existe.'
            ], 404);
        }

        if ($expediente->estado === 'cancelado') {
            return response()->json([
                'message' => 'Este expediente ha sido cancelado.'
            ], 410);
        }

        if ($expediente->progreso < 100) {
            return response()->json([
                'message' => 'El expediente todavía no ha sido completado.'
            ], 409);
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.seguro.expediente-finalizado', ['expediente' => $expediente,]);

        return $pdf->download('expediente-' . $expediente->folio . '.pdf');
    }
}
