<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Servicio\Controllers\ServicioController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/servicios', [ServicioController::class, 'store']);
    Route::get('/servicios', [ServicioController::class, 'index']);
    Route::get('/servicios/{id}', [ServicioController::class, 'show']);
    Route::patch('/servicios/{id}/estado', [ServicioController::class, 'changeEstado']);
    Route::delete('/servicios/{id}', [ServicioController::class, 'destroy']);
});
