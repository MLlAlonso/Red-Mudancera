<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {
            $table->longText('nota')->nullable()->after('ganancia');
        });
    }

    public function down(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {
            $table->dropColumn('nota');
        });
    }
};