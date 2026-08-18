<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->string('empresa_access_token', 100)->nullable()->unique()->after('access_token');
            $table->timestamp('empresa_access_created_at')->nullable()->after('empresa_access_token');
            $table->timestamp('empresa_datos_finalizados_at')->nullable()->after('empresa_access_created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropColumn([
                'empresa_access_token',
                'empresa_access_created_at',
                'empresa_datos_finalizados_at',
            ]);
        });
    }
};