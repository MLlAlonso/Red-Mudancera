<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            ALTER TABLE solicitudes_mudanza
            MODIFY estado ENUM( 'pendiente', 'activo', 'expirado' ) NOT NULL DEFAULT 'activo'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE solicitudes_mudanza
            MODIFY estado ENUM( 'pendiente', 'activo') NOT NULL DEFAULT 'activo'
        ");
    }
};