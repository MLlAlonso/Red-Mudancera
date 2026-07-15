<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SystemAnnouncement\Controllers\SystemAnnouncementController;

Route::prefix('system-announcements')->group(function () {
    Route::post('/', [SystemAnnouncementController::class, 'store']);
    
    Route::middleware('auth:empresa')->group(function () {
        Route::get('/latest', [SystemAnnouncementController::class, 'latest']);
        Route::patch( '/{id}/read', [SystemAnnouncementController::class, 'markAsRead']);
    });
});