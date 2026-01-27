<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('servicios', function (Blueprint $table) {
            $table->decimal('ganancia', 10, 2)->nullable()->after('importe');
            $table->timestamp('finalizado_at')->nullable()->after('ganancia');
        });
    }

    public function down()
    {
        Schema::table('servicios', function (Blueprint $table) {
            $table->dropColumn(['ganancia', 'finalizado_at']);
        });
    }
};