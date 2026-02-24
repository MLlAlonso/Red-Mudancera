<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitudes_mudanza', function (Blueprint $table) {
            $table->id();
            $table->string('origen', 100);
            $table->string('destino', 100);

            // Distancia calculada automáticamente
            $table->unsignedInteger('distancia_km')->nullable();

            $table->enum('tipo_vivienda', [
                'casa',
                'departamento',
                'otro'
            ])->default('casa');

            $table->text('inventario');

            $table->enum('fecha_recoleccion', [
                '1-7',
                '8-15', 
                '+15',
                'lo_antes_posible'
            ]);

            $table->enum('tipo_mudanza', [
                'compartida',
                'exclusiva',
                'asesoria'
            ]);

            $table->string('nombre', 150);
            $table->string('email', 150);
            $table->string('telefono', 20);

            // Sistema de verificación obligatorio
            $table->string('codigo_verificacion', 6)->nullable();
            $table->timestamp('codigo_expira_en')->nullable();
            $table->boolean('telefono_verificado')->default(false);

            $table->enum('estado', [
                'pendiente',
                'activo',
                'cancelado'
            ])->default('pendiente');

            // Para prevención de spam
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            // Índices estratégicos
            $table->index('origen');
            $table->index('destino');
            $table->index('telefono');
            $table->index('estado');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes_mudanza');
    }
};