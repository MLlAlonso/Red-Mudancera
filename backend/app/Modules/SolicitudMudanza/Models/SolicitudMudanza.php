<?php

namespace App\Modules\SolicitudMudanza\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\SolicitudMudanza\Models\LeadCompra;

class SolicitudMudanza extends Model
{
    protected $table = 'solicitudes_mudanza';
    protected $fillable = [
        'origen',
        'destino',
        'distancia_km',
        'tipo_vivienda',
        'vivienda_destino',
        'origen_pisos',
        'origen_elevador',
        'origen_acarreo',
        'destino_pisos',
        'destino_elevador',
        'destino_acarreo',
        'inventario',
        'fecha_recoleccion',
        'fecha_limite_visible',
        'tipo_servicio',
        'tipo_mudanza',
        'nombre',
        'email',
        'telefono',
        'codigo_verificacion',
        'codigo_expira_en',
        'telefono_verificado',
        'estado',
        'ip_address',
        'compras_count'
    ];

    protected $casts = [
        'codigo_expira_en' => 'datetime',
    ];

    public function compras()
    {
        return $this->hasMany(
            LeadCompra::class,
            'solicitud_id'
        );
    }
}