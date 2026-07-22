<?php

namespace App\Modules\Tutorial\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tutorial extends Model
{
    use HasFactory;

    protected $table = 'tutorials';

    protected $fillable = [
        'titulo',
        'slug',
        'descripcion',
        'video_url',
        'thumbnail_url',
        'duracion',
        'orden',
        'activo',
        'mostrar',
        'mostrar_automaticamente',
        'dias_maximos',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'mostrar' => 'boolean',
        'mostrar_automaticamente' => 'boolean',
        'dias_maximos' => 'integer',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */

    public function vistos()
    {
        return $this->hasMany(EmpresaTutorialVisto::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeDisponibles($query)
    {
        return $query
            ->where('activo', true)
            ->where('mostrar', true);
    }
}