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
backend/
├── .editorconfig
├── .env
├── .env.example
├── .gitattributes
├── artisan
├── composer.json
├── composer.lock
├── package.json
├── phpunit.xml
├── red_mudancera_dev
├── Structure.md                     # (este archivo) [backend/Structure.md](backend/Structure.md)
├── vite.config.js
├── app/
│   ├── Console/
│   │   ├── Kernel.php               # [App\Console\Kernel](backend/app/Console/Kernel.php)
│   │   └── Commands/
│   ├── Http/
│   │   ├── Controllers/             # Controladores por módulo (ver enlaces abajo)
│   │   ├── Kernel.php               # [backend/app/Http/Kernel.php](backend/app/Http/Kernel.php)
│   │   └── Middleware/
│   │       └── Authenticate.php
│   ├── Mail/                        # Mails (ej.: EmpresaVerificationCode) [backend/resources/views/emails/empresa_verification_code.blade.php](backend/resources/views/emails/empresa_verification_code.blade.php)
│   ├── Models/                      # Modelos Eloquent globales
│   │   └── (Modelos Eloquent)
│   ├── Modules/                     # Arquitectura modular por dominios
│   │   ├── Empresa/
│   │   │   ├── Controllers/
│   │   │   │   ├── EmpresaAuthController.php  # [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)
│   │   │   │   └── EmpresaController.php      # [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)
│   │   │   ├── Models/
│   │   │   │   └── Empresa.php                  # [backend/app/Modules/Empresa/Models/Empresa.php](backend/app/Modules/Empresa/Models/Empresa.php)
│   │   │   ├── Requests/
│   │   │   ├── Services/                        # Lógica de negocio (si aplica)
│   │   │   ├── Repositories/                    # Acceso a datos (opcional)
│   │   │   └── routes.php                        # [backend/app/Modules/Empresa/routes.php](backend/app/Modules/Empresa/routes.php)
│   │   ├── Usuario/
│   │   │   ├── Controllers/
│   │   │   │   ├── UsuarioAuthController.php    # [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)
│   │   │   │   └── UsuarioController.php        # [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)
│   │   │   ├── Models/
│   │   │   │   └── Usuario.php                  # [backend/app/Modules/Usuario/Models/Usuario.php](backend/app/Modules/Usuario/Models/Usuario.php)
│   │   │   ├── Requests/
│   │   │   ├── Services/
│   │   │   └── routes.php                        # [backend/app/Modules/Usuario/routes.php](backend/app/Modules/Usuario/routes.php)
│   │   ├── Servicio/                              # Módulo Servicios (implementado)
│   │   │   ├── Controllers/
│   │   │   │   └── ServicioController.php        # [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)
│   │   │   ├── Models/
│   │   │   │   └── Servicio.php                  # [backend/app/Modules/Servicio/Models/Servicio.php](backend/app/Modules/Servicio/Models/Servicio.php)
│   │   │   ├── Requests/
│   │   │   ├── Services/
│   │   │   ├── Repositories/
│   │   │   └── routes.php                        # [backend/app/Modules/Servicio/routes.php](backend/app/Modules/Servicio/routes.php)
│   │   └── Resena/
│   │       ├── Controllers/
│   │       │   └── ResenaController.php         # [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)
│   │       ├── Models/
│   │       ├── Requests/
│   │       └── routes.php                        # [backend/app/Modules/Resena/routes.php](backend/app/Modules/Resena/routes.php)
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php              # [`App\Providers\RouteServiceProvider`](backend/app/Providers/RouteServiceProvider.php)
│
├── bootstrap/
│   ├── app.php                                   # [backend/bootstrap/app.php](backend/bootstrap/app.php)
│   └── cache/
│
├── config/
│   ├── app.php
│   ├── auth.php                                  # [backend/config/auth.php](backend/config/auth.php)
│   ├── cache.php
│   ├── cors.php                                  # [backend/config/cors.php](backend/config/cors.php)
│   ├── database.php
│   ├── filesystems.php                           # [backend/config/filesystems.php](backend/config/filesystems.php)
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php                               # [backend/config/sanctum.php](backend/config/sanctum.php)
│   └── session.php
│
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php   # [backend/database/migrations/0001_01_01_000001_create_cache_table.php](backend/database/migrations/0001_01_01_000001_create_cache_table.php)
│   │   ├── 2025_11_26_074631_create_empresas_table.php   # [backend/database/migrations/2025_11_26_074631_create_empresas_table.php](backend/database/migrations/2025_11_26_074631_create_empresas_table.php)
│   │   ├── 2025_11_26_074711_create_usuarios_table.php    # [backend/database/migrations/2025_11_26_074711_create_usuarios_table.php](backend/database/migrations/2025_11_26_074711_create_usuarios_table.php)
│   │   └── 2025_12_16_064630_create_servicios_table.php  # [backend/database/migrations/2025_12_16_064630_create_servicios_table.php](backend/database/migrations/2025_12_16_064630_create_servicios_table.php)
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── public/
│   ├── index.php                                   # [backend/public/index.php](backend/public/index.php)
│   └── storage/ (enlace simbólico → storage/app/public)
│
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js
│   └── views/
│       ├── welcome.blade.php                       # [backend/resources/views/welcome.blade.php](backend/resources/views/welcome.blade.php)
│       └── emails/
│           └── empresa_verification_code.blade.php # [backend/resources/views/emails/empresa_verification_code.blade.php](backend/resources/views/emails/empresa_verification_code.blade.php)
│
├── routes/
│   ├── api.php                                     # [backend/routes/api.php](backend/routes/api.php) (incluye módulos: Empresa, Usuario, Servicio, Resena)
│   └── web.php
│
├── storage/
│   ├── app/
│   ├── framework/
│   ├── logs/
│   └── public/
│
├── tests/
│   ├── Feature/
│   │   └── ExampleTest.php
│   └── TestCase.php
│
└── vendor/                                         # dependencias Composer

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

frontend/
├── 📄 .env.local
├── 📄 carpetas.md                      # (este archivo) [frontend/carpetas.md](frontend/carpetas.md)
├── 📄 eslint.config.mjs
├── 📄 jsconfig.json
├── 📄 next.config.js
├── 📄 package.json
├── 📁 .next/
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   ├── 📁 logo/
│   ├── next.svg
│   └── vercel.svg
│
└── 📁 src/                             # Código fuente de la aplicación
    ├── 📁 app/                         # Rutas y páginas (Next.js App Router)
    │   ├── 📁 dashboard/
    │   │   └── page.jsx
    │   ├── 📁 empresa/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   ├── 📁 publicaciones/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 servicios/               # Rutas públicas / detalles / edición
    │   │   ├── [id]/page.jsx
    │   │   └── [id]/editar/
    │   │       ├── ofrezco/page.jsx
    │   │       └── busco/page.jsx
    │   ├── 📁 test-ui/
    │   │   └── page.jsx
    │   ├── 📄 layout.js                 # [frontend/src/app/layout.js](frontend/src/app/layout.js)
    │   ├── 📄 page.js                   # [frontend/src/app/page.js](frontend/src/app/page.js)
    │   └── 📄 page.module.css
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx          # [`ServiceCard`](frontend/src/components/cards/ServiceCard.jsx)
    │   │   └── UserCard.jsx             # [`UserCard`](frontend/src/components/cards/UserCard.jsx)
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── Input.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── ConfirmDeleteModal.jsx   # [`ConfirmDeleteModal`](frontend/src/components/common/ConfirmDeleteModal.jsx)
    │   ├── 📁 filters/
    │   │   ├── ServiceFilters.jsx
    │   │   └── ServiceAdvancedFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx                # [`Footer`](frontend/src/components/layout/Footer.jsx)
    │   │   ├── Header.jsx                # [`Header`](frontend/src/components/layout/Header.jsx)
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   ├── 📁 modals/
    │   │   ├── ChangeServiceStatusModal.jsx  # [`ChangeServiceStatusModal`](frontend/src/components/modals/ChangeServiceStatusModal.jsx)
    │   │   └── ShareReviewLinkModal.jsx
    │   ├── 📁 skeletons/
    │   │   ├── ProfileSkeleton.jsx
    │   │   └── ServiceCardSkeleton.jsx
    │   └── 📁 ui/                       # Componentes UI adicionales (badges, loaders, etc.)
    │
    ├── 📁 hooks/                        # Custom React hooks
    │   └── useClickOutside.js           # [frontend/src/hooks/useClickOutside.js](frontend/src/hooks/useClickOutside.js)
    │
    ├── 📁 modules/                      # Módulos por funcionalidad (API wrappers organizados)
    │   ├── 📁 auth/
    │   │   └── auth.js
    │   ├── 📁 empresa/
    │   │   └── empresaService.js        # [frontend/src/modules/empresa/empresaService.js](frontend/src/modules/empresa/empresaService.js)
    │   ├── 📁 usuario/
    │   │   └── usuarioService.js
    │   └── 📁 servicios/
    │       └── serviciosService.js
    │
    ├── 📁 services/                     # API wrappers / fetch centralizado
    │   └── api.js                       # [frontend/src/services/api.js](frontend/src/services/api.js)
    │
    ├── 📁 store/                        # Estado global (opcional: Zustand / Redux)
    │   └── index.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── formatters.js
    │   ├── buildFileUrl.js              # [frontend/src/utils/buildFileUrl.js](frontend/src/utils/buildFileUrl.js)
    │   └── whatsapp.js                  # [frontend/src/utils/whatsapp.js](frontend/src/utils/whatsapp.js)
    │
    └── 📁 styles/                       # Estilos SCSS globales
        ├── 📁 components/
        │   ├── _buttons.scss
        │   ├── _cards.scss
        │   ├── _inputs.scss
        │   ├── _serviceCard.scss
        │   └── _serviceFilters.scss
        │
        ├── 📁 layout/
        │   ├── _footer.scss
        │   ├── _header.scss
        │   └── _sideMenu.scss
        │
        ├── 📁 pages/
        │   ├── 📁 empresa/
        │   │   ├── _empresaPerfil.scss
        │   │   ├── _empresaEditar.scss
        │   │   ├── _empresaUsuarios.scss
        │   │   └── _empresaDashboard.scss
        │   └── 📁 usuario/
        │       ├── _usuarioPerfil.scss
        │       ├── _usuarioEditar.scss
        │       └── _usuarioDashboard.scss
        │
        ├── 📁 utils/
        │   ├── _containers.scss
        │   ├── _mixins.scss
        │   └── _variables.scss
        │
        └── 📄 globals.scss               # [frontend/src/styles/globals.scss](frontend/src/styles/globals.scss)

Archivos clave / puntos de entrada:
- Layout app: [`frontend/src/app/layout.js`](frontend/src/app/layout.js)
- Página principal: [`frontend/src/app/page.js`](frontend/src/app/page.js)
- Header: [`frontend/src/components/layout/Header.jsx`](frontend/src/components/layout/Header.jsx)
- ServiceCard: [`frontend/src/components/cards/ServiceCard.jsx`](frontend/src/components/cards/ServiceCard.jsx)
- API wrapper: [`frontend/src/services/api.js`](frontend/src/services/api.js)

## Endpoints
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

---

### Archivos relevantes:
Rutas principales: api.php
Empresa: routes.php, App\Modules\Empresa\Controllers\EmpresaAuthController, App\Modules\Empresa\Controllers\EmpresaController
Usuario: routes.php, App\Modules\Usuario\Controllers\UsuarioAuthController, App\Modules\Usuario\Controllers\UsuarioController
Servicio: routes.php, App\Modules\Servicio\Controllers\ServicioAuthController, App\Modules\Servicio\Controllers\ServicioController

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