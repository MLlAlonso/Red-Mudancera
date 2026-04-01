<?php

namespace App\Modules\Servicio\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modules\Empresa\Models\Empresa;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Modules\Servicio\Models\ServicioImagen;

class Servicio extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'servicios';

    /**
     * Campos asignables en creación / actualización
     */
    protected $fillable = [
        'empresa_id',
        'tipo',
        'volumen',
        'origen',
        'destino',
        'distancia_km',
        'inicio',
        'fin',
        'tipo_carga',
        'tipo_vehiculo',
        'nota',
        'responsable_nombre',
        'responsable_telefono',
        'importe',
        'estado',
        'ganancia',
        'finalizado_at',
        'estado_carga',
    ];

    /**
     * Casts automáticos
     */
    protected $casts = [
        'inicio' => 'date',
        'fin'    => 'date',
        'volumen' => 'decimal:2',
        'finalizado_at' => 'datetime',
    ];

    /**
     * Valores por defecto
     */
    protected $attributes = [
        'estado' => 'activo',
        'tipo_carga' => 'menaje',
        'estado_carga' => 'mi_almacen',
    ];

    protected $with = ['imagenes'];

    /* =====================================================
     |  RELACIONES
     ===================================================== */

    /**
     * Empresa propietaria del servicio
     */
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    /**
     * Reputación asociada (futuro)
     */
    public function reputacion()
    {
        return $this->hasOne(
            \App\Modules\Reputacion\Models\Reputacion::class,
            'servicio_id'
        );
    }

    /* =====================================================
     |  SCOPES (BÚSQUEDAS)
     ===================================================== */

    /**
     * Solo servicios activos
     */
    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }

    /**
     * Filtro por origen
     */
    public function scopeOrigen($query, $origen)
    {
        if ($origen) {
            $query->where('origen', 'like', "%{$origen}%");
        }
    }

    /**
     * Filtro por destino
     */
    public function scopeDestino($query, $destino)
    {
        if ($destino) {
            $query->where('destino', 'like', "%{$destino}%");
        }
    }

    /**
     * Filtro por volumen mínimo
     */
    public function scopeVolumenMinimo($query, $volumen)
    {
        if ($volumen) {
            $query->where('volumen', '>=', $volumen);
        }
    }

    /**
     * Filtro por rango de fechas
     */
    public function scopeRangoFechas($query, $fecha)
    {
        if ($fecha) {
            $query->whereDate('inicio', '<=', $fecha)
                ->whereDate('fin', '>=', $fecha);
        }
    }

    /**
     * Filtro por tipo (busco / ofrezco)
     */
    public function scopeTipo($query, $tipo)
    {
        if ($tipo) {
            $query->where('tipo', $tipo);
        }
    }

    /* =====================================================
     |  HELPERS DE ESTADO
     ===================================================== */

    public function estaActivo(): bool
    {
        return $this->estado === 'activo';
    }

    public function estaAsignado(): bool
    {
        return $this->estado === 'asignado';
    }

    public function estaFinalizado(): bool
    {
        return $this->estado === 'finalizado';
    }

    /**
     * Imágenes del servicio (máx 3)
     */
    public function imagenes()
    {
        return $this->hasMany(
            \App\Modules\Servicio\Models\ServicioImagen::class,
            'servicio_id'
        )->orderBy('orden');
    }

    protected static function booted()
    {
        static::forceDeleted(function ($servicio) {
            app(\App\Modules\Servicio\Services\ServicioImagenService::class)
                ->eliminarTodas($servicio);
        });
    }
}