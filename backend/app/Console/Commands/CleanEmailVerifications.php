<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CleanEmailVerifications extends Command
{
    protected $signature = 'email:clean';
    protected $description = 'Eliminar verificaciones de email expiradas';

    public function handle()
    {
        DB::table('email_verifications')
            ->where('created_at', '<', Carbon::now()->subDay())
            ->delete();

        $this->info('Registros antiguos eliminados');
    }
}
