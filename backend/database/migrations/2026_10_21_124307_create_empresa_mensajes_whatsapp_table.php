<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresa_mensajes_whatsapp', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->string('titulo', 60);
            $table->text('mensaje');
            $table->string('tipo_contacto', 30);
            $table->timestamps();
            $table->index(['empresa_id', 'tipo_contacto'], 'empresa_mensajes_whatsapp_tipo_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresa_mensajes_whatsapp');
    }
};