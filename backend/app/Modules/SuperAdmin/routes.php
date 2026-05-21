<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SuperAdmin\Controllers\SuperAdminController;
use App\Modules\SuperAdmin\Controllers\SuperAdminEmpresaController;

Route::prefix('superadmin')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard']);
    Route::get('/trial-requests', [SuperAdminController::class, 'trialRequests']);
    Route::patch('/trial-requests/{id}/approve', [SuperAdminController::class, 'approveTrial']);
    Route::patch('/trial-requests/{id}/reject', [SuperAdminController::class, 'rejectTrial']);

    /*
    |--------------------------------------------------------------------------
    | Empresas Admin
    |--------------------------------------------------------------------------
    */
    Route::get( '/empresas', [SuperAdminEmpresaController::class, 'index'] );
    Route::patch( '/empresas/{id}/creditos', [SuperAdminEmpresaController::class, 'addCreditos'] );
    Route::patch( '/empresas/{id}/plan', [SuperAdminEmpresaController::class, 'changePlan'] );
    Route::post( '/partners', [SuperAdminEmpresaController::class, 'createPartner'] );
    Route::delete( '/empresas/{id}', [SuperAdminEmpresaController::class, 'destroyEmpresa']);

});