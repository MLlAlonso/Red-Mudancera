<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;

Route::prefix('solicitudes-mudanza')->group(function () {
    Route::post('/', [SolicitudMudanzaController::class, 'store']);
    Route::post('/verificar', [SolicitudMudanzaController::class, 'verificar']);
    Route::post('/reenviar-codigo', [SolicitudMudanzaController::class, 'reenviarCodigo']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [SolicitudMudanzaController::class, 'index']);
});
