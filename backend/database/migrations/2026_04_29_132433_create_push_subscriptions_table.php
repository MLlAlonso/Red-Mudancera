<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('push_subscriptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->text('endpoint');
            $table->string('p256dh');
            $table->string('auth');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('push_subscriptions');
    }
};