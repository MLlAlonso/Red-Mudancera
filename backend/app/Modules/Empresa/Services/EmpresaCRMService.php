<?php

namespace App\Modules\Empresa\Services;

use App\Modules\SolicitudMudanza\Models\LeadCompra;

class EmpresaCRMService
{
    public function dashboard($empresa, $month = null, $year = null)
    {
        $query = LeadCompra::with("solicitud")->where("empresa_id", $empresa->id);

        // FILTRO POR FECHA
        if ($month) {
            $query->whereMonth("lead_compras.created_at", $month);
        }

        if ($year) {
            $query->whereYear("lead_compras.created_at", $year);
        }

        // OBTENER CONTACTOS
        $contactos = $query
            ->latest()
            ->get()
            ->map(function ($lead) {
                $sol = $lead->solicitud;

                if (!$sol) {
                    return null;
                }

                return [
                    "id" => $sol->id,
                    "tipo_item" => "lead",

                    /*
                    |--------------------------------------------------------------------------
                    | CLIENTE
                    |--------------------------------------------------------------------------
                    */
                    "nombre" => $sol->nombre,
                    "telefono" => $sol->telefono,

                    /*
                    |--------------------------------------------------------------------------
                    | MUDANZA
                    |--------------------------------------------------------------------------
                    */
                    "origen" => $sol->origen,
                    "destino" => $sol->destino,
                    "distancia_km" => $sol->distancia_km,
                    "tipo_servicio" => $sol->tipo_servicio,
                    "tipo_mudanza" => $sol->tipo_mudanza,
                    "tipo_vivienda" => $sol->tipo_vivienda,
                    "vivienda_destino" => $sol->vivienda_destino,
                    "inventario" => $sol->inventario,
                    "fecha_recoleccion" => $sol->fecha_recoleccion,

                    /*
                    |--------------------------------------------------------------------------
                    | CRM
                    |--------------------------------------------------------------------------
                    */
                    "estado_operacion" => $lead->estado_operacion,
                    "ganancia" => $lead->ganancia,
                    "finalizado_at" => $lead->finalizado_at,
                    "oculto" => $lead->oculto,
                    "tokens_pagados" => $lead->tokens_pagados,
                    "exclusivo" => $lead->exclusivo,

                    /*
                    |--------------------------------------------------------------------------
                    | FECHAS
                    |--------------------------------------------------------------------------
                    */
                    "created_at" => $lead->created_at,
                    "comprado_at" => $lead->created_at,

                ];
            })
            ->filter()
            ->values();

        // MÉTRICAS
        $stats = [
            "total_contactos" => $contactos->count(),
            "activos" => $contactos ->where("estado_operacion", "activo") ->count(),
            "contactados" => $contactos ->where("estado_operacion", "asignado") ->count(),
            "finalizados" => $contactos ->where("estado_operacion", "finalizado") ->count(),
            "ganancia_total" => $contactos->sum("ganancia"),
        ];

        return [
            "empresa" => [
                "id" => $empresa->id,
                "empresa" => $empresa->empresa,
                "plan" => $empresa->plan,
            ],

            "stats" => $stats,
            "contactos" => $contactos,
        ];
    }
}