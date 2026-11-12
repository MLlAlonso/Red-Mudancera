<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SolicitudMudanza\Controllers\LeadNotaController;
use App\Modules\SolicitudMudanza\Controllers\LeadOperacionController;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;
use App\Modules\SolicitudMudanza\Controllers\ReciboController;
use App\Modules\SolicitudMudanza\Controllers\ReciboColorController;

Route::prefix('solicitudes-mudanza')->group(function () {
    Route::post('/', [SolicitudMudanzaController::class, 'store']);
    Route::post('/verificar', [SolicitudMudanzaController::class, 'verificar']);
    Route::post('/reenviar-codigo', [SolicitudMudanzaController::class, 'reenviarCodigo']);
    Route::get('/', [SolicitudMudanzaController::class, 'index']);
    Route::get('/{id}', [SolicitudMudanzaController::class, 'show']);
    Route::post('/{id}/comprar', [SolicitudMudanzaController::class, 'comprar'])->middleware(['auth:empresa', 'plan.permission:comprar_lead']);
    Route::patch('/leads/{id}/estado', [LeadOperacionController::class, 'changeEstado'])->middleware('auth:empresa');
    Route::post('/{id}/cancelar', [SolicitudMudanzaController::class, 'cancelar']);

    Route::post('/solicitar-seguro', [SolicitudMudanzaController::class, 'solicitarSeguro']);
    Route::post('/solicitar-seguro-externo', [SolicitudMudanzaController::class, 'solicitarSeguroExterno']);
    Route::delete('/reportar/{token}', [SolicitudMudanzaController::class, 'reportar']);

    Route::patch('/leads/{id}/ocultar', [LeadOperacionController::class, 'ocultar'])->middleware('auth:empresa');
    Route::delete('/leads/{id}/poner-en-venta',  [LeadOperacionController::class, 'ponerEnVenta'])->middleware('auth:empresa');

    Route::get('/leads/{id}/nota', [LeadNotaController::class, 'show']);
    Route::post('/leads/{id}/nota', [LeadNotaController::class, 'store']);

    Route::middleware('auth:empresa')->prefix('empresa/solicitudes')->group(function () {
        Route::get('/{solicitudId}/recibos/datos', [ReciboController::class, 'datos']);
        Route::get('/{solicitudId}/recibos', [ReciboController::class, 'index']);
        Route::post('/{solicitudId}/recibos', [ReciboController::class, 'store']);
        Route::get('/recibos/{id}/descargar', [ReciboController::class, 'download']);
        Route::put('/recibos/firma', [ReciboController::class, 'firma']);
        Route::delete('/recibos/firma', [ReciboController::class, 'eliminarFirma']);
    });

    Route::middleware('auth:empresa')->prefix('empresa/recibos')->group(function () {
        Route::get('/colores', [ReciboColorController::class, 'show']);
        Route::put('/colores', [ReciboColorController::class, 'update']);
        Route::delete('/colores', [ReciboColorController::class, 'reset']);
    });
});
