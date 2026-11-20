<?php

namespace App\Console\Commands;

use App\Jobs\ProcesarCorreosExpedientesSeguro as ProcesarCorreosExpedientesSeguroJob;
use Illuminate\Console\Command;

class ProcesarCorreosExpedientesSeguro extends Command
{
    protected $signature = 'seguro:procesar-correos';

    protected $description = 'Procesa las invitaciones y recordatorios de expedientes de seguro';

    public function handle(): int
    {
        ProcesarCorreosExpedientesSeguroJob::dispatchSync();
        $this->info('Procesamiento de correos de seguros ejecutado.');
        return self::SUCCESS;
    }
}