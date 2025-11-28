backend/
├── 📄 .editorconfig
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitattributes
├── 📄 artisan                          # CLI de Laravel
├── 📄 composer.json                    # Dependencias PHP
├── 📄 package.json                     # Dependencias Node.js
├── 📄 phpunit.xml                      # Configuración de tests
├── 📄 readme.md
├── 📄 red_mudancera_dev
├── 📄 vite.config.js                   # Configuración de Vite
│
├── 📁 app/                             # Código principal de la aplicación
│   ├── 📁 Http/                        # Controladores HTTP
│   ├── 📁 Models/                      # Modelos Eloquent
│   ├── 📁 Modules/                     # Módulos personalizados
│   │   ├── 📁 Empresa/
│   │   │   ├── Controllers/
│   │   │   │   └── EmpresaAuthController.php
│   │   │   └── Models/
│   │   │       └── Empresa.php
│   │   └── 📁 Usuario/
│   │       └── Models/
│   │           └── Usuario.php
│   └── 📁 Providers/                   # Service Providers
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php
│
├── 📁 bootstrap/                       # Archivos de inicialización
│   ├── app.php                         # Bootstrapping de la aplicación
│   ├── providers.php                   # Registro de providers
│   └── 📁 cache/
│
├── 📁 config/                          # Archivos de configuración
│   ├── app.php
│   ├── auth.php                        # Autenticación (Sanctum + Empresa)
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php                     # Configuración de API tokens
│   ├── services.php
│   └── session.php
│
├── 📁 database/                        # Base de datos
│   ├── 📁 migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 2025_11_26_074631_create_empresas_table.php
│   │   └── 2025_11_26_074711_create_usuarios_table.php
│   └── 📁 seeders/
│       └── DatabaseSeeder.php
│
├── 📁 public/                          # Archivos públicos
│   ├── 📄 index.php                    # Punto de entrada
│   └── 📄 storage/ (enlace simbólico)
│
├── 📁 resources/                       # Recursos (vistas, CSS, JS)
│   ├── 📁 css/
│   │   └── app.css                     # Tailwind CSS
│   ├── 📁 js/
│   │   └── app.js
│   └── 📁 views/
│       └── welcome.blade.php           # Vista de bienvenida
│
├── 📁 routes/                          # Definición de rutas
│   ├── api.php                         # Rutas API (Empresa Auth)
│   ├── web.php                         # Rutas web
│   └── console.php                     # Comandos Artisan
│
├── 📁 storage/                         # Almacenamiento
│   ├── 📁 app/                         # Archivos de aplicación
│   ├── 📁 framework/                   # Caché y sesiones
│   ├── 📁 logs/                        # Logs
│   └── 📁 public/                      # Archivos públicos
│
├── 📁 tests/                           # Tests automatizados
│   ├── 📁 Feature/
│   │   └── ExampleTest.php
│   └── TestCase.php
│
└── 📁 vendor/                          # Dependencias Composer