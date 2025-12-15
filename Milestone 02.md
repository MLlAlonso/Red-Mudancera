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
* [ ] Edición avanzada de perfil de empresa

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
* [ ] CRUD completo de Servicios
* [ ] Endpoint de servicios real
* [ ] Cards de servicios dinámicas
* [ ] Filtros conectados a backend
* [ ] Detalle de servicio
* [ ] Asociación servicio ↔ empresa
* [ ] Estado del servicio (activo / pausado)
* [ ] Migración Mailtrap → proveedor real (Resend, etc.)

### 🤝 Milestone 4 (futuro)
* [ ] Solicitudes / contratos
* [ ] Historial de servicios
* [ ] Sistema de reputación real
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
├── 📄 .editorconfig
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitattributes
├── 📄 artisan                          # CLI de Laravel
├── 📄 composer.json                    # Dependencias PHP
├── 📄 composer.lock
├── 📄 package.json                     # Dependencias Node.js
├── 📄 package-lock.json
├── 📄 phpunit.xml                      # Configuración de tests
├── 📄 README.md
├── 📄 Structure.md                     # Documentación de estructura (este archivo)
├── 📄 red_mudancera_dev
├── 📄 vite.config.js                   # Configuración de Vite
│
├── 📁 app/                             # Código principal de la aplicación
│   ├── 📁 Console/
│   │   ├── Kernel.php                  # Scheduler / comandos (ver [`App\Console\Kernel`](backend/app/Console/Kernel.php))
│   │   └── 📁 Commands/                 # Comandos artisan custom
│   ├── 📁 Http/
│   │   ├── Kernel.php                  # Middleware HTTP
│   │   └── 📁 Middleware/
│   │       └── Authenticate.php        # Middleware de autenticación
│   ├── 📁 Mail/                         # Mails (p.ej. EmpresaVerificationCode)
│   ├── 📁 Models/
│   ├── 📁 Modules/                      # Módulos funcionales (modular architecture)
│   │   ├── 📁 Empresa/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── EmpresaAuthController.php
│   │   │   │   └── EmpresaController.php  # API: me, update, usuarios, etc. (ver [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php))
│   │   │   ├── 📁 Models/
│   │   │   │   └── Empresa.php
│   │   │   ├── 📁 Requests/
│   │   │   │   └── EmpresaUpdateRequest.php (validaciones)
│   │   │   └── routes.php               # Rutas del módulo (ver [backend/app/Modules/Empresa/routes.php](backend/app/Modules/Empresa/routes.php))
│   │   └── 📁 Usuario/
│   │       ├── 📁 Controllers/
│   │       │   ├── UsuarioAuthController.php
│   │       │   └── UsuarioController.php
│   │       ├── 📁 Models/
│   │       │   └── Usuario.php
│   │       ├── 📁 Requests/
│   │       │   ├── RegisterUsuarioRequest.php
│   │       │   ├── LoginUsuarioRequest.php
│   │       │   └── UsuarioUpdateRequest.php
│   │       └── routes.php
│   └── 📁 Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php     # Registro de rutas (ver [`App\Providers\RouteServiceProvider`](backend/app/Providers/RouteServiceProvider.php))
│
├── 📁 bootstrap/
│   ├── app.php                         # Bootstrapping de la aplicación (ver [backend/bootstrap/app.php](backend/bootstrap/app.php))
│   ├── providers.php                   # Registro de providers
│   └── 📁 cache/
│
├── 📁 config/
│   ├── app.php
│   ├── auth.php                        # Autenticación (Sanctum + guards) (ver [backend/config/auth.php](backend/config/auth.php))
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php                 # Disks + links (ver [backend/config/filesystems.php](backend/config/filesystems.php))
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php                     # Configuración de API tokens (ver [backend/config/sanctum.php](backend/config/sanctum.php))
│   ├── services.php
│   ├── cors.php                        # CORS (ver [backend/config/cors.php](backend/config/cors.php))
│   └── session.php                     # Session cookie, path, domain (ver [backend/config/session.php](backend/config/session.php))
│
├── 📁 database/
│   ├── 📁 migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 2025_11_26_074631_create_empresas_table.php
│   │   └── 2025_11_26_074711_create_usuarios_table.php
│   └── 📁 seeders/
│       └── DatabaseSeeder.php
│
├── 📁 public/
│   ├── index.php                       # Punto de entrada (ver [backend/public/index.php](backend/public/index.php))
│   └── storage/ (enlace simbólico)     # link -> storage/app/public
│
├── 📁 resources/
│   ├── 📁 css/
│   │   └── app.css                     # Tailwind / estilos
│   ├── 📁 js/
│   │   └── app.js
│   └── 📁 views/
│       └── welcome.blade.php
│
├── 📁 routes/
│   ├── api.php                         # Rutas API (incluye módulos) (ver [backend/routes/api.php](backend/routes/api.php))
│   ├── web.php                         # Rutas web
│   └── console.php                     # Comandos Artisan
│
├── 📁 storage/
│   ├── 📁 app/
│   ├── 📁 framework/
│   ├── 📁 logs/
│   └── 📁 public/
│
├── 📁 tests/
│   ├── 📁 Feature/
│   │   └── ExampleTest.php
│   └── TestCase.php
│
└── 📁 vendor/                          # Dependencias Composer

frontend/
├── 📄 .eslintrc.mjs                    # Configuración ESLint
├── 📄 .gitignore
├── 📄 eslint.config.mjs                # Configuración ESLint (mejorado)
├── 📄 jsconfig.json                    # Configuración JavaScript
├── 📄 next.config.js                   # Configuración Next.js
├── 📄 package.json                     # Dependencias Node.js
├── 📄 package-lock.json
├── 📄 carpetas.md                      # Documentación de estructura (este archivo)
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   │   ├── hogar_2.png
│   │   ├── menu.png
│   │   └── ...                         # iconos de UI
│   ├── 📁 logo/
│   │   ├── logo.png
│   │   └── mikkel.png
│   ├── next.svg
│   └── vercel.svg
│
└── 📁 src/                             # Código fuente de la aplicación
    ├── 📁 app/                         # Rutas y páginas (Next.js App Router)
    │   ├── 📁 dashboard/               # Dashboards y páginas principales
    │   │   └── page.jsx
    │   ├── 📁 empresa/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 servicios/               # Rutas públicas / servicios (futuro)
    │   ├── 📁 test-ui/
    │   │   └── page.jsx
    │   ├── 📄 layout.js
    │   ├── 📄 page.js
    │   └── 📄 page.module.css
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx
    │   │   └── UserCard.jsx
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── Input.jsx
    │   │   └── SearchBar.jsx
    │   ├── 📁 filters/
    │   │   └── ServiceFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   └── 📁 ui/                       # Componentes UI adicionales (botones, badges, etc.)
    │
    ├── 📁 hooks/                        # Custom React hooks
    │   └── useClickOutside.js
    │
    ├── 📁 modules/                      # Módulos por funcionalidad (lógica agrupada)
    │   ├── 📁 auth/
    │   │   └── auth.js                  # (futuro) helpers de auth
    │   ├── 📁 empresa/
    │   │   └── empresaService.js
    │   ├── 📁 usuario/
    │   │   └── usuarioService.js
    │   └── 📁 servicios/
    │       └── serviciosService.js
    │
    ├── 📁 services/                     # API wrappers / fetch centralizado
    │   └── api.js                       # fetch wrapper + token handling
    │
    ├── 📁 store/                        # Estado global (ej.: Zustand / Redux)
    │   └── index.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── formatters.js
    │   └── buildFileUrl.js
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
        └── 📄 globals.scss

## Endpoints
### Empresa — públicos
POST /api/empresa/register → App\Modules\Empresa\Controllers\EmpresaAuthController
POST /api/empresa/login → App\Modules\Empresa\Controllers\EmpresaAuthController
POST /api/empresa/send-verification → App\Modules\Empresa\Controllers\EmpresaAuthController
POST /api/empresa/verify-code → App\Modules\Empresa\Controllers\EmpresaAuthController

### Empresa — protegidas (auth:sanctum)
GET /api/empresa/me → App\Modules\Empresa\Controllers\EmpresaController
PUT /api/empresa/update → App\Modules\Empresa\Controllers\EmpresaController
DELETE /api/empresa/delete → App\Modules\Empresa\Controllers\EmpresaController
GET /api/empresa/usuarios → App\Modules\Empresa\Controllers\EmpresaController
DELETE /api/empresa/usuario/{id} → App\Modules\Empresa\Controllers\EmpresaController
PATCH /api/empresa/usuario/{id}/pausar → App\Modules\Empresa\Controllers\EmpresaController
PATCH /api/empresa/usuario/{id}/reanudar → App\Modules\Empresa\Controllers\EmpresaController

### Usuario — públicos
POST /api/usuario/register → App\Modules\Usuario\Controllers\UsuarioAuthController
POST /api/usuario/login → App\Modules\Usuario\Controllers\UsuarioAuthController
POST /api/usuario/send-verification-code → App\Modules\Usuario\Controllers\UsuarioAuthController
POST /api/usuario/verify-code → App\Modules\Usuario\Controllers\UsuarioAuthController

### Usuario — protegidas (auth:sanctum)
GET /api/usuario/me → App\Modules\Usuario\Controllers\UsuarioController
PUT /api/usuario/update → App\Modules\Usuario\Controllers\UsuarioController
DELETE /api/usuario/delete → App\Modules\Usuario\Controllers\UsuarioController
GET /api/usuario/mis-usuarios → App\Modules\Usuario\Controllers\UsuarioController

### Servicios (planificado / Milestone 2)
POST /api/servicios/crear (protegida) — CRUD de servicios (implementación pendiente) — referencia: [Milestone 02.md](Milestone 02.md)
GET /api/servicios — listar (pendiente)
GET /api/servicios/{id} — detalle (pendiente)
PUT /api/servicios/{id} — actualizar (pendiente)
DELETE /api/servicios/{id} — eliminar (pendiente)

### Archivos relevantes:
Rutas principales: api.php
Empresa: routes.php, App\Modules\Empresa\Controllers\EmpresaAuthController, App\Modules\Empresa\Controllers\EmpresaController
Usuario: routes.php, App\Modules\Usuario\Controllers\UsuarioAuthController, App\Modules\Usuario\Controllers\UsuarioController
Documentación / estado: [Milestone 02.md](Milestone 02.md), carpetas.md)))

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