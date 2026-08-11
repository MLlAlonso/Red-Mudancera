<?php

namespace App\Modules\Seguro\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Modules\Seguro\Models\ExpedienteSeguro;

class ExpedienteSeguroService
{
    /**
     * Crear un expediente de seguro.
     */
    public function crear(array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($data) {
            /*
            |--------------------------------------------------------------------------
            | Evitar duplicados
            |--------------------------------------------------------------------------
            */
            if (!empty($data['solicitud_mudanza_id'])) {
                $existente = ExpedienteSeguro::where('solicitud_mudanza_id', $data['solicitud_mudanza_id'])->first();

                if ($existente) {
                    return $existente;
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Generar folio
            |--------------------------------------------------------------------------
            */
            $siguienteId = (ExpedienteSeguro::max('id') ?? 0) + 1;
            $folio = 'SEG-' . now()->format('Ymd') . '-' . str_pad($siguienteId, 6, '0', STR_PAD_LEFT);

            /*
            |--------------------------------------------------------------------------
            | Crear expediente
            |--------------------------------------------------------------------------
            */
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

    /**
     * Obtener expediente mediante folio.
     */
    public function obtenerPorFolio(string $folio): ?ExpedienteSeguro
    {
        return ExpedienteSeguro::where('folio', $folio)->first();
    }

    /**
     * Iniciar captura del expediente.
     */
    public function iniciarCaptura(ExpedienteSeguro $expediente): ExpedienteSeguro
    {
        if (in_array($expediente->estado, ['nuevo', 'esperando_cliente'], true)) {

            $expediente->update([
                'estado' => 'capturando',
                'cliente_inicio_at' => $expediente->cliente_inicio_at ?? now(),
            ]);
        }

        return $expediente->fresh();
    }

    /**
     * Guardar el Paso 1 del expediente.
     */
    public function guardarPasoUno(ExpedienteSeguro $expediente, array $data): ExpedienteSeguro
    {
        return DB::transaction(function () use ($expediente, $data) {
            $tipoSeguro = $data['tipo_seguro'];
            /*
            |--------------------------------------------------------------------------
            | Valores por tipo de seguro
            |--------------------------------------------------------------------------
            | Menaje:
            |   - requiere valor_menaje
            |   - no utiliza valor_automovil
            |
            | Menaje + Auto:
            |   - requiere valor_menaje
            |   - requiere valor_automovil
            |
            | Automóvil:
            |   - requiere valor_automovil
            |   - no utiliza valor_menaje
            */
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
            | Guardar información
            |--------------------------------------------------------------------------
            */
            $expediente->update([
                'tipo_seguro' => $tipoSeguro,
                'valor_menaje' => $valorMenaje,
                'valor_automovil' => $valorAutomovil,

                /*
                | La prima todavía no se calcula.
                | La dejamos NULL hasta implementar la lógica correspondiente.
                */
                'prima_estimada' => null,
                'progreso' => max( $expediente->progreso, 33 ),
                'estado' => 'capturando',
            ]);

            return $expediente->fresh();
        });
    }
}