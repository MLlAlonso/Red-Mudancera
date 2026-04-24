<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Modules\Empresa\Models\EmpresaImagen;

class Empresa extends Authenticatable
{
    use HasApiTokens, HasFactory;
    protected $table = 'empresas';

    protected $fillable = [
        'empresa',
        'descripcion',
        'representante',
        'rfc',
        'base',
        'tel',
        'email',
        'password',
        'codigoEmpresa',
        'email_verified_at',
        'logo',
        'reputacion',
        'numServicios',
        'verificado',
        'estadoRFC',
        'subActiva',
        'subInicio',
        'subFin',
        'tokens',
        'plan',
        'recurrente',
        'freeSince',
        'isTrial',
        'trialEndsAt',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'subInicio' => 'date',
        'subFin' => 'date',
        'subActiva' => 'boolean',
        'recurrente' => 'boolean',
        'freeSince' => 'date',
        'isTrial' => 'boolean',
        'trialEndsAt' => 'date',
        'verificado' => 'boolean',
        'cancel_at_period_end' => 'boolean',
    ];

    // ===========================================
    // LOGO
    // ===========================================
    public function getLogoUrlAttribute()
    {
        if (!$this->logo) {
            return null;
        }

        if (!is_string($this->logo)) {
            return null;
        }

        if (str_starts_with($this->logo, 'http')) {
            return $this->logo;
        }

        return asset('storage/' . $this->logo);
    }

    public function leadsComprados()
    {
        return $this->belongsToMany(
            \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::class,
            'lead_compras',
            'empresa_id',
            'solicitud_id'
        );
    }

    public function radarConfig()
    {
        return $this->hasOne(\App\Modules\Empresa\Models\EmpresaRadarConfig::class);
    }

    public function imagenes()
    {
        return $this->hasMany(EmpresaImagen::class)->orderBy('orden');
    }
}