<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresa_tutorial_vistos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->foreignId('tutorial_id')->constrained('tutorials')->cascadeOnDelete();
            $table->timestamp('visto_at')->nullable();
            $table->timestamps();
            $table->unique(['empresa_id', 'tutorial_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresa_tutorial_vistos');
    }
};