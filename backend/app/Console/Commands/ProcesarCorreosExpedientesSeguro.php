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
        ProcesarCorreosExpedientesSeguroJob::dispatch();
        $this->info('Job de correos de expedientes de seguro enviado a la cola.');
        return self::SUCCESS;
    }
}
