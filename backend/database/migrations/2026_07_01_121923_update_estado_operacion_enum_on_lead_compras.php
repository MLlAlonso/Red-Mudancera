<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            ALTER TABLE lead_compras
            MODIFY estado_operacion ENUM(
                'activo',
                'asignado',
                'en_proceso',
                'perdido',
                'finalizado'
            ) NOT NULL DEFAULT 'activo'
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("
            ALTER TABLE lead_compras
            MODIFY estado_operacion ENUM(
                'activo',
                'asignado',
                'finalizado'
            ) NOT NULL DEFAULT 'activo'
        ");
    }
};