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
                    "origen" => $sol->origen,
                    "destino" => $sol->destino,
                    "telefono" => $sol->telefono,
                    "nombre" => $sol->nombre,
                    "tipo_vivienda" => $sol->tipo_vivienda,
                    "vivienda_destino" => $sol->vivienda_destino,
                    "inventario" => $sol->inventario,
                    "fecha_recoleccion" => $sol->fecha_recoleccion,
                    "tipo_mudanza" => $sol->tipo_mudanza,
                    "created_at" => $lead->created_at,
                    "estado_operacion" => $lead->estado_operacion,
                    "ganancia" => $lead->ganancia,
                    "finalizado_at" => $lead->finalizado_at,
                    "oculto" => $lead->oculto,
                    "tokens_pagados" => $lead->tokens_pagados,
                    "exclusivo" => $lead->exclusivo,
                ];
            })
            ->filter()
            ->values();

        // MÉTRICAS
        $stats = [
            "total_contactos" => $contactos->count(),
            "activos" => $contactos
                ->where("estado_operacion", "activo")
                ->count(),

            "contactados" => $contactos
                ->where("estado_operacion", "asignado")
                ->count(),

            "finalizados" => $contactos
                ->where("estado_operacion", "finalizado")
                ->count(),

            "ganancia_total" => $contactos ->sum("ganancia"),
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