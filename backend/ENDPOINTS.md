## Empresa — públicos
- POST /api/empresa/register → [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)::register
- POST /api/empresa/login → [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)::login
- POST /api/empresa/send-verification → [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)::sendVerificationCode
- POST /api/empresa/verify-code → [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)::verifyCode

## Empresa — protegidas (auth:sanctum)
- GET /api/empresa/me → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::me
- PUT /api/empresa/update → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::update
- DELETE /api/empresa/delete → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::destroy
- GET /api/empresa/usuarios → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::usuariosEmpresa
- DELETE /api/empresa/usuario/{id} → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::eliminarUsuario
- PATCH /api/empresa/usuario/{id}/pausar → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::pausarUsuario
- PATCH /api/empresa/usuario/{id}/reanudar → [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)::reanudarUsuario
- GET /api/empresa/servicios → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::misServicios

## Usuario — públicos
- POST /api/usuario/register → [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)::register
- POST /api/usuario/login → [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)::login
- POST /api/usuario/send-verification-code → [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)::sendVerificationCode
- POST /api/usuario/verify-code → [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)::verifyCode

## Usuario — protegidas (auth:sanctum)
- GET /api/usuario/me → [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)::me
- PUT /api/usuario/update → [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)::update
- DELETE /api/usuario/delete → [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)::destroy
- GET /api/usuario/mis-usuarios → [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)::listByEmpresa

## Servicios — públicos y protegidas
- GET /api/servicios → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::index
- GET /api/servicios/{id} → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::show
- POST /api/servicios (protegida) → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::store
- PATCH /api/servicios/{id} (protegida) → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::update
- PATCH /api/servicios/{id}/estado (protegida) → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::changeEstado
- DELETE /api/servicios/{id} (protegida) → [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)::destroy

## Reseñas — públicos y protegidas
- POST /api/empresa/resenas/link (protegida) → [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)::generarLink
- POST /api/resenas/{token} (protegida) → [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)::store
- GET /api/resenas/link/{token} → [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)::validarLink
- GET /api/empresas/{empresaId}/resenas → [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)::listar

## Rutas agrupadoras
- Archivo que incluye los módulos de rutas: [`backend/routes/api.php`](backend/routes/api.php)  
- Rutas del módulo Reseñas: [`backend/app/Modules/Resena/routes.php`](backend/app/Modules/Resena/routes.php)

---