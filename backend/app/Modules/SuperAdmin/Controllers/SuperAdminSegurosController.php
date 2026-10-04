<?php

namespace App\Modules\SuperAdmin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Seguro\Models\ExpedienteSeguro;
use App\Modules\SuperAdmin\Services\SuperAdminSegurosService;
use Illuminate\Support\Facades\Mail;
use App\Modules\Seguro\Mail\InvitacionExpedienteSeguroMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Modules\Seguro\Mail\EmpresaSeguroDatosCompletadosMail;
use App\Modules\Seguro\Mail\RecordatorioExpedienteSeguroMail;
use App\Modules\Seguro\Mail\SeguroExpedienteFinalizadoClienteMail;
use App\Modules\Seguro\Mail\SeguroExpedienteFinalizadoMail;
use App\Modules\Seguro\Mail\SolicitudAsistenciaSeguroClienteMail;
use App\Modules\Seguro\Mail\SolicitudAsistenciaSeguroMail;
use App\Modules\Seguro\Mail\SolicitudSeguroRecibidaMail;

class SuperAdminSegurosController extends Controller
{
    protected SuperAdminSegurosService $service;

    public function __construct(SuperAdminSegurosService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $data = $this->service->obtenerExpedientes(
            $request->input('search', ''),
            $request->input('month'),
            $request->input('modalidad', 'todas')
        );

        return response()->json($data);
    }

    public function show($id)
    {
        $expediente = ExpedienteSeguro::with('solicitud')->findOrFail($id);

        if (!$expediente->empresa_access_token) {
            $expediente->update([
                'empresa_access_token' => \Illuminate\Support\Str::random(80),
                'empresa_access_created_at' => now(),
            ]);

            $expediente->refresh();
        }

        return response()->json([
            'data' => [
                'id' => $expediente->id,
                'folio' => $expediente->folio,
                'estado' => $expediente->estado,
                'progreso' => $expediente->progreso,
                'nombre' => $expediente->nombre,
                'email' => $expediente->email,
                'telefono' => $expediente->telefono,
                'inventario' => $expediente->inventario,
                'fecha_recoleccion' => $expediente->fecha_recoleccion,
                'origen' => $expediente->origen,
                'destino' => $expediente->destino,
                'fecha_salida' => $expediente->fecha_salida,
                'fecha_llegada' => $expediente->fecha_llegada,
                'tipo_seguro' => $expediente->tipo_seguro,
                'valor_menaje' => $expediente->valor_menaje,
                'valor_automovil' => $expediente->valor_automovil,
                'prima_estimada' => $expediente->prima_estimada,
                'modalidad_datos' => $expediente->modalidad_datos,
                'forma_proporcion_datos' => $expediente->forma_proporcion_datos,
                'asistencia_empresa_mudanza' => $expediente->asistencia_empresa_mudanza,
                'asistencia_contacto' => $expediente->asistencia_contacto,
                'asistencia_telefono' => $expediente->asistencia_telefono,
                'empresa_mudanza' => $expediente->empresa_mudanza,
                'propietario_unidad' => $expediente->propietario_unidad,
                'marca_unidad' => $expediente->marca_unidad,
                'modelo_unidad' => $expediente->modelo_unidad,
                'placas' => $expediente->placas,
                'chofer' => $expediente->chofer,
                'empresa_access_token' => $expediente->empresa_access_token,
                'empresa_access_created_at' => $expediente->empresa_access_created_at,
                'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at,
                'enlace_empresa' => $expediente->enlace_empresa,
                'es_externo' => $expediente->es_externo,
                'correo_programado_at' => $expediente->correo_programado_at,
                'correo_enviado_at' => $expediente->correo_enviado_at,
                'cliente_inicio_at' => $expediente->cliente_inicio_at,
                'cliente_finalizo_at' => $expediente->cliente_finalizo_at,
                'ultimo_autoguardado_at' => $expediente->ultimo_autoguardado_at,
                'created_at' => $expediente->created_at,
                'updated_at' => $expediente->updated_at,
            ]
        ]);
    }

    public function enviarCorreo($id)
    {
        $expediente = ExpedienteSeguro::findOrFail($id);
        Mail::to($expediente->email)->send(new InvitacionExpedienteSeguroMail($expediente));

        $expediente->update([
            'estado' => 'esperando_cliente',
            'correo_enviado_at' => now()
        ]);

        return response()->json(['message' => 'Correo enviado correctamente.']);
    }

    public function pdf($id)
    {
        $expediente = ExpedienteSeguro::findOrFail($id);

        if ($expediente->estado === 'cancelado') {
            return response()->json(['message' => 'Este expediente ha sido cancelado.'], 410);
        }

        if ($expediente->progreso < 100) {
            return response()->json(['message' => 'El expediente todavía no ha sido completado.'], 409);
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.seguro.expediente-finalizado', ['expediente' => $expediente]);

        return $pdf->download('expediente-' . $expediente->folio . '.pdf');
    }




    public function enviarCorreoPrueba($id, string $tipo)
    {
        $expediente = ExpedienteSeguro::findOrFail($id);

        if (!$expediente->email && !in_array($tipo, [
            'finalizado',
            'asistencia',
        ], true)) {
            return response()->json([
                'message' => 'El expediente no tiene un correo de cliente registrado.',
            ], 422);
        }

        try {
            switch ($tipo) {
                case 'solicitud-recibida':
                    Mail::to($expediente->email)->send(
                        new SolicitudSeguroRecibidaMail($expediente)
                    );

                    $mensaje = 'Correo de solicitud recibida enviado correctamente.';
                    break;

                case 'invitacion':
                    Mail::to($expediente->email)->send(
                        new InvitacionExpedienteSeguroMail($expediente)
                    );

                    $mensaje = 'Correo de invitación enviado correctamente.';
                    break;

                case 'recordatorio':
                    Mail::to($expediente->email)->send(
                        new RecordatorioExpedienteSeguroMail($expediente)
                    );

                    $mensaje = 'Correo de recordatorio enviado correctamente.';
                    break;

                case 'empresa-datos-completados':
                    Mail::to($expediente->email)->send(
                        new EmpresaSeguroDatosCompletadosMail($expediente)
                    );

                    $mensaje = 'Correo de datos de empresa completados enviado correctamente.';
                    break;

                case 'finalizado-cliente':
                    Mail::to($expediente->email)->send(
                        new SeguroExpedienteFinalizadoClienteMail($expediente)
                    );

                    $mensaje = 'Correo de expediente finalizado al cliente enviado correctamente.';
                    break;

                case 'finalizado':
                    Mail::to([
                        'intermudanza@gmail.com',
                        'Segurosmudanzafacil@gmail.com',
                        'ventas12@segurosdecarga.com',
                    ])->send(
                        new SeguroExpedienteFinalizadoMail($expediente)
                    );

                    $mensaje = 'Correo de expediente finalizado enviado correctamente.';
                    break;

                case 'asistencia-cliente':
                    Mail::to($expediente->email)->send(
                        new SolicitudAsistenciaSeguroClienteMail($expediente)
                    );

                    $mensaje = 'Correo de solicitud asistida al cliente enviado correctamente.';
                    break;

                case 'asistencia':
                    Mail::to([
                        'intermudanza@gmail.com',
                        'Segurosmudanzafacil@gmail.com',
                    ])->send(
                        new SolicitudAsistenciaSeguroMail($expediente)
                    );

                    $mensaje = 'Correo de solicitud asistida enviado correctamente.';
                    break;

                default:
                    return response()->json([
                        'message' => 'Tipo de correo no válido.',
                    ], 422);
            }

            return response()->json([
                'message' => $mensaje,
            ]);
        } catch (\Throwable $e) {
            Log::error(
                'Error al enviar correo de prueba de seguro.',
                [
                    'expediente_id' => $expediente->id,
                    'folio' => $expediente->folio,
                    'tipo' => $tipo,
                    'email' => $expediente->email,
                    'error' => $e->getMessage(),
                ]
            );

            return response()->json([
                'message' => 'No fue posible enviar el correo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
