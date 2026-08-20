<?php

namespace App\Modules\SuperAdmin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Seguro\Models\ExpedienteSeguro;
use Illuminate\Support\Facades\Mail;
use App\Modules\Seguro\Mail\InvitacionExpedienteSeguroMail;
use Illuminate\Http\Request;

class SuperAdminSegurosController extends Controller
{
    public function index(Request $request)
    {
        $search = trim($request->search ?? "");
        $period = $request->period ?? "recent";
        $query = ExpedienteSeguro::query();

        if ($search !== "") {
            $query->where(function ($q) use ($search) {
                $q->where("folio", "like", "%{$search}%")
                    ->orWhere("nombre", "like", "%{$search}%")
                    ->orWhere("email", "like", "%{$search}%");
            });
        }

        switch ($period) {
            case "recent":
                $inicio = now()->subMonth()->startOfMonth();
                $query->whereDate("created_at", ">=", $inicio);
                break;

            case "year":
                $query->whereYear("created_at", now()->year);
                break;

            case "all":
                break;

            default:
                if (is_numeric($period)) {
                    $query->whereYear("created_at", $period);
                }
                break;
        }

        $baseMetrics = clone $query;

        $metrics = [
            "nuevos" => (clone $baseMetrics)
                ->where("estado", "nuevo")
                ->count(),

            "esperando_cliente" => (clone $baseMetrics)
                ->where("estado", "esperando_cliente")
                ->count(),

            "capturando" => (clone $baseMetrics)
                ->where("estado", "capturando")
                ->count(),

            "revision" => (clone $baseMetrics)
                ->where("estado", "revision")
                ->count(),

            "completados" => (clone $baseMetrics)
                ->where("estado", "completado")
                ->count(),
        ];

        $expedientes = $query->latest()->get()->map(function ($expediente) {
            return [
                "id" => $expediente->id,
                "folio" => $expediente->folio,
                "estado" => $expediente->estado,
                "progreso" => $expediente->progreso,
                "nombre" => $expediente->nombre,
                "email" => $expediente->email,
                "telefono" => $expediente->telefono,
                "origen" => $expediente->origen,
                "destino" => $expediente->destino,
                "es_externo" => $expediente->es_externo,
                "tipo_seguro" => $expediente->tipo_seguro,
                "modalidad_datos" => $expediente->modalidad_datos,
                "forma_proporcion_datos" => $expediente->forma_proporcion_datos,
                "asistencia_empresa_mudanza" => $expediente->asistencia_empresa_mudanza,
                "created_at" => $expediente->created_at->format("d/m/Y H:i"),
            ];
        });

        return response()->json([
            "metrics" => $metrics,
            "data" => $expedientes,
        ]);
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

        return response()->json([
            'message' => 'Correo enviado correctamente.'
        ]);
    }

    public function pdf($id)
    {
        $expediente = ExpedienteSeguro::findOrFail($id);

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