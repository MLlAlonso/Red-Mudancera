<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Empresa\Controllers\EmpresaAuthController;
use App\Modules\Empresa\Controllers\EmpresaController;

Route::prefix('empresa')->group(function () {

    Route::post('/register', [EmpresaAuthController::class, 'register']);
    Route::post('/login',    [EmpresaAuthController::class, 'login']);

    Route::post('/send-verification', [EmpresaAuthController::class, 'sendVerificationCode']);
    Route::post('/verify-code',       [EmpresaAuthController::class, 'verifyCode']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [EmpresaController::class, 'me']);
        Route::put('/update', [EmpresaController::class, 'update']);
        Route::delete('/delete', [EmpresaController::class, 'destroy']);
        
        // RUTAS PARA CRUD DE USUARIOS
        Route::get('/usuarios', [EmpresaController::class, 'usuariosEmpresa']);
        Route::delete('/usuario/{id}', [EmpresaController::class, 'eliminarUsuario']);
        Route::patch('/usuario/{id}/pausar', [EmpresaController::class, 'pausarUsuario']);
        Route::patch('/usuario/{id}/reanudar', [EmpresaController::class, 'reanudarUsuario']);
    });
});