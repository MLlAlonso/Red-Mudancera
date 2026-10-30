<?php

namespace App\Modules\SuperAdmin\Models;

use Illuminate\Database\Eloquent\Model;

class SuperAdminWhatsappPlantilla extends Model
{
    protected $table = 'superadmin_whatsapp_plantillas';
    protected $fillable = ['area', 'titulo', 'mensaje',];
    public const AREA_SEGUROS = 'seguros';
    public const AREAS_DISPONIBLES = ['seguros', 'empresas', 'general',];
}
