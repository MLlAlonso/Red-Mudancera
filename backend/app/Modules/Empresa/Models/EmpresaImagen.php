<?php

namespace App\Modules\Empresa\Models;
use Illuminate\Database\Eloquent\Model;

class EmpresaImagen extends Model
{
    protected $table = 'empresa_imagenes';

    protected $fillable = [
        'empresa_id',
        'url',
        'public_id',
        'orden',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }
}