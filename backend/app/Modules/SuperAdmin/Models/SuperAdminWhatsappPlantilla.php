<?php

namespace App\Modules\SuperAdmin\Models;

use Illuminate\Database\Eloquent\Model;

class SuperAdminWhatsappPlantilla extends Model
{
    protected $table = 'superadmin_whatsapp_plantillas';

    protected $fillable = [
        'area',
        'titulo',
        'mensaje',
    ];

    public const AREA_SEGUROS = 'seguros';
    public const AREA_CLIENTES = 'clientes';
    public const AREA_EMPRESAS = 'empresas';
    public const AREA_GENERAL = 'general';

    public const AREAS_DISPONIBLES = [
        self::AREA_SEGUROS,
        self::AREA_CLIENTES,
        self::AREA_EMPRESAS,
        self::AREA_GENERAL,
    ];

    public const AREAS_CON_TODAS = [
        ...self::AREAS_DISPONIBLES,
        'todas',
    ];
}
