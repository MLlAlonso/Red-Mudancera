<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('system_announcement_reads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('announcement_id') ->constrained('system_announcements') ->cascadeOnDelete();
            $table->foreignId('empresa_id') ->nullable() ->constrained('empresas') ->cascadeOnDelete();
            $table->foreignId('usuario_id') ->nullable() ->constrained('usuarios') ->cascadeOnDelete();
            $table->timestamps();

            $table->unique([
                'announcement_id',
                'empresa_id'
            ]);

            $table->unique([
                'announcement_id',
                'usuario_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'system_announcement_reads'
        );
    }
};