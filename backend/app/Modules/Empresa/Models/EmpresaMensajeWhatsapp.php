<?php

namespace App\Modules\Empresa\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmpresaMensajeWhatsapp extends Model
{
    protected $table = 'empresa_mensajes_whatsapp';
    protected $fillable = [ 'titulo', 'mensaje', 'tipo_contacto', ];
    public const TIPO_EMPRESA = 'empresa_empresa';
    public const TIPO_CLIENTE = 'empresa_cliente';

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }
}