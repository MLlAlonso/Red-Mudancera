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
        Schema::table('notificaciones', function ($table) {
            $table->boolean('toast_mostrado') ->default(false);
            $table->timestamp('toast_mostrado_at') ->nullable();
        });
    }

    public function down()
    {
        Schema::table('notificaciones', function ($table) {
            $table->dropColumn([ 'toast_mostrado', 'toast_mostrado_at' ]);
        });
    }
};