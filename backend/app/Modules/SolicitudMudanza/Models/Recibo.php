<?php

namespace App\Modules\SolicitudMudanza\Models;

use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    protected $table = 'recibos';

    protected $fillable = [
        'empresa_id',
        'solicitud_id',
        'folio',
        'fecha_recibo',
        'ciudad',
        'nombre_cliente',
        'origen',
        'destino',
        'tipo_pago',
        'forma_pago',
        'monto',
        'total_acordado',
        'observaciones',
        'firma_empresa_path',
        'firma_cliente_path',
        'empresa_snapshot',
        'colores_snapshot',
        'pdf_path',
    ];

    protected $casts = [
        'fecha_recibo' => 'date',
        'monto' => 'decimal:2',
        'total_acordado' => 'decimal:2',
        'empresa_snapshot' => 'array',
        'colores_snapshot' => 'array',
    ];

    public function empresa()
    {
        return $this->belongsTo(\App\Modules\Empresa\Models\Empresa::class, 'empresa_id');
    }

    public function solicitud()
    {
        return $this->belongsTo(SolicitudMudanza::class, 'solicitud_id');
    }
}