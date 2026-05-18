<?php

use Illuminate\Support\Facades\Route;

use App\Modules\SuperAdmin\Controllers\SuperAdminController;

Route::prefix('superadmin') ->middleware('api') ->group(function () {

        Route::get('/dashboard', [SuperAdminController::class, 'dashboard'] );
        Route::get( '/trial-requests', [SuperAdminController::class, 'trialRequests'] );
        Route::patch( '/trial-requests/{id}/approve', [SuperAdminController::class, 'approveTrial'] );
        Route::patch( '/trial-requests/{id}/reject', [SuperAdminController::class, 'rejectTrial'] );
    });