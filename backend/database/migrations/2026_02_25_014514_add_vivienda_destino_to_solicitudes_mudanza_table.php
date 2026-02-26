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
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->enum('vivienda_destino', [
                'casa',
                'departamento',
                'otro'
            ])->default('casa')->after('tipo_vivienda');
        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->dropColumn('vivienda_destino');
        });
    }
};
