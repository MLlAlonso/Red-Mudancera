<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;

Route::prefix('solicitudes-mudanza')->group(function () {
    Route::post('/', [SolicitudMudanzaController::class, 'store']);
});