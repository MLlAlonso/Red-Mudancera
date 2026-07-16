<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->boolean("es_privado")->default(false)->after("partner_referral_id");
            $table->foreignId("empresa_privada_id")->nullable()->after("es_privado")->constrained("empresas")->nullOnDelete();
            $table->timestamp("puesto_venta_at")->nullable()->after("empresa_privada_id");
        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->dropForeign(["empresa_privada_id"]);
            $table->dropColumn(["es_privado", "empresa_privada_id", "puesto_venta_at"]);
        });
    }
};