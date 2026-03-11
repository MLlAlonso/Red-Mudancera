<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Resena\Controllers\ResenaController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/empresa/resenas/link', [ResenaController::class, 'generarLink']);
});

Route::post('/resenas/{token}', [ResenaController::class, 'store']);
Route::get('/resenas/link/{token}', [ResenaController::class, 'validarLink']);
Route::get('/empresas/{empresaId}/resenas', [ResenaController::class, 'listar']);