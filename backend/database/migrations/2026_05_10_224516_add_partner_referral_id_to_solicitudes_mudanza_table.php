<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {

            $table->foreignId('partner_referral_id')
                ->nullable()
                ->after('referido_por_empresa_id')
                ->constrained('partner_referrals')
                ->nullOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {

            $table->dropForeign(['partner_referral_id']);
            $table->dropColumn('partner_referral_id');

        });
    }
};