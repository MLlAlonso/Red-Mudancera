<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresa_notas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id') ->constrained('empresas') ->cascadeOnDelete();
            $table->longText('contenido')->nullable();
            $table->timestamps();
            $table->unique('empresa_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresa_notas');
    }
};