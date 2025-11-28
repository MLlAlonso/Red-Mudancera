# README – Red Mudancera (Frontend + Backend)

## 🚚 Descripción del Proyecto

Red Mudancera es una plataforma para empresas de transporte y mudanza donde pueden:

- Registrar su empresa
- Iniciar sesión
- Crear y gestionar servicios (busco/ofrezco)
- Contactar a otras empresas
- Acceder a un dashboard personalizado

Este repositorio contiene dos aplicaciones:
- `backend/` → API REST en Laravel + Sanctum
- `frontend/` → Frontend en Next.js App Router

## 🧱 Características Implementadas (Milestone 1)

### 🔐 Autenticación
- Registro de empresas
- Inicio de sesión
- Generación y validación de tokens vía Sanctum
- Ruta protegida `/api/empresa/me`

### 🖥️ Frontend
- Registro y Login funcionales
- Dashboard
- Filtros animados (busco/ofrezco)
- Cards de servicio
- Skeleton loader
- Menú lateral animado
- UI responsiva y profesional

## ⚙️ Tecnologías Principales

| Área | Tecnologías |
|------|------------|
| Backend | Laravel 11, Sanctum, MySQL |
| Frontend | Next.js 14 App Router, React 18, SCSS |
| Animaciones | Framer Motion |
| Estilos | SCSS modular |
| Autenticación | API Tokens (Sanctum), LocalStorage |

## 🛠️ Instalación del Backend (Laravel)

### 1. Instalar dependencias
```bash
cd backend
composer install
npm install
```

### 2. Crear archivo .env
```bash
cp .env.example .env
```

Editar las siguientes variables:
```
DB_DATABASE=red_mudancera_dev
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Generar clave del proyecto
```bash
php artisan key:generate
```

### 4. Ejecutar migraciones
```bash
php artisan migrate
```

### 5. Iniciar servidor Laravel
```bash
php artisan serve
```

Backend disponible en: `http://localhost:8000`

## 🧩 Instalación del Frontend (Next.js)

### 1. Instalar dependencias
```bash
cd frontend
npm install
```

### 2. Crear .env.local
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

### 3. Ejecutar entorno de desarrollo
```bash
npm run dev
```

Frontend disponible en: `http://localhost:3000`

## 🔌 Conexión Front ↔ Back

El login y registro funcionan mediante:
- `POST {NEXT_PUBLIC_BACKEND_URL}/empresa/login`
- `POST {NEXT_PUBLIC_BACKEND_URL}/empresa/register`

Los tokens se almacenan en: `localStorage.token`

## ▶️ Cómo ejecutar el sistema completo

Abrir dos terminales:

**Terminal 1 → Backend:**
```bash
cd backend
php artisan serve
```

**Terminal 2 → Frontend:**
```bash
cd frontend
npm run dev
```

## 🚀 Siguientes pasos (Milestone 2)

- CRUD completo de servicios
- Perfil de empresa
- Notificaciones internas
- UI de contratos
- Dashboard con datos dinámicos
- Roles (empresa / administrador)

## 👨‍💻 Desarrollado por

**Mikkel Llaven Alonso**
- 💼 LinkedIn: https://www.linkedin.com/in/mikkel-llaven-alonso-5893b4280/
- ✉️ Email: mikkel_03@outlook.com