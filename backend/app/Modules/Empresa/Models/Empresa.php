<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Empresa extends Authenticatable
{
    use HasApiTokens, HasFactory;

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
        'email_verified_at',
        'logo',
        'reputacion',
        'numServicios',
        'estadoRFC',
        'subActiva',
        'subInicio',
        'subFin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'subInicio' => 'date',
        'subFin' => 'date',
        'subActiva' => 'boolean',
    ];
}