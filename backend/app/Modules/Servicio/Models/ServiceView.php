<?php

namespace App\Modules\Servicio\Models;
use Illuminate\Database\Eloquent\Model;

class ServiceView extends Model
{
    protected $table = 'service_views';

    protected $fillable = [
        'servicio_id',
        'empresa_id',
        'viewed_at',
    ];

    public $timestamps = true;
}