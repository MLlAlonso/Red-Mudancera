<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notificacion_id')
                ->nullable()
                ->constrained('notificaciones')
                ->nullOnDelete();

            $table->string('tipo', 30);   // info | alerta | sistema
            $table->string('canal', 30);  // database | email | push
            $table->string('evento', 30); // sent | read | failed
            $table->timestamps();
            $table->index(['tipo', 'canal']);
            $table->index(['evento']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_metrics');
    }
};