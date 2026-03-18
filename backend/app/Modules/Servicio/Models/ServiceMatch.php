<?php

namespace App\Modules\Servicio\Models;
use Illuminate\Database\Eloquent\Model;

class ServiceMatch extends Model
{
    protected $table = 'service_matches';
    protected $fillable = [
        'servicio_id',
        'match_id',
    ];
}