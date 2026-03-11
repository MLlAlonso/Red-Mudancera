# Mudanza Fácil

Plataforma SaaS para logística colaborativa entre empresas de mudanzas.

**Mudanza Fácil** es una plataforma web diseñada para conectar empresas de mudanzas y optimizar la logística de cargas entre ellas.

La aplicación permite publicar disponibilidad de espacio en unidades, buscar cargas compatibles, gestionar servicios, administrar usuarios internos y recibir solicitudes de mudanza de clientes potenciales.

El objetivo es reemplazar la coordinación informal que actualmente ocurre en grupos de WhatsApp, Facebook o llamadas, convirtiéndose en un Centro Digital de Cargas para Mudanzas en México.

## 🧠 Concepto del sistema

Actualmente muchas empresas de mudanzas enfrentan estos problemas:

- Viajes con unidades parcialmente vacías
- Falta de visibilidad de rutas disponibles
- Comunicación fragmentada entre empresas
- Subcontratación sin historial ni reputación
- Pérdida de oportunidades de negocio

Mudanza Fácil busca resolver esto mediante una plataforma centralizada de colaboración logística.

Las empresas pueden:

- Publicar espacio disponible en unidades
- Publicar cargas que necesitan transportar
- Buscar coincidencias de rutas
- Contactar empresas directamente
- Gestionar su reputación
- Comprar leads de clientes potenciales

## Arquitectura del Sistema

El proyecto está construido con arquitectura desacoplada **frontend–backend**, lo que permite escalar el sistema y evolucionarlo hacia microservicios o aplicaciones móviles.

```
Frontend (Next.js)
   │
   │ REST API
   ▼
Backend (Laravel API)
   │
   ▼
MySQL Database
```

### Backend

- **Laravel 12**
- **API REST**
- Arquitectura modular por dominio
- Laravel Sanctum para autenticación
- Sistema de eventos y notificaciones
- Queue + Scheduler para tareas asíncronas

### Frontend

- **Next.js** (React)
- App Router
- SCSS modular
- Componentización por dominio
- SPA preparada para evolucionar a PWA

### Base de datos

- **MySQL**
- Diseño normalizado
- Índices optimizados para búsquedas de servicios
- Preparada para alto volumen de publicaciones

## Arquitectura Modular

El backend está organizado en módulos independientes, lo que permite escalar y mantener el sistema fácilmente.

Cada módulo contiene:

- Controllers
- Models
- Requests (validaciones)
- Services (lógica de negocio)
- Repositories (acceso a datos)
- Routes independientes

### Módulos principales

| Módulo | Descripción |
|--------|-------------|
| Empresa | Gestión de empresas |
| Usuario | Gestión de usuarios |
| Servicio | Publicación de servicios |
| Notificacion | Sistema de notificaciones |
| Resena | Sistema de reseñas |
| SolicitudMudanza | Gestión de solicitudes |

Esto permite desarrollar nuevas funcionalidades sin afectar otras partes del sistema.

## ⚙️ Tecnologías Utilizadas

### Backend

- Laravel 12
- PHP
- MySQL
- Laravel Sanctum
- Queue / Scheduler

### Frontend

- Next.js
- React
- JavaScript
- SCSS

### Infraestructura

- Cloudinary (gestión de imágenes)
- Google Distance API
- Google Places API
- Mailtrap (entorno de desarrollo)

## 🔐 Autenticación y Seguridad

El sistema incluye autenticación completa mediante **Laravel Sanctum**.

Características:

- Registro de empresa
- Registro de usuarios internos
- Login empresa / usuario
- Middleware de protección de rutas
- Manejo de tokens
- Recuperación de contraseña
- Verificación de correo por código

## Gestión de Empresas y Usuarios

Cada empresa puede administrar usuarios internos.

### Funcionalidades

- Perfil de empresa
- Gestión de usuarios internos
- Activar / pausar usuarios
- Edición de perfiles
- Dashboard empresarial

## Sistema de Servicios (Core del Sistema)

Las empresas pueden publicar servicios logísticos de dos tipos:

| Tipo | Descripción |
|------|-------------|
| **Busco** | Necesito transportar una carga |
| **Ofrezco** | Tengo espacio disponible en una unidad |

Cada servicio incluye:

- Origen
- Destino
- Volumen disponible
- Rango de fechas
- Tipo de carga
- Notas adicionales
- Imágenes del servicio

### Estados del servicio

- Activo
- Asignado
- Finalizado

Esto permite gestionar todo el ciclo de vida de una operación logística.

## 🔎 Sistema de Búsqueda

El sistema incluye filtros avanzados para encontrar servicios compatibles.

### Filtros disponibles

- Ciudad origen
- Ciudad destino
- Volumen
- Fecha
- Tipo de carga

### Características adicionales

- Búsqueda global
- Google Places Autocomplete
- Validaciones anti-spam para evitar publicaciones duplicadas

## 📦 Sistema de Solicitudes de Mudanza (Leads)

La plataforma incluye un módulo de generación de leads.

**Clientes pueden:**

- Solicitar una mudanza desde un formulario público
- Verificar su correo
- Recibir confirmación de su solicitud

**Las empresas pueden:**

- Ver solicitudes disponibles
- Comprar leads mediante tokens
- Gestionar oportunidades desde su dashboard

Esto convierte la plataforma en un **Marketplace B2B + Generador de Leads**.

## ⭐ Sistema de Reseñas

El sistema incluye reputación empresarial.

**Las empresas pueden:**

- Generar enlaces de reseña
- Compartirlos con clientes
- Recibir calificaciones públicas

### Las reseñas evalúan

- Comunicación
- Puntualidad
- Calidad del servicio
- Daño de carga
- Honestidad
- Pago

Las calificaciones impactan la reputación de la empresa dentro del sistema.

## 🔔 Motor de Notificaciones

El sistema cuenta con un motor de notificaciones basado en eventos.

### Características

- Dispatcher multi-canal
- Database Channel
- Email Channel
- Eventos desacoplados
- Queue para envío de emails
- Scheduler para eventos programados

### Eventos actuales

- Servicio publicado
- Servicio asignado
- Servicio finalizado
- Servicio visto múltiples veces
- Servicio próximo a vencer
- Resumen diario de actividad

Este sistema está diseñado para escalar hacia:

- Push notifications
- Alertas inteligentes
- Matching automático de cargas

## 🎨 UI / UX

Interfaz diseñada con enfoque **mobile-first**.

Incluye:

- Skeleton loaders
- Modales reutilizables
- Cards dinámicas
- Feedback visual
- Layout responsive
- Animaciones suaves
- Componentización reutilizable

## 🔌 Conexión Frontend ↔ Backend

El frontend consume la API REST mediante fetch.

### Flujo de autenticación

```
Usuario inicia sesión
   ↓
POST /api/empresa/login
   ↓
Backend valida credenciales
   ↓
Se genera token Sanctum
   ↓
Frontend guarda token
   ↓
Peticiones protegidas usan:
Authorization: Bearer {token}
```

## 📁 Estructura del Proyecto

```
project-root
│
├── backend
│   ├── app
│   │   ├── Modules
│   │   │   ├── Empresa
│   │   │   ├── Usuario
│   │   │   ├── Servicio
│   │   │   ├── Notificacion
│   │   │   ├── Resena
│   │   │   └── SolicitudMudanza
│   │   └── Services
│   │
│   ├── database
│   │   ├── migrations
│   │   └── seeders
│   │
│   └── routes
│       └── api.php
│
└── frontend
   ├── src
   │   ├── app
   │   ├── components
   │   ├── hooks
   │   ├── styles
   │   └── utils
```

## 🛠️ Instalación

### Backend

```bash
cd backend

composer install
npm install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve
```

### Frontend

```bash
cd frontend

npm install

cp .env.local.example .env.local

npm run dev
```
## 👨‍💻 Autor

**Mikkel Llaven Alonso**

Software Engineer – Full Stack

- **LinkedIn:** [mikkel-llaven-alonso-5893b4280](https://www.linkedin.com/in/mikkel-llaven-alonso-5893b4280/)
- **Email:** mikkel_03@outlook.com

## License

This project is proprietary software developed for a private client.  
The repository is shared only for portfolio purposes.

See the [LICENSE](LICENSE) file for details.