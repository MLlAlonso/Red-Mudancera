<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RecoverPasswordController;
use App\Modules\Servicio\Controllers\ServicioController;
use App\Http\Controllers\StripeController;
use App\Modules\SolicitudMudanza\Controllers\SolicitudMudanzaController;

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
Route::post( '/servicios/{id}/imagenes', [ServicioController::class, 'updateImagenes'] )->middleware('auth:empresa');

/*
|--------------------------------------------------------------------------
| Notificaciones
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/Notificacion/routes.php');

/*
|--------------------------------------------------------------------------
| Solicitud de Mudanza publicas
|--------------------------------------------------------------------------
*/
require base_path('app/Modules/SolicitudMudanza/routes.php');

/*
|--------------------------------------------------------------------------
| Solicitud de Seguros Mudanza
|--------------------------------------------------------------------------
*/
Route::post('/solicitudes-mudanza/solicitar-seguro', [SolicitudMudanzaController::class, 'solicitarSeguro']);

/*
|--------------------------------------------------------------------------
| Stripe config
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->post('/stripe/checkout', [StripeController::class, 'checkout']);
Route::post('/stripe/webhook', [StripeController::class, 'webhook']);