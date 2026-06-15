<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {
            $table->boolean('oculto') ->default(false) ->after('estado_operacion');
        });
    }

    public function down(): void
    {
        Schema::table('lead_compras', function (Blueprint $table) {
            $table->dropColumn('oculto');
        });
    }
};