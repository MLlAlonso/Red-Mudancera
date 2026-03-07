<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->foreignId('referido_por_empresa_id')
                ->nullable()
                ->constrained('empresas')
                ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->dropForeign(['referido_por_empresa_id']);
            $table->dropColumn('referido_por_empresa_id');
        });
    }
};