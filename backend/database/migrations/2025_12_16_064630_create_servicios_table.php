<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            // Relación con empresa
            $table->foreignId('empresa_id') ->constrained('empresas') ->cascadeOnDelete();
            // Tipo de servicio
            $table->enum('tipo', ['busco', 'ofrezco']);
            // Datos del servicio
            $table->decimal('volumen', 10, 2);
            $table->string('origen', 100);
            $table->string('destino', 100);
            // Fechas
            $table->date('inicio');
            $table->date('fin');
            // Tipo de carga
            $table->enum('tipo_carga', [ 'menaje', 'vehiculo', 'menaje_vehiculo', 'otro', 'libre', ])->default('menaje');
            // Nota opcional
            $table->text('nota')->nullable();
            // Estado del servicio
            $table->enum('estado', ['activo', 'asignado', 'finalizado']) ->default('activo');
            $table->timestamps();
            // Índices para búsqueda
            $table->index(['origen']);
            $table->index(['destino']);
            $table->index(['inicio', 'fin']);
            $table->index(['estado']);
            $table->string('responsable_nombre', 120)->nullable();
            $table->string('responsable_telefono', 20)->nullable();
            $table->decimal('importe', 10, 2)->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicios');
    }
};