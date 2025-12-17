<?php

namespace App\Modules\Servicio\Repositories;

use App\Modules\Servicio\Models\Servicio;

class ServicioRepository
{
    /**
     * Búsqueda de servicios activos con filtros
     */
    public function search(array $filters)
    {
        return Servicio::query()
            ->activos()
            ->origen($filters['origen'] ?? null)
            ->destino($filters['destino'] ?? null)
            ->volumenMinimo($filters['volumen'] ?? null)
            ->rangoFechas($filters['fecha'] ?? null)
            ->tipo($filters['tipo'] ?? null)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    /**
     * Obtener servicio por ID
     */
    public function findById(int $id): ?Servicio
    {
        return Servicio::with('empresa')->find($id);
    }
}
