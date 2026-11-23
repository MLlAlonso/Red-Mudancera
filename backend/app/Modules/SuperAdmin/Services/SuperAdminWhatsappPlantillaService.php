<?php

namespace App\Modules\SuperAdmin\Services;

use App\Modules\SuperAdmin\Models\SuperAdminWhatsappPlantilla;
use Illuminate\Database\Eloquent\Collection;

class SuperAdminWhatsappPlantillaService
{
    public function listar(?string $area = null): Collection
    {
        return SuperAdminWhatsappPlantilla::query()
            ->when(
                $area !== 'todas',
                fn($query) => $query->where('area', $area ?? SuperAdminWhatsappPlantilla::AREA_SEGUROS)
            )
            ->orderBy('created_at')
            ->get();
    }

    public function crear(array $datos): SuperAdminWhatsappPlantilla
    {
        return SuperAdminWhatsappPlantilla::create([
            'area' => $datos['area'] ?? SuperAdminWhatsappPlantilla::AREA_SEGUROS,
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
        ]);
    }

    public function actualizar(int $id, array $datos): SuperAdminWhatsappPlantilla
    {
        $plantilla = SuperAdminWhatsappPlantilla::findOrFail($id);

        $actualizacion = [
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
        ];

        if (array_key_exists('area', $datos)) {
            $actualizacion['area'] = $datos['area'];
        }

        $plantilla->update($actualizacion);
        return $plantilla->refresh();
    }

    public function eliminar(int $id): void
    {
        $plantilla = SuperAdminWhatsappPlantilla::findOrFail($id);
        $plantilla->delete();
    }
}