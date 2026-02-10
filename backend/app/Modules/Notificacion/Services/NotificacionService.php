<?php
namespace App\Modules\Notificacion\Services;

use App\Modules\Notificacion\Models\Notificacion;
use App\Modules\Usuario\Models\Usuario;

class NotificacionService
{
    public function crearParaEmpresa(
        int $empresaId,
        string $titulo,
        string $mensaje,
        string $tipo = 'info',
        ?string $url = null
    ): void {
        $notificacion = Notificacion::create([
            'empresa_id' => $empresaId,
            'titulo' => $titulo,
            'mensaje' => $mensaje,
            'tipo' => $tipo,
            'url_destino' => $url,
            'creado_por' => 'system',
        ]);

        $usuarios = Usuario::where('empresa_id', $empresaId)
            ->where('activoEmpresa', true)
            ->get();

        foreach ($usuarios as $usuario) {
            $notificacion->usuarios()->attach($usuario->id);
        }
    }
}
