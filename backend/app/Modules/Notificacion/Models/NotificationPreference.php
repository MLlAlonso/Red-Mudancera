<?php

namespace App\Modules\Notificacion\Models;
use Illuminate\Database\Eloquent\Model;

class NotificationPreference extends Model
{
    protected $table = 'notification_preferences';

    protected $fillable = [
        'usuario_id',
        'tipo',
        'canal',
        'activo',
    ];
}