<?php

namespace App\Modules\Empresa\Models;
use Illuminate\Database\Eloquent\Model;

class EmpresaRadarConfig extends Model
{
    protected $fillable = [
        'empresa_id',
        'ciudades'
    ];

    protected $casts = [
        'ciudades' => 'array'
    ];
}