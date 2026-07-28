<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Empresa\Controllers\EmpresaAuthController;
use App\Modules\Empresa\Controllers\EmpresaController;
use App\Modules\Servicio\Controllers\ServicioController;
use App\Modules\Empresa\Controllers\EmpresaPublicController;
use App\Modules\Empresa\Controllers\EmpresaFeedController;
use App\Modules\Empresa\Controllers\CreditosController;
use App\Modules\Empresa\Controllers\PlanController;
use App\Modules\Empresa\Controllers\EmpresaRadarConfigController;
use App\Modules\Empresa\Controllers\TrialController;
use App\Modules\Empresa\Controllers\EmpresaCRMController;
use App\Modules\Empresa\Controllers\EmpresaNotaController;
use App\Modules\Tutorial\Controllers\TutorialController;

Route::prefix('empresa')->group(function () {
    Route::post('/register', [EmpresaAuthController::class, 'register']);
    Route::post('/login',    [EmpresaAuthController::class, 'login']);
    Route::post('/send-verification', [EmpresaAuthController::class, 'sendVerificationCode']);
    Route::post('/verify-code',       [EmpresaAuthController::class, 'verifyCode']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [EmpresaController::class, 'me']);
        Route::put('/update', [EmpresaController::class, 'update']);
        Route::delete('/delete', [EmpresaController::class, 'destroy']);
        Route::post('/logout', [EmpresaAuthController::class, 'logout']);

        Route::get('/nota', [EmpresaNotaController::class, 'show']);
        Route::post('/nota', [EmpresaNotaController::class, 'store']);

        // RUTAS PARA CRUD DE USUARIOS
        Route::get('/usuarios', [EmpresaController::class, 'usuariosEmpresa']);
        Route::delete('/usuario/{id}', [EmpresaController::class, 'eliminarUsuario'])
            ->middleware('plan.permission:add_users');
        Route::patch('/usuario/{id}/pausar', [EmpresaController::class, 'pausarUsuario']);
        Route::patch('/usuario/{id}/reanudar', [EmpresaController::class, 'reanudarUsuario']);

        Route::get('/servicios', [ServicioController::class, 'misServicios']);
        Route::get('/mis-leads', [EmpresaController::class, 'misLeads']);
        Route::get('/feed', [EmpresaFeedController::class, 'index']);

        Route::get('/referidos/stats', [EmpresaController::class, 'referidosStats']);

        //Rutas para tutoriales
        Route::get('/tutoriales', [TutorialController::class, 'index']);
        Route::post('/tutoriales/{tutorial}/visto', [TutorialController::class, 'marcarComoVisto']);

        /* Route::post('/creditos/comprar', [CreditosController::class, 'comprar'])
            ->middleware('plan.permission:buy_credits'); */
        Route::post('/plan/cambiar', [PlanController::class, 'cambiarPlan']);
        Route::post('/radar/config', [EmpresaRadarConfigController::class, 'update']);
        Route::get('/radar/config', [EmpresaRadarConfigController::class, 'show']);

        //Rutas para trials
        Route::post('/trial-request', [TrialController::class, 'store']);

        //Rutas para CRM
        Route::get('/crm/dashboard', [EmpresaCRMController::class, 'dashboard']);
    });

    Route::get('/empresas/{id}', [EmpresaPublicController::class, 'show']);
    Route::get('/empresas', [EmpresaPublicController::class, 'index']);

    Route::get('/slug/{slug}', [EmpresaPublicController::class, 'showBySlug']);
});
