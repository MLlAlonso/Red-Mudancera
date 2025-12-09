# Milestone 1 – Avances Técnicos, Decisiones y Estado Actual del Proyecto

## Proyecto: Red Mudancera

### 1. Resumen General

Durante la Milestone 1 se construyó la base funcional del sistema Red Mudancera tanto en backend (Laravel) como en frontend (Next.js). El objetivo era entregar un sistema funcional mínimo (MVP base) con:

- Registro de empresa
- Inicio de sesión
- Autenticación vía tokens Sanctum
- Dashboard inicial
- Filtros funcionales
- Cards base de servicios
- Diseño responsivo
- Conexión sólida entre frontend y backend
- Integración de animaciones y elementos de UI para un look & feel profesional

Este entregable deja el sistema listo para comenzar a almacenar, crear y mostrar servicios reales, lo cual será parte de la siguiente milestone.

### 2. Backend – Laravel (Estado actual)

- ✔️ **Estructura modular implementada**

    Se creó un módulo completamente aislado para Empresas, ubicado en:  
    `app/Modules/Empresa/*`

    Esto permite escalar en el futuro agregando módulos como:

    - Usuario
    - Servicios
    - Contratos
    - Notificaciones
    - etc.

- ✔️ **Endpoints creados y funcionando**

    | Método | Endpoint                     | Descripción                             |
    |--------|------------------------------|-----------------------------------------|
    | POST   | `/api/empresa/register`      | Registrar empresa                       |
    | POST   | `/api/empresa/login`         | Iniciar sesión y generar token          |
    | GET    | `/api/empresa/me`            | Obtener la empresa autenticada (token requerido) |

- ✔️ **Autenticación configurada correctamente**

    Se configuró `auth.php` para usar el proveedor empresas.  
    Laravel Sanctum genera tokens sin problemas.  
    El middleware de autenticación ya protege rutas críticas.

- ✔️ **Base de datos**

    Tablas creadas y funcionando:

    - empresas
    - usuarios (en espera para futuro uso)

    La tabla de servicios será implementada en la siguiente milestone.

### 3. Frontend – Next.js (Estado actual)

- ✔️ **Routing principal creado**

    - `/register`
    - `/login`
    - `/dashboard`
    - `/` (landing temporal)

- ✔️ **Conexión 100% funcional con el backend**

    El frontend consume el backend mediante:  
    `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api`

- ✔️ **Formulario de registro con validaciones y envío real**
- ✔️ **Login funcional**

    Se almacena el token en localStorage.  
    El dashboard protege la ruta verificando token.

- ✔️ **Dashboard base creado**

    Incluye:

    - Header real
    - Side menu animado
    - Filtros funcionales (todos / busco / ofrezco)
    - Cards de servicio diseñadas
    - Cards animadas con Framer Motion
    - Skeleton loader al filtrar

    Esta es la base del futuro dashboard real donde se mostrarán servicios reales.

### 4. UI / UX implementado

- Inputs con label animado
- Botón CTA reutilizable
- Skeleton loader
- Menú lateral profesional
- Animaciones suaves
- Responsividad completa (móvil + escritorio)

### 5. Arquitectura técnica actual

**Backend (Laravel)**

- Modular (por carpetas funcionales)
- Autenticación propia por módulo
- Tablas independientes
- Controladores propios por módulo
- Requests de validación dedicados
- Sanctum para tokens API

**Frontend (Next.js App Router)**

- Componentes separados por módulos
- Diseño escalable para agregar:
    - módulos de empresa
    - módulos de servicios
    - módulos de contratos
    - módulos de usuarios

### 6. Qué está listo

- ✔️ Registro
- ✔️ Login
- ✔️ Autenticación
- ✔️ Dashboard
- ✔️ UI base completa
- ✔️ Animaciones
- ✔️ Estructura técnica sólida para escalar
- ✔️ Conexión Front ↔ Back

### 7. Qué sigue para la Milestone 2

1. CRUD de Servicios (creación, listado, detalle)
2. Conectar servicios reales al dashboard
3. Perfil de empresa
4. Notificaciones base
5. Crear UI interna del perfil
6. Validaciones adicionales

Todo lo que ya tenemos reduce drásticamente el tiempo de desarrollo de la siguiente milestone.

### 8. Recomendaciones para el próximo sprint

- Mantener la modularidad tal como ya está construida.
- Definir desde el inicio si los servicios son:
    - creados solo por empresas
    - también buscados por usuarios
- Acordar si los servicios serán visibles para todos o filtrados por región



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
├── 📄 Structure.md                     # Documentación de estructura
├── 📄 red_mudancera_dev
├── 📄 vite.config.js                   # Configuración de Vite
│
├── 📁 app/
│   ├── 📁 Http/
│   │   ├── 📄 Kernel.php               # Middleware HTTP
│   │   ├── 📁 Middleware/
│   │   │   ├── Authenticate.php        # Middleware de autenticación
│   │   │   └── RedirectIfAuthenticated.php
│   │   └── 📁 Controllers/
│   │       └── (Vacío - controladores en Modules)
│   │
│   ├── 📁 Mail/                        # Emails
│   │   ├── EmpresaVerificationCode.php
│   │   └── UsuarioVerificationCode.php
│   │
│   ├── 📁 Models/
│   │   └── User.php                    # Modelo genérico
│   │
│   ├── 📁 Modules/
│   │   ├── 📁 Empresa/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── EmpresaAuthController.php
│   │   │   │   └── EmpresaController.php
│   │   │   ├── 📁 Models/
│   │   │   │   └── Empresa.php
│   │   │   ├── 📁 Requests/
│   │   │   │   ├── LoginEmpresaRequest.php
│   │   │   │   ├── RegisterEmpresaRequest.php
│   │   │   │   └── EmpresaUpdateRequest.php
│   │   │   └── routes.php
│   │   │
│   │   └── 📁 Usuario/
│   │       ├── 📁 Controllers/
│   │       │   ├── UsuarioAuthController.php
│   │       │   └── UsuarioController.php
│   │       ├── 📁 Models/
│   │       │   └── Usuario.php
│   │       ├── 📁 Requests/
│   │       │   ├── LoginUsuarioRequest.php
│   │       │   ├── RegisterUsuarioRequest.php
│   │       │   └── UsuarioUpdateRequest.php
│   │       └── routes.php
│   │
│   └── 📁 Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php
│
├── 📁 bootstrap/
│   ├── 📄 app.php                      # Bootstrapping de la aplicación
│   ├── 📄 providers.php                # Registro de providers
│   └── 📁 cache/
│
├── 📁 config/
│   ├── 📄 app.php
│   ├── 📄 auth.php                     # Autenticación (Sanctum + Guards)
│   ├── 📄 cache.php
│   ├── 📄 database.php                 # Conexión a BD
│   ├── 📄 filesystems.php
│   ├── 📄 logging.php
│   ├── 📄 mail.php
│   ├── 📄 queue.php
│   ├── 📄 sanctum.php                  # Configuración de API tokens
│   ├── 📄 services.php
│   └── 📄 session.php
│
├── 📁 database/
│   ├── 📁 migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 2025_11_26_074631_create_empresas_table.php
│   │   ├── 2025_11_26_074711_create_usuarios_table.php
│   │   ├── 2025_xx_xx_xxxxxx_create_email_verifications_table.php
│   │   └── 2025_xx_xx_xxxxxx_create_servicios_table.php
│   └── 📁 seeders/
│       └── DatabaseSeeder.php
│
├── 📁 public/
│   ├── 📄 index.php                    # Punto de entrada
│   └── 📁 storage/ (enlace simbólico)
│
├── 📁 resources/
│   ├── 📁 css/
│   │   └── 📄 app.css                  # Tailwind CSS
│   ├── 📁 js/
│   │   └── 📄 app.js
│   └── 📁 views/
│       └── 📄 welcome.blade.php
│
├── 📁 routes/
│   ├── 📄 api.php                      # Rutas API
│   ├── 📄 web.php                      # Rutas web
│   └── 📄 console.php                  # Comandos Artisan
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
│   └── 📄 TestCase.php
│
└── 📁 vendor/                          # Dependencias Composer

frontend/
├── 📄 .eslintrc.mjs                    # Configuración ESLint
├── 📄 .gitignore
├── 📄 .env.local                       # Variables de entorno
├── 📄 .env.example
├── 📄 carpetas.md                      # Documentación de estructura
├── 📄 eslint.config.mjs                # Configuración ESLint
├── 📄 jsconfig.json                    # Configuración JavaScript
├── 📄 next.config.js                   # Configuración Next.js
├── 📄 package.json                     # Dependencias Node.js
├── 📄 package-lock.json
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   │   ├── acuerdo_2.png
│   │   ├── busca.png
│   │   ├── busca_2.png
│   │   ├── campana.png
│   │   ├── cuenta.png
│   │   ├── default-user.png
│   │   ├── docs.png
│   │   ├── eye.png
│   │   ├── eye_off.png
│   │   ├── help.png
│   │   ├── hogar_2.png
│   │   ├── menu.png
│   │   ├── ofrece.png
│   │   └── team.png
│   ├── 📁 logo/
│   │   ├── logo.png
│   │   └── mikkel.png
│   ├── 📄 next.svg
│   └── 📄 vercel.svg
│
├── 📁 .next/                           # Build de Next.js (generado)
│
└── 📁 src/
    ├── 📁 app/                         # Rutas y páginas (App Router)
    │   ├── 📁 dashboard/
    │   │   └── 📄 page.jsx             # Dashboard principal
    │   ├── 📁 login/
    │   │   └── 📄 page.jsx             # Página de login
    │   ├── 📁 register/
    │   │   └── 📄 page.jsx             # Página de registro
    │   ├── 📁 test-ui/
    │   │   └── 📄 page.jsx             # Página para probar UI
    │   ├── 📁 busco/
    │   │   └── 📄 page.jsx             # (Futuro) Crear servicio "busco"
    │   ├── 📁 ofrezco/
    │   │   └── 📄 page.jsx             # (Futuro) Crear servicio "ofrezco"
    │   ├── 📄 globals.css              # Estilos globales CSS
    │   ├── 📄 layout.js                # Layout principal
    │   └── 📄 page.js                  # Página principal (Home)
    │
    ├── 📁 components/
    │   ├── 📁 cards/
    │   │   ├── 📄 ActionCard.jsx       # Tarjeta acción (Busco/Ofrezco)
    │   │   ├── 📄 AcuerdoCard.jsx      # Tarjeta de acuerdo
    │   │   ├── 📄 NotificationCard.jsx # Tarjeta notificación
    │   │   ├── 📄 ReviewCard.jsx       # Tarjeta reseña
    │   │   ├── 📄 ServiceCard.jsx      # Tarjeta de servicio
    │   │   └── 📄 UserCard.jsx         # Tarjeta de usuario
    │   │
    │   ├── 📁 common/
    │   │   ├── 📄 Button_cta.jsx       # Botón CTA
    │   │   ├── 📄 Button_crud.jsx      # Botón CRUD
    │   │   ├── 📄 Button_error.jsx     # Botón Error
    │   │   ├── 📄 Button_success.jsx   # Botón Success
    │   │   ├── 📄 Input.jsx            # Campo de entrada
    │   │   └── 📄 SearchBar.jsx        # Barra de búsqueda
    │   │
    │   ├── 📁 filters/
    │   │   └── 📄 ServiceFilters.jsx   # Filtros de servicios
    │   │
    │   └── 📁 layout/
    │       ├── 📄 Footer.jsx           # Pie de página
    │       ├── 📄 Header.jsx           # Encabezado/Navbar
    │       └── 📄 SideMenu.jsx         # Menú lateral
    │
    ├── 📁 hooks/                       # (Vacío) Custom React hooks
    │
    ├── 📁 modules/                     # (Vacío) Módulos por funcionalidad
    │   ├── 📁 auth/
    │   ├── 📁 dashboard/
    │   ├── 📁 empresa/
    │   └── 📁 servicios/
    │
    ├── 📁 services/                    # (Vacío) Servicios API/lógica
    │   └── 📄 api.js                   # (Futuro) Funciones API centralizadas
    │
    ├── 📁 store/                       # (Vacío) Estado global (Redux/Zustand)
    │
    ├── 📁 utils/                       # (Vacío) Funciones utilitarias
    │
    └── 📁 styles/                      # Estilos SCSS globales
        ├── 📁 components/
        │   ├── _buttons.scss           # Estilos botones
        │   ├── _cards.scss             # Estilos tarjetas
        │   ├── _inputs.scss            # Estilos inputs
        │   ├── _serviceCard.scss       # Estilos tarjetas servicio
        │   ├── _serviceFilters.scss    # Estilos filtros
        │   └── _notifications.scss
        │
        ├── 📁 layout/
        │   ├── _footer.scss            # Estilos footer
        │   ├── _header.scss            # Estilos header
        │   └── _sideMenu.scss          # Estilos menú lateral
        │
        ├── 📁 utils/
        │   ├── _containers.scss        # Clases contenedor
        │   ├── _mixins.scss            # Mixins SCSS
        │   └── _variables.scss         # Variables de diseño
        │
        └── 📄 globals.scss             # Estilos globales

🔌 Endpoints del Backend

EMPRESA - Autenticación
Método	Endpoint	Descripción	Body	Auth
POST	/api/empresa/register	Registrar empresa	{ empresa, representante, rfc, tel, email, password }	❌
POST	/api/empresa/login	Iniciar sesión empresa	{ email, password }	❌
POST	/api/empresa/send-verification	Enviar código verificación	{ email }	❌
POST	/api/empresa/verify-code	Verificar código de correo	{ email, code }	❌
EMPRESA - Perfil (Protegidas)
Método	Endpoint	Descripción	Body	Auth
GET	/api/empresa/me	Obtener empresa autenticada	-	✅ Token
PUT	/api/empresa/update	Actualizar perfil empresa	{ empresa, representante, tel, ... }	✅ Token
DELETE	/api/empresa/delete	Eliminar empresa	-	✅ Token
USUARIO - Autenticación
Método	Endpoint	Descripción	Body	Auth
POST	/api/usuario/register	Registrar usuario	{ nombre, email, password, telefono }	❌
POST	/api/usuario/login	Iniciar sesión usuario	{ email, password }	❌
POST	/api/usuario/send-verification	Enviar código verificación	{ email }	❌
POST	/api/usuario/verify-code	Verificar código de correo	{ email, code }	❌
USUARIO - Perfil (Protegidas)
Método	Endpoint	Descripción	Body	Auth
GET	/api/usuario/me	Obtener usuario autenticado	-	✅ Token
PUT	/api/usuario/update	Actualizar perfil usuario	{ nombre, telefono, ... }	✅ Token
DELETE	/api/usuario/delete	Eliminar usuario	-	✅ Token
SERVICIOS (Futuro - Milestone 2)
Método	Endpoint	Descripción	Body	Auth
POST	/api/servicios/crear	Crear nuevo servicio	{ tipo, origen, destino, volumen, ... }	✅ Token
GET	/api/servicios	Listar todos los servicios	-	❌
GET	/api/servicios/{id}	Obtener detalle servicio	-	❌
PUT	/api/servicios/{id}	Actualizar servicio	{ ... }	✅ Token
DELETE	/api/servicios/{id}	Eliminar servicio	-	✅ Token

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