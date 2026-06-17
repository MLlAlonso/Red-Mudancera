<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;

class ExpireSolicitudMudanzaLeads extends Command
{
    protected $signature = 'leads:expire';
    protected $description = 'Expira solicitudes de mudanza con más de 10 días';

    public function handle()
    {
        $expirados = SolicitudMudanza::where('estado', 'activo')
            ->whereDate('created_at', '<=', now()->subDays(10))
            ->update([ 'estado' => 'expirado' ]);

        $this->info("Leads expirados: {$expirados}");

        return self::SUCCESS;
    }
}