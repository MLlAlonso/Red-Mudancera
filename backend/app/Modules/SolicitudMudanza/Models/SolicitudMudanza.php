<?php

namespace App\Modules\SolicitudMudanza\Models;
use Illuminate\Database\Eloquent\Model;

class SolicitudMudanza extends Model
{
    protected $table = 'solicitudes_mudanza';

    protected $fillable = [
        'origen',
        'destino',
        'distancia_km',
        'tipo_vivienda',
        'inventario',
        'fecha_recoleccion',
        'tipo_mudanza',
        'nombre',
        'email',
        'telefono',
        'codigo_verificacion',
        'telefono_verificado',
        'estado',
        'ip_address'
    ];
}