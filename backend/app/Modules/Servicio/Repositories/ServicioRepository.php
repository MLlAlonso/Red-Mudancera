<?php

namespace App\Modules\Servicio\Repositories;

use App\Modules\Servicio\Models\Servicio;

class ServicioRepository
{
    public function search(array $filters)
    {
        return Servicio::with('empresa')
            ->activos()
            ->orderBy('updated_at', 'desc')
            ->paginate(10);
    }

    public function findById(int $id): ?Servicio
    {
        return Servicio::with('empresa')->find($id);
    }
}