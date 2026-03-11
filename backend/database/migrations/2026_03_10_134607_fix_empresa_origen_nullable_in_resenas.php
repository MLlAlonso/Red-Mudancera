<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resenas', function (Blueprint $table) {
            // eliminar FK actual
            $table->dropForeign(['empresa_origen_id']);
            // cambiar a nullable
            $table->unsignedBigInteger('empresa_origen_id')->nullable()->change();
            // volver a crear FK
            $table->foreign('empresa_origen_id')
                ->references('id')
                ->on('empresas')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('resenas', function (Blueprint $table) {
            $table->dropForeign(['empresa_origen_id']);
            $table->unsignedBigInteger('empresa_origen_id')->nullable(false)->change();
            $table->foreign('empresa_origen_id')
                ->references('id')
                ->on('empresas')
                ->cascadeOnDelete();
        });
    }
};