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

        // Guard EMPRESA
        'empresa' => [
            'driver' => 'sanctum',
            'provider' => 'empresas',
        ],

        // Guard USUARIO
        'usuario' => [
            'driver' => 'sanctum',
            'provider' => 'usuarios',
        ],

        // API general (puedes usar empresa o uno multi)
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

        // Provider EMPRESA
        'empresas' => [
            'driver' => 'eloquent',
            'model' => App\Modules\Empresa\Models\Empresa::class,
        ],

        // Provider USUARIO
        'usuarios' => [
            'driver' => 'eloquent',
            'model' => App\Modules\Usuario\Models\Usuario::class,
        ],
    ],

    'passwords' => [
        'empresas' => [
            'provider' => 'empresas',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],

        'usuarios' => [
            'provider' => 'usuarios',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
