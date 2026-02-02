<?php

namespace App\Modules\Servicio\Models;
use Illuminate\Database\Eloquent\Model;

class ServicioImagen extends Model
{
    protected $table = 'servicio_imagenes';
    protected $fillable = [
        'servicio_id',
        'url',
        'public_id',
        'orden',
    ];

    public function servicio()
    {
        return $this->belongsTo(
            Servicio::class,
            'servicio_id'
        );
    }
}