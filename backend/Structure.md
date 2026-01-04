backend/
├── .editorconfig
├── .env
├── .env.example
├── .gitattributes
├── artisan
├── composer.json
├── composer.lock
├── package.json
├── package-lock.json
├── phpunit.xml
├── README.md
├── Structure.md                     # (este archivo) [backend/Structure.md](backend/Structure.md)
├── red_mudancera_dev
├── vite.config.js                   # [backend/vite.config.js](backend/vite.config.js)
│
├── app/
│   ├── Console/
│   │   ├── Kernel.php               # [App\Console\Kernel](backend/app/Console/Kernel.php)
│   │   └── Commands/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Kernel.php               # [backend/app/Http/Kernel.php](backend/app/Http/Kernel.php)
│   │   └── Middleware/
│   │       └── Authenticate.php
│   ├── Mail/                        # Mails (ej.: EmpresaVerificationCode) [backend/resources/views/emails/empresa_verification_code.blade.php](backend/resources/views/emails/empresa_verification_code.blade.php)
│   ├── Models/
│   │   └── (Modelos Eloquent)
│   ├── Modules/                     # Arquitectura modular por dominios
│   │   ├── Empresa/
│   │   │   ├── Controllers/
│   │   │   │   ├── EmpresaAuthController.php  # [`App\Modules\Empresa\Controllers\EmpresaAuthController`](backend/app/Modules/Empresa/Controllers/EmpresaAuthController.php)
│   │   │   │   └── EmpresaController.php      # [`App\Modules\Empresa\Controllers\EmpresaController`](backend/app/Modules/Empresa/Controllers/EmpresaController.php)
│   │   │   ├── Models/
│   │   │   │   └── Empresa.php                  # [backend/app/Modules/Empresa/Models/Empresa.php](backend/app/Modules/Empresa/Models/Empresa.php)
│   │   │   ├── Requests/
│   │   │   └── routes.php                        # [backend/app/Modules/Empresa/routes.php](backend/app/Modules/Empresa/routes.php)
│   │   ├── Usuario/
│   │   │   ├── Controllers/
│   │   │   │   ├── UsuarioAuthController.php    # [`App\Modules\Usuario\Controllers\UsuarioAuthController`](backend/app/Modules/Usuario/Controllers/UsuarioAuthController.php)
│   │   │   │   └── UsuarioController.php        # [`App\Modules\Usuario\Controllers\UsuarioController`](backend/app/Modules/Usuario/Controllers/UsuarioController.php)
│   │   │   ├── Models/
│   │   │   │   └── Usuario.php                  # [backend/app/Modules/Usuario/Models/Usuario.php](backend/app/Modules/Usuario/Models/Usuario.php)
│   │   │   ├── Requests/
│   │   │   └── routes.php                        # [backend/app/Modules/Usuario/routes.php](backend/app/Modules/Usuario/routes.php)
│   │   └── Servicio/                              # Módulo Servicios (planificado / parcial)
│   │       ├── Controllers/
│   │       │   └── ServicioController.php        # [backend/app/Modules/Servicio/Controllers/ServicioController.php](backend/app/Modules/Servicio/Controllers/ServicioController.php)
│   │       ├── Models/
│   │       │   └── Servicio.php                  # [backend/app/Modules/Servicio/Models/Servicio.php](backend/app/Modules/Servicio/Models/Servicio.php)
│   │       ├── Requests/
│   │       ├── Services/
│   │       ├── Repositories/
│   │       └── routes.php                        # [backend/app/Modules/Servicio/routes.php](backend/app/Modules/Servicio/routes.php)
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php              # [`App\Providers\RouteServiceProvider`](backend/app/Providers/RouteServiceProvider.php)
│
├── bootstrap/
│   ├── app.php                                   # [backend/bootstrap/app.php](backend/bootstrap/app.php)
│   └── cache/
│
├── config/
│   ├── app.php
│   ├── auth.php                                  # [backend/config/auth.php](backend/config/auth.php)
│   ├── cache.php
│   ├── cors.php                                  # [backend/config/cors.php](backend/config/cors.php)
│   ├── database.php
│   ├── filesystems.php                           # [backend/config/filesystems.php](backend/config/filesystems.php)
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php                               # [backend/config/sanctum.php](backend/config/sanctum.php)
│   └── session.php
│
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 2025_11_26_074631_create_empresas_table.php   # [backend/database/migrations/2025_11_26_074631_create_empresas_table.php](backend/database/migrations/2025_11_26_074631_create_empresas_table.php)
│   │   ├── 2025_11_26_074711_create_usuarios_table.php    # [backend/database/migrations/2025_11_26_074711_create_usuarios_table.php](backend/database/migrations/2025_11_26_074711_create_usuarios_table.php)
│   │   └── 2025_12_16_064630_create_servicios_table.php  # [backend/database/migrations/2025_12_16_064630_create_servicios_table.php](backend/database/migrations/2025_12_16_064630_create_servicios_table.php)
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── public/
│   ├── index.php                                   # [backend/public/index.php](backend/public/index.php)
│   └── storage/ (enlace simbólico → storage/app/public)
│
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js
│   └── views/
│       ├── welcome.blade.php                       # [backend/resources/views/welcome.blade.php](backend/resources/views/welcome.blade.php)
│       └── emails/
│           └── empresa_verification_code.blade.php # [backend/resources/views/emails/empresa_verification_code.blade.php](backend/resources/views/emails/empresa_verification_code.blade.php)
│
├── routes/
│   ├── api.php                                     # [backend/routes/api.php](backend/routes/api.php) (incluye módulos: Empresa, Usuario, Servicio)
│   └── web.php
│
├── storage/
│   ├── app/
│   ├── framework/
│   ├── logs/
│   └── public/
│
├── tests/
│   ├── Feature/
│   │   └── ExampleTest.php
│   └── TestCase.php
│
└── vendor/                                         # dependencias Composer