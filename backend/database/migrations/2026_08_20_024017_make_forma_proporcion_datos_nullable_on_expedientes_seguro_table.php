<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->enum('forma_proporcion_datos',  ['cliente', 'empresa'])->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('expedientes_seguro', function (Blueprint $table) {
            $table->enum('forma_proporcion_datos', ['cliente', 'empresa'])->default('cliente')->change();
        });
    }
};