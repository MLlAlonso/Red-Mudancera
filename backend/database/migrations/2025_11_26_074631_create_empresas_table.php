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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('empresa', 150);
            $table->string('rfc', 13);
            $table->string('base', 100)->nullable();
            $table->string('tel', 20);
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->decimal('reputacion', 3, 2)->default(0);
            $table->integer('numServicios')->default(0);
            $table->enum('estadoRFC', ['pendiente', 'verificado', 'bloqueado'])->default('pendiente');
            $table->boolean('subActiva')->default(false);
            $table->date('subInicio')->nullable();
            $table->date('subFin')->nullable();
            $table->string('codigoEmpresa', 20)->unique();
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
