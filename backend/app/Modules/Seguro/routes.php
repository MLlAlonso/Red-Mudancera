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
    | Expediente form
    |--------------------------------------------------------------------------
    */
    Route::post('/{folio}/paso-1', [SeguroController::class, 'guardarPasoUno']);
    Route::post('/{folio}/paso-2', [SeguroController::class, 'guardarPasoDos']);
    Route::post('/{folio}/paso-3', [SeguroController::class, 'guardarPasoTres']);

    /*
    |--------------------------------------------------------------------------
    | Generar enlace privado para empresa
    |--------------------------------------------------------------------------
    */
    Route::post('/{folio}/empresa/enlace', [SeguroController::class, 'generarEnlaceEmpresa',]);

    /*
    |--------------------------------------------------------------------------
    | Acceso privado de empresa
    |--------------------------------------------------------------------------
    */
    Route::get('/empresa/{token}', [SeguroController::class, 'obtenerFormularioEmpresa',]);
    Route::post('/empresa/{token}/guardar', [SeguroController::class, 'guardarDatosEmpresa',]);
    Route::post('/empresa/{token}/finalizar', [SeguroController::class, 'finalizarDatosEmpresa',]);
});
