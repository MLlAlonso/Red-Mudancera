# README – Red Mudancera (Frontend + Backend)

## 🚚 Descripción del Proyecto

Red Mudancera es una plataforma para empresas de transporte y mudanza donde pueden:

- Registrar y administrar su empresa
- Gestionar usuarios internos
- Crear y gestionar servicios (busco / ofrezco) — (CRUD pendiente: Milestone 3)
- Contactar a otras empresas y compartir credenciales
- Acceder a dashboards (empresa / usuario) y perfiles

Este repositorio contiene dos aplicaciones:
- `backend/` → API REST en Laravel + Sanctum
- `frontend/` → Frontend en Next.js App Router

## 🧱 Estado actual (resumen)

- Autenticación completa (Laravel Sanctum) con separación Empresa / Usuario.
- Registro y login para empresas y usuarios.
- Perfiles (ver/editar) y subida de avatar/logo.
- Verificación de email por código (Mailtrap en entorno local).
- UI completa con layout, menús laterales, skeletons y componentes reutilizables.
- Comunicación Front ↔ Back estable (fetch + manejo de tokens).
- Arquitectura modular en backend (`app/Modules`) y frontend (`src/app`, `src/components`).

Estado pendiente relevante:
- CRUD completo de Servicios (implementación en Milestone 3).
- Migración Mailtrap → proveedor real.
- Notificaciones / sistema de reputación / panel admin (futuro).

## ⚙️ Tecnologías Principales

| Área | Tecnologías |
|------|------------|
| Backend | Laravel 11, Sanctum, MySQL |
| Frontend | Next.js 14 App Router, React 18, SCSS |
| Animaciones | Framer Motion |
| Estilos | SCSS modular |
| Autenticación | API Tokens (Sanctum), tokens guardados en cookies por rol (token_empresa / token_usuario) |

## 🛠️ Instalación y ejecución

### Backend
1. Instalar dependencias:
```bash
cd backend
composer install
npm install
```
2. Configurar archivo `.env`:
   - Clonar `.env.example` a `.env`
   - Configurar variables de entorno (base de datos, correo, etc.)
3. Generar clave de aplicación:
```bash
php artisan key:generate
```
4. Ejecutar migraciones y sembrar datos:
```bash
php artisan migrate --seed
```
5. Iniciar el servidor:
```bash
php artisan serve
```

### Frontend
1. Instalar dependencias:
```bash
cd frontend
npm install
```
2. Configurar archivo `.env.local`:
   - Clonar `.env.local.example` a `.env.local`
   - Configurar variables de entorno (API URL, etc.)
3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
## 🔌 Conexión Front ↔ Back

Variable usada en código: `process.env.NEXT_PUBLIC_API_URL` (ej.: `frontend/src/app/usuario/perfil/page.jsx`).

Autenticación: Laravel Sanctum. En frontend se guardan cookies con nombres por rol: `token_empresa` y `token_usuario` (ver llamadas a cookies en `frontend/src/app/empresa/perfil/editar/page.jsx` y `frontend/src/app/usuario/perfil/editar/page.jsx`).

Endpoints principales y documentación: `Milestone 02.md`.

### 🔎 Endpoints principales (resumen)

**Empresa (públicos):**
- `POST /api/empresa/register`
- `POST /api/empresa/login`
- `POST /api/empresa/send-verification`
- `POST /api/empresa/verify-code`

**Empresa (protegidas):**
- `GET /api/empresa/me`
- `PUT /api/empresa/update`
- `DELETE /api/empresa/delete`
- `GET /api/empresa/usuarios`
- `PATCH/DELETE` sobre usuarios (ver `backend/app/Modules/Empresa/routes.php`)

**Usuario (públicos):**
- `POST /api/usuario/register`
- `POST /api/usuario/login`
- `POST /api/usuario/send-verification-code`
- `POST /api/usuario/verify-code`

**Usuario (protegidas):**
- `GET /api/usuario/me`
- `PUT /api/usuario/update`
- `DELETE /api/usuario/delete`
- `GET /api/usuario/mis-usuarios`

**Servicios:** Rutas CRUD planificadas para Milestone 3 (ver `Milestone 02.md`).

### 📁 Estructura y archivos relevantes

- **Documentación de backend:** `backend/Structure.md`
- **Documentación de frontend:** `frontend/carpetas.md`
- **Estado y endpoints:** `Milestone 02.md`
- **Rutas API principales:** `backend/routes/api.php`

**Controladores clave:**
- `App\Modules\Empresa\Controllers\EmpresaController`
- `App\Modules\Empresa\Controllers\EmpresaAuthController`
- `App\Modules\Usuario\Controllers\UsuarioController`
- `App\Modules\Usuario\Controllers\UsuarioAuthController`


## 👨‍💻 Desarrollado por

**Mikkel Llaven Alonso**
- 💼 LinkedIn: https://www.linkedin.com/in/mikkel-llaven-alonso-5893b4280/
- ✉️ Email: mikkel_03@outlook.com