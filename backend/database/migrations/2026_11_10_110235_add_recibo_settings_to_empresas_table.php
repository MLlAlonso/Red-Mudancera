<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->string('firma_recibo_path')->nullable()->after('logo');
            $table->json('recibo_colores')->nullable()->after('firma_recibo_path');
        });
    }

    public function down(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->dropColumn(['firma_recibo_path', 'recibo_colores',]);
        });
    }
};
