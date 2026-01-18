<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resena_links', function (Blueprint $table) {
            $table->foreignId('resena_id')->nullable()->after('empresa_destino_id');
            $table->string('tipo')->default('invite')->after('resena_id');
        });
    }

    public function down(): void
    {
        Schema::table('resena_links', function (Blueprint $table) {
            $table->dropColumn(['resena_id', 'tipo']);
        });
    }
};
