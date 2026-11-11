<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recibos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->foreignId('solicitud_id')->constrained('solicitudes_mudanza')->cascadeOnDelete();
            $table->string('folio', 40)->unique();

            // Cliente y servicio
            $table->date('fecha_recibo');
            $table->string('ciudad', 150);
            $table->string('nombre_cliente', 255);
            $table->text('origen');
            $table->text('destino');

            // Pago
            $table->string('tipo_pago', 30);
            $table->string('forma_pago', 40);
            $table->decimal('monto', 12, 2);
            $table->decimal('total_acordado', 12, 2)->nullable();

            // Firmas y observaciones
            $table->text('observaciones')->nullable();
            $table->string('firma_empresa_path', 255);
            $table->string('firma_cliente_path', 255)->nullable();

            // Fotografías y datos históricos
            $table->json('empresa_snapshot');
            $table->json('colores_snapshot');

            // Documento generado
            $table->string('pdf_path', 255)->nullable();
            $table->timestamps();
            $table->index(['empresa_id', 'solicitud_id', 'created_at',], 'recibos_empresa_solicitud_fecha_idx');
            $table->index('fecha_recibo');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recibos');
    }
};
