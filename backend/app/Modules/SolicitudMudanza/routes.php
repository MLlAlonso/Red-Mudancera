<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;

Route::prefix('solicitudes-mudanza')->group(function () {
    Route::post('/', [SolicitudMudanzaController::class, 'store']);
    Route::post('/verificar', [SolicitudMudanzaController::class, 'verificar']);
    Route::post('/reenviar-codigo', [SolicitudMudanzaController::class, 'reenviarCodigo']);

    Route::get('/', [SolicitudMudanzaController::class, 'index']);
    Route::get('/{id}', [SolicitudMudanzaController::class, 'show']);

    Route::post('/{id}/comprar', [SolicitudMudanzaController::class, 'comprar'])
    ->middleware('auth:empresa');
});