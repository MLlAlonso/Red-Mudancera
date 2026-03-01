<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {

    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Modificar ENUM elevadores
        |--------------------------------------------------------------------------
        */

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY origen_elevador 
            ENUM(
                'no_hay',
                'si_y_se_puede_usar',
                'si_solo_algunos',
                'si_no_se_permite',
                'no_lo_se'
            ) NULL
        ");

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY destino_elevador 
            ENUM(
                'no_hay',
                'si_y_se_puede_usar',
                'si_solo_algunos',
                'si_no_se_permite',
                'no_lo_se'
            ) NULL
        ");

        /*
        |--------------------------------------------------------------------------
        | Asegurar que no haya valores inválidos en tipo_vivienda
        |--------------------------------------------------------------------------
        */

        DB::statement("
            UPDATE solicitudes_mudanza
            SET tipo_vivienda = 'casa'
            WHERE tipo_vivienda NOT IN ('casa','departamento','otro')
        ");

        DB::statement("
            UPDATE solicitudes_mudanza
            SET vivienda_destino = 'casa'
            WHERE vivienda_destino NOT IN ('casa','departamento','otro')
        ");

        /*
        |--------------------------------------------------------------------------
        | Modificar ENUM tipo_vivienda y vivienda_destino
        |--------------------------------------------------------------------------
        */

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY tipo_vivienda 
            ENUM(
                'casa',
                'departamento',
                'bodega',
                'otro'
            ) NOT NULL DEFAULT 'casa'
        ");

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY vivienda_destino 
            ENUM(
                'casa',
                'departamento',
                'bodega',
                'otro'
            ) NOT NULL DEFAULT 'casa'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY origen_elevador ENUM('si','no') NULL
        ");

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY destino_elevador ENUM('si','no') NULL
        ");

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY tipo_vivienda 
            ENUM('casa','departamento','otro') 
            NOT NULL DEFAULT 'casa'
        ");

        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY vivienda_destino 
            ENUM('casa','departamento','otro') 
            NOT NULL DEFAULT 'casa'
        ");
    }
};