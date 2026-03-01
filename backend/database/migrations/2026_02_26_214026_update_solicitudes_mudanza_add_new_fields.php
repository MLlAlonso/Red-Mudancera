<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            // ORIGEN
            $table->unsignedInteger('origen_pisos')->nullable();
            $table->enum('origen_elevador', ['si','no'])->nullable();
            $table->enum('origen_acarreo', ['si','no','no_se'])->nullable();
            // DESTINO
            $table->unsignedInteger('destino_pisos')->nullable();
            $table->enum('destino_elevador', ['si','no'])->nullable();
            $table->enum('destino_acarreo', ['si','no','no_se'])->nullable();
            $table->enum('tipo_servicio', ['local','foranea'])->nullable()->index();
            // FECHA LIMITE VISIBLE
            $table->date('fecha_limite_visible')->nullable()->index();
            $table->unsignedInteger('compras_count')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->dropColumn([
                'origen_pisos',
                'origen_elevador',
                'origen_acarreo',
                'destino_pisos',
                'destino_elevador',
                'destino_acarreo',
                'tipo_servicio',
                'fecha_limite_visible',
                'compras_count'
            ]);
        });
    }
};