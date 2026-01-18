<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;

class EmpresaPublicController extends Controller
{
    /**
     * Perfil público de empresa
     */
    public function show($id)
    {
        $empresa = Empresa::find($id);

        if (! $empresa) {
            return response()->json([
                'message' => 'Empresa no encontrada'
            ], 404);
        }

        return response()->json([
            'id'           => $empresa->id,
            'empresa'      => $empresa->empresa,
            'descripcion'  => $empresa->descripcion,
            'base'         => $empresa->base,
            'representante'=> $empresa->representante,
            'tel'          => $empresa->tel,
            'logo_url'     => $empresa->logo_url,
            'reputacion'   => $empresa->reputacion,
            'numServicios' => $empresa->numServicios,
        ]);
    }
}
