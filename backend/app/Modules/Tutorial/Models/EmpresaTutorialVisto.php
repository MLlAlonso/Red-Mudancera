<?php

namespace App\Modules\Tutorial\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modules\Empresa\Models\Empresa;

class EmpresaTutorialVisto extends Model
{
    use HasFactory;
    protected $table = 'empresa_tutorial_vistos';
    protected $fillable = [
        'empresa_id',
        'tutorial_id',
        'visto_at',
    ];

    protected $casts = [
        'visto_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }
}