frontend/
├── 📄 .eslintrc.mjs                    # Configuración ESLint
├── 📄 .gitignore
├── 📄 eslint.config.mjs                # Configuración ESLint (mejorado)
├── 📄 jsconfig.json                    # Configuración JavaScript
├── 📄 next.config.js                   # Configuración Next.js
├── 📄 package.json                     # Dependencias Node.js
├── 📄 package-lock.json
├── 📄 carpetas.md                      # Documentación de estructura
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   │   ├── hogar_2.png
│   │   └── menu.png
│   ├── 📁 logo/
│   │   └── logo.png
│   ├── next.svg
│   └── vercel.svg
│
└── 📁 src/                             # Código fuente de la aplicación
    ├── 📁 app/                         # Rutas y páginas (Next.js App Router)
    │   ├── 📁 dashboard/
    │   │   └── page.jsx                # Dashboard principal
    │   ├── 📁 login/
    │   │   └── page.jsx                # Página de login
    │   ├── 📁 register/
    │   │   └── page.jsx                # Página de registro
    │   ├── 📁 test-ui/
    │   │   └── page.jsx                # Página para probar UI
    │   ├── 📄 favicon.ico              # Favicon del sitio
    │   ├── 📄 globals.css              # Estilos globales CSS
    │   ├── 📄 layout.js                # Layout principal
    │   ├── 📄 page.js                  # Página principal
    │   └── 📄 page.module.css          # Estilos del módulo principal
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   └── ServiceCard.jsx         # Tarjeta de servicio (Busco/Ofrezco)
    │   │
    │   ├── 📁 common/                  # Componentes genéricos
    │   │   ├── Button_cta.jsx          # Botón CTA (Call To Action)
    │   │   ├── Button_crud.jsx         # Botón CRUD
    │   │   ├── Button_error.jsx        # Botón Error
    │   │   ├── Button_success.jsx      # Botón Success
    │   │   └── Input.jsx               # Campo de entrada
    │   │
    │   ├── 📁 filters/
    │   │   └── ServiceFilters.jsx      # Filtros de servicios
    │   │
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx              # Pie de página
    │   │   ├── Header.jsx              # Encabezado/Navbar
    │   │   └── SideMenu.jsx            # Menú lateral
    │   │
    │   └── 📁 ui/                      # ⚠️ VACÍO - Componentes UI adicionales
    │
    ├── 📁 hooks/                       # ⚠️ VACÍO - Custom React hooks
    │
    ├── 📁 modules/                     # Módulos por funcionalidad
    │   ├── 📁 auth/                    # ⚠️ VACÍO - Módulo de autenticación
    │   ├── 📁 dashboard/               # ⚠️ VACÍO - Módulo de dashboard
    │   ├── 📁 empresa/                 # ⚠️ VACÍO - Módulo de empresa
    │   └── 📁 servicios/               # ⚠️ VACÍO - Módulo de servicios
    │
    ├── 📁 services/                    # ⚠️ VACÍO - Servicios API/lógica
    │
    ├── 📁 store/                       # ⚠️ VACÍO - Estado global (Redux/Zustand)
    │
    ├── 📁 utils/                       # ⚠️ VACÍO - Funciones utilitarias
    │
    └── 📁 styles/                      # Estilos SCSS globales
        ├── 📁 components/              # Estilos de componentes
        │   ├── _buttons.scss           # Estilos botones
        │   ├── _cards.scss             # Estilos tarjetas
        │   ├── _inputs.scss            # Estilos inputs
        │   ├── _serviceCard.scss       # Estilos tarjetas servicio
        │   └── _serviceFilters.scss    # Estilos filtros
        │
        ├── 📁 layout/                  # Estilos de layout
        │   ├── _footer.scss            # Estilos footer
        │   ├── _header.scss            # Estilos header
        │   └── _sideMenu.scss          # Estilos menú lateral
        │
        ├── 📁 utils/                   # Utilidades SCSS
        │   ├── _containers.scss        # Clases contenedor
        │   ├── _mixins.scss            # Mixins SCSS
        │   └── _variables.scss         # Variables de diseño
        │
        └── 📄 globals.scss             # Estilos globales