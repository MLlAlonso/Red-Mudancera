<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RecoverPasswordController;
use App\Modules\Servicio\Controllers\ServicioController;

/*
|--------------------------------------------------------------------------
| Empresa
|--------------------------------------------------------------------------
*/

require base_path('app/Modules/Empresa/routes.php');

/*
|--------------------------------------------------------------------------
| Usuario
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/Usuario/routes.php');

/*
|--------------------------------------------------------------------------
| Servicios
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/Servicio/routes.php');

/*
|--------------------------------------------------------------------------
| Reseñas
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/Resena/routes.php');

/*
|--------------------------------------------------------------------------
| PWD Reset
|--------------------------------------------------------------------------
*/
Route::post('/auth/recover-password', [RecoverPasswordController::class, 'recover']);


/*
|--------------------------------------------------------------------------
| Images
|--------------------------------------------------------------------------
*/
Route::post(
    '/servicios/{id}/imagenes',
    [ServicioController::class, 'updateImagenes']
)->middleware('auth:empresa');