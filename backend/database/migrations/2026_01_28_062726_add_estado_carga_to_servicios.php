<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('servicios', function (Blueprint $table) {
            $table->enum(
                'estado_carga',
                ['mi_almacen', 'tu_almacen', 'en_ruta']
            )->default('mi_almacen')->after('tipo_carga');
        });
    }

    public function down(): void
    {
        Schema::table('servicios', function (Blueprint $table) {
            $table->dropColumn('estado_carga');
        });
    }
};