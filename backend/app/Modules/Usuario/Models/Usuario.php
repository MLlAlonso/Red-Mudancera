<?php

namespace App\Modules\Usuario\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;
    protected $table = 'usuarios';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'email',
        'password',
        'telefono',
        'avatar',
        'rol',
        'activoEmpresa',
        'email_verified_at',
    ];

    protected $hidden = ['password'];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['avatar_url'];
    public function getAvatarUrlAttribute()
    {
        if (!$this->avatar) return null;
        // Cloudinary
        if (str_starts_with($this->avatar, 'http')) {
            return $this->avatar;
        }
        // Legacy storage
        return asset('storage/' . $this->avatar);
    }

    public function empresa()
    {
        return $this->belongsTo(
            \App\Modules\Empresa\Models\Empresa::class,
            'empresa_id',
            'id'
        );
    }

    public function notificationPreferences()
    {
        return $this->hasMany(
            \App\Modules\Notificacion\Models\NotificationPreference::class,
            'usuario_id'
        );
    }
}