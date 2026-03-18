<?php

namespace App\Events;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Modules\Servicio\Models\Servicio;

class RadarMatchFound
{
    use Dispatchable, SerializesModels;
    public $servicio;
    public $match;

    public function __construct(Servicio $servicio, Servicio $match)
    {
        $this->servicio = $servicio;
        $this->match = $match;
    }
}