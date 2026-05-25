<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Analytics\Controllers\LiveViewerController;

Route::post( '/live-viewers/track', [LiveViewerController::class, 'track'] );