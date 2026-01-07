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
        Schema::create('resena_links', function (Blueprint $table) {
            $table->id();
            $table->index(['empresa_origen_id', 'empresa_destino_id']);

            $table->foreignId('empresa_origen_id')->nullable()->constrained('empresas') ->nullOnDelete();
            $table->foreignId('empresa_destino_id')->constrained('empresas')->cascadeOnDelete();

            $table->string('token')->unique();
            $table->boolean('usado')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resena_links');
    }
};