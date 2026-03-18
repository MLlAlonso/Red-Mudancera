<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Servicio\Controllers\ServicioController;
use App\Modules\Servicio\Controllers\RadarController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/servicios', [ServicioController::class, 'store']);
    Route::patch('/servicios/{id}/estado', [ServicioController::class, 'changeEstado']);
    Route::delete('/servicios/{id}', [ServicioController::class, 'destroy']);
    Route::patch('/servicios/{id}', [ServicioController::class, 'update']);
    Route::post('/servicios/{id}/finalizar', [ServicioController::class, 'finalizar']);
    Route::get('/servicios/reporte/mensual', [ServicioController::class, 'reporteMensual']);
});

Route::get('/servicios/reporte/mensual/pdf', [ServicioController::class, 'reporteMensualPdf']);
Route::get('/servicios', [ServicioController::class, 'index']);
Route::get('/servicios/{id}', [ServicioController::class, 'show']);

Route::middleware(['internal.api'])->group(function () {
    Route::post('/internal/radar/match', [RadarController::class, 'match']);
});