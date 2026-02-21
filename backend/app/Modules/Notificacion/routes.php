<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Notificacion\Controllers\NotificacionController;

Route::middleware('auth:empresa')->prefix('empresa')->group(function () {
    Route::get('/notificaciones', [NotificacionController::class, 'indexEmpresa']);
    Route::get('/notificaciones/count', [NotificacionController::class, 'countEmpresa']);
    Route::patch('/notificaciones/marcar-todas', [NotificacionController::class, 'marcarTodasLeidasEmpresa']);
    Route::delete('/notificaciones/eliminar-leidas', [NotificacionController::class, 'eliminarTodasLeidasEmpresa']);
    Route::patch('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarLeidaEmpresa']);
    Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminarEmpresa']);
});

Route::middleware('auth:usuario')->prefix('usuario')->group(function () {
    Route::get('/notificaciones', [NotificacionController::class, 'indexUsuario']);
    Route::get('/notificaciones/count', [NotificacionController::class, 'countUsuario']);
    Route::patch('/notificaciones/marcar-todas', [NotificacionController::class, 'marcarTodasLeidasUsuario']);
    Route::delete('/notificaciones/eliminar-leidas', [NotificacionController::class, 'eliminarTodasLeidasUsuario']);
    Route::patch('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarLeidaUsuario']);
    Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminarUsuario'])
        ->whereNumber('id');
});