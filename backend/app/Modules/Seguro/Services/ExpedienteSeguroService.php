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
                $existente = ExpedienteSeguro::where('solicitud_mudanza_id', $data['solicitud_mudanza_id'])->first();

                if ($existente) {
                    return $existente;
                }
            }

            $siguienteId = (ExpedienteSeguro::max('id') ?? 0) + 1;
            $folio = 'SEG-' . now()->format('Ymd') . '-' . str_pad($siguienteId,  6,  '0',  STR_PAD_LEFT);

            return ExpedienteSeguro::create([
                'solicitud_mudanza_id' => $data['solicitud_mudanza_id'] ?? null,
                'folio' => $folio,
                'access_token' => Str::random(80),
                'estado' => 'nuevo',
                'progreso' => 0,

                /*
                |--------------------------------------------------------------------------
                | Datos del cliente
                |--------------------------------------------------------------------------
                */
                'nombre' => $data['nombre'] ?? null,
                'email' => $data['email'] ?? null,
                'telefono' => $data['telefono'] ?? null,

                /*
                |--------------------------------------------------------------------------
                | Información de la mudanza
                |--------------------------------------------------------------------------
                */
                'origen' => $data['origen'] ?? null,
                'destino' => $data['destino'] ?? null,
                'inventario' => $data['inventario'] ?? null,
                'fecha_recoleccion' => $data['fecha_recoleccion'] ?? null,

                /*
                |--------------------------------------------------------------------------
                | Origen y control
                |--------------------------------------------------------------------------
                */
                'es_externo' => $data['es_externo'] ?? false,
                'correo_programado_at' => now()->addHours(24),
            ]);
        });
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

            /*
            |--------------------------------------------------------------------------
            | Calcular prima
            |--------------------------------------------------------------------------
            | La prima corresponde al 1.35% del valor declarado.
            | Menaje: valor_menaje * 1.35%
            | Automóvil: valor_automovil * 1.35%
            | Menaje + Automóvil: (valor_menaje + valor_automovil) * 1.35%
            */
            $basePrima = 0;

            if ($valorMenaje !== null) {
                $basePrima += (float) $valorMenaje;
            }

            if ($valorAutomovil !== null) {
                $basePrima += (float) $valorAutomovil;
            }

            $primaEstimada = round($basePrima * 0.0135, 2);

            $expediente->update([
                'tipo_seguro' => $tipoSeguro,
                'valor_menaje' => $valorMenaje,
                'valor_automovil' => $valorAutomovil,
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
            $expediente->update([
                'empresa_mudanza' => $data['empresa_mudanza'],
                'origen' => $data['origen'],
                'destino' => $data['destino'],
                'fecha_salida' => $data['fecha_salida'],
                'fecha_llegada' => $data['fecha_llegada'],
                'propietario_unidad' => $data['propietario_unidad'],
                'marca_unidad' => $data['marca_unidad'],
                'modelo_unidad' => $data['modelo_unidad'],
                'placas' => $data['placas'],
                'chofer' => $data['chofer'],
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
}