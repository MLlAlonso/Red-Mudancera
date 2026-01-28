<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use Illuminate\Http\Request;

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
            'representante' => $empresa->representante,
            'tel'          => $empresa->tel,
            'logo_url'     => $empresa->logo_url,
            'reputacion'   => $empresa->reputacion,
            'numServicios' => $empresa->numServicios,
        ]);
    }

    /**
     * Listado público de empresas
     */
    public function index(Request $request)
    {
        $query = Empresa::query();

        // Filtro por sede (base)
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('empresa', 'like', "%{$request->search}%")
                    ->orWhere('base', 'like', "%{$request->search}%");
            });
        }

        $empresas = $query
            ->orderByDesc('reputacion')
            ->get()
            ->map(fn($e) => [
                'id'       => $e->id,
                'empresa'  => $e->empresa,
                'base'     => $e->base,
                'logo_url' => $e->logo_url,
                'reputacion' => $e->reputacion,
            ]);

        return response()->json($empresas);
    }
}
