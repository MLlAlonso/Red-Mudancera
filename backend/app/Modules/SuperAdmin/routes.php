<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SuperAdmin\Controllers\SuperAdminController;
use App\Modules\SuperAdmin\Controllers\SuperAdminEmpresaController;
use App\Modules\SuperAdmin\Controllers\SuperAdminServiciosController;
use App\Modules\SuperAdmin\Controllers\SuperAdminAnalyticsController;
use App\Modules\SuperAdmin\Controllers\SuperAdminSegurosController;

Route::prefix('superadmin')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard']);
    Route::get('/trial-requests', [SuperAdminController::class, 'trialRequests']);
    Route::patch('/trial-requests/{id}/approve', [SuperAdminController::class, 'approveTrial']);
    Route::patch('/trial-requests/{id}/reject', [SuperAdminController::class, 'rejectTrial']);

    /*
    |--------------------------------------------------------------------------
    | Empresas
    |--------------------------------------------------------------------------
    */
    Route::get('/empresas', [SuperAdminEmpresaController::class, 'index']);
    Route::patch('/empresas/{id}/creditos', [SuperAdminEmpresaController::class, 'addCreditos']);
    Route::patch('/empresas/{id}/plan', [SuperAdminEmpresaController::class, 'changePlan']);
    Route::patch('/empresas/{id}/verify', [SuperAdminEmpresaController::class, 'verifyEmpresa']);
    Route::post('/partners', [SuperAdminEmpresaController::class, 'createPartner']);
    Route::delete('/empresas/{id}', [SuperAdminEmpresaController::class, 'destroyEmpresa']);
    Route::get('/partners', [SuperAdminEmpresaController::class, 'partners']);
    Route::put('/partners/{id}', [SuperAdminEmpresaController::class, 'updatePartner']);
    Route::delete('/partners/{id}', [SuperAdminEmpresaController::class, 'deletePartner']);

    /*
    |--------------------------------------------------------------------------
    | Servicios
    |--------------------------------------------------------------------------
    */
    Route::get('/servicios-dashboard', [SuperAdminServiciosController::class, 'dashboard']);

    /*
    |--------------------------------------------------------------------------
    | Seguros
    |--------------------------------------------------------------------------
    */
    Route::get('/seguros', [SuperAdminSegurosController::class, 'index']);
    Route::get('/seguros/{id}', [SuperAdminSegurosController::class, 'show']);
    Route::post('/seguros/{id}/enviar-correo', [SuperAdminSegurosController::class, 'enviarCorreo']);

    /*
    |--------------------------------------------------------------------------
    | Analisis
    |--------------------------------------------------------------------------
    */
    Route::get('/analytics/servicios', [SuperAdminAnalyticsController::class, 'servicios']);
});
