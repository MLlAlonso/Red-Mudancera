<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\RadarMatchFound;
use App\Listeners\SendRadarMatchNotification;

class EventServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Event::listen(
            RadarMatchFound::class,
            [SendRadarMatchNotification::class, 'handle']
        );
    }
}