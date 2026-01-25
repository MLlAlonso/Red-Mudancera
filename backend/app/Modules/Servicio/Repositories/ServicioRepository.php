<?php

namespace App\Modules\Servicio\Repositories;

use App\Modules\Servicio\Models\Servicio;
use Carbon\Carbon;

class ServicioRepository
{
    public function search(array $params)
    {
        $query = Servicio::with('empresa')
            ->activos()
            ->whereDate('fin', '>=', Carbon::today())
            ->orderBy('updated_at', 'desc');

        /* ============================
         | BUSQUEDA GENERAL
         ============================ */
        $query->when($params['search'] ?? null, function ($q, $search) {
            $q->where(function ($q) use ($search) {
                $q->where('origen', 'like', "%{$search}%")
                    ->orWhere('destino', 'like', "%{$search}%")
                    ->orWhereHas('empresa', function ($e) use ($search) {
                        $e->where('empresa', 'like', "%{$search}%");
                    });
            });
        });

        /* ============================
         | FILTROS
         ============================ */
        $query->when(
            $params['origen'] ?? null,
            fn($q, $v) =>
            $q->where('origen', 'like', "%{$v}%")
        );

        $query->when(
            $params['destino'] ?? null,
            fn($q, $v) =>
            $q->where('destino', 'like', "%{$v}%")
        );

        $query->when(
            $params['volumen'] ?? null,
            fn($q, $v) =>
            $q->where('volumen', '>=', $v)
        );

        $query->when(
            $params['tipoCarga'] ?? null,
            fn($q, $v) =>
            $q->where('tipo_carga', $v)
        );

        $query->when(
            ($params['fechaInicio'] ?? null) && ($params['fechaFin'] ?? null),
            fn($q) =>
            $q->whereBetween('inicio', [
                $params['fechaInicio'],
                $params['fechaFin']
            ])
        );

        $query->when($params['sede'] ?? null, function ($q, $v) {
            $q->whereHas(
                'empresa',
                fn($e) =>
                $e->where('base', 'like', "%{$v}%")
            );
        });

        return $query->paginate(999);
    }

    public function findById(int $id): ?Servicio
    {
        return Servicio::with('empresa')->find($id);
    }
}