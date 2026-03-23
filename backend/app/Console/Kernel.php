<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        // Limpieza de verificaciones de email cada 24 horas
        $schedule->command('email:clean')->daily();

        // Limpieza futura de notificaciones
        // $schedule->command('notificaciones:cleanup')->daily();

        $schedule->command('notificaciones:daily-views-summary')
            ->dailyAt('23:59');

        $schedule->command('notificaciones:check-expiring')
            ->hourly();

        //Agrupar matches
        $schedule->command('radar:process')->everyFiveMinute();

        // Aquí luego pondremos:
        // - resumen diario de vistas
        // - servicios por vencer
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}