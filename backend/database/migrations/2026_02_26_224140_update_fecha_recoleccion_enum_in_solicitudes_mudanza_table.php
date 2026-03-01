<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY fecha_recoleccion 
            ENUM('1-7','8-15','15-30','30+','lo_antes_posible')
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE solicitudes_mudanza 
            MODIFY fecha_recoleccion 
            ENUM('1-7','8-15','+15','lo_antes_posible')
        ");
    }
};
