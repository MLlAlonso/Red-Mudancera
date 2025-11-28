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
├── 📁 app/                             # Código principal de la aplicación
│   ├── 📁 Http/
│   │   ├── Kernel.php                  # Middleware HTTP
│   │   └── 📁 Middleware/
│   │       └── Authenticate.php        # Middleware de autenticación
│   ├── 📁 Models/
│   ├── 📁 Modules/                     # Módulos personalizados
│   │   ├── 📁 Empresa/
│   │   │   ├── 📁 Controllers/
│   │   │   │   └── EmpresaAuthController.php
│   │   │   └── 📁 Models/
│   │   │       └── Empresa.php
│   │   └── 📁 Usuario/
│   │       └── 📁 Models/
│   │           └── Usuario.php
│   └── 📁 Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php
│
├── 📁 bootstrap/
│   ├── app.php                         # Bootstrapping de la aplicación
│   ├── providers.php                   # Registro de providers
│   └── 📁 cache/
│
├── 📁 config/
│   ├── app.php
│   ├── auth.php                        # Autenticación (Sanctum + Empresa)
│   ├── cache.php
│   ├── database.php                    # Conexión a BD
│   ├── filesystems.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php                     # Configuración de API tokens
│   ├── services.php
│   └── session.php
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
│   ├── index.php                       # Punto de entrada
│   └── storage/ (enlace simbólico)
│
├── 📁 resources/
│   ├── 📁 css/
│   │   └── app.css                     # Tailwind CSS
│   ├── 📁 js/
│   │   └── app.js
│   └── 📁 views/
│       └── welcome.blade.php
│
├── 📁 routes/
│   ├── api.php                         # Rutas API (Empresa Auth)
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