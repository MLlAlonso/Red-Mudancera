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