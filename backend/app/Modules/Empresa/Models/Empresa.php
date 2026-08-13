<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Modules\Empresa\Models\EmpresaImagen;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Notificacion\Models\Notificacion;
use App\Modules\SolicitudMudanza\Models\LeadCompra;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use App\Modules\Empresa\Models\EmpresaNota;
use App\Modules\Tutorial\Models\EmpresaTutorialVisto;

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
        'slug',
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

    public function usuarios()
    {
        return $this->hasMany(Usuario::class);
    }

    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class);
    }

    public function leadCompras()
    {
        return $this->hasMany(LeadCompra::class);
    }

    public function leadsPrivados()
    {
        return $this->hasMany(\App\Modules\SolicitudMudanza\Models\SolicitudMudanza::class, 'empresa_privada_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($empresa) {

            if (!$empresa->slug) {
                $baseSlug = Str::slug($empresa->empresa);
                $slug = $baseSlug;
                $counter = 1;

                while (self::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                $empresa->slug = $slug;
            }
        });
    }

    public function nota()
    {
        return $this->hasOne(EmpresaNota::class);
    }

    public function tutorialesVistos()
    {
        return $this->hasMany(EmpresaTutorialVisto::class);
    }
}
