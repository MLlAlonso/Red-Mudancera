<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('radar_matches', function (Blueprint $table) {
            $table->id();

            // Servicio base (el que ejecuta radar)
            $table->foreignId('servicio_id')
                ->constrained('servicios')
                ->cascadeOnDelete();

            // Tipo de match
            $table->enum('match_type', ['servicio', 'solicitud']);
            // Referencias
            $table->unsignedBigInteger('matched_servicio_id')->nullable();
            $table->unsignedBigInteger('solicitud_id')->nullable();
            // Control de notificación
            $table->boolean('notified')->default(false);
            $table->timestamps();
            // evitar duplicados
            $table->unique([
                'servicio_id',
                'match_type',
                'matched_servicio_id',
                'solicitud_id'
            ], 'radar_unique_match');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('radar_matches');
    }
};