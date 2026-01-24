## Empresa — Públicos

| Método | Ruta | Controlador |
|--------|------|-------------|
| POST | `/api/empresa/register` | `EmpresaAuthController::register` |
| POST | `/api/empresa/login` | `EmpresaAuthController::login` |
| POST | `/api/empresa/send-verification` | `EmpresaAuthController::sendVerificationCode` |
| POST | `/api/empresa/verify-code` | `EmpresaAuthController::verifyCode` |

## Empresa — Protegidos (auth:sanctum)

| Método | Ruta | Controlador |
|--------|------|-------------|
| GET | `/api/empresa/me` | `EmpresaController::me` |
| PUT | `/api/empresa/update` | `EmpresaController::update` |
| DELETE | `/api/empresa/delete` | `EmpresaController::destroy` |
| GET | `/api/empresa/usuarios` | `EmpresaController::usuariosEmpresa` |
| DELETE | `/api/empresa/usuario/{id}` | `EmpresaController::eliminarUsuario` |
| PATCH | `/api/empresa/usuario/{id}/pausar` | `EmpresaController::pausarUsuario` |
| PATCH | `/api/empresa/usuario/{id}/reanudar` | `EmpresaController::reanudarUsuario` |
| GET | `/api/empresa/servicios` | `ServicioController::misServicios` |

## Usuario — Públicos

| Método | Ruta | Controlador |
|--------|------|-------------|
| POST | `/api/usuario/register` | `UsuarioAuthController::register` |
| POST | `/api/usuario/login` | `UsuarioAuthController::login` |
| POST | `/api/usuario/send-verification-code` | `UsuarioAuthController::sendVerificationCode` |
| POST | `/api/usuario/verify-code` | `UsuarioAuthController::verifyCode` |

## Usuario — Protegidos (auth:sanctum)

| Método | Ruta | Controlador |
|--------|------|-------------|
| GET | `/api/usuario/me` | `UsuarioController::me` |
| PUT | `/api/usuario/update` | `UsuarioController::update` |
| DELETE | `/api/usuario/delete` | `UsuarioController::destroy` |
| GET | `/api/usuario/mis-usuarios` | `UsuarioController::listByEmpresa` |

## Servicios

| Método | Ruta | Controlador | Protección |
|--------|------|-------------|-----------|
| GET | `/api/servicios` | `ServicioController::index` | Público |
| GET | `/api/servicios/{id}` | `ServicioController::show` | Público |
| POST | `/api/servicios` | `ServicioController::store` | Protegida |
| PATCH | `/api/servicios/{id}` | `ServicioController::update` | Protegida |
| PATCH | `/api/servicios/{id}/estado` | `ServicioController::changeEstado` | Protegida |
| DELETE | `/api/servicios/{id}` | `ServicioController::destroy` | Protegida |

## Reseñas

| Método | Ruta | Controlador | Protección |
|--------|------|-------------|-----------|
| POST | `/api/empresa/resenas/link` | `ResenaController::generarLink` | Protegida |
| POST | `/api/resenas/{token}` | `ResenaController::store` | Protegida |
| GET | `/api/resenas/link/{token}` | `ResenaController::validarLink` | Público |
| GET | `/api/empresas/{empresaId}/resenas` | `ResenaController::listar` | Público |

## Rutas Agrupadoras

- Archivo principal: [`backend/routes/api.php`](backend/routes/api.php)
- Módulo Reseñas: [`backend/app/Modules/Resena/routes.php`](backend/app/Modules/Resena/routes.php)