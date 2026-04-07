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
        Schema::table('trial_requests', function (Blueprint $table) {
            $table->string('ine_url')->nullable();
            $table->string('csf_url')->nullable();
            $table->string('domicilio_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trial_requests', function (Blueprint $table) {
            //
        });
    }
};