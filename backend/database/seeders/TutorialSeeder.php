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

            [
                'slug' => 'Como-crear-un-acceso-directo-en-tu-celular',
                'titulo' => 'Como crear un acceso directo en tu celular',
                'descripcion' => 'Conoce acceder a nuestra plataforma desde la pantalla de inicio de tu celular.',
                'video_url' => 'https://res.cloudinary.com/dt3jhwxfw/video/upload/v1785134474/Como_crear_un_acceso_directo_en_tu_celular_kilcja.mp4',
                'thumbnail_url' => '',
                'duracion' => '00:16',
                'orden' => 3,
                'activo' => true,
                'mostrar' => true,
                'mostrar_automaticamente' => false,
                'dias_maximos' => 7,
            ],

            [
                'slug' => 'Optimiza tus creditos',
                'titulo' => 'Optimiza tus creditos y obten mejores resultados',
                'descripcion' => 'Conoce cómo funcionan los créditos y cómo puedes utilizarlos para acceder a contactos de clientes que están buscando una mudanza.',
                'video_url' => 'https://res.cloudinary.com/dt3jhwxfw/video/upload/v1789622461/WhatsApp_Video_2026-09-09_at_6.28.13_PM_ocnavq.mp4',
                'thumbnail_url' => '',
                'duracion' => '',
                'orden' => 4,
                'activo' => true,
                'mostrar' => true,
                'mostrar_automaticamente' => false,
                'dias_maximos' => 7,
            ],
        ];

        foreach ($tutoriales as $tutorial) {
            Tutorial::updateOrCreate(['slug' => $tutorial['slug']], $tutorial);
        }
    }
}
