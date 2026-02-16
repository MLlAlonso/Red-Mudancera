<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_views', function (Blueprint $table) {
            $table->id();

            $table->foreignId('servicio_id')
                ->constrained('servicios')
                ->cascadeOnDelete();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->timestamp('viewed_at')->useCurrent();

            $table->timestamps();

            // índice para optimización
            $table->index(['servicio_id', 'viewed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_views');
    }
};