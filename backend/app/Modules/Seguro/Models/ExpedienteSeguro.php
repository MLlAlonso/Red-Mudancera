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
        'automovil_marca',
        'automovil_modelo',
        'automovil_numero_serie',
        'automovil_foto_circulacion_url',
        'automovil_foto_circulacion_public_id',
        'prima_estimada',
        'modalidad_datos',
        'forma_proporcion_datos',
        'asistencia_empresa_mudanza',
        'asistencia_contacto',
        'asistencia_telefono',
        'nombre',
        'email',
        'telefono',
        'empresa_mudanza',
        'origen',
        'destino',
        'inventario',
        'fecha_recoleccion',
        'fecha_salida',
        'fecha_llegada',
        'propietario_unidad',
        'marca_unidad',
        'modelo_unidad',
        'placas',
        'chofer',
        'es_externo',
        'correo_programado_at',
        'correo_enviado_at',
        'cliente_inicio_at',
        'cliente_finalizo_at',
        'ultimo_autoguardado_at',
        'empresa_access_token',
        'empresa_access_created_at',
        'empresa_datos_finalizados_at',
    ];

    protected $casts = [
        'correo_programado_at' => 'datetime',
        'correo_enviado_at' => 'datetime',
        'cliente_inicio_at' => 'datetime',
        'cliente_finalizo_at' => 'datetime',
        'ultimo_autoguardado_at' => 'datetime',
        'fecha_salida' => 'date',
        'fecha_llegada' => 'date',
        'es_externo' => 'boolean',
        'valor_menaje' => 'decimal:2',
        'valor_automovil' => 'decimal:2',
        'prima_estimada' => 'decimal:2',
        'empresa_access_created_at' => 'datetime',
        'empresa_datos_finalizados_at' => 'datetime',
    ];

    protected $appends = [
        'enlace_empresa',
    ];

    public function getEnlaceEmpresaAttribute(): ?string
    {
        if (!$this->empresa_access_token) {
            return null;
        }

        $frontendUrl = rtrim(config('app.frontend_url'), '/');
        return $frontendUrl . '/seguros/empresa/' . $this->empresa_access_token;
    }

    public function solicitud()
    {
        return $this->belongsTo( SolicitudMudanza::class, 'solicitud_mudanza_id' );
    }
}