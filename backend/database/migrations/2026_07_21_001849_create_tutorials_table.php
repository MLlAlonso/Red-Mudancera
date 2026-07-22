<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tutorials', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('slug')->unique();
            $table->text('descripcion')->nullable();
            $table->string('video_url');
            $table->string('thumbnail_url')->nullable();
            $table->string('duracion')->nullable();
            $table->unsignedInteger('orden')->default(1)->index();
            $table->boolean('activo')->default(true)->index();
            $table->boolean('mostrar')->default(true)->index();
            $table->boolean('mostrar_automaticamente')->default(false);
            $table->unsignedTinyInteger('dias_maximos')->nullable();
            $table->index(['activo', 'mostrar', 'orden']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tutorials');
    }
};
