<?php

namespace App\Modules\Seguro\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class ExpedienteSeguro extends Model
{
    protected $table = 'expedientes_seguro';

    protected $fillable = [
        'solicitud_mudanza_id',
        'folio',
        'access_token',
        'estado',
        'progreso',
        'tipo_seguro',
        'valor_menaje',
        'valor_automovil',
        'prima_estimada',
        'nombre',
        'email',
        'telefono',
        'empresa_mudanza',
        'origen',
        'destino',
        'fecha_salida',
        'fecha_llegada',
        'inventario',
        'fecha_recoleccion',
        'es_externo',
        'propietario_unidad',
        'marca_unidad',
        'modelo_unidad',
        'placas',
        'chofer',
        'correo_programado_at',
        'correo_enviado_at',
        'cliente_inicio_at',
        'cliente_finalizo_at',
        'ultimo_autoguardado_at'
    ];

    protected $casts = [
        'correo_programado_at' => 'datetime',
        'correo_enviado_at' => 'datetime',
        'cliente_inicio_at' => 'datetime',
        'cliente_finalizo_at' => 'datetime',
        'ultimo_autoguardado_at' => 'datetime',
        'fecha_salida' => 'date',
        'fecha_llegada' => 'date',
        'es_externo'=>'boolean',
        'valor_menaje' => 'decimal:2',
        'valor_automovil' => 'decimal:2',
        'prima_estimada' => 'decimal:2',
    ];

    public function solicitud()
    {
        return $this->belongsTo(SolicitudMudanza::class, 'solicitud_mudanza_id');
    }
}