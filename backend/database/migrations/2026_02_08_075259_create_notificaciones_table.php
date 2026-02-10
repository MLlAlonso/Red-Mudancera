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
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();

            $table->foreignId('empresa_id')
                ->nullable()
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->string('tipo', 30); // info | alerta | sistema
            $table->string('titulo', 150);
            $table->text('mensaje');
            $table->string('url_destino')->nullable();

            $table->string('creado_por')->default('system'); // system | empresa | admin
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
