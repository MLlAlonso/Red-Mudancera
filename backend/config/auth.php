<?php

return [

    'defaults' => [
        'guard' => 'empresa',
        'passwords' => 'empresas',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'empresa' => [
            'driver' => 'sanctum',
            'provider' => 'empresas',
        ],

        'api' => [
            'driver' => 'sanctum',
            'provider' => 'empresas',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'empresas' => [
            'driver' => 'eloquent',
            'model' => App\Modules\Empresa\Models\Empresa::class,
        ],
    ],

    'passwords' => [
        'empresas' => [
            'provider' => 'empresas',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];