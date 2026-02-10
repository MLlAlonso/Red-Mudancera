<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('notificaciones', function (Blueprint $table) {
            $table->boolean('leida_empresa')->default(false)->after('mensaje');
            $table->timestamp('leida_empresa_at')->nullable()->after('leida_empresa');
        });
    }

    public function down(): void
    {
        Schema::table('notificaciones', function (Blueprint $table) {
            $table->dropColumn(['leida_empresa', 'leida_empresa_at']);
        });
    }
};