<?php

namespace App\Modules\SolicitudMudanza\Models;
use Illuminate\Database\Eloquent\Model;

class LeadCompra extends Model
{
    protected $table = 'lead_compras';
    protected $fillable = [
        'solicitud_id',
        'empresa_id',
        'exclusivo',
        'tokens_pagados',
        'estado_operacion',
        'ganancia',
        'finalizado_at',
    ];

    protected $casts = [
        'finalizado_at' => 'datetime',
        'ganancia' => 'decimal:2',
    ];

    public function solicitud()
    {
        return $this->belongsTo(SolicitudMudanza::class, 'solicitud_id');
    }
}