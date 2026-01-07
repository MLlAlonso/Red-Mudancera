<?php

namespace App\Modules\Resena\Models;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Empresa\Models\Empresa;

class ResenaLink extends Model
{
    protected $fillable = [
        'empresa_origen_id',
        'empresa_destino_id',
        'token',
        'usado',
    ];

    public function empresaOrigen()
    {
        return $this->belongsTo(Empresa::class, 'empresa_origen_id');
    }
}