<?php

namespace App\Modules\Notificacion\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Notificacion\Models\Notificacion;

class NotificacionUsuario extends Model
{
    protected $table = 'notificacion_usuario';
    protected $fillable = [
        'notificacion_id',
        'usuario_id',
        'leida',
        'leida_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELACIONES
    |--------------------------------------------------------------------------
    */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function notificacion()
    {
        return $this->belongsTo(Notificacion::class, 'notificacion_id');
    }

    /*
    |--------------------------------------------------------------------------
    | LIMPIEZA AUTOMÁTICA
    |--------------------------------------------------------------------------
    */
    public static function purgeOldForUsuario(int $usuarioId): void
    {
        self::where('usuario_id', $usuarioId)
            ->where('leida', true)
            ->whereNotNull('leida_at')
            ->where('leida_at', '<=', Carbon::now()->subDays(7))
            ->delete();
    }
}