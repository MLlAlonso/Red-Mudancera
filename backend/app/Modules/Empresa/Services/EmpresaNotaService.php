<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\EmpresaNota;

class EmpresaNotaService
{
    /**
     * Obtener la nota de la empresa.
     */
    public function getNota(Empresa $empresa): EmpresaNota
    {
        return EmpresaNota::firstOrCreate(
            ['empresa_id' => $empresa->id],
            ['contenido' => '']
        );
    }

    /**
     * Guardar contenido.
     */
    public function guardarNota(Empresa $empresa, string $contenido): EmpresaNota
    {
        return EmpresaNota::updateOrCreate(
            ['empresa_id' => $empresa->id],
            ['contenido' => $contenido]
        );
    }
}
