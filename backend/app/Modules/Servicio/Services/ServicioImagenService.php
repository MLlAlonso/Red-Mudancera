<?php

namespace App\Modules\Servicio\Services;

use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServicioImagen;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ServicioImagenService
{
    /**
     * Guardar imágenes YA SUBIDAS (frontend → Cloudinary)
     */
    public function guardarDesdeFrontend(
        Servicio $servicio,
        array $imagenes
    ): void {
        if (count($imagenes) > 3) {
            throw ValidationException::withMessages([
                'imagenes' => ['Máximo 3 imágenes por servicio'],
            ]);
        }

        $ultimoOrden = $servicio->imagenes()->max('orden');
        $orden = $ultimoOrden ? $ultimoOrden + 1 : 1;

        foreach ($imagenes as $img) {
            ServicioImagen::create([
                'servicio_id' => $servicio->id,
                'url'         => $img['url'],
                'public_id'   => $img['public_id'],
                'orden'       => $orden++,
            ]);
        }
    }

    /**
     * Eliminar todas las imágenes del servicio (Cloudinary)
     */
    public function eliminarTodas(Servicio $servicio): void
    {
        foreach ($servicio->imagenes as $img) {
            app(CloudinaryService::class)
                ->deleteByPublicId($img->public_id);
            $img->delete();
        }
    }

    public function eliminarPorIds(Servicio $servicio, array $ids): void
    {
        $imagenes = ServicioImagen::whereIn('id', $ids)
            ->where('servicio_id', $servicio->id)
            ->get();

        foreach ($imagenes as $img) {
            app(CloudinaryService::class)
                ->deleteByPublicId($img->public_id);

            $img->delete();
        }
    }
}
