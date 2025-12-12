<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Usuario\Controllers\UsuarioAuthController;
use App\Modules\Usuario\Controllers\UsuarioController;

Route::prefix('usuario')->group(function () {

    // Registro y autenticación
    Route::post('/register', [UsuarioAuthController::class, 'register']);
    Route::post('/login',    [UsuarioAuthController::class, 'login']);

    // Verificación por correo
    Route::post('/send-verification', [UsuarioAuthController::class, 'sendVerificationCode']);
    Route::post('/verify-code',       [UsuarioAuthController::class, 'verifyCode']);

    // Rutas protegidas con token Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me',    [UsuarioController::class, 'me']);
        Route::put('/update', [UsuarioController::class, 'update']);
        Route::delete('/delete', [UsuarioController::class, 'destroy']);
        Route::get('/mis-usuarios', [UsuarioController::class, 'listByEmpresa']);
    });
});