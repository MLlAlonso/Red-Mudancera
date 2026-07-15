<?php

namespace App\Modules\SystemAnnouncement\Models;

use Illuminate\Database\Eloquent\Model;

class SystemAnnouncement extends Model
{
    protected $table = 'system_announcements';

    protected $fillable = [
        'titulo',
        'mensaje',
        'activo',
        'expires_at',
    ];

    public function reads()
    {
        return $this->hasMany(
            SystemAnnouncementRead::class,
            "announcement_id"
        );
    }
}