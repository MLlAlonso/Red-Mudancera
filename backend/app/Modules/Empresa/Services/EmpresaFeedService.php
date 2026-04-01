<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use Illuminate\Support\Collection;

class EmpresaFeedService
{
    public function getFeed($empresaId): Collection
    {
        /* ==============================
           SERVICIOS ACTIVOS Y VIGENTES
        ============================== */
        $servicios = Servicio::with('empresa')
            ->where('estado', 'activo')
            ->whereDate('fin', '>=', now())
            ->latest()
            ->get()
            ->map(function ($s) {
                return [
                    'id' => $s->id,
                    'tipo_item' => 'servicio',
                    'subtipo' => $s->tipo,
                    'origen' => $s->origen,
                    'destino' => $s->destino,
                    'volumen' => $s->volumen,
                    'tipoCarga' => $s->tipo_carga,
                    'tipoVehiculo' => $s->tipo_vehiculo,
                    'empresa' => $s->empresa?->empresa,
                    'telefono' => $s->empresa?->tel,
                    'distancia_km' => $s->distancia_km,
                    'importe' => $s->importe,
                    'created_at' => $s->created_at,
                ];
            });

        /* ==============================
            SOLICITUDES ACTIVAS DISPONIBLES
          ============================== */
        $comprasEmpresa = LeadCompra::where('empresa_id', $empresaId)
            ->pluck('solicitud_id')
            ->toArray();

        $solicitudes = SolicitudMudanza::where('estado', 'activo')
            ->whereDate('fecha_limite_visible', '>=', now())
            ->where('compras_count', '<', 3)
            ->whereDoesntHave('compras', function ($q) {
                $q->where('exclusivo', true);
            })
            ->latest()
            ->get()
            ->map(function ($s) use ($comprasEmpresa) {

                $yaComprado = in_array($s->id, $comprasEmpresa);

                return [
                    'id' => $s->id,
                    'tipo_item' => 'solicitud',
                    'subtipo' => null,
                    'origen' => $s->origen,
                    'destino' => $s->destino,
                    'fecha_recoleccion' => $s->fecha_recoleccion,
                    'tipo_mudanza' => $s->tipo_mudanza,
                    'inventario' => $s->inventario,
                    'distancia_km' => $s->distancia_km,
                    'created_at' => $s->created_at,
                    'ya_comprado' => $yaComprado,
                    'telefono' => $yaComprado ? $s->telefono : null,
                    'nombre_cliente' => $yaComprado ? $s->nombre : null,
                    'tipo_vivienda' => $yaComprado ? $s->tipo_vivienda : null,
                ];
            });

        /* ==============================
           MERGE + ORDEN CRONOLÓGICO
        ============================== */

        return collect($servicios)
            ->merge($solicitudes)
            ->sortByDesc('created_at')
            ->values();
    }
}
