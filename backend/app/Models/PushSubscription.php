<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PushSubscription extends Model
{
    protected $fillable = [
        'empresa_id',
        'endpoint',
        'p256dh',
        'auth'
    ];
}