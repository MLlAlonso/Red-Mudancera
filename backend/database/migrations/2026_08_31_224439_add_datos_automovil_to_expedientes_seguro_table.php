<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->string('automovil_marca', 100) ->nullable() ->after('valor_automovil');
            $table->string('automovil_modelo', 100) ->nullable() ->after('automovil_marca');
            $table->string('automovil_numero_serie', 150) ->nullable() ->after('automovil_modelo');
            $table->text('automovil_foto_circulacion_url') ->nullable() ->after('automovil_numero_serie');
            $table->string('automovil_foto_circulacion_public_id', 255) ->nullable() ->after('automovil_foto_circulacion_url');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropColumn([
                'automovil_marca',
                'automovil_modelo',
                'automovil_numero_serie',
                'automovil_foto_circulacion_url',
                'automovil_foto_circulacion_public_id',
            ]);
        });
    }
};