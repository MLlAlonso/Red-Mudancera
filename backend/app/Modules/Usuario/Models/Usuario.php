<?php

namespace App\Modules\Usuario\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuarios';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'email',
        'password',
        'rol',
        'activoEmpresa'
    ];

    protected $hidden = [
        'password'
    ];

    public function empresa()
    {
        return $this->belongsTo(\App\Modules\Empresa\Models\Empresa::class);
    }
}
