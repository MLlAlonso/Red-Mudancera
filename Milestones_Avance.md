# Mudanza Facil – Documento de Estado y Guía para la Siguiente Milestone

---

## 1. Resumen General del Proyecto

Mudanza Facil es una plataforma web orientada a conectar empresas de mudanzas entre sí y con clientes potenciales, permitiendo publicar servicios, gestionar cargas, recibir solicitudes de mudanza, administrar usuarios internos y operar mediante un sistema de notificaciones y comunicación externa (WhatsApp).

El sistema está construido bajo una arquitectura modular desacoplada, con:

- Backend Laravel API REST
- Frontend Next.js
- Autenticación mediante Laravel Sanctum
- Comunicación mediante API
- Sistema de eventos y notificaciones desacoplado

La plataforma busca convertirse en el Centro Nacional de Cargas para Mudanzas, reemplazando la logística informal que actualmente ocurre en grupos de facebook y chats de WhatsApp.

Actualmente el proyecto se encuentra en un estado funcional avanzado, con:

- Autenticación completa
- Gestión de empresas y usuarios
- Publicación de servicios
- Sistema de reseñas
- Motor inicial de notificaciones
- Sistema de solicitudes de mudanza (leads)
- Sistema de tokens para compra de leads
- Arquitectura preparada para escalar hacia SaaS

---

## 2. Funcionalidades Implementadas (Checklist General)

### 🔐 Autenticación y Seguridad

- ✅ Registro de empresa
- ✅ Registro de usuario asociado a empresa
- ✅ Login de empresa
- ✅ Login de usuario
- ✅ Autenticación con Laravel Sanctum
- ✅ Protección de rutas con middleware
- ✅ Manejo de tokens (logout, invalidación)
- ✅ Recuperación de contraseña por correo

### 👤 Usuarios

- ✅ Perfil de usuario
- ✅ Edición de datos personales
- ✅ Subida y actualización de avatar
- ✅ Eliminación de cuenta
- ✅ Asociación usuario ↔ empresa
- ✅ Listado de usuarios por empresa
- ✅ Pausar / reactivar usuarios
- ✅ Cards de usuarios en dashboard empresa

### ✉️ Verificación por Correo

- ✅ Generación de código de verificación
- ✅ Envío de correo vía Mailtrap (entorno local)
- ✅ Modal para ingresar código
- ✅ Validación de código
- ✅ Estado email_verified_at
- ✅ Botón dinámico "Verificar correo"

### 🏢 Empresas

- ✅ Registro de empresa
- ✅ Perfil de empresa (datos básicos)
- ✅ Logo de empresa
- ✅ Relación empresa ↔ usuarios
- ✅ Edición avanzada de perfil de empresa
- ✅ Visualización pública de empresa

### 🚚 Servicios (Busco / Ofrezco)

- ✅ Crear servicio
- ✅ Editar servicio
- ✅ Eliminar servicio
- ✅ Cambiar estado del servicio
- ✅ Estados:
  - activo
  - asignado
  - finalizado
- ✅ Visualización pública de servicios
- ✅ Filtros de servicios
- ✅ Detalle completo del servicio
- ✅ Imágenes de servicio
- ✅ Cálculo de distancia aproximada (Google Distance API)
- ✅ Registro de visualizaciones (service_views)
- ✅ Reporte mensual de servicios
- ✅ Generación de reporte mensual en PDF

### ⭐ Sistema de Reseñas

- ✅ Generación de link de reseña
- ✅ Envío del link al cliente
- ✅ Formulario público de reseña
- ✅ Registro de calificación
- ✅ Asociación reseña ↔ empresa
- ✅ Visualización de reseñas en perfil empresa

### 🔔 Sistema de Notificaciones

Motor desacoplado basado en eventos.

- ✅ Dispatcher multi-canal
- ✅ Canal Database
- ✅ Canal Email
- ✅ Sistema de eventos de negocio
- ✅ Notificaciones replicadas a usuarios de empresa
- ✅ Lectura individual de notificaciones
- ✅ Conteo de notificaciones
- ✅ Eliminación de notificaciones

**Eventos actuales:**

- Servicio publicado
- Servicio asignado
- Servicio finalizado
- Servicio visto múltiples veces
- Servicio próximo a vencer
- Resumen diario de vistas

Este motor constituye el Notification Engine inicial del sistema.

### 📦 Solicitudes de Mudanza (Leads)

Nuevo módulo agregado al sistema.

- ✅ Formulario público para solicitar mudanza
- ✅ Verificación por correo del cliente
- ✅ Registro de solicitud en base de datos
- ✅ Envío de resumen al cliente
- ✅ Visualización de solicitudes en dashboard empresa
- ✅ Compra de leads mediante tokens
- ✅ Sistema de leads comprados

### 🎨 UI / UX

- ✅ Layout general (Header / Footer)
- ✅ Menú lateral dinámico
- ✅ Skeleton loaders
- ✅ Modales reutilizables
- ✅ Formularios con validaciones visuales
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Componentización modular

---

## 3. Funcionalidades Pendientes por Milestone

### 📦 Milestone 2 (cerrada)

- ✅ Arquitectura base
- ✅ Autenticación
- ✅ Dashboard inicial
- ✅ Perfil usuario
- ✅ Perfil empresa básico
- ✅ Verificación por correo

### 🚚 Milestone 3 (en progreso)

Esta milestone corresponde al núcleo funcional del sistema.

**Implementado:**

- ✅ CRUD completo de servicios
- ✅ Sistema Busco / Ofrezco
- ✅ Filtros de servicios
- ✅ Estados del servicio
- ✅ Registro de visualizaciones
- ✅ Reporte mensual
- ✅ Sistema de reseñas
- ✅ Módulo de solicitudes de mudanza
- ✅ Sistema de leads

**Pendiente para cerrar milestone:**

- ⏳ Anti-spam avanzado de servicios
- ⏳ Búsqueda global optimizada
- ⏳ Migración Mailtrap → proveedor real

### 🤝 Milestone 4 (futuro)

- ⏳ Radar de coincidencias entre servicios
- ⏳ Directorio completo de empresas
- ⏳ Sistema de reputación ampliado
- ⏳ Notificaciones push reales
- ⏳ PWA completa

### 💳 Milestone 5 (futuro)

- ⏳ Sistema de suscripciones
- ⏳ Integración Stripe
- ⏳ Plan Free / Base / Pro
- ⏳ Limitaciones por plan
- ⏳ Dashboard administrativo

---

## 4. Avances Técnicos, Decisiones y Estado Actual del Proyecto

**Proyecto:** Mudanza Facil

### 4.1 Resumen General

Hasta la milestone actual se construyó un MVP funcional robusto que incluye:

- Autenticación completa
- Gestión de empresas y usuarios
- Publicación de servicios
- Sistema de reseñas
- Motor inicial de notificaciones
- Solicitudes de mudanza
- Sistema de leads
- Reportes y estadísticas básicas

La base ya permite operar una plataforma funcional de logística para mudanzas.

---

## 5. Backend – Laravel (Estado Actual)

### ✔️ Arquitectura modular

**Módulos implementados:**

- Empresa
- Usuario
- Servicio
- Notificacion
- Resena
- SolicitudMudanza

Cada módulo contiene:

- Controllers
- Models
- Mails
- Requests
- Services
- Repositories
- Routes independientes

Esto permite escalabilidad y separación de responsabilidades.

### ✔️ Autenticación

- Laravel Sanctum configurado
- Tokens funcionales
- Middleware auth:sanctum
- Autenticación empresa / usuario

### ✔️ Sistema de Notificaciones

Arquitectura basada en eventos:

- Dispatcher multi-canal
- Channels desacoplados
- Queue para envío de emails
- Scheduler para eventos programados

Esto permite escalar el sistema de notificaciones hacia push y alertas inteligentes.

### ✔️ Base de datos

**Tablas principales activas:**

- empresas
- usuarios
- servicios
- servicio_imagenes
- service_views
- notificaciones
- notificacion_usuario
- resenas
- resena_links
- solicitudes_mudanza
- lead_compras
- notification_preferences
- notification_metrics

La estructura está preparada para soportar:

- reputación
- suscripciones
- notificaciones
- alertas de búsqueda
- monetización futura

---

## 6. Frontend – Next.js (Estado Actual)

### ✔️ App Router

**Rutas activas principales:**

- /empresa/*
- /usuario/*
- /servicios/*
- /resena/*
- /solicitar-mudanza
- /login
- /register

### ✔️ Comunicación Front ↔ Back

- Fetch directo a API
- Token almacenado en localStorage
- Headers Bearer en peticiones protegidas

### ✔️ Componentización

**Componentes organizados por dominio:**

- cards
- filters
- modals
- skeletons
- layout

Esto permite reutilización y escalabilidad del frontend.

---

## 7. UI / UX Implementado

- ✅ Skeleton loaders
- ✅ Modales reutilizables
- ✅ Cards dinámicas
- ✅ Dropdowns interactivos
- ✅ Estados dinámicos
- ✅ Feedback visual
- ✅ Diseño responsive mobile-first

---

## 8. Qué está listo para producción futura

El sistema ya cuenta con:

- Arquitectura modular
- Seguridad básica
- Autenticación estable
- Motor de notificaciones inicial
- Sistema de servicios funcional
- Sistema de leads
- Sistema de reseñas

**Falta principalmente:**

- monetización
- push notifications
- radar de coincidencias
- panel administrativo

---

## 9. Recomendaciones para la Siguiente Milestone

- Finalizar Notification Engine
- Implementar Radar de coincidencias entre servicios
- Integrar Push Notifications reales
- Migrar Mailtrap a proveedor real
- Iniciar sistema de planes y suscripciones

---

## 10. Objetivo de este documento

Este documento sirve como:

- 📌 Punto de referencia técnico
- 🧭 Guía para continuar el desarrollo
- 🤝 Contexto compartido entre chats

Permite retomar el desarrollo sin pérdida de contexto ni decisiones técnicas.

---

**Estado actual:** sólido, estable y listo para crecer 🚀

## Estrucrura de carpetas
├── 📁 backend
│   ├── 📁 app
│   │   ├── 📁 Console
│   │   │   ├── 📁 Commands
│   │   │   │   ├── 🐘 CheckServiciosPorVencer.php
│   │   │   │   ├── 🐘 CheckSubscriptions.php
│   │   │   │   ├── 🐘 CleanEmailVerifications.php
│   │   │   │   ├── 🐘 ProcessRadarMatches.php
│   │   │   │   └── 🐘 SendDailyServiceViewsSummary.php
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Events
│   │   │   └── 🐘 RadarMatchFound.php
│   │   ├── 📁 Http
│   │   │   ├── 📁 Controllers
│   │   │   │   ├── 📁 Auth
│   │   │   │   │   └── 🐘 RecoverPasswordController.php
│   │   │   │   ├── 🐘 Controller.php
│   │   │   │   ├── 🐘 StripeController.php
│   │   │   │   └── 🐘 StripeCreditosController.php
│   │   │   ├── 📁 Middleware
│   │   │   │   ├── 🐘 Authenticate.php
│   │   │   │   ├── 🐘 CheckPlanPermission.php
│   │   │   │   ├── 🐘 ForceJsonResponse.php
│   │   │   │   ├── 🐘 InternalApiMiddleware.php
│   │   │   │   └── 🐘 RedirectIfAuthenticated.php
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Jobs
│   │   │   └── 🐘 SendNotificationEmailJob.php
│   │   ├── 📁 Listeners
│   │   │   └── 🐘 SendRadarMatchNotification.php
│   │   ├── 📁 Mail
│   │   │   └── 🐘 RecoverPasswordMail.php
│   │   ├── 📁 Models
│   │   │   ├── 🐘 EmailVerification.php
│   │   │   └── 🐘 User.php
│   │   ├── 📁 Modules
│   │   │   ├── 📁 Auth
│   │   │   ├── 📁 Empresa
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   ├── 🐘 CreditosController.php
│   │   │   │   │   ├── 🐘 EmpresaAuthController.php
│   │   │   │   │   ├── 🐘 EmpresaController.php
│   │   │   │   │   ├── 🐘 EmpresaFeedController.php
│   │   │   │   │   ├── 🐘 EmpresaPublicController.php
│   │   │   │   │   ├── 🐘 EmpresaRadarConfigController.php
│   │   │   │   │   ├── 🐘 PlanController.php
│   │   │   │   │   └── 🐘 TrialController.php
│   │   │   │   ├── 📁 Mail
│   │   │   │   │   ├── 🐘 CompraCreditosMail.php
│   │   │   │   │   ├── 🐘 CreditosBajosMail.php
│   │   │   │   │   ├── 🐘 EmpresaGoodbyeMail.php
│   │   │   │   │   ├── 🐘 EmpresaVerificationCode.php
│   │   │   │   │   ├── 🐘 EmpresaWelcomeMail.php
│   │   │   │   │   ├── 🐘 PlanActivatedMail.php
│   │   │   │   │   ├── 🐘 TrialEndingMail.php
│   │   │   │   │   ├── 🐘 TrialExpiredMail.php
│   │   │   │   │   └── 🐘 TrialRequestMail.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 Empresa.php
│   │   │   │   │   ├── 🐘 EmpresaImagen.php
│   │   │   │   │   ├── 🐘 EmpresaRadarConfig.php
│   │   │   │   │   └── 🐘 TrialRequest.php
│   │   │   │   ├── 📁 Repositories
│   │   │   │   ├── 📁 Requests
│   │   │   │   │   ├── 🐘 EmpresaUpdateRequest.php
│   │   │   │   │   ├── 🐘 LoginEmpresaRequest.php
│   │   │   │   │   └── 🐘 RegisterEmpresaRequest.php
│   │   │   │   ├── 📁 Services
│   │   │   │   │   ├── 🐘 EmpresaFeedService.php
│   │   │   │   │   ├── 🐘 EmpresaImagenService.php
│   │   │   │   │   ├── 🐘 EmpresaService.php
│   │   │   │   │   ├── 🐘 PlanService.php
│   │   │   │   │   ├── 🐘 PricingService.php
│   │   │   │   │   └── 🐘 TrialService.php
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
│   │   │   │   │   ├── 🐘 CreditosAgregadosEvent.php
│   │   │   │   │   ├── 🐘 FreePlanInactiveEvent.php
│   │   │   │   │   ├── 🐘 LoginEmpresaEvent.php
│   │   │   │   │   ├── 🐘 PlanChangedEvent.php
│   │   │   │   │   ├── 🐘 PlanExpiredEvent.php
│   │   │   │   │   ├── 🐘 PlanExpiringEvent.php
│   │   │   │   │   ├── 🐘 RadarMatchNotificationEvent.php
│   │   │   │   │   ├── 🐘 ServicioAsignadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioFinalizadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioPorVencerEvent.php
│   │   │   │   │   ├── 🐘 ServicioPublicadoEvent.php
│   │   │   │   │   ├── 🐘 ServicioVistoEvent.php
│   │   │   │   │   ├── 🐘 ServiciosCreadosMesEvent.php
│   │   │   │   │   ├── 🐘 TrialEnding5DaysEvent.php
│   │   │   │   │   ├── 🐘 TrialEndingTomorrowEvent.php
│   │   │   │   │   └── 🐘 TrialExpiredEvent.php
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
│   │   │   │   │   ├── 🐘 RadarController.php
│   │   │   │   │   └── 🐘 ServicioController.php
│   │   │   │   ├── 📁 Mail
│   │   │   │   │   └── 🐘 RadarMatchesMail.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 RadarMatch.php
│   │   │   │   │   ├── 🐘 ServiceMatch.php
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
│   │   │   │   │   ├── 🐘 MatchingService.php
│   │   │   │   │   ├── 🐘 ServicioImagenService.php
│   │   │   │   │   └── 🐘 ServicioService.php
│   │   │   │   └── 🐘 routes.php
│   │   │   ├── 📁 SolicitudMudanza
│   │   │   │   ├── 📁 Controllers
│   │   │   │   │   ├── 🐘 LeadOperacionController.php
│   │   │   │   │   └── 🐘 SolicitudMudanzaController.php
│   │   │   │   ├── 📁 Mail
│   │   │   │   │   ├── 🐘 LeadCompradoMail.php
│   │   │   │   │   ├── 🐘 SolicitudMudanzaResumen.php
│   │   │   │   │   ├── 🐘 SolicitudMudanzaVerificationCode.php
│   │   │   │   │   └── 🐘 SolicitudSeguroMail.php
│   │   │   │   ├── 📁 Models
│   │   │   │   │   ├── 🐘 LeadCompra.php
│   │   │   │   │   └── 🐘 SolicitudMudanza.php
│   │   │   │   ├── 📁 Requests
│   │   │   │   │   ├── 🐘 ReenviarCodigoSolicitudRequest.php
│   │   │   │   │   ├── 🐘 StoreSolicitudMudanzaRequest.php
│   │   │   │   │   └── 🐘 VerifySolicitudMudanzaRequest.php
│   │   │   │   ├── 📁 Services
│   │   │   │   │   ├── 🐘 ReferralService.php
│   │   │   │   │   └── 🐘 SolicitudMudanzaService.php
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
│   │   │   ├── 🐘 EventServiceProvider.php
│   │   │   └── 🐘 RouteServiceProvider.php
│   │   └── 📁 Services
│   │       ├── 📁 Google
│   │       │   └── 🐘 GoogleDistanceService.php
│   │       ├── 🐘 CloudinaryService.php
│   │       ├── 🐘 MailtrapService.php
│   │       └── 🐘 StripeService.php
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
│   │   ├── 🐘 session.php
│   │   ├── 🐘 stripe_creditos.php
│   │   └── 🐘 stripe_plans.php
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
│   │   │   ├── 🐘 2026_02_16_230425_create_notification_metrics_table.php
│   │   │   ├── 🐘 2026_02_21_234742_create_solicitudes_mudanza_table.php
│   │   │   ├── 🐘 2026_02_25_014514_add_vivienda_destino_to_solicitudes_mudanza_table.php
│   │   │   ├── 🐘 2026_02_25_222623_add_tokens_to_empresas_table.php
│   │   │   ├── 🐘 2026_02_25_222805_create_lead_compras_table.php
│   │   │   ├── 🐘 2026_02_26_214026_update_solicitudes_mudanza_add_new_fields.php
│   │   │   ├── 🐘 2026_02_26_224140_update_fecha_recoleccion_enum_in_solicitudes_mudanza_table.php
│   │   │   ├── 🐘 2026_02_27_225816_update_elevador_enum_in_solicitudes_mudanza_table.php
│   │   │   ├── 🐘 2026_03_04_125113_update_add_estado_operacion_to_lead_compras.php
│   │   │   ├── 🐘 2026_03_06_000117_add_referido_to_solicitudes_mudanza.php
│   │   │   ├── 🐘 2026_03_10_121625_add_cliente_fields_to_resenas_table.php
│   │   │   ├── 🐘 2026_03_10_134607_fix_empresa_origen_nullable_in_resenas.php
│   │   │   ├── 🐘 2026_03_17_001536_create_service_matches_table.php
│   │   │   ├── 🐘 2026_03_19_120823_create_radar_matches_table.php
│   │   │   ├── 🐘 2026_03_19_145939_add_last_radar_run_at_to_servicios_table.php
│   │   │   ├── 🐘 2026_03_19_150640_add_radar_stage_to_servicios_table.php
│   │   │   ├── 🐘 2026_03_26_220249_add_plan_to_empresas_table.php
│   │   │   ├── 🐘 2026_03_26_235431_add_free_since_to_empresas_table.php
│   │   │   ├── 🐘 2026_03_27_155329_add_trial_fields_to_empresas_table.php
│   │   │   ├── 🐘 2026_03_30_110001_create_empresa_radar_configs_table.php
│   │   │   ├── 🐘 2026_03_31_184643_add_tipo_vehiculo_to_servicios_table.php
│   │   │   ├── 🐘 2026_03_31_190104_make_volumen_nullable_on_servicios_table.php
│   │   │   ├── 🐘 2026_04_02_214130_add_verificado_to_empresas_table.php
│   │   │   ├── 🐘 2026_04_05_144601_create_trial_requests_table.php
│   │   │   ├── 🐘 2026_04_06_214823_add_docs_to_trial_requests_table.php
│   │   │   ├── 🐘 2026_04_06_223008_update_trial_urls_columns.php
│   │   │   ├── 🐘 2026_04_10_222542_add_recurrente_to_empresas_table.php
│   │   │   ├── 🐘 2026_04_11_124451_create_empresa_imagens_table.php
│   │   │   ├── 🐘 2026_04_14_225538_add_stripe_fields_to_empresas.php
│   │   │   └── 🐘 2026_04_24_000457_add_cancel_flag_to_empresas.php
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
│   │       │   ├── 🐘 compra_creditos.blade.php
│   │       │   ├── 🐘 creditos_bajos.blade.php
│   │       │   ├── 🐘 empresa_goodbye.blade.php
│   │       │   ├── 🐘 empresa_verification_code.blade.php
│   │       │   ├── 🐘 empresa_welcome.blade.php
│   │       │   ├── 🐘 lead_comprado.blade.php
│   │       │   ├── 🐘 nueva-resena.blade.php
│   │       │   ├── 🐘 plan_activated.blade.php
│   │       │   ├── 🐘 radar_matches.blade.php
│   │       │   ├── 🐘 recover_password.blade.php
│   │       │   ├── 🐘 solicitud_mudanza_resumen.blade.php
│   │       │   ├── 🐘 solicitud_mudanza_verification_code.blade.php
│   │       │   ├── 🐘 solicitud_seguro.blade.php
│   │       │   ├── 🐘 trial_ending.blade.php
│   │       │   ├── 🐘 trial_expired.blade.php
│   │       │   ├── 🐘 trial_request.blade.php
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
│   ├── 📄 artisan
│   ├── ⚙️ composer.json
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
│   │   │   ├── 🖼️ ajustes.png
│   │   │   ├── 🖼️ arrow_down.png
│   │   │   ├── 🖼️ borrar.png
│   │   │   ├── 🖼️ busco.png
│   │   │   ├── 🖼️ busco_btn.png
│   │   │   ├── 🖼️ cambios.png
│   │   │   ├── 🖼️ campana.png
│   │   │   ├── 🖼️ candado-cerrado.png
│   │   │   ├── 🖼️ candado.png
│   │   │   ├── 🖼️ check.png
│   │   │   ├── 🖼️ check_success.png
│   │   │   ├── 🖼️ cliente.png
│   │   │   ├── 🖼️ clientew.png
│   │   │   ├── 🖼️ comprobado.png
│   │   │   ├── 🖼️ conectar.png
│   │   │   ├── 🖼️ conector.png
│   │   │   ├── 🖼️ cookies.png
│   │   │   ├── 🖼️ copy.png
│   │   │   ├── 🖼️ copyw.png
│   │   │   ├── 🖼️ correo_verificado.png
│   │   │   ├── 🖼️ credito.png
│   │   │   ├── 🖼️ cuenta.png
│   │   │   ├── 🖼️ datos.png
│   │   │   ├── 🖼️ default-user.png
│   │   │   ├── 🖼️ delete.png
│   │   │   ├── 🖼️ derechos.png
│   │   │   ├── 🖼️ destino.png
│   │   │   ├── 🖼️ docs.png
│   │   │   ├── 🖼️ eraser.png
│   │   │   ├── 🖼️ explorar.png
│   │   │   ├── 🖼️ eye.png
│   │   │   ├── 🖼️ eye_off.png
│   │   │   ├── 🖼️ filtrar.png
│   │   │   ├── 🖼️ help.png
│   │   │   ├── 🖼️ hogar.png
│   │   │   ├── 🖼️ hogar_2.png
│   │   │   ├── 🖼️ icon.svg
│   │   │   ├── 🖼️ logout.png
│   │   │   ├── 🖼️ lupa.png
│   │   │   ├── 🖼️ mensaje.png
│   │   │   ├── 🖼️ menu.png
│   │   │   ├── 🖼️ ofrezco.png
│   │   │   ├── 🖼️ ofrezco_btn.png
│   │   │   ├── 🖼️ ojo.png
│   │   │   ├── 🖼️ pause.png
│   │   │   ├── 🖼️ place-marker.png
│   │   │   ├── 🖼️ planes.png
│   │   │   ├── 🖼️ play.png
│   │   │   ├── 🖼️ prohibicion.png
│   │   │   ├── 🖼️ radar.png
│   │   │   ├── 🖼️ reloj_de_arena.png
│   │   │   ├── 🖼️ share.png
│   │   │   ├── 🖼️ shareW.png
│   │   │   ├── 🖼️ suscripcion.png
│   │   │   ├── 🖼️ suspendido.png
│   │   │   ├── 🖼️ team.png
│   │   │   ├── 🖼️ tel.png
│   │   │   ├── 🖼️ telefono.png
│   │   │   ├── 🖼️ todo.png
│   │   │   ├── 🖼️ todos.png
│   │   │   ├── 🖼️ token.png
│   │   │   ├── 🖼️ token_blue.png
│   │   │   ├── 🖼️ token_color.png
│   │   │   ├── 🖼️ truck.png
│   │   │   ├── 🖼️ user-placeholder.png
│   │   │   ├── 🖼️ verificado.png
│   │   │   └── 🖼️ whatsapp.png
│   │   ├── 📁 images
│   │   │   └── 🖼️ hero_seguro.png
│   │   ├── 📁 logo
│   │   │   ├── 🖼️ Logo2.png
│   │   │   ├── 🖼️ icon.png
│   │   │   ├── 🖼️ logo.png
│   │   │   ├── 🖼️ logo3.png
│   │   │   └── 🖼️ logo_A.png
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ icon.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── 📁 src
│   │   ├── 📁 app
│   │   │   ├── 📁 ayuda
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 cotizar-mudanza
│   │   │   │   ├── 📄 CotizadorMudanzaClient.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 empresa
│   │   │   │   ├── 📁 [id]
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 ayuda
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 cargas
│   │   │   │   │   ├── 📁 busco
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 ofrezco
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 referir
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 configuracion
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 confirmacion
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 creditos
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
│   │   │   │   ├── 📁 planes
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 publicaciones
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 register
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 solicitudes
│   │   │   │   │   └── 📁 [id]
│   │   │   │   │       └── 📄 page.jsx
│   │   │   │   └── 📁 usuarios
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 resena
│   │   │   │   └── 📁 [token]
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 seguros
│   │   │   │   ├── 📄 FAQItem.jsx
│   │   │   │   ├── 📄 SeguroClient.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 servicios
│   │   │   │   └── 📁 [id]
│   │   │   │       ├── 📁 editar
│   │   │   │       │   ├── 📁 busco
│   │   │   │       │   │   └── 📄 page.jsx
│   │   │   │       │   └── 📁 ofrezco
│   │   │   │       │       └── 📄 page.jsx
│   │   │   │       └── 📄 page.jsx
│   │   │   ├── 📁 solicitar-mudanza
│   │   │   │   ├── 📁 [empresa]
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📄 SolicitarMudanzaClient.jsx
│   │   │   │   └── 📄 page.jsx
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
│   │   │   │   ├── 📄 CreditPackageCard.jsx
│   │   │   │   ├── 📄 EmpresaCard.jsx
│   │   │   │   ├── 📄 NotificationCard.jsx
│   │   │   │   ├── 📄 ReviewCard.jsx
│   │   │   │   ├── 📄 ServiceCard.jsx
│   │   │   │   ├── 📄 SolicitudMudanzaCard.jsx
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
│   │   │   │   ├── 📄 CancelSubscriptionModal.jsx
│   │   │   │   ├── 📄 CompraCreditosModal.jsx
│   │   │   │   ├── 📄 ComprarLeadModal.jsx
│   │   │   │   ├── 📄 ConfirmDeleteNotificationModal.jsx
│   │   │   │   ├── 📄 ConfirmFinalizarServicioModal.jsx
│   │   │   │   ├── 📄 ConfirmRecoverModal.jsx
│   │   │   │   ├── 📄 FinalizarServicioGananciaModal.jsx
│   │   │   │   ├── 📄 MessageModal.jsx
│   │   │   │   ├── 📄 RecoverPasswordModal.jsx
│   │   │   │   ├── 📄 ReporteMensualModal.jsx
│   │   │   │   ├── 📄 ShareClienteReviewLinkModal.jsx
│   │   │   │   ├── 📄 ShareReviewLinkModal.jsx
│   │   │   │   └── 📄 TrialRequestModal.jsx
│   │   │   ├── 📁 skeletons
│   │   │   │   ├── 📄 ProfileSkeleton.jsx
│   │   │   │   ├── 📄 ServiceCardSkeleton.jsx
│   │   │   │   └── 📄 UserCardSkeleton.jsx
│   │   │   ├── 📁 system
│   │   │   │   ├── 📄 AyudaContent.jsx
│   │   │   │   └── 📄 PlanWatcher.jsx
│   │   │   └── 📁 ui
│   │   │       ├── 📄 FeedbackModal.jsx
│   │   │       └── 📄 LoadingOverlay.jsx
│   │   ├── 📁 hooks
│   │   │   ├── 📄 useClickOutside.js
│   │   │   ├── 📄 useGooglePlaces.js
│   │   │   └── 📄 useServicios.js
│   │   ├── 📁 modules
│   │   ├── 📁 services
│   │   │   └── 📄 api.js
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
│   │   │   │   ├── 🎨 _creditPackageCard.scss
│   │   │   │   ├── 🎨 _empresaCard.scss
│   │   │   │   ├── 🎨 _feedbackModal.scss
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
│   │   │   │   ├── 🎨 _trialRequestModal.scss
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
│   │   │   │   │   ├── 🎨 _empresaConfiguracion.scss
│   │   │   │   │   ├── 🎨 _empresaConfirmacion.scss
│   │   │   │   │   ├── 🎨 _empresaCreditos.scss
│   │   │   │   │   ├── 🎨 _empresaDashboard.scss
│   │   │   │   │   ├── 🎨 _empresaEditar.scss
│   │   │   │   │   ├── 🎨 _empresaEmpresas.scss
│   │   │   │   │   ├── 🎨 _empresaLogin.scss
│   │   │   │   │   ├── 🎨 _empresaOfrezco.scss
│   │   │   │   │   ├── 🎨 _empresaPerfil.scss
│   │   │   │   │   ├── 🎨 _empresaPlanes.scss
│   │   │   │   │   ├── 🎨 _empresaReferir.scss
│   │   │   │   │   ├── 🎨 _empresaRegister.scss
│   │   │   │   │   └── 🎨 _empresaUsuarios.scss
│   │   │   │   ├── 📁 resena
│   │   │   │   │   └── 🎨 _resena.scss
│   │   │   │   ├── 📁 servicios
│   │   │   │   │   ├── 🎨 _detallesServicio.scss
│   │   │   │   │   └── 🎨 _eliminarServicio.scss
│   │   │   │   ├── 📁 solicitudes
│   │   │   │   │   └── 🎨 _detalleSolicitud.scss
│   │   │   │   ├── 📁 usuario
│   │   │   │   │   ├── 🎨 _usuarioEditar.scss
│   │   │   │   │   ├── 🎨 _usuarioLogin.scss
│   │   │   │   │   ├── 🎨 _usuarioNotificaciones.scss
│   │   │   │   │   └── 🎨 _usuarioPerfil.scss
│   │   │   │   ├── 🎨 _ayuda.scss
│   │   │   │   ├── 🎨 _ayudaPublic.scss
│   │   │   │   ├── 🎨 _cotizadorMudanza.scss
│   │   │   │   ├── 🎨 _error.scss
│   │   │   │   ├── 🎨 _seguros.scss
│   │   │   │   └── 🎨 _solicitarMudanza.scss
│   │   │   ├── 📁 utils
│   │   │   │   ├── 🎨 _containers.scss
│   │   │   │   ├── 🎨 _mixins.scss
│   │   │   │   └── 🎨 _variables.scss
│   │   │   └── 🎨 globals.scss
│   │   └── 📁 utils
│   │       ├── 📄 auth.js
│   │       ├── 📄 cloudinaryUpload.js
│   │       ├── 📄 plan.js
│   │       └── 📄 whatsapp.js
│   ├── 📄 eslint.config.mjs
│   ├── ⚙️ jsconfig.json
│   ├── 📄 next.config.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json

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