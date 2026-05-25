<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SystemAnnouncement\Controllers\SystemAnnouncementController;

Route::prefix('system-announcements')->group(function () {
    Route::get( '/latest', [SystemAnnouncementController::class, 'latest'] );
    Route::post( '/', [SystemAnnouncementController::class, 'store'] );
});