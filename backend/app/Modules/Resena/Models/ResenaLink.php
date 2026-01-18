<?php

namespace App\Modules\Resena\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Resena\Models\Resena;

class ResenaLink extends Model
{
    protected $fillable = [
        'empresa_origen_id',
        'empresa_destino_id',
        'resena_id',
        'token',
        'usado',
        'tipo', // invite | response
    ];

    protected $casts = [
        'usado' => 'boolean',
    ];

    public function empresaOrigen()
    {
        return $this->belongsTo(Empresa::class, 'empresa_origen_id');
    }

    public function empresaDestino()
    {
        return $this->belongsTo(Empresa::class, 'empresa_destino_id');
    }

    public function resena()
    {
        return $this->belongsTo(Resena::class);
    }
}
