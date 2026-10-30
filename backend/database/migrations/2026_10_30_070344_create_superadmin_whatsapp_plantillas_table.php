<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('superadmin_whatsapp_plantillas', function (Blueprint $table) {
            $table->id();

            // Clasificación interna para futuras áreas del sistema. En la interfaz actual solo se administrará "seguros".
            $table->string('area', 40)->default('seguros');
            $table->string('titulo', 60);
            $table->text('mensaje');
            $table->timestamps();
            $table->index(['area', 'created_at'], 'superadmin_whatsapp_plantillas_area_created_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('superadmin_whatsapp_plantillas');
    }
};
