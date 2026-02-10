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
        Schema::create('notificacion_usuario', function (Blueprint $table) {
            $table->id();

            $table->foreignId('notificacion_id')
                ->constrained('notificaciones')
                ->cascadeOnDelete();

            $table->foreignId('usuario_id')
                ->constrained('usuarios')
                ->cascadeOnDelete();

            $table->boolean('leida')->default(false);
            $table->timestamp('leida_at')->nullable();

            $table->timestamps();

            $table->unique(['notificacion_id', 'usuario_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacion_usuario');
    }
};
