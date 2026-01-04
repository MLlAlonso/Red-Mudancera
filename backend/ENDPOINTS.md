# Lista de endpoints actualizados

A continuación se listan los endpoints actuales (método → ruta → controlador):

## Empresa — públicos
- POST /api/empresa/register → App\Modules\Empresa\Controllers\EmpresaAuthController::register
- POST /api/empresa/login → App\Modules\Empresa\Controllers\EmpresaAuthController::login
- POST /api/empresa/send-verification → App\Modules\Empresa\Controllers\EmpresaAuthController::sendVerificationCode
- POST /api/empresa/verify-code → App\Modules\Empresa\Controllers\EmpresaAuthController::verifyCode

## Empresa — protegidas (auth:sanctum)
- GET /api/empresa/me → App\Modules\Empresa\Controllers\EmpresaController::me
- PUT /api/empresa/update → App\Modules\Empresa\Controllers\EmpresaController::update
- DELETE /api/empresa/delete → App\Modules\Empresa\Controllers\EmpresaController::destroy
- GET /api/empresa/usuarios → App\Modules\Empresa\Controllers\EmpresaController::usuariosEmpresa
- DELETE /api/empresa/usuario/{id} → App\Modules\Empresa\Controllers\EmpresaController::eliminarUsuario
- PATCH /api/empresa/usuario/{id}/pausar → App\Modules\Empresa\Controllers\EmpresaController::pausarUsuario
- PATCH /api/empresa/usuario/{id}/reanudar → App\Modules\Empresa\Controllers\EmpresaController::reanudarUsuario
- GET /api/empresa/servicios → App\Modules\Servicio\Controllers\ServicioController::misServicios

## Usuario — públicos
- POST /api/usuario/register → App\Modules\Usuario\Controllers\UsuarioAuthController::register
- POST /api/usuario/login → App\Modules\Usuario\Controllers\UsuarioAuthController::login
- POST /api/usuario/send-verification-code → App\Modules\Usuario\Controllers\UsuarioAuthController::sendVerificationCode
- POST /api/usuario/verify-code → App\Modules\Usuario\Controllers\UsuarioAuthController::verifyCode

## Usuario — protegidas (auth:sanctum)
- GET /api/usuario/me → App\Modules\Usuario\Controllers\UsuarioController::me
- PUT /api/usuario/update → App\Modules\Usuario\Controllers\UsuarioController::update
- DELETE /api/usuario/delete → App\Modules\Usuario\Controllers\UsuarioController::destroy
- GET /api/usuario/mis-usuarios → App\Modules\Usuario\Controllers\UsuarioController::listByEmpresa

## Servicios — públicos y protegidas
- GET /api/servicios → App\Modules\Servicio\Controllers\ServicioController::index
- GET /api/servicios/{id} → App\Modules\Servicio\Controllers\ServicioController::show
- POST /api/servicios (protegida) → App\Modules\Servicio\Controllers\ServicioController::store
- PATCH /api/servicios/{id} (protegida) → App\Modules\Servicio\Controllers\ServicioController::update
- PATCH /api/servicios/{id}/estado (protegida) → App\Modules\Servicio\Controllers\ServicioController::changeEstado
- DELETE /api/servicios/{id} (protegida) → App\Modules\Servicio\Controllers\ServicioController::destroy

## Rutas agrupadoras
- Archivo que incluye los módulos de rutas: backend/routes/api.php
---