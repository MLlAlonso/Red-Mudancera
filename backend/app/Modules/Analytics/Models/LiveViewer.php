<?php

namespace App\Modules\Analytics\Models;
use Illuminate\Database\Eloquent\Model;

class LiveViewer extends Model
{
    protected $table = 'live_viewers';

    protected $fillable = [
        'tipo',
        'registro_id',
        'session_id',
        'last_seen_at',
    ];
}