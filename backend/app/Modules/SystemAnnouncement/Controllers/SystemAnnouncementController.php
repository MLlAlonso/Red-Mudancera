<?php

namespace App\Modules\SystemAnnouncement\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\SystemAnnouncement\Models\SystemAnnouncement;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Notificacion\Services\NotificacionService;
use App\Modules\SystemAnnouncement\Models\SystemAnnouncementRead;

class SystemAnnouncementController extends Controller
{
    public function latest()
    {
        $empresa = auth("empresa")->user();
        $announcement = SystemAnnouncement::where("activo", true)->where(function ($query) {
            $query->whereNull("expires_at")->orWhere(
                "expires_at",
                ">",
                now()
            );
        })

            ->whereDoesntHave("reads", function ($query) use ($empresa) {
                $query->where(
                    "empresa_id",
                    $empresa->id
                );
            })

            ->orderByDesc("id")
            ->first();

        return response()->json([
            "data" => $announcement
        ]);
    }

    public function store(Request $request, NotificacionService $notificacionService)
    {
        $request->validate([
            'titulo' => 'required|string|max:120',
            'mensaje' => 'required|string|max:500',
        ]);

        SystemAnnouncement::where("activo", true)->update([
            "activo" => false
        ]);

        $announcement = SystemAnnouncement::create([
            'titulo' => $request->titulo,
            'mensaje' => $request->mensaje,
            'activo' => true,
            'expires_at' => now()->addDay(),
        ]);

        /*
        |--------------------------------------------------------------------------
        | NOTIFICACIÓN EMPRESAS
        |--------------------------------------------------------------------------
        */
        Empresa::chunk(100, function ($empresas)
        use ($request, $notificacionService) {
            foreach ($empresas as $empresa) {
                $notificacionService->crearParaEmpresa(
                    $empresa->id,
                    $request->titulo,
                    $request->mensaje,
                    'system'
                );
            }
        });

        return response()->json([
            'success' => true,
            'data' => $announcement
        ]);
    }

    public function markAsRead($id)
    {
        $empresa = auth("empresa")->user();
        $announcement = SystemAnnouncement::findOrFail($id);

        SystemAnnouncementRead::firstOrCreate([
            "announcement_id" => $announcement->id,
            "empresa_id"      => $empresa->id,
        ]);

        return response()->json([
            "success" => true
        ]);
    }
}