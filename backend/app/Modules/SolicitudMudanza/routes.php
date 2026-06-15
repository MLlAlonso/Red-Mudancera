<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;
use App\Modules\SolicitudMudanza\Controllers\LeadOperacionController;

Route::prefix('solicitudes-mudanza')->group(function () {
    Route::post('/', [SolicitudMudanzaController::class, 'store']);
    Route::post('/verificar', [SolicitudMudanzaController::class, 'verificar']);
    Route::post('/reenviar-codigo', [SolicitudMudanzaController::class, 'reenviarCodigo']);
    Route::get('/', [SolicitudMudanzaController::class, 'index']);
    Route::get('/{id}', [SolicitudMudanzaController::class, 'show']);
    Route::post('/{id}/comprar', [SolicitudMudanzaController::class, 'comprar'])
        ->middleware(['auth:empresa', 'plan.permission:comprar_lead']);
    Route::patch('/leads/{id}/estado', [LeadOperacionController::class, 'changeEstado'])
        ->middleware('auth:empresa');
    Route::post('/{id}/cancelar', [SolicitudMudanzaController::class, 'cancelar']);

    Route::post('/solicitar-seguro', [SolicitudMudanzaController::class, 'solicitarSeguro']);
    Route::post('/solicitar-seguro-externo', [SolicitudMudanzaController::class, 'solicitarSeguroExterno']);
    Route::delete('/reportar/{token}', [SolicitudMudanzaController::class, 'reportar']);
    Route::patch('/leads/{id}/ocultar', [LeadOperacionController::class, 'ocultar'] )->middleware('auth:empresa');
});
