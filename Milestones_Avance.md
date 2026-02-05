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
├── 📄 .editorconfig
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitattributes
├── 📄 artisan
├── 📄 composer.json
├── 📄 composer.lock
├── 📄 ENDPOINTS.md                      # [backend/ENDPOINTS.md](backend/ENDPOINTS.md)
├── 📄 package.json
├── 📄 phpunit.xml
├── 📄 red_mudancera_dev
├── 📄 Structure.md                      # [backend/Structure.md](backend/Structure.md)
├── 📄 vite.config.js
├── 📁 __borrar__/
│   ├── 📄 .env
│   └── 📄 .env.save
├── 📁 app/
│   ├── 📁 Console/
│   │   ├── 📄 Kernel.php               # [backend/app/Console/Kernel.php](backend/app/Console/Kernel.php)
│   │   └── 📁 Commands/
│   ├── 📁 Http/
│   │   ├── 📁 Controllers/             # Controladores por módulo
│   │   ├── 📄 Kernel.php               # [backend/app/Http/Kernel.php](backend/app/Http/Kernel.php)
│   │   └── 📁 Middleware/
│   │       └── 📄 Authenticate.php
│   ├── 📁 Modules/                     # Arquitectura modular por dominios
│   │   ├── 📁 Empresa/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── 📄 EmpresaAuthController.php  # [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)
│   │   │   │   └── 📄 EmpresaController.php      # [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)
│   │   │   ├── 📁 Models/
│   │   │   │   └── 📄 Empresa.php                  # [backend/app/Modules/Empresa/Models/Empresa.php](backend/app/Modules/Empresa/Models/Empresa.php)
│   │   │   ├── 📁 Requests/
│   │   │   ├── 📁 Services/                        # Lógica de negocio (si aplica)
│   │   │   ├── 📁 Repositories/                    # Acceso a datos (opcional)
│   │   │   └── 📄 routes.php                        # [backend/app/Modules/Empresa/routes.php](backend/app/Modules/Empresa/routes.php)
│   │   ├── 📁 Usuario/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── 📄 UsuarioAuthController.php    # [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)
│   │   │   │   └── 📄 UsuarioController.php        # [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)
│   │   │   ├── 📁 Models/
│   │   │   │   └── 📄 Usuario.php                  # [backend/app/Modules/Usuario/Models/Usuario.php](backend/app/Modules/Usuario/Models/Usuario.php)
│   │   │   ├── 📁 Requests/
│   │   │   ├── 📁 Services/
│   │   │   └── 📄 routes.php                        # [backend/app/Modules/Usuario/routes.php](backend/app/Modules/Usuario/routes.php)
│   │   ├── 📁 Servicio/                              # Módulo Servicios (implementado)
│   │   │   ├── 📁 Controllers/
│   │   │   │   └── 📄 ServicioController.php        # [`App\Modules\Servicio\Controllers\ServicioController`](backend/app/Modules/Servicio/Controllers/ServicioController.php)
│   │   │   ├── 📁 Models/
│   │   │   │   └── 📄 Servicio.php                  # [backend/app/Modules/Servicio/Models/Servicio.php](backend/app/Modules/Servicio/Models/Servicio.php)
│   │   │   ├── 📁 Requests/
│   │   │   │   ├── 📄 StoreServicioRequest.php      # [backend/app/Modules/Servicio/Requests/StoreServicioRequest.php](backend/app/Modules/Servicio/Requests/StoreServicioRequest.php)
│   │   │   │   ├── 📄 UpdateServicioRequest.php     # [backend/app/Modules/Servicio/Requests/UpdateServicioRequest.php](backend/app/Modules/Servicio/Requests/UpdateServicioRequest.php)
│   │   │   │   └── 📄 ChangeEstadoServicioRequest.php
│   │   │   ├── 📁 Services/
│   │   │   │   └── 📄 ServicioService.php
│   │   │   ├── 📁 Repositories/
│   │   │   │   └── 📄 ServicioRepository.php
│   │   │   └── 📄 routes.php                        # [backend/app/Modules/Servicio/routes.php](backend/app/Modules/Servicio/routes.php)
│   │   └── 📁 Resena/
│   │       ├── 📁 Controllers/
│   │       │   └── 📄 ResenaController.php         # [`App\Modules\Resena\Controllers\ResenaController`](backend/app/Modules/Resena/Controllers/ResenaController.php)
│   │       ├── 📁 Models/
│   │       ├── 📁 Requests/
│   │       └── 📄 routes.php                        # [backend/app/Modules/Resena/routes.php](backend/app/Modules/Resena/routes.php)
│   └── 📁 Providers/
│       ├── 📄 AppServiceProvider.php
│       └── 📄 RouteServiceProvider.php              # [`App\Providers\RouteServiceProvider`](backend/app/Providers/RouteServiceProvider.php)
├── 📁 bootstrap/
│   ├── 📄 app.php                                   # [backend/bootstrap/app.php](backend/bootstrap/app.php)
│   └── 📁 cache/
├── 📁 config/
│   ├── 📄 app.php
│   ├── 📄 auth.php                                  # [backend/config/auth.php](backend/config/auth.php)
│   ├── 📄 cache.php
│   ├── 📄 cors.php                                  # [backend/config/cors.php](backend/config/cors.php)
│   ├── 📄 database.php
│   ├── 📄 filesystems.php                           # [backend/config/filesystems.php](backend/config/filesystems.php)
│   ├── 📄 logging.php
│   ├── 📄 mail.php
│   ├── 📄 queue.php
│   ├── 📄 sanctum.php                               # [backend/config/sanctum.php](backend/config/sanctum.php)
│   └── 📄 session.php
├── 📁 database/
│   ├── 📁 migrations/
│   │   ├── 📄 0001_01_01_000001_create_cache_table.php   # [backend/database/migrations/0001_01_01_000001_create_cache_table.php](backend/database/migrations/0001_01_01_000001_create_cache_table.php)
│   │   ├── 📄 2025_11_26_074631_create_empresas_table.php   # [backend/database/migrations/2025_11_26_074631_create_empresas_table.php](backend/database/migrations/2025_11_26_074631_create_empresas_table.php)
│   │   ├── 📄 2025_11_26_074711_create_usuarios_table.php    # [backend/database/migrations/2025_11_26_074711_create_usuarios_table.php](backend/database/migrations/2025_11_26_074711_create_usuarios_table.php)
│   │   ├── 📄 2025_12_16_064630_create_servicios_table.php  # [backend/database/migrations/2025_12_16_064630_create_servicios_table.php](backend/database/migrations/2025_12_16_064630_create_servicios_table.php)
│   │   └── 📄 2026_01_28_062726_add_estado_carga_to_servicios.php  # [backend/database/migrations/2026_01_28_062726_add_estado_carga_to_servicios.php](backend/database/migrations/2026_01_28_062726_add_estado_carga_to_servicios.php)
│   └── 📁 seeders/
│       └── 📄 DatabaseSeeder.php
├── 📁 public/
│   ├── 📄 index.php                                   # [backend/public/index.php](backend/public/index.php)
│   └── 📁 storage/ (enlace simbólico → storage/app/public)
├── 📁 resources/
│   ├── 📁 css/
│   │   └── 📄 app.css
│   ├── 📁 js/
│   │   └── 📄 app.js                                   # [backend/resources/js/app.js](backend/resources/js/app.js)
│   └── 📁 views/
│       ├── 📄 welcome.blade.php                       # [backend/resources/views/welcome.blade.php](backend/resources/views/welcome.blade.php)
│       ├── 📁 emails/
│       │   └── 📄 empresa_verification_code.blade.php # [backend/resources/views/emails/empresa_verification_code.blade.php](backend/resources/views/emails/empresa_verification_code.blade.php)
│       └── 📁 pdf/
│           └── 📄 reporte-mensual.blade.php            # [backend/resources/views/pdf/reporte-mensual.blade.php](backend/resources/views/pdf/reporte-mensual.blade.php)
├── 📁 routes/
│   ├── 📄 api.php                                     # [backend/routes/api.php](backend/routes/api.php) (incluye módulos: Empresa, Usuario, Servicio, Resena)
│   └── 📄 web.php
├── 📁 storage/
│   ├── 📁 app/
│   ├── 📁 framework/
│   ├── 📁 logs/
│   └── 📁 public/
├── 📁 tests/
│   ├── 📁 Feature/
│   │   └── 📄 ExampleTest.php
│   └── 📄 TestCase.php
└── 📁 vendor/                                         # dependencias Composer

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
├── 📄 carpetas.md                      # [frontend/carpetas.md](frontend/carpetas.md)
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
    │   ├── 📁 empresa/
    │   │   ├── 📁 cargas/
    │   │   │   ├── page.jsx            # [frontend/src/app/empresa/cargas/page.jsx](frontend/src/app/empresa/cargas/page.jsx)
    │   │   │   ├── 📁 busco/
    │   │   │   │   └── page.jsx        # [frontend/src/app/empresa/cargas/busco/page.jsx](frontend/src/app/empresa/cargas/busco/page.jsx)
    │   │   │   └── 📁 ofrezco/
    │   │   │       └── page.jsx        # [frontend/src/app/empresa/cargas/ofrezco/page.jsx](frontend/src/app/empresa/cargas/ofrezco/page.jsx)
    │   │   ├── 📁 confirmacion/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/confirmacion/page.jsx](frontend/src/app/empresa/confirmacion/page.jsx)
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   ├── 📁 empresas/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/empresas/page.jsx](frontend/src/app/empresa/empresas/page.jsx)
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 logout/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/logout/page.jsx](frontend/src/app/empresa/logout/page.jsx)
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx            # [frontend/src/app/empresa/perfil/page.jsx](frontend/src/app/empresa/perfil/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       └── page.jsx        # [frontend/src/app/empresa/perfil/editar/page.jsx](frontend/src/app/empresa/perfil/editar/page.jsx)
    │   │   ├── 📁 publicaciones/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/publicaciones/page.jsx](frontend/src/app/empresa/publicaciones/page.jsx)
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   └── 📁 [id]/
    │   │       └── page.jsx            # [frontend/src/app/empresa/[id]/page.jsx](frontend/src/app/empresa/[id]/page.jsx)
    │   ├── 📁 resena/
    │   │   └── 📁 [token]/
    │   │       └── page.jsx            # [frontend/src/app/resena/[token]/page.jsx](frontend/src/app/resena/[token]/page.jsx)
    │   ├── 📁 servicios/
    │   │   ├── 📁 [id]/
    │   │   │   ├── page.jsx            # [frontend/src/app/servicios/[id]/page.jsx](frontend/src/app/servicios/[id]/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       ├── 📁 busco/
    │   │   │       │   └── page.jsx    # [frontend/src/app/servicios/[id]/editar/busco/page.jsx](frontend/src/app/servicios/[id]/editar/busco/page.jsx)
    │   │   │       └── 📁 ofrezco/
    │   │   │           └── page.jsx    # [frontend/src/app/servicios/[id]/editar/ofrezco/page.jsx](frontend/src/app/servicios/[id]/editar/ofrezco/page.jsx)
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx            # [frontend/src/app/usuario/perfil/page.jsx](frontend/src/app/usuario/perfil/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       └── page.jsx        # [frontend/src/app/usuario/perfil/editar/page.jsx](frontend/src/app/usuario/perfil/editar/page.jsx)
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 logout/
    │   │   │   └── page.jsx
    │   │   └── 📁 notificaciones/
    │   │       └── page.jsx
    │   ├── 📄 layout.js                 # [frontend/src/app/layout.js](frontend/src/app/layout.js)
    │   ├── 📄 page.js                   # [frontend/src/app/page.js](frontend/src/app/page.js)
    │   └── 📄 page.module.css           # [frontend/src/app/page.module.css](frontend/src/app/page.module.css)
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── EmpresaCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx         # [frontend/src/components/cards/ServiceCard.jsx](frontend/src/components/cards/ServiceCard.jsx)
    │   │   └── UserCard.jsx
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── ConfirmDeleteModal.jsx   # [frontend/src/components/common/ConfirmDeleteModal.jsx](frontend/src/components/common/ConfirmDeleteModal.jsx)
    │   │   ├── ErrorModal.jsx
    │   │   ├── Input.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── SimpleEditor.jsx
    │   ├── 📁 filters/
    │   │   ├── ServiceFilters.jsx
    │   │   └── ServiceAdvancedFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx                # [frontend/src/components/layout/Footer.jsx](frontend/src/components/layout/Footer.jsx)
    │   │   ├── Header.jsx                # [frontend/src/components/layout/Header.jsx](frontend/src/components/layout/Header.jsx)
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   ├── 📁 modals/
    │   │   ├── ChangeServiceStatusModal.jsx  # [frontend/src/components/modals/ChangeServiceStatusModal.jsx](frontend/src/components/modals/ChangeServiceStatusModal.jsx)
    │   │   ├── ConfirmFinalizarServicioModal.jsx
    │   │   ├── FinalizarServicioGananciaModal.jsx
    │   │   ├── ReporteMensualModal.jsx
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
    │   ├── index.js
    │   └── searchContext.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── buildFileUrl.js              # [frontend/src/utils/buildFileUrl.js](frontend/src/utils/buildFileUrl.js)
    │   ├── formatters.js
    │   ├── getEmpresaToken.js
    │   └── whatsapp.js                  # [frontend/src/utils/whatsapp.js](frontend/src/utils/whatsapp.js)
    │
    └── 📁 styles/                       # Estilos SCSS globales
        ├── 📁 components/
        │   ├── _buttons.scss            # [frontend/src/styles/components/_buttons.scss](frontend/src/styles/components/_buttons.scss)
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
        │   │   ├── _empresaBusco.scss
        │   │   ├── _empresaDashboard.scss
        │   │   ├── _empresaEditar.scss    # [frontend/src/styles/pages/empresa/_empresaEditar.scss](frontend/src/styles/pages/empresa/_empresaEditar.scss)
        │   │   ├── _empresaEmpresas.scss
        │   │   ├── _empresaOfrezco.scss
        │   │   └── _empresaPerfil.scss    # [frontend/src/styles/pages/empresa/_empresaPerfil.scss](frontend/src/styles/pages/empresa/_empresaPerfil.scss)
        │   └── 📁 usuario/
        │       └── _usuarioPerfil.scss    # [frontend/src/styles/pages/usuario/_usuarioPerfil.scss](frontend/src/styles/pages/usuario/_usuarioPerfil.scss)
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