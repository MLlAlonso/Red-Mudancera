<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->enum('modalidad_datos', ['autogestion', 'asistida',])->default('autogestion')->after('prima_estimada');
            $table->enum('forma_proporcion_datos', ['cliente', 'empresa',])->default('cliente')->after('modalidad_datos');
            $table->string('asistencia_empresa_mudanza', 150)->nullable()->after('forma_proporcion_datos');
            $table->string('asistencia_contacto', 150)->nullable()->after('asistencia_empresa_mudanza');
            $table->string('asistencia_telefono', 30)->nullable()->after('asistencia_contacto');
            $table->index('modalidad_datos');
            $table->index('forma_proporcion_datos');
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->dropIndex(['expedientes_seguro_modalidad_datos_index',]);
            $table->dropIndex(['expedientes_seguro_forma_proporcion_datos_index',]);

            $table->dropColumn([
                'modalidad_datos',
                'forma_proporcion_datos',
                'asistencia_empresa_mudanza',
                'asistencia_contacto',
                'asistencia_telefono',
            ]);
        });
    }
};
