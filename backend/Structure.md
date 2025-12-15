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