<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')
                ->constrained('usuarios')
                ->cascadeOnDelete();

            $table->string('tipo', 30); // info | alerta | sistema
            $table->string('canal', 30); // database | email | push
            $table->boolean('activo')->default(true);
            $table->timestamps();
            $table->unique(['usuario_id', 'tipo', 'canal']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_preferences');
    }
};