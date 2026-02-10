<?php

namespace App\Modules\Notificacion\Models;

use Illuminate\Database\Eloquent\Model;

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
    ];

    public function usuarios()
    {
        return $this->belongsToMany(
            \App\Modules\Usuario\Models\Usuario::class,
            'notificacion_usuario'
        )->withPivot(['leida', 'leida_at'])
            ->withTimestamps();
    }
}
