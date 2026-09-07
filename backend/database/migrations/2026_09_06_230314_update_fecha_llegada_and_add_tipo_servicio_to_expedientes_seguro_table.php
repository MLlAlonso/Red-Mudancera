<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->string('fecha_llegada', 20)->nullable()->change();
            $table->enum('tipo_servicio', [ 'contratado', 'compartido', 'exclusivo', ])->nullable()->after('fecha_llegada');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->date('fecha_llegada')->nullable()->change();
            $table->dropColumn('tipo_servicio');
        });
    }
};