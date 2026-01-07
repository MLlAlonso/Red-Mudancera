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
        Schema::create('resenas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('empresa_origen_id')->constrained('empresas')->cascadeOnDelete();
            $table->foreignId('empresa_destino_id')->constrained('empresas')->cascadeOnDelete();

            $table->text('comentario');
            $table->decimal('rating', 2, 1);
            $table->date('fecha_resena');

            $table->timestamps();

            $table->index(['empresa_origen_id', 'empresa_destino_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resenas');
    }
};