<?php

return [
    'defaults' => [
        'guard' => 'sanctum',
        'passwords' => 'empresas',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'empresas',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'empresas',
            'hash' => false,
        ],
    ],

    'providers' => [
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
