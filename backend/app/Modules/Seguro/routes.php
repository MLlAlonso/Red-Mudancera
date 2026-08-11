<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Seguro\Controllers\SeguroController;

Route::prefix('seguros')->group(function () {
    /*
    |--------------------------------------------------------------------------
    | Acceso público al expediente
    |--------------------------------------------------------------------------
    */
    Route::get('/{folio}', [SeguroController::class, 'continuar']);

    /*
    |--------------------------------------------------------------------------
    | Iniciar captura
    |--------------------------------------------------------------------------
    */
    Route::post('/{folio}/iniciar', [SeguroController::class, 'iniciar']);

    /*
    |--------------------------------------------------------------------------
    | Paso 1
    |--------------------------------------------------------------------------
    */
    Route::post('/{folio}/paso-1', [SeguroController::class, 'guardarPasoUno']);
});
