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
        Schema::create('trial_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained()->cascadeOnDelete();
            $table->string('empresa');
            $table->string('representante');
            $table->string('rfc');
            $table->string('base');
            $table->string('tel');
            $table->string('google_url')->nullable();
            $table->string('web')->nullable();
            $table->json('referencias')->nullable(); // referencias (JSON)
            $table->enum('status', ['pendiente', 'aprobado', 'rechazado'])
                ->default('pendiente');
            $table->timestamp('requested_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trial_requests');
    }
};