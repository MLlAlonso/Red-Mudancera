<?php

namespace App\Modules\Servicio\Models;
use Illuminate\Database\Eloquent\Model;

class RadarMatch extends Model
{
    protected $table = 'radar_matches';
    protected $fillable = [
        'servicio_id',
        'match_type',
        'matched_servicio_id',
        'solicitud_id',
        'notified',
    ];
}