# Red Mudancera – Documento de Estado y Guía para la Siguiente Milestone

---

## 1. Resumen General del Proyecto

**Red Mudancera** es una plataforma web orientada a conectar empresas de mudanzas con usuarios, permitiendo la gestión de servicios, usuarios internos, perfiles, reputación y comunicación segura mediante autenticación por tokens.
El sistema está diseñado con una **arquitectura modular**, escalable y preparada para crecer por milestones, evitando retrabajo y permitiendo incorporar nuevas funcionalidades sin romper lo existente.
Actualmente el proyecto se encuentra en un **estado funcional sólido**, con autenticación real, perfiles operativos, envío de correos de verificación (Mailtrap) y una base técnica lista para producción futura.

---

## 2. Funcionalidades Implementadas (Checklist General)

### 🔐 Autenticación y Seguridad
* [x] Registro de empresa
* [x] Registro de usuario asociado a empresa
* [x] Login de empresa
* [x] Login de usuario
* [x] Autenticación con Laravel Sanctum
* [x] Protección de rutas con middleware
* [x] Manejo de tokens (logout, invalidación)

### 👤 Usuarios
* [x] Perfil de usuario
* [x] Edición de datos personales
* [x] Subida y actualización de avatar
* [x] Eliminación de cuenta
* [x] Asociación usuario ↔ empresa
* [x] Listado de usuarios por empresa
* [x] Cards de usuarios en dashboard empresa

### ✉️ Verificación por Correo
* [x] Generación de código de verificación
* [x] Envío de correo vía Mailtrap (local)
* [x] Modal para ingresar código
* [x] Validación de código
* [x] Estado `email_verified_at`
* [x] Botón dinámico “Verificar correo”

### 🏢 Empresas
* [x] Registro de empresa
* [x] Perfil de empresa (datos básicos)
* [x] Logo de empresa
* [x] Relación empresa ↔ usuarios
* [x] Edición avanzada de perfil de empresa

### 🎨 UI / UX
* [x] Layout general (Header / Footer)
* [x] Menú lateral dinámico (empresa / usuario)
* [x] Skeleton loaders
* [x] Formularios con validaciones visuales
* [x] Diseño responsive
* [x] Animaciones suaves

---

## 3. Funcionalidades Pendientes por Milestone

### 📦 Milestone 2 (cerrada)
* [x] Arquitectura base
* [x] Autenticación
* [x] Dashboard inicial
* [x] Perfil usuario
* [x] Perfil empresa básico

### 🚚 Milestone 3 (próxima)
* [x] CRUD completo de Servicios
* [x] Endpoint de servicios real
* [x] Cards de servicios dinámicas
* [x] Filtros conectados a backend
* [x] Detalle de servicio
* [x] Asociación servicio ↔ empresa
* [x] Estado del servicio (activo / pausado)
* [x] Migración Mailtrap → proveedor real (Resend, etc.)

### 🤝 Milestone 4 (futuro)
* [x] Solicitudes / contratos
* [x] Historial de servicios
* [x] Sistema de reputación real
* [ ] Notificaciones
* [ ] Panel administrativo

---

## 4. Avances Técnicos, Decisiones y Estado Actual del Proyecto

## Proyecto: Red Mudancera

### 4.1 Resumen General
Hasta la milestone actual se construyó un **MVP robusto**, funcional tanto en backend como frontend, que incluye:
* Autenticación real
* Gestión de usuarios
* Perfil de usuario y empresa
* Envío de correos (entorno local)
* UI profesional y escalable

El sistema ya **no es un prototipo**, sino una base lista para crecer funcionalmente.

---

## 5. Backend – Laravel (Estado Actual)

### ✔️ Arquitectura modular
Módulos implementados:
* `Empresa`
* `Usuario`

Cada módulo contiene:
* Controllers
* Models
* Requests
* Rutas independientes

Esto permite escalar sin acoplamientos.

### ✔️ Autenticación
* Laravel Sanctum configurado
* Tokens funcionales
* Middleware `auth:sanctum`
* Separación clara empresa / usuario

### ✔️ Base de dato
Tablas activas:
* empresas
* usuarios
* password_resets
* personal_access_tokens

Campos relevantes:
* avatar
* email_verified_at
* empresa_id

---

## 6. Frontend – Next.js (Estado Actual)

### ✔️ App Router
Rutas activas:
* `/empresa/*`
* `/usuario/*`
* `/login`
* `/register`

### ✔️ Comunicación Front ↔ Back
* Fetch directo a API
* Manejo de tokens por cookies
* Protección de rutas

### ✔️ Componentización
* Componentes reutilizables
* Separación por dominio
* Estilos SCSS por módulo

---

## 7. UI / UX Implementado
* Skeleton loaders
* Modales
* Estados dinámicos
* Botones reutilizables
* Feedback visual

---

## 8. Qué está listo para producción futura
* Arquitectura
* Seguridad
* Autenticación
* Escalabilidad
* Base de datos
* Envío de correos (pendiente proveedor real)

---

## 9. Recomendaciones para la Siguiente Milestone
1. Implementar **Servicios** como nuevo módulo
2. Mantener contratos API claros
3. No romper estructura modular
4. Migrar Mailtrap en Milestone 03
5. Definir reglas de visibilidad de servicios

---

## 10. Objetivo de este documento
Este documento sirve como:
* 📌 Punto de referencia técnico
* 🧭 Guía para la siguiente milestone
* 🤝 Contexto compartido entre chats

Permite retomar el desarrollo sin pérdida de contexto ni decisiones técnicas.

---

**Estado actual:** sólido, estable y listo para crecer 🚀

## Estrucrura de carpetas
├── 📁 backend
│   ├── 📁 __borrar__
│   │   └── 🐘 app.php
│   ├── 📁 app
│   │   ├── 📁 Console
│   │   │   ├── 📁 Commands
│   │   │   │   ├── 🐘 CheckServiciosPorVencer.php
│   │   │   │   ├── 🐘 CleanEmailVerifications.php
│   │   │   │   └── 🐘 SendDailyServiceViewsSummary.php
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Http
│   │   │   ├── 📁 Controllers
│   │   │   │   ├── 📁 Auth
│   │   │   │   │   └── 🐘 RecoverPasswordController.php
│   │   │   │   └── 🐘 Controller.php
│   │   │   ├── 📁 Middleware
│   │   │   │   ├── 🐘 Authenticate.php
│   │   │   │   └── 🐘 RedirectIfAuthenticated.php
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Jobs
│   │   │   └── 🐘 SendNotificationEmailJob.php
│   │   ├── 📁 Mail
│   │   │   └── 🐘 RecoverPasswordMail.php
│   │   ├── 📁 Models
│   │   │   ├── 🐘 EmailVerification.php
│   │   │   └── 🐘 User.php
│   │   ├── 📁 Modules
│   │   │   ├── 📁 Auth
│   │   │   ├── 📁 Empresa
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   ├── 🐘 EmpresaAuthController.php
│   │   │   │   │   ├── 🐘 EmpresaController.php
│   │   │   │   │   └── 🐘 EmpresaPublicController.php
│   │   │   │   ├── 📁 Mail
│   │   │   │   │   ├── 🐘 EmpresaGoodbyeMail.php
│   │   │   │   │   ├── 🐘 EmpresaVerificationCode.php
│   │   │   │   │   └── 🐘 EmpresaWelcomeMail.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   └── 🐘 Empresa.php
│   │   │   │   ├── 📁 Repositories
│   │   │   │   ├── 📁 Requests
│   │   │   │   │   ├── 🐘 EmpresaUpdateRequest.php
│   │   │   │   │   ├── 🐘 LoginEmpresaRequest.php
│   │   │   │   │   └── 🐘 RegisterEmpresaRequest.php
│   │   │   │   ├── 📁 Services
│   │   │   │   │   └── 🐘 EmpresaService.php
│   │   │   │   └── 🐘 routes.php
│   │   │   ├── 📁 Notificacion
│   │   │   │   ├── 📁 Channels
│   │   │   │   │   ├── 🐘 DatabaseChannel.php
│   │   │   │   │   ├── 🐘 EmailChannel.php
│   │   │   │   │   ├── 🐘 NotificationChannelInterface.php
│   │   │   │   │   └── 🐘 PushChannel.php
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   └── 🐘 NotificacionController.php
│   │   │   │   ├── 📁 Events
│   │   │   │   │   ├── 🐘 BaseNotificationEvent.php
│   │   │   │   │   ├── 🐘 LoginEmpresaEvent.php
│   │   │   │   │   ├── 🐘 ServicioAsignadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioFinalizadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioPorVencerEvent.php
│   │   │   │   │   ├── 🐘 ServicioPublicadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioVistoEvent.php
│   │   │   │   │   └── 🐘 ServiciosCreadosMesEvent.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 Notificacion.php
│   │   │   │   │   ├── 🐘 NotificacionUsuario.php
│   │   │   │   │   ├── 🐘 NotificationMetric.php
│   │   │   │   │   └── 🐘 NotificationPreference.php
│   │   │   │   ├── 📁 Services
│   │   │   │   │   ├── 🐘 NotificacionService.php
│   │   │   │   │   └── 🐘 NotificationDispatcher.php
│   │   │   │   └── 🐘 routes.php
│   │   │   ├── 📁 Resena
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   └── 🐘 ResenaController.php
│   │   │   │   ├── 📁 Mail
│   │   │   │   │   └── 🐘 NuevaResenaMail.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 ResenaLink.php
│   │   │   │   │   └── 🐘 resena.php
│   │   │   │   ├── 📁 Repositories
│   │   │   │   ├── 📁 Request
│   │   │   │   ├── 📁 Services
│   │   │   │   └── 🐘 routes.php
│   │   │   ├── 📁 Servicio
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   └── 🐘 ServicioController.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 ServiceView.php
│   │   │   │   │   ├── 🐘 Servicio.php
│   │   │   │   │   └── 🐘 ServicioImagen.php
│   │   │   │   ├── 📁 Repositories
│   │   │   │   │   └── 🐘 ServicioRepository.php
│   │   │   │   ├── 📁 Requests
│   │   │   │   │   ├── 🐘 ChangeEstadoServicioRequest.php
│   │   │   │   │   ├── 🐘 StoreServicioRequest.php
│   │   │   │   │   └── 🐘 UpdateServicioRequest.php
│   │   │   │   ├── 📁 Services
│   │   │   │   │   ├── 🐘 ServicioImagenService.php
│   │   │   │   │   └── 🐘 ServicioService.php
│   │   │   │   └── 🐘 routes.php
│   │   │   └── 📁 Usuario
│   │   │       ├── 📁 Controllers
│   │   │       │   ├── 🐘 UsuarioAuthController.php
│   │   │       │   └── 🐘 UsuarioController.php
│   │   │       ├── 📁 Mail
│   │   │       │   ├── 🐘 UsuarioGoodbyeMail.php
│   │   │       │   ├── 🐘 UsuarioVerificationCode.php
│   │   │       │   └── 🐘 UsuarioWelcomeMail.php
│   │   │       ├── 📁 Models
│   │   │       │   └── 🐘 Usuario.php
│   │   │       ├── 📁 Repositories
│   │   │       ├── 📁 Requests
│   │   │       │   ├── 🐘 UsuarioLoginRequest.php
│   │   │       │   ├── 🐘 UsuarioRegisterRequest.php
│   │   │       │   ├── 🐘 UsuarioUpdateRequest.php
│   │   │       │   └── 🐘 UsuarioVerifyEmailRequest.php
│   │   │       └── 🐘 routes.php
│   │   ├── 📁 Providers
│   │   │   ├── 🐘 AppServiceProvider.php
│   │   │   └── 🐘 RouteServiceProvider.php
│   │   └── 📁 Services
│   │       ├── 📁 Google
│   │       │   └── 🐘 GoogleDistanceService.php
│   │       └── 🐘 CloudinaryService.php
│   ├── 📁 bootstrap
│   │   ├── 🐘 app.php
│   │   └── 🐘 providers.php
│   ├── 📁 config
│   │   ├── 🐘 app.php
│   │   ├── 🐘 auth.php
│   │   ├── 🐘 cache.php
│   │   ├── 🐘 cors.php
│   │   ├── 🐘 database.php
│   │   ├── 🐘 filesystems.php
│   │   ├── 🐘 logging.php
│   │   ├── 🐘 mail.php
│   │   ├── 🐘 queue.php
│   │   ├── 🐘 sanctum.php
│   │   ├── 🐘 services.php
│   │   └── 🐘 session.php
│   ├── 📁 database
│   │   ├── 📁 factories
│   │   │   └── 🐘 UserFactory.php
│   │   ├── 📁 migrations
│   │   │   ├── 🐘 0001_01_01_000001_create_cache_table.php
│   │   │   ├── 🐘 2025_11_26_072955_create_personal_access_tokens_table.php
│   │   │   ├── 🐘 2025_11_26_074631_create_empresas_table.php
│   │   │   ├── 🐘 2025_11_26_074711_create_usuarios_table.php
│   │   │   ├── 🐘 2025_12_07_052204_create_email_verifications_table.php
│   │   │   ├── 🐘 2025_12_16_064630_create_servicios_table.php
│   │   │   ├── 🐘 2026_01_06_051311_create_resenas_table.php
│   │   │   ├── 🐘 2026_01_06_051525_create_resena_links_table.php
│   │   │   ├── 🐘 2026_01_18_082815_add_response_fields_to_resena_links.php
│   │   │   ├── 🐘 2026_01_20_042024_add_distancia_km_to_servicios_table.php
│   │   │   ├── 🐘 2026_01_25_075637_add_ganancia_to_servicios_table.php
│   │   │   ├── 🐘 2026_01_28_062726_add_estado_carga_to_servicios.php
│   │   │   ├── 🐘 2026_02_01_064840_create_servicio_imagenes_table.php
│   │   │   ├── 🐘 2026_02_08_075259_create_notificaciones_table.php
│   │   │   ├── 🐘 2026_02_08_075522_create_notificacion_usuario_table.php
│   │   │   ├── 🐘 2026_02_08_100224_add_leida_empresa_to_notificaciones_table.php
│   │   │   ├── 🐘 2026_02_13_052004_create_jobs_table.php
│   │   │   ├── 🐘 2026_02_13_054109_create_service_views_table.php
│   │   │   ├── 🐘 2026_02_14_054657_add_expiration_notified_to_servicios_table.php
│   │   │   ├── 🐘 2026_02_15_194227_create_notification_preferences_table.php
│   │   │   └── 🐘 2026_02_16_230425_create_notification_metrics_table.php
│   │   ├── 📁 seeders
│   │   │   └── 🐘 DatabaseSeeder.php
│   │   └── ⚙️ .gitignore
│   ├── 📁 public
│   │   ├── ⚙️ .htaccess
│   │   ├── 📄 favicon.ico
│   │   ├── 🐘 index.php
│   │   └── 📄 robots.txt
│   ├── 📁 resources
│   │   ├── 📁 css
│   │   │   └── 🎨 app.css
│   │   ├── 📁 js
│   │   │   ├── 📄 app.js
│   │   │   └── 📄 bootstrap.js
│   │   └── 📁 views
│   │       ├── 📁 emails
│   │       │   ├── 🐘 empresa_goodbye.blade.php
│   │       │   ├── 🐘 empresa_verification_code.blade.php
│   │       │   ├── 🐘 empresa_welcome.blade.php
│   │       │   ├── 🐘 nueva-resena.blade.php
│   │       │   ├── 🐘 recover_password.blade.php
│   │       │   ├── 🐘 usuario_goodbye.blade.php
│   │       │   ├── 🐘 usuario_verification_code.blade.php
│   │       │   ├── 🐘 usuario_welcome.blade.php
│   │       │   └── 🐘 verification_code.blade.php
│   │       ├── 📁 pdf
│   │       │   └── 🐘 reporte-mensual.blade.php
│   │       └── 🐘 welcome.blade.php
│   ├── 📁 routes
│   │   ├── 🐘 api.php
│   │   ├── 🐘 console.php
│   │   └── 🐘 web.php
│   ├── 📁 storage
│   │   ├── 📁 app
│   │   │   ├── 📁 private
│   │   │   │   └── ⚙️ .gitignore
│   │   │   └── ⚙️ .gitignore
│   │   └── 📁 framework
│   │       ├── 📁 testing
│   │       │   └── ⚙️ .gitignore
│   │       └── ⚙️ .gitignore
│   ├── 📁 tests
│   │   ├── 📁 Feature
│   │   │   └── 🐘 ExampleTest.php
│   │   ├── 📁 Unit
│   │   │   └── 🐘 ExampleTest.php
│   │   └── 🐘 TestCase.php
│   ├── ⚙️ .editorconfig
│   ├── ⚙️ .gitattributes
│   ├── 📝 ENDPOINTS.md
│   ├── 📝 Structure.md
│   ├── 📄 artisan
│   ├── ⚙️ composer.json
│   ├── ⚙️ package.json
│   ├── ⚙️ phpunit.xml
│   ├── 📄 red_mudancera_dev
│   └── 📄 vite.config.js

Notas:
- Las rutas principales se cargan desde [backend/routes/api.php](backend/routes/api.php).
- Los módulos exponen sus rutas en sus respectivos `routes.php` (ej.: [backend/app/Modules/Empresa/routes.php](backend/app/Modules/Empresa/routes.php)).
- Controladores y modelos clave:
  - [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)
  - [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)
  - [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)
  - [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)
  - [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)
  - [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)

Recomendación rápida: mantener en cada módulo las carpetas Requests, Services y Repositories para separar validación, lógica de negocio y acceso a datos; así facilitar pruebas y escalabilidad.

├── 📁 frontend
│   ├── 📁 public
│   │   ├── 📁 icons
│   │   │   ├── 🖼️ borrar.png
│   │   │   ├── 🖼️ box.png
│   │   │   ├── 🖼️ busco.png
│   │   │   ├── 🖼️ busco_btn.png
│   │   │   ├── 🖼️ campana.png
│   │   │   ├── 🖼️ candado.png
│   │   │   ├── 🖼️ check.png
│   │   │   ├── 🖼️ cuenta.png
│   │   │   ├── 🖼️ default-user.png
│   │   │   ├── 🖼️ delete.png
│   │   │   ├── 🖼️ destino.png
│   │   │   ├── 🖼️ docs.png
│   │   │   ├── 🖼️ eraser.png
│   │   │   ├── 🖼️ eye.png
│   │   │   ├── 🖼️ eye_off.png
│   │   │   ├── 📄 favicon.ico
│   │   │   ├── 🖼️ filtrar.png
│   │   │   ├── 🖼️ help.png
│   │   │   ├── 🖼️ hogar.png
│   │   │   ├── 🖼️ hogar_2.png
│   │   │   ├── 🖼️ logout.png
│   │   │   ├── 🖼️ lupa.png
│   │   │   ├── 🖼️ mensaje.png
│   │   │   ├── 🖼️ menu.png
│   │   │   ├── 🖼️ ofrezco.png
│   │   │   ├── 🖼️ ofrezco_btn.png
│   │   │   ├── 🖼️ ojo.png
│   │   │   ├── 🖼️ pause.png
│   │   │   ├── 🖼️ place-marker.png
│   │   │   ├── 🖼️ play.png
│   │   │   ├── 🖼️ share.png
│   │   │   ├── 🖼️ team.png
│   │   │   ├── 🖼️ telefono.png
│   │   │   ├── 🖼️ todo.png
│   │   │   ├── 🖼️ todos.png
│   │   │   ├── 🖼️ truck.png
│   │   │   ├── 🖼️ user-placeholder.png
│   │   │   └── 🖼️ whatsapp.png
│   │   ├── 📁 logo
│   │   │   ├── 🖼️ Logo2.png
│   │   │   ├── 🖼️ Mikkel.png
│   │   │   ├── 🖼️ logo.png
│   │   │   └── 🖼️ logo3.png
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ icon.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── 📁 src
│   │   ├── 📁 app
│   │   │   ├── 📁 empresa
│   │   │   │   ├── 📁 [id]
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 cargas
│   │   │   │   │   ├── 📁 busco
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 ofrezco
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 confirmacion
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 dashboard
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 empresas
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 login
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 logout
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 notificaciones
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 perfil
│   │   │   │   │   ├── 📁 editar
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 publicaciones
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 register
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   └── 📁 usuarios
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 resena
│   │   │   │   └── 📁 [token]
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 servicios
│   │   │   │   └── 📁 [id]
│   │   │   │       ├── 📁 editar
│   │   │   │       │   ├── 📁 busco
│   │   │   │       │   │   └── 📄 page.jsx
│   │   │   │       │   └── 📁 ofrezco
│   │   │   │       │       └── 📄 page.jsx
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 usuario
│   │   │   │   ├── 📁 dashboard
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 login
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 logout
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 notificaciones
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   └── 📁 perfil
│   │   │   │       ├── 📁 editar
│   │   │   │       │   └── 📄 page.jsx
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📄 error.jsx
│   │   │   ├── 📄 favicon.ico
│   │   │   ├── 🎨 globals.css
│   │   │   ├── 📄 layout.js
│   │   │   ├── 📄 page.js
│   │   │   └── 🎨 page.module.css
│   │   ├── 📁 components
│   │   │   ├── 📁 cards
│   │   │   │   ├── 📄 ActionCard.jsx
│   │   │   │   ├── 📄 AcuerdoCard.jsx
│   │   │   │   ├── 📄 EmpresaCard.jsx
│   │   │   │   ├── 📄 NotificationCard.jsx
│   │   │   │   ├── 📄 ReviewCard.jsx
│   │   │   │   ├── 📄 ServiceCard.jsx
│   │   │   │   └── 📄 UserCard.jsx
│   │   │   ├── 📁 common
│   │   │   │   ├── 📄 Button_crud.jsx
│   │   │   │   ├── 📄 Button_cta.jsx
│   │   │   │   ├── 📄 Button_error.jsx
│   │   │   │   ├── 📄 Button_success.jsx
│   │   │   │   ├── 📄 ConfirmDeleteModal.jsx
│   │   │   │   ├── 📄 ErrorModal.jsx
│   │   │   │   ├── 📄 Input.jsx
│   │   │   │   ├── 📄 NotificationBadge.jsx
│   │   │   │   ├── 📄 SearchBar.jsx
│   │   │   │   ├── 📄 ServiceStatusDropdown.jsx
│   │   │   │   └── 📄 SimpleEditor.jsx
│   │   │   ├── 📁 filters
│   │   │   │   ├── 📄 ServiceAdvancedFilters.jsx
│   │   │   │   └── 📄 ServiceFilters.jsx
│   │   │   ├── 📁 layout
│   │   │   │   ├── 📄 Footer.jsx
│   │   │   │   ├── 📄 Header.jsx
│   │   │   │   ├── 📄 SideMenu.jsx
│   │   │   │   └── 📄 SideMenuUsuario.jsx
│   │   │   ├── 📁 modals
│   │   │   │   ├── 📄 BaseModal.jsx
│   │   │   │   ├── 📄 ConfirmDeleteNotificationModal.jsx
│   │   │   │   ├── 📄 ConfirmFinalizarServicioModal.jsx
│   │   │   │   ├── 📄 ConfirmRecoverModal.jsx
│   │   │   │   ├── 📄 FinalizarServicioGananciaModal.jsx
│   │   │   │   ├── 📄 MessageModal.jsx
│   │   │   │   ├── 📄 RecoverPasswordModal.jsx
│   │   │   │   ├── 📄 ReporteMensualModal.jsx
│   │   │   │   └── 📄 ShareReviewLinkModal.jsx
│   │   │   ├── 📁 skeletons
│   │   │   │   ├── 📄 ProfileSkeleton.jsx
│   │   │   │   ├── 📄 ServiceCardSkeleton.jsx
│   │   │   │   └── 📄 UserCardSkeleton.jsx
│   │   │   └── 📁 ui
│   │   │       └── 📄 LoadingOverlay.jsx
│   │   ├── 📁 hooks
│   │   │   ├── 📄 useClickOutside.js
│   │   │   ├── 📄 useGooglePlaces.js
│   │   │   └── 📄 useServicios.js
│   │   ├── 📁 modules
│   │   ├── 📁 services
│   │   ├── 📁 store
│   │   │   └── 📄 searchContext.js
│   │   ├── 📁 styles
│   │   │   ├── 📁 components
│   │   │   │   ├── 🎨 __notificationBadge.scss
│   │   │   │   ├── 🎨 __simpleEditor.scss
│   │   │   │   ├── 🎨 _actionCard.scss
│   │   │   │   ├── 🎨 _acuerdoCard.scss
│   │   │   │   ├── 🎨 _buttons.scss
│   │   │   │   ├── 🎨 _cards.scss
│   │   │   │   ├── 🎨 _confirmDeleteModal.scss
│   │   │   │   ├── 🎨 _empresaCard.scss
│   │   │   │   ├── 🎨 _inputs.scss
│   │   │   │   ├── 🎨 _loadingOverlay.scss
│   │   │   │   ├── 🎨 _modal.scss
│   │   │   │   ├── 🎨 _notificationCard.scss
│   │   │   │   ├── 🎨 _reviewCard.scss
│   │   │   │   ├── 🎨 _searchBar.scss
│   │   │   │   ├── 🎨 _serviceAdvancedFilters.scss
│   │   │   │   ├── 🎨 _serviceCard.scss
│   │   │   │   ├── 🎨 _serviceFilters.scss
│   │   │   │   ├── 🎨 _serviceStatusDropdown.scss
│   │   │   │   └── 🎨 _userCard.scss
│   │   │   ├── 📁 layout
│   │   │   │   ├── 🎨 _footer.scss
│   │   │   │   ├── 🎨 _header.scss
│   │   │   │   └── 🎨 _sideMenu.scss
│   │   │   ├── 📁 pages
│   │   │   │   ├── 📁 empresa
│   │   │   │   │   ├── 🎨 __empresaNotificaciones.scss
│   │   │   │   │   ├── 🎨 _empresaBusco.scss
│   │   │   │   │   ├── 🎨 _empresaCargas.scss
│   │   │   │   │   ├── 🎨 _empresaDashboard.scss
│   │   │   │   │   ├── 🎨 _empresaEditar.scss
│   │   │   │   │   ├── 🎨 _empresaEmpresas.scss
│   │   │   │   │   ├── 🎨 _empresaLogin.scss
│   │   │   │   │   ├── 🎨 _empresaOfrezco.scss
│   │   │   │   │   ├── 🎨 _empresaPerfil.scss
│   │   │   │   │   ├── 🎨 _empresaRegister.scss
│   │   │   │   │   └── 🎨 _empresaUsuarios.scss
│   │   │   │   ├── 📁 resena
│   │   │   │   │   └── 🎨 _resena.scss
│   │   │   │   ├── 📁 servicios
│   │   │   │   │   ├── 🎨 _detallesServicio.scss
│   │   │   │   │   └── 🎨 _eliminarServicio.scss
│   │   │   │   ├── 📁 usuario
│   │   │   │   │   ├── 🎨 _usuarioEditar.scss
│   │   │   │   │   ├── 🎨 _usuarioLogin.scss
│   │   │   │   │   ├── 🎨 _usuarioNotificaciones.scss
│   │   │   │   │   └── 🎨 _usuarioPerfil.scss
│   │   │   │   └── 🎨 _error.scss
│   │   │   ├── 📁 utils
│   │   │   │   ├── 🎨 _containers.scss
│   │   │   │   ├── 🎨 _mixins.scss
│   │   │   │   └── 🎨 _variables.scss
│   │   │   └── 🎨 globals.scss
│   │   └── 📁 utils
│   │       ├── 📄 auth.js
│   │       ├── 📄 cloudinaryUpload.js
│   │       └── 📄 whatsapp.js
│   ├── 📝 carpetas.md
│   ├── 📄 eslint.config.mjs
│   ├── ⚙️ jsconfig.json
│   ├── 📄 next.config.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
├── ⚙️ .gitignore
├── 📝 Milestones_Avance.md
└── 📝 README.md

Archivos clave / puntos de entrada:
- Layout app: [`frontend/src/app/layout.js`](frontend/src/app/layout.js)
- Página principal: [`frontend/src/app/page.js`](frontend/src/app/page.js)
- Header: [`frontend/src/components/layout/Header.jsx`](frontend/src/components/layout/Header.jsx)
- ServiceCard: [`frontend/src/components/cards/ServiceCard.jsx`](frontend/src/components/cards/ServiceCard.jsx)
- API wrapper: [`frontend/src/services/api.js`](frontend/src/services/api.js)

## Endpoints
# 📋 Red Mudancera - Endpoints API

## 🏢 Empresa — Públicos

| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
POST	/api/empresa/register	EmpresaAuthController::register	routes.php
POST	/api/empresa/login	EmpresaAuthController::login	routes.php
POST	/api/empresa/send-verification	EmpresaAuthController::sendVerificationCode	routes.php
POST	/api/empresa/verify-code	EmpresaAuthController::verifyCode	routes.php
GET	/api/empresa/empresas/{id}	EmpresaPublicController::show	routes.php
GET	/api/empresa/empresas	EmpresaPublicController::index	routes.php


## 🏢 Empresa — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/empresa/me	EmpresaController::me	routes.php
PUT	/api/empresa/update	EmpresaController::update	routes.php
DELETE	/api/empresa/delete	EmpresaController::destroy	routes.php
GET	/api/empresa/usuarios	EmpresaController::usuariosEmpresa	routes.php
DELETE	/api/empresa/usuario/{id}	EmpresaController::eliminarUsuario	routes.php
PATCH	/api/empresa/usuario/{id}/pausar	EmpresaController::pausarUsuario	routes.php
PATCH	/api/empresa/usuario/{id}/reanudar	EmpresaController::reanudarUsuario	routes.php
GET	/api/empresa/servicios	ServicioController::misServicios	routes.php

## Usuario — Públicos
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
POST	/api/usuario/register	UsuarioAuthController::register	routes.php
POST	/api/usuario/login	UsuarioAuthController::login	routes.php
POST	/api/usuario/send-verification-code	UsuarioAuthController::sendVerificationCode	routes.php
POST	/api/usuario/verify-code	UsuarioAuthController::verifyCode	routes.php

## Usuario — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/usuario/me	UsuarioController::me	routes.php
PUT	/api/usuario/update	UsuarioController::update	routes.php
DELETE	/api/usuario/delete	UsuarioController::destroy	routes.php
GET	/api/usuario/mis-usuarios	UsuarioController::listByEmpresa	routes.php

## Servicios — Públicos
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/servicios	ServicioController::index	routes.php
GET	/api/servicios/{id}	ServicioController::show	routes.php
GET	/api/servicios/reporte/mensual/pdf	ServicioController::reporteMensualPdf	routes.php

## Servicios — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
POST	/api/servicios	ServicioController::store	routes.php
PATCH	/api/servicios/{id}	ServicioController::update	routes.php
PATCH	/api/servicios/{id}/estado	ServicioController::changeEstado	routes.php
DELETE	/api/servicios/{id}	ServicioController::destroy	routes.php
POST	/api/servicios/{id}/finalizar	ServicioController::finalizar	routes.php
GET	/api/servicios/reporte/mensual	ServicioController::reporteMensual	routes.php
POST	/api/servicios/{id}/imagenes	ServicioController::updateImagenes	api.php

## Reseñas — Públicos
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/resenas/link/{token}	ResenaController::validarLink	routes.php
GET	/api/empresas/{empresaId}/resenas	ResenaController::listar	routes.php

## Reseñas — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
POST	/api/empresa/resenas/link	ResenaController::generarLink	routes.php
POST	/api/resenas/{token}	ResenaController::store	routes.php

## Notificaciones — Empresa — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/empresa/notificaciones	NotificacionController::indexEmpresa	routes.php
GET	/api/empresa/notificaciones/count	NotificacionController::countEmpresa	routes.php
PATCH	/api/empresa/notificaciones/marcar-todas	NotificacionController::marcarTodasLeidasEmpresa	routes.php
DELETE	/api/empresa/notificaciones/eliminar-leidas	NotificacionController::eliminarTodasLeidasEmpresa	routes.php
PATCH	/api/empresa/notificaciones/{id}/leer	NotificacionController::marcarLeidaEmpresa	routes.php
DELETE	/api/empresa/notificaciones/{id}	NotificacionController::eliminarEmpresa	routes.php

## Notificaciones — Usuario — Protegidos (auth:sanctum)
| Método | Ruta | Controlador | Archivo |
|--------|------|-------------|---------|
GET	/api/usuario/notificaciones	NotificacionController::indexUsuario	routes.php
GET	/api/usuario/notificaciones/count	NotificacionController::countUsuario	routes.php
PATCH	/api/usuario/notificaciones/marcar-todas	NotificacionController::marcarTodasLeidasUsuario	routes.php
DELETE	/api/usuario/notificaciones/eliminar-leidas	NotificacionController::eliminarTodasLeidasUsuario	routes.php
PATCH	/api/usuario/notificaciones/{id}/leer	NotificacionController::marcarLeidaUsuario	routes.php
DELETE	/api/usuario/notificaciones/{id}	NotificacionController::eliminarUsuario	routes.php

## Otros (Recuperación de Contraseña)
Método	Ruta	Controlador	Archivo
POST	/api/auth/recover-password	RecoverPasswordController::recover	api.php

## Rutas Agrupadoras

- Archivo principal: [`backend/routes/api.php`](backend/routes/api.php)
- Módulo Reseñas: [`backend/app/Modules/Resena/routes.php`](backend/app/Modules/Resena/routes.php)

---

### Archivos relevantes:
Rutas Principales
Archivo principal: api.php
🏢 Empresa
Componente	Ubicación
Rutas	routes.php
Auth Controller	App\Modules\Empresa\Controllers\EmpresaAuthController
Controller	App\Modules\Empresa\Controllers\EmpresaController
Public Controller	App\Modules\Empresa\Controllers\EmpresaPublicController
Model	App\Modules\Empresa\Models\Empresa
Requests	Requests
Services	Services
👤 Usuario
Componente	Ubicación
Rutas	routes.php
Auth Controller	App\Modules\Usuario\Controllers\UsuarioAuthController
Controller	App\Modules\Usuario\Controllers\UsuarioController
Model	App\Modules\Usuario\Models\Usuario
Requests	Requests
📦 Servicio
Componente	Ubicación
Rutas	routes.php
Controller	App\Modules\Servicio\Controllers\ServicioController
Model	App\Modules\Servicio\Models\Servicio
Requests	Requests
Services	Services
Repository	App\Modules\Servicio\Repositories\ServicioRepository
⭐ Reseña
Componente	Ubicación
Rutas	routes.php
Controller	App\Modules\Resena\Controllers\ResenaController
Models	Models
🔔 Notificación
Componente	Ubicación
Rutas	routes.php
Controller	App\Modules\Notificacion\Controllers\NotificacionController
Events	Events
Services	Services
Models	Models
🔐 Autenticación
Componente	Ubicación
Config Auth	auth.php
Recover Password Controller	App\Http\Controllers\Auth\RecoverPasswordController
Sanctum Config	sanctum.php
🛠️ Servicios Globales
Servicio	Ubicación
Cloudinary Service	App\Services\CloudinaryService
Google Distance Service	App\Services\Google\GoogleDistanceService
Route Service Provider	App\Providers\RouteServiceProvider

/**
 * Guarda el token en localStorage
 */
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Obtiene el token del localStorage
 */
export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/**
 * Elimina el token
 */
export const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * Verifica si hay token válido
 */
export const isAuthenticated = () => {
  return !!getToken();
};

┌─────────────────────────────────────────────────────────┐
│                   USUARIO EN FRONTEND                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
            ┌──────────────────────────┐
            │  /register o /login      │
            │   (Formulario)           │
            └──────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │  POST /api/empresa/register        │
         │  POST /api/empresa/login           │
         │  (Credenciales)                    │
         └────────────────────────────────────┘
                          │
                          ▼
            ┌──────────────────────────┐
            │    BACKEND (Laravel)     │
            │  Valida credenciales     │
            │  Genera token Sanctum    │
            └──────────────────────────┘
                          │
                          ▼
      ┌────────────────────────────────────┐
      │  Respuesta: { token, empresa }     │
      └────────────────────────────────────┘
                          │
                          ▼
  ┌──────────────────────────────────────────────┐
  │  localStorage.setItem("token", data.token)   │
  │  localStorage.setItem("empresa", data.empresa)
  └──────────────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────┐
           │   Router.push("/dashboard")
           │   ✅ AUTENTICADO          │
           └──────────────────────────┘
                          │
                          ▼
  ┌──────────────────────────────────────────────┐
  │  En peticiones futuras:                      │
  │  Header: Authorization: Bearer {token}       │
  └──────────────────────────────────────────────┘