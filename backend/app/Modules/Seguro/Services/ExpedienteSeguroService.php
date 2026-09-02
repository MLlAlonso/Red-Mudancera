<?php

namespace App\Modules\Seguro\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class ExpedienteSeguroService
{
    public function crear(array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($data) {
            if (!empty($data['solicitud_mudanza_id'])) {
                $existente = ExpedienteSeguro::where('solicitud_mudanza_id',  $data['solicitud_mudanza_id'])->first();

                if ($existente) {
                    return $existente;
                }
            }

            $siguienteId = (ExpedienteSeguro::max('id') ?? 0) + 1;
            $folio = 'SEG-' . now()->format('Ymd') . '-' . str_pad($siguienteId, 6, '0', STR_PAD_LEFT);
            $creadoEn = now();

            return ExpedienteSeguro::create([
                'solicitud_mudanza_id' => $data['solicitud_mudanza_id'] ?? null,
                'folio' => $folio,
                'access_token' => Str::random(80),
                'estado' => 'nuevo',
                'progreso' => 0,
                'empresa_access_token' => Str::random(80),
                'empresa_access_created_at' => $creadoEn,
                'nombre' => $data['nombre'] ?? null,
                'email' => $data['email'] ?? null,
                'telefono' => $data['telefono'] ?? null,
                'origen' => $data['origen'] ?? null,
                'destino' => $data['destino'] ?? null,
                'inventario' => $data['inventario'] ?? null,
                'fecha_recoleccion' => $data['fecha_recoleccion'] ?? null,
                'es_externo' => $data['es_externo'] ?? false,
                'correo_programado_at' => $creadoEn->copy()->addHours(2400),
                'recordatorio_programado_at' => $creadoEn->copy()->addDays(50),
            ]);
        });
    }

    public function obtenerExpedientesParaInvitacionInicial()
    {
        return ExpedienteSeguro::query()
            ->whereNotNull('correo_programado_at')
            ->whereNull('correo_enviado_at')
            ->where('correo_programado_at', '<=', now())
            ->whereNotIn('estado', ['completado', 'cancelado'])
            ->whereNotNull('email')
            ->get();
    }

    public function obtenerExpedientesParaRecordatorio()
    {
        return ExpedienteSeguro::query()
            ->whereNotNull('recordatorio_programado_at')
            ->whereNull('recordatorio_enviado_at')
            ->where('recordatorio_programado_at', '<=', now())
            ->whereNotIn('estado', ['completado', 'cancelado'])
            ->whereNotNull('email')
            ->get();
    }

    public function marcarInvitacionEnviada(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        $expediente->update([
            'correo_enviado_at' => now(),
            'estado' => $expediente->estado === 'nuevo' ? 'esperando_cliente' : $expediente->estado,
        ]);

        return $expediente->fresh();
    }

    public function marcarRecordatorioEnviado(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        $expediente->update(['recordatorio_enviado_at' => now(),]);
        return $expediente->fresh();
    }

    public function obtenerPorFolio(string $folio): ?ExpedienteSeguro
    {
        return ExpedienteSeguro::where('folio', $folio)->first();
    }

    public function iniciarCaptura(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        if (in_array($expediente->estado, ['nuevo', 'correo_programado', 'esperando_cliente'], true)) {
            $expediente->update([
                'estado' => 'capturando',
                'cliente_inicio_at' => $expediente->cliente_inicio_at ?? now(),
            ]);
        }

        return $expediente->fresh();
    }

    public function guardarPasoUno(ExpedienteSeguro $expediente, array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($expediente, $data) {
            $tipoSeguro = $data['tipo_seguro'];
            $valorMenaje = null;
            $valorAutomovil = null;

            if ($tipoSeguro === 'menaje' || $tipoSeguro === 'menaje_auto') {
                $valorMenaje = $data['valor_menaje'] ?? null;
            }

            if ($tipoSeguro === 'automovil' || $tipoSeguro === 'menaje_auto') {
                $valorAutomovil = $data['valor_automovil'] ?? null;
            }

            $basePrima = 0;

            if ($valorMenaje !== null) {
                $basePrima += (float) $valorMenaje;
            }

            if ($valorAutomovil !== null) {
                $basePrima += (float) $valorAutomovil;
            }

            $primaEstimada = $this->calcularPrima(
                $valorMenaje !== null ? (float) $valorMenaje : null,
                $valorAutomovil !== null ? (float) $valorAutomovil : null,
                'autogestion'
            );

            $incluyeAutomovil = in_array($tipoSeguro, ['automovil', 'menaje_auto'], true);

            $expediente->update([
                'tipo_seguro' => $tipoSeguro,
                'valor_menaje' => $valorMenaje,
                'valor_automovil' => $valorAutomovil,
                'automovil_marca' => $incluyeAutomovil ? ($data['automovil_marca'] ?? null) : null,
                'automovil_modelo' => $incluyeAutomovil ? ($data['automovil_modelo'] ?? null) : null,
                'automovil_numero_serie' => $incluyeAutomovil ? ($data['automovil_numero_serie'] ?? null) : null,
                'automovil_foto_circulacion_url' => $incluyeAutomovil ? ($data['automovil_foto_circulacion_url'] ?? null) : null,
                'automovil_foto_circulacion_public_id' => $incluyeAutomovil ? ($data['automovil_foto_circulacion_public_id'] ?? null) : null,
                'prima_estimada' => $primaEstimada,
                'progreso' => max($expediente->progreso, 33),
                'estado' => 'capturando',
            ]);

            return $expediente->fresh();
        });
    }

    public function guardarPasoDos(ExpedienteSeguro $expediente, array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($expediente, $data) {
            $expediente->update([
                'nombre' => $data['nombre'],
                'email' => $data['email'],
                'telefono' => $data['telefono'],
                'progreso' => max($expediente->progreso, 66),
                'estado' => 'capturando',
            ]);

            return $expediente->fresh();
        });
    }

    public function guardarPasoTres(ExpedienteSeguro $expediente, array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($expediente, $data) {
            $modalidadDatos = $data['modalidad_datos'];
            $formaProporcionDatos = $modalidadDatos === 'autogestion'  ? ($data['forma_proporcion_datos'] ?? 'cliente') : null;

            $primaEstimada = $this->calcularPrima(
                $expediente->valor_menaje !== null ? (float) $expediente->valor_menaje : null,
                $expediente->valor_automovil !== null ? (float) $expediente->valor_automovil : null,
                $modalidadDatos
            );

            $expediente->update([
                'empresa_mudanza' => $data['empresa_mudanza'] ?? null,
                'origen' => $data['origen'] ?? null,
                'destino' => $data['destino'] ?? null,
                'fecha_salida' => $data['fecha_salida'] ?? null,
                'fecha_llegada' => $data['fecha_llegada'] ?? null,
                'propietario_unidad' => $data['propietario_unidad'] ?? null,
                'marca_unidad' => $data['marca_unidad'] ?? null,
                'modelo_unidad' => $data['modelo_unidad'] ?? null,
                'placas' => $data['placas'] ?? null,
                'chofer' => $data['chofer'] ?? null,
                'modalidad_datos' => $modalidadDatos,
                'forma_proporcion_datos' => $formaProporcionDatos,
                'asistencia_empresa_mudanza' => $modalidadDatos === 'asistida' ? ($data['asistencia_empresa_mudanza'] ?? null) : null,
                'asistencia_contacto' => $modalidadDatos === 'asistida' ? ($data['asistencia_contacto'] ?? null) : null,
                'asistencia_telefono' => $modalidadDatos === 'asistida' ? ($data['asistencia_telefono'] ?? null) : null,
                'prima_estimada' => $primaEstimada,
                'progreso' => max($expediente->progreso, 100),
                'estado' => 'revision',
            ]);

            return $expediente->fresh();
        });
    }

    public function generarAccesoEmpresa(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        if (!$expediente->empresa_access_token) {
            $expediente->update([
                'empresa_access_token' => Str::random(80),
                'empresa_access_created_at' => now(),
            ]);
        }

        return $expediente->fresh();
    }

    public function obtenerPorTokenEmpresa(string $token): ?ExpedienteSeguro
    {
        return ExpedienteSeguro::where('empresa_access_token', $token)->first();
    }

    public function guardarDatosEmpresa(ExpedienteSeguro $expediente, array $data): ExpedienteSeguro
    {
        $expediente->update([
            'empresa_mudanza' => $data['empresa_mudanza'] ?? null,
            'origen' => $data['origen'] ?? null,
            'destino' => $data['destino'] ?? null,
            'fecha_salida' => $data['fecha_salida'] ?? null,
            'fecha_llegada' => $data['fecha_llegada'] ?? null,
            'propietario_unidad' => $data['propietario_unidad'] ?? null,
            'marca_unidad' => $data['marca_unidad'] ?? null,
            'modelo_unidad' => $data['modelo_unidad'] ?? null,
            'placas' => $data['placas'] ?? null,
            'chofer' => $data['chofer'] ?? null,
        ]);

        return $expediente->fresh();
    }

    public function finalizarDatosEmpresa(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        $expediente->update([
            'empresa_datos_finalizados_at' => $expediente->empresa_datos_finalizados_at ?? now(),
            'estado' => 'revision',
        ]);

        return $expediente->fresh();
    }

    public function finalizarExpediente(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        return DB::transaction(function () use ($expediente) {
            $expediente->update([
                'cliente_finalizo_at' => now(),
                'estado' => 'completado',
                'progreso' => 100,
            ]);

            return $expediente->fresh();
        });
    }

    private function calcularPrima(?float $valorMenaje, ?float $valorAutomovil, string $modalidadDatos = 'autogestion'): float
    {
        $basePrima = 0;

        if ($valorMenaje !== null) {
            $basePrima += $valorMenaje;
        }

        if ($valorAutomovil !== null) {
            $basePrima += $valorAutomovil;
        }

        $porcentaje = $modalidadDatos === 'asistida' ? 0.0175  : 0.0135;

        return round($basePrima * $porcentaje, 2);
    }
}
