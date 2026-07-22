<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Tutorial\Models\Tutorial;

class TutorialSeeder extends Seeder
{
    public function run(): void
    {
        $tutoriales = [
            [
                'slug' => 'publicar-servicio-busqueda-carga',
                'titulo' => 'Cómo publicar un servicio de búsqueda de carga',
                'descripcion' => 'Aprende a publicar un servicio de búsqueda de carga para encontrar empresas interesadas en transportar tu mercancía.',
                'video_url' => 'https://res.cloudinary.com/dt3jhwxfw/video/upload/v1784655768/C%C3%B3mo_publicar_un_servicio_de_b%C3%BAsqueda_de_carga_ocx0fq.mp4',
                'thumbnail_url' => '',
                'duracion' => '00:46',
                'orden' => 1,
                'activo' => true,
                'mostrar' => true,
                'mostrar_automaticamente' => true,
                'dias_maximos' => 7,
            ],

            [
                'slug' => 'publica-tu-carga-y-muevela-hoy',
                'titulo' => 'Publica tu carga y muévela hoy',
                'descripcion' => 'Conoce cómo publicar una carga disponible para que otras empresas puedan ayudarte a moverla rápidamente.',
                'video_url' => 'https://res.cloudinary.com/dt3jhwxfw/video/upload/v1784655768/Publica_tu_carga_y_mu%C3%A9vela_hoy_qndsxy.mp4',
                'thumbnail_url' => '',
                'duracion' => '01:14',
                'orden' => 2,
                'activo' => true,
                'mostrar' => true,
                'mostrar_automaticamente' => false,
                'dias_maximos' => 7,
            ],

        ];

        foreach ($tutoriales as $tutorial) {
            Tutorial::updateOrCreate(
                ['slug' => $tutorial['slug']],
                $tutorial
            );
        }
    }
}