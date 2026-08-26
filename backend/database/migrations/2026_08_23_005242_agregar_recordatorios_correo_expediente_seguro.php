<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->timestamp('recordatorio_programado_at') ->nullable() ->after('correo_enviado_at');
            $table->timestamp('recordatorio_enviado_at') ->nullable() ->after('recordatorio_programado_at');
            $table->index('recordatorio_programado_at');
            $table->index('recordatorio_enviado_at');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropIndex(['expedientes_seguro_recordatorio_programado_at_index']);
            $table->dropIndex(['expedientes_seguro_recordatorio_enviado_at_index']);

            $table->dropColumn([
                'recordatorio_programado_at',
                'recordatorio_enviado_at',
            ]);
        });
    }
};