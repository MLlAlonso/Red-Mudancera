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
            $table->string('representante', 150);
            $table->string('rfc', 13)->nullable();
            $table->string('base', 100)->nullable();
            $table->string('tel', 20);
            $table->string('email')->unique();
            $table->string('password');
            $table->string('codigoEmpresa', 10);

            $table->string('logo')->nullable();
            $table->decimal('reputacion', 3, 2)->default(0);
            $table->integer('numServicios')->default(0);
            $table->string('estadoRFC')->default('pendiente');

            $table->boolean('subActiva')->default(false);
            $table->date('subInicio')->nullable();
            $table->date('subFin')->nullable();

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
