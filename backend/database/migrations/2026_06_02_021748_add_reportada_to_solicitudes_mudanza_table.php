<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {
            $table->boolean('reportada')
                ->default(false)
                ->after('report_token');

        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_mudanza', function (Blueprint $table) {

            $table->dropColumn('reportada');

        });
    }
};