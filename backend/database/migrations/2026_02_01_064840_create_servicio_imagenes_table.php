<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('servicio_imagenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('servicio_id')
                ->constrained('servicios')
                ->cascadeOnDelete();
            $table->string('url');        // URL Cloudinary
            $table->string('public_id'); // Para borrar en Cloudinary
            $table->tinyInteger('orden')->default(1);
            $table->timestamps();
            $table->unique(['servicio_id', 'orden']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicio_imagenes');
    }
};