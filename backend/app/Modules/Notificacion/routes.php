<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Notificacion\Controllers\NotificacionController;
use App\Modules\Notificacion\Controllers\PushSubscriptionController;
use App\Modules\Notificacion\Controllers\TestPushController;
use App\Modules\Notificacion\Controllers\RealtimeToastController;

Route::middleware('auth:empresa')->prefix('empresa')->group(function () {
    Route::get('/notificaciones', [NotificacionController::class, 'indexEmpresa']);
    Route::get('/notificaciones/count', [NotificacionController::class, 'countEmpresa']);
    Route::patch('/notificaciones/marcar-todas', [NotificacionController::class, 'marcarTodasLeidasEmpresa']);
    Route::delete('/notificaciones/eliminar-leidas', [NotificacionController::class, 'eliminarTodasLeidasEmpresa']);
    Route::patch('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarLeidaEmpresa']);
    Route::delete('/notificaciones/{id}', [NotificacionController::class, 'eliminarEmpresa']);

    Route::get( '/toast/latest',  [RealtimeToastController::class, 'latestEmpresa'] );
    Route::patch( '/toast/{id}/shown', [RealtimeToastController::class, 'markAsShown']);
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

Route::middleware('auth:empresa')->post('/test-push', [TestPushController::class, 'send']);