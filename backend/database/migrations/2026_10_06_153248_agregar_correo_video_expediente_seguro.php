<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->timestamp('video_programado_at')->nullable()->after('correo_enviado_at');
            $table->timestamp('video_enviado_at')->nullable()->after('video_programado_at');
            $table->index('video_programado_at');
            $table->index('video_enviado_at');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropIndex(['expedientes_seguro_video_programado_at_index']);
            $table->dropIndex(['expedientes_seguro_video_enviado_at_index']);
            $table->dropColumn(['video_programado_at', 'video_enviado_at',]);
        });
    }
};
