<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {
        // Activa CORS
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
        // Middleware interno (AQUÍ ESTÁ LA CLAVE)
        $middleware->alias([
            'internal.api' => \App\Http\Middleware\InternalApiMiddleware::class,
        ]);
    })

    ->withSchedule(function ($schedule) {
        Log::info('SCHEDULER FUNCIONANDO');

        $schedule->command('radar:process')
            ->everyMinute();

        $schedule->command('subscriptions:check')
            ->dailyAt('08:00');
    })

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();

// Esto lo agregas ANTES del return
// config()->set('cors', require __DIR__ . '/../config/cors.php');