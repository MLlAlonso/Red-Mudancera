<?php

namespace App\Modules\Servicio\Services;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Models\ServicioImagen;
use App\Services\CloudinaryService;
use Illuminate\Validation\ValidationException;

class ServicioImagenService
{
    protected CloudinaryService $cloudinary;
    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    /**
     * Guardar imágenes del servicio (máx 3)
     */
    public function guardarImagenes(Servicio $servicio, array $imagenes): void
    {
        if (count($imagenes) > 3) {
            throw ValidationException::withMessages([
                'imagenes' => ['Máximo 3 imágenes por servicio'],
            ]);
        }

        $orden = 1;

        foreach ($imagenes as $imagen) {
            $upload = $this->cloudinary->upload(
                $imagen,
                'servicios/imagenes'
            );

            ServicioImagen::create([
                'servicio_id' => $servicio->id,
                'url'         => $upload['url'],
                'public_id'   => $upload['public_id'],
                'orden'       => $orden++,
            ]);
        }
    }

    /**
     * Eliminar todas las imágenes de un servicio
     */
    public function eliminarTodas(Servicio $servicio): void
    {
        foreach ($servicio->imagenes as $img) {
            $this->cloudinary->deleteByPublicId($img->public_id);
            $img->delete();
        }
    }
}