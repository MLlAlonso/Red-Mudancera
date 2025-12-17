<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Empresa\Controllers\EmpresaAuthController;

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