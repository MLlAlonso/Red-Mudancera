<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Empresa\Controllers\EmpresaAuthController;

/*
|--------------------------------------------------------------------------
| Empresa Auth
|--------------------------------------------------------------------------
*/
Route::prefix('empresa')->group(function () {

    // ============================================================
    // RUTAS YA EXISTENTES DE M01
    // ============================================================
    Route::post('/register', [EmpresaAuthController::class, 'register']);
    Route::post('/login',    [EmpresaAuthController::class, 'login']);

    // ============================================================
    // VERIFICACIÓN DE CORREO
    // ============================================================
    Route::post('/send-verification', [EmpresaAuthController::class, 'sendVerificationCode']);
    Route::post('/verify-code',       [EmpresaAuthController::class, 'verifyCode']);

    // ============================================================
    // RUTAS PROTEGIDAS
    // ============================================================
    Route::middleware('auth:sanctum')->group(function () {

        // EXISTENTE
        Route::get('/me', [EmpresaAuthController::class, 'me']);

        // NUEVA: actualizar perfil de empresa
        Route::put('/update', [EmpresaAuthController::class, 'update']);

    });
});


/*
|--------------------------------------------------------------------------
| Usuario
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/Usuario/routes.php');