<?php

namespace App\Modules\Tutorial\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Tutorial\Models\Tutorial;
use App\Modules\Tutorial\Models\EmpresaTutorialVisto;

class TutorialService
{
    /**
     * Obtener tutoriales para la empresa autenticada.
     */
    public function getTutoriales(Empresa $empresa)
    {
        $diasRegistro = $empresa->created_at->diffInDays(now());

        $tutorialesVistos = EmpresaTutorialVisto::where('empresa_id', $empresa->id)
            ->pluck('tutorial_id')
            ->toArray();

        return Tutorial::disponibles()
            ->orderBy('orden')
            ->get()
            ->map(function ($tutorial) use ($tutorialesVistos, $diasRegistro) {

                $visto = in_array($tutorial->id, $tutorialesVistos);
                $mostrarAutomaticamente = false;

                if (
                    !$visto && $tutorial->mostrar_automaticamente &&
                    (is_null($tutorial->dias_maximos) || $diasRegistro <= $tutorial->dias_maximos)
                ) {
                    $mostrarAutomaticamente = true;
                }

                return [
                    'id' => $tutorial->id,
                    'titulo' => $tutorial->titulo,
                    'slug' => $tutorial->slug,
                    'descripcion' => $tutorial->descripcion,
                    'video_url' => $tutorial->video_url,
                    'thumbnail_url' => $tutorial->thumbnail_url,
                    'duracion' => $tutorial->duracion,
                    'orden' => $tutorial->orden,
                    'visto' => $visto,
                    'mostrar_automaticamente' => $mostrarAutomaticamente,
                ];
            });
    }

    /**
     * Marcar tutorial como visto.
     */
    public function marcarComoVisto(Empresa $empresa, Tutorial $tutorial)
    {
        EmpresaTutorialVisto::firstOrCreate(
            [
                'empresa_id' => $empresa->id,
                'tutorial_id' => $tutorial->id,
            ],
            [
                'visto_at' => now(),
            ]
        );
    }
}
