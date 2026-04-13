<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\EmpresaImagen;
use App\Services\CloudinaryService;
use Illuminate\Validation\ValidationException;

class EmpresaImagenService
{
    public function guardarDesdeFrontend(Empresa $empresa, array $imagenes): void
    {
        if (count($imagenes) > 5) {
            throw ValidationException::withMessages([
                'imagenes' => ['Máximo 5 imágenes por empresa'],
            ]);
        }

        $ultimoOrden = $empresa->imagenes()->max('orden');
        $orden = $ultimoOrden ? $ultimoOrden + 1 : 1;

        foreach ($imagenes as $img) {
            EmpresaImagen::create([
                'empresa_id' => $empresa->id,
                'url' => $img['url'],
                'public_id' => $img['public_id'],
                'orden' => $orden++,
            ]);
        }
    }

    public function eliminarPorIds(Empresa $empresa, array $ids): void
    {
        $imagenes = EmpresaImagen::whereIn('id', $ids)
            ->where('empresa_id', $empresa->id)
            ->get();

        foreach ($imagenes as $img) {
            app(CloudinaryService::class)
                ->deleteByPublicId($img->public_id);

            $img->delete();
        }
    }
}