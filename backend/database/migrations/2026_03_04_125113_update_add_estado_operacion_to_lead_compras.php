<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {

            $table->enum('estado_operacion', [
                'activo',
                'asignado',
                'finalizado'
            ])->default('activo');

            $table->decimal('ganancia', 10, 2)->nullable();

            $table->timestamp('finalizado_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {
            $table->dropColumn([
                'estado_operacion',
                'ganancia',
                'finalizado_at'
            ]);
        });
    }
};
