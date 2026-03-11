<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resenas', function (Blueprint $table) {
            $table->string('nombre_cliente')->nullable()->after('empresa_destino_id');
            $table->string('correo_cliente')->nullable()->after('nombre_cliente');

            $table->index('correo_cliente');
            $table->index(['empresa_destino_id','created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('resenas', function (Blueprint $table) {
            $table->dropColumn([
                'nombre_cliente',
                'correo_cliente',
            ]);
        });
    }
};