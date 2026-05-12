<?php

namespace App\Modules\PartnerReferral\Models;
use Illuminate\Database\Eloquent\Model;

class PartnerReferral extends Model
{
    protected $table = 'partner_referrals';
    protected $fillable = [
        'nombre',
        'slug',
        'logo',
        'access_token',
        'activo',
    ];

    public function solicitudes()
    {
        return $this->hasMany(
            \App\Modules\SolicitudMudanza\Models\SolicitudMudanza::class,
            'partner_referral_id'
        );
    }
}