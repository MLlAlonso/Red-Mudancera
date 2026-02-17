<?php

namespace App\Modules\Notificacion\Models;
use Illuminate\Database\Eloquent\Model;

class NotificationMetric extends Model
{
    protected $table = 'notification_metrics';
    protected $fillable = [
        'notificacion_id',
        'tipo',
        'canal',
        'evento',
    ];
}