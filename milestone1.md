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
