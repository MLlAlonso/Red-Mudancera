<?php

namespace App\Modules\Notificacion\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Notificacion extends Model
{
    protected $table = 'notificaciones';
    protected $fillable = [
        'empresa_id',
        'tipo',
        'titulo',
        'mensaje',
        'url_destino',
        'creado_por',
        'leida_empresa',
        'leida_empresa_at',
        'toast_mostrado',
        'toast_mostrado_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELACIONES
    |--------------------------------------------------------------------------
    */
    public function usuarios()
    {
        return $this->belongsToMany(\App\Modules\Usuario\Models\Usuario::class, 'notificacion_usuario')
            ->withPivot(['leida', 'leida_at'])
            ->withTimestamps();
    }

    /*
    |--------------------------------------------------------------------------
    | LIMPIEZA AUTOMÁTICA
    |--------------------------------------------------------------------------
    */
    public static function purgeOldForEmpresa(int $empresaId): void
    {
        self::where('empresa_id', $empresaId)
            ->where('leida_empresa', true)
            ->whereNotNull('leida_empresa_at')
            ->where('leida_empresa_at', '<=', Carbon::now()->subDays(7))
            ->delete();
    }
}
