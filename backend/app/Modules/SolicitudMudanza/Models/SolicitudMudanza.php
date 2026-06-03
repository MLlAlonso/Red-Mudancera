<?php

namespace App\Modules\SolicitudMudanza\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Services\WhatsAppService;

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
        'referido_por_empresa_id',
        'ip_address',
        'compras_count',
        'partner_referral_id',
        'report_token',
        'reportada',
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

    public function empresaReferente()
    {
        return $this->belongsTo(
            \App\Modules\Empresa\Models\Empresa::class,
            'referido_por_empresa_id'
        );
    }

    public function partnerReferral()
    {
        return $this->belongsTo(
            \App\Modules\PartnerReferral\Models\PartnerReferral::class,
            'partner_referral_id'
        );
    }
}