<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Database\Eloquent\Model;

class EmpresaNota extends Model
{
    protected $table = 'empresa_notas';

    protected $fillable = [
        'empresa_id',
        'contenido'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }
}