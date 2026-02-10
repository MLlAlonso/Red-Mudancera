<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Notificacion\Controllers\NotificacionController;

Route::middleware('auth:empresa')->prefix('empresa')->group(function () {
    Route::get('/notificaciones', [NotificacionController::class, 'indexEmpresa']);
    Route::patch('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarLeidaEmpresa']);
    Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminarEmpresa']);
});

Route::middleware('auth:usuario')->prefix('usuario')->group(function () {
    Route::get('/notificaciones', [NotificacionController::class, 'indexUsuario']);
    Route::patch('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarLeidaUsuario']);
    Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminarUsuario']);
});