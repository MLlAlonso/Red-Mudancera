<?php

namespace App\Modules\Empresa\Services;
use App\Modules\Empresa\Models\Empresa;

class EmpresaConfiguracionDocumentosService
{
    public function obtener(Empresa $empresa): array
    {
        $configuracion = $empresa->configuracion_documentos ?? [];

        return [
            'nombre_comercial' => $configuracion['nombre_comercial'] ?? $empresa->empresa,

            'clausulas' => [
                'politica_seguro' => $configuracion['clausulas']['politica_seguro'] ?? '',
                'incluye_servicio' => $configuracion['clausulas']['incluye_servicio'] ?? '',
                'condiciones_pago_cancelacion' => $configuracion['clausulas']['condiciones_pago_cancelacion'] ?? '',
            ],

            'seguro_porcentaje' => $configuracion['seguro_porcentaje'] ?? 2,
            'pie_pagina' => $configuracion['pie_pagina'] ?? '',
        ];
    }

    public function actualizar(Empresa $empresa, array $datos): array
    {
        $configuracionActual = $empresa->configuracion_documentos ?? [];

        $configuracionActualizada = [
            'nombre_comercial' => $datos['nombre_comercial'] ?? $empresa->empresa,

            'clausulas' => [
                'politica_seguro' => $datos['clausulas']['politica_seguro'] ?? '',
                'incluye_servicio' => $datos['clausulas']['incluye_servicio'] ?? '',
                'condiciones_pago_cancelacion' => $datos['clausulas']['condiciones_pago_cancelacion'] ?? '',
            ],

            'seguro_porcentaje' => $datos['seguro_porcentaje'] ?? 2,
            'pie_pagina' => $datos['pie_pagina'] ?? '',
        ];

        $empresa->configuracion_documentos = $configuracionActualizada;
        $empresa->save();

        return $this->obtener($empresa->fresh());
    }
}