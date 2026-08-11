<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expedientes_seguro', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solicitud_mudanza_id')->nullable()->constrained('solicitudes_mudanza')->nullOnDelete();
            $table->string('folio', 30)->unique();
            $table->string('access_token', 120)->unique();

            $table->enum('estado', [
                'nuevo',
                'correo_programado',
                'esperando_cliente',
                'capturando',
                'revision',
                'completado',
                'cancelado'
            ])->default('nuevo');

            $table->unsignedTinyInteger('progreso')->default(0);

            /*
            |--------------------------------------------------------------------------
            | PASO 1
            |--------------------------------------------------------------------------
            */
            $table->enum('tipo_seguro', ['menaje', 'menaje_auto', 'automovil'])->nullable();
            $table->decimal('valor_menaje', 15, 2)->nullable();
            $table->decimal('valor_automovil', 15, 2)->nullable();
            $table->decimal('prima_estimada', 15, 2)->nullable();

            /*
            |--------------------------------------------------------------------------
            | PASO 2
            |--------------------------------------------------------------------------
            */
            $table->string('nombre', 150)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('telefono', 20)->nullable();

            /*
            |--------------------------------------------------------------------------
            | INFORMACIÓN DE LA MUDANZA
            |--------------------------------------------------------------------------
            */
            $table->text('inventario') ->nullable();
            $table->enum('fecha_recoleccion', [
                '1-7',
                '8-15',
                '15-30',
                '30+',
                'lo_antes_posible'
            ])->nullable();
            $table->boolean('es_externo') ->default(false);

            /*
            |--------------------------------------------------------------------------
            | PASO 3
            |--------------------------------------------------------------------------
            */
            $table->string('empresa_mudanza', 150)->nullable();
            $table->string('origen', 150)->nullable();
            $table->string('destino', 150)->nullable();
            $table->date('fecha_salida')->nullable();
            $table->date('fecha_llegada')->nullable();
            $table->string('propietario_unidad', 150)->nullable();
            $table->string('marca_unidad', 100)->nullable();
            $table->string('modelo_unidad', 100)->nullable();
            $table->string('placas', 30)->nullable();
            $table->string('chofer', 150)->nullable();

            /*
            |--------------------------------------------------------------------------
            | CONTROL
            |--------------------------------------------------------------------------
            */
            $table->timestamp('correo_programado_at')->nullable();
            $table->timestamp('correo_enviado_at')->nullable();
            $table->timestamp('cliente_inicio_at')->nullable();
            $table->timestamp('cliente_finalizo_at')->nullable();
            $table->timestamp('ultimo_autoguardado_at')->nullable();

            $table->timestamps();
            $table->index('estado');
            $table->index('progreso');
            $table->index('folio');
            $table->index('correo_programado_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expedientes_seguro');
    }
};
