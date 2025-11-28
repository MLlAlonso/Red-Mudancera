<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Empresa extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'empresas';

    protected $fillable = [
        'empresa',
        'representante',
        'rfc',
        'base',
        'tel',
        'email',
        'password',
        'codigoEmpresa',
        'logo',
        'reputacion',
        'numServicios',
        'estadoRFC',
        'subActiva',
        'subInicio',
        'subFin'
    ];

    protected $hidden = [
        'password'
    ];
}
