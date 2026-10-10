
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->timestamp('segundo_recordatorio_programado_at')->nullable();
            $table->timestamp('segundo_recordatorio_enviado_at')->nullable();
            $table->timestamp('tercer_recordatorio_programado_at')->nullable();
            $table->timestamp('tercer_recordatorio_enviado_at')->nullable();
            $table->index('segundo_recordatorio_programado_at');
            $table->index('tercer_recordatorio_programado_at');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropIndex([ 'expedientes_seguro_segundo_recordatorio_programado_at_index', ]);
            $table->dropIndex([ 'expedientes_seguro_tercer_recordatorio_programado_at_index', ]);

            $table->dropColumn([
                'segundo_recordatorio_programado_at',
                'segundo_recordatorio_enviado_at',
                'tercer_recordatorio_programado_at',
                'tercer_recordatorio_enviado_at',
            ]);
        });
    }
};
