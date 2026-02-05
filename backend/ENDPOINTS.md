## Empresa — Públicos
Método	Ruta	Controlador	Archivo
POST	/api/empresa/register	EmpresaAuthController::register	routes.php
POST	/api/empresa/login	EmpresaAuthController::login	routes.php
POST	/api/empresa/send-verification	EmpresaAuthController::sendVerificationCode	routes.php
POST	/api/empresa/verify-code	EmpresaAuthController::verifyCode	routes.php

## Empresa — Protegidos (auth:sanctum)
Método	Ruta	Controlador	Archivo
GET	/api/empresa/me	EmpresaController::me	routes.php
PUT	/api/empresa/update	EmpresaController::update	routes.php
DELETE	/api/empresa/delete	EmpresaController::destroy	routes.php
GET	/api/empresa/usuarios	EmpresaController::usuariosEmpresa	routes.php
DELETE	/api/empresa/usuario/{id}	EmpresaController::eliminarUsuario	routes.php
PATCH	/api/empresa/usuario/{id}/pausar	EmpresaController::pausarUsuario	routes.php
PATCH	/api/empresa/usuario/{id}/reanudar	EmpresaController::reanudarUsuario	routes.php
GET	/api/empresa/servicios	ServicioController::misServicios	routes.php

## Empresa — Públicos (adicionales)
Método	Ruta	Controlador	Archivo
GET	/api/empresa/empresas/{id}	EmpresaPublicController::show	routes.php
GET	/api/empresa/empresas	EmpresaPublicController::index	routes.php

## Usuario — Públicos
Método	Ruta	Controlador	Archivo
POST	/api/usuario/register	UsuarioAuthController::register	routes.php
POST	/api/usuario/login	UsuarioAuthController::login	routes.php
POST	/api/usuario/send-verification-code	UsuarioAuthController::sendVerificationCode	routes.php
POST	/api/usuario/verify-code	UsuarioAuthController::verifyCode	routes.php

## Usuario — Protegidos (auth:sanctum)
Método	Ruta	Controlador	Archivo
GET	/api/usuario/me	UsuarioController::me	routes.php
PUT	/api/usuario/update	UsuarioController::update	routes.php
DELETE	/api/usuario/delete	UsuarioController::destroy	routes.php
GET	/api/usuario/mis-usuarios	UsuarioController::listByEmpresa	routes.php

## Servicios
Método	Ruta	Controlador	Protección	Archivo
GET	/api/servicios	ServicioController::index	Público	routes.php
GET	/api/servicios/{id}	ServicioController::show	Público	routes.php
POST	/api/servicios	ServicioController::store	Protegida	routes.php
PATCH	/api/servicios/{id}	ServicioController::update	Protegida	routes.php
PATCH	/api/servicios/{id}/estado	ServicioController::changeEstado	Protegida	routes.php
DELETE	/api/servicios/{id}	ServicioController::destroy	Protegida	routes.php
POST	/api/servicios/{id}/finalizar	ServicioController::finalizar	Protegida	routes.php
GET	/api/servicios/reporte/mensual	ServicioController::reporteMensual	Protegida	routes.php
GET	/api/servicios/reporte/mensual/pdf	ServicioController::reporteMensualPdf	Público	routes.php
POST	/api/servicios/{id}/imagenes	ServicioController::updateImagenes	Protegida	api.php

## Reseñas
Método	Ruta	Controlador	Protección	Archivo
POST	/api/empresa/resenas/link	ResenaController::generarLink	Protegida	routes.php
POST	/api/resenas/{token}	ResenaController::store	Protegida	routes.php
GET	/api/resenas/link/{token}	ResenaController::validarLink	Público	routes.php
GET	/api/empresas/{empresaId}/resenas	ResenaController::listar	Público	routes.php

## Otros (Recuperación de Contraseña)
Método	Ruta	Controlador	Archivo
POST	/api/auth/recover-password	RecoverPasswordController::recover	api.php

## Rutas Agrupadoras

- Archivo principal: [`backend/routes/api.php`](backend/routes/api.php)
- Módulo Reseñas: [`backend/app/Modules/Resena/routes.php`](backend/app/Modules/Resena/routes.php)