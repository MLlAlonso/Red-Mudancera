<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('live_viewers', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            // servicio | contacto
            $table->unsignedBigInteger('registro_id');
            $table->string('session_id');
            $table->timestamp('last_seen_at');
            $table->timestamps();
            $table->index([ 'tipo', 'registro_id' ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('live_viewers');
    }
};