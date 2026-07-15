<?php

namespace App\Modules\SystemAnnouncement\Models;
use Illuminate\Database\Eloquent\Model;

class SystemAnnouncementRead extends Model
{
    protected $table = "system_announcement_reads";

    protected $fillable = [
        "announcement_id",
        "empresa_id",
        "usuario_id",
    ];
}