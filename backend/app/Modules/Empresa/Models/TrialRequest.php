<?php

namespace App\Modules\Empresa\Models;
use Illuminate\Database\Eloquent\Model;

class TrialRequest extends Model
{
    protected $table = 'trial_requests';
    
    protected $fillable = [
        'empresa_id',
        'empresa',
        'representante',
        'rfc',
        'base',
        'tel',
        'google_url',
        'web',
        'referencias',
        'status',
        'requested_at',
        'ine_url',
        'csf_url',
        'domicilio_url',
    ];

    protected $casts = [
        'referencias' => 'array',
        'requested_at' => 'datetime',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }
}