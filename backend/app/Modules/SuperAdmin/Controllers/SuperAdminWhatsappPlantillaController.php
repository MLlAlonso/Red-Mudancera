<?php

namespace App\Modules\SuperAdmin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SuperAdmin\Models\SuperAdminWhatsappPlantilla;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SuperAdminWhatsappPlantillaController extends Controller
{
    public function index(Request $request)
    {
        $datos = $request->validate([
            'area' => [
                'nullable',
                'string',
                Rule::in(SuperAdminWhatsappPlantilla::AREAS_DISPONIBLES),
            ],
        ]);

        $area = $datos['area'] ?? SuperAdminWhatsappPlantilla::AREA_SEGUROS;
        $plantillas = SuperAdminWhatsappPlantilla::query()->where('area', $area)->orderBy('created_at')->get();
        return response()->json(['data' => $plantillas,]);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'titulo' => ['required', 'string', 'min:2', 'max:60'],
            'mensaje' => ['required', 'string', 'min:1', 'max:1000'],
            'area' => [
                'sometimes',
                'string',
                Rule::in(SuperAdminWhatsappPlantilla::AREAS_DISPONIBLES),
            ],
        ]);

        $plantilla = SuperAdminWhatsappPlantilla::create([
            'area' => $datos['area'] ?? SuperAdminWhatsappPlantilla::AREA_SEGUROS,
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
        ]);

        return response()->json(['message' => 'Plantilla creada correctamente.', 'data' => $plantilla,], 201);
    }

    public function update(Request $request, int $id)
    {
        $datos = $request->validate([
            'titulo' => ['required', 'string', 'min:2', 'max:60'],
            'mensaje' => ['required', 'string', 'min:1', 'max:1000'],
        ]);

        $plantilla = SuperAdminWhatsappPlantilla::findOrFail($id);

        $plantilla->update([
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
        ]);

        return response()->json([
            'message' => 'Plantilla actualizada correctamente.',
            'data' => $plantilla->refresh(),
        ]);
    }

    public function destroy(int $id)
    {
        $plantilla = SuperAdminWhatsappPlantilla::findOrFail($id);
        $plantilla->delete();

        return response()->json(['message' => 'Plantilla eliminada correctamente.',]);
    }
}
