<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->text('firma_recibo_path')->nullable()->change();
        });

        Schema::table('recibos', function (Blueprint $table) {
            $table->text('firma_empresa_path')->nullable()->change();
            $table->text('firma_cliente_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->string('firma_recibo_path')->nullable()->change();
        });

        Schema::table('recibos', function (Blueprint $table) {
            $table->string('firma_empresa_path')->nullable()->change();
            $table->string('firma_cliente_path')->nullable()->change();
        });
    }
};