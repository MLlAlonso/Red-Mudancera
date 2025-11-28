<?php
use Illuminate\Support\Facades\Route;
use App\Modules\Empresa\Controllers\EmpresaAuthController;

/*
|--------------------------------------------------------------------------
| Empresa Auth
|--------------------------------------------------------------------------
*/
Route::prefix('empresa')->group(function () {

    // Registro y login
    Route::post('/register', [EmpresaAuthController::class, 'register']);
    Route::post('/login',    [EmpresaAuthController::class, 'login']);

    // Rutas protegidas
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [EmpresaAuthController::class, 'me']);
    });
});