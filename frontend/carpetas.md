frontend/
├── 📄 .eslintrc.mjs                    # Configuración ESLint
├── 📄 .gitignore
├── 📄 eslint.config.mjs                # Configuración ESLint (mejorado)
├── 📄 jsconfig.json                    # Configuración JavaScript
├── 📄 next.config.js                   # Configuración Next.js
├── 📄 package.json                     # Dependencias Node.js
├── 📄 package-lock.json
├── 📄 carpetas.md                      # Documentación de estructura (este archivo)
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   │   ├── hogar_2.png
│   │   ├── menu.png
│   │   └── ...                         # iconos de UI
│   ├── 📁 logo/
│   │   ├── logo.png
│   │   └── mikkel.png
│   ├── next.svg
│   └── vercel.svg
│
└── 📁 src/                             # Código fuente de la aplicación
    ├── 📁 app/                         # Rutas y páginas (Next.js App Router)
    │   ├── 📁 dashboard/               # Dashboards y páginas principales
    │   │   └── page.jsx
    │   ├── 📁 empresa/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 servicios/               # Rutas públicas / servicios (futuro)
    │   ├── 📁 test-ui/
    │   │   └── page.jsx
    │   ├── 📄 layout.js
    │   ├── 📄 page.js
    │   └── 📄 page.module.css
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx
    │   │   └── UserCard.jsx
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── Input.jsx
    │   │   └── SearchBar.jsx
    │   ├── 📁 filters/
    │   │   └── ServiceFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   └── 📁 ui/                       # Componentes UI adicionales (botones, badges, etc.)
    │
    ├── 📁 hooks/                        # Custom React hooks
    │   └── useClickOutside.js
    │
    ├── 📁 modules/                      # Módulos por funcionalidad (lógica agrupada)
    │   ├── 📁 auth/
    │   │   └── auth.js                  # (futuro) helpers de auth
    │   ├── 📁 empresa/
    │   │   └── empresaService.js
    │   ├── 📁 usuario/
    │   │   └── usuarioService.js
    │   └── 📁 servicios/
    │       └── serviciosService.js
    │
    ├── 📁 services/                     # API wrappers / fetch centralizado
    │   └── api.js                       # fetch wrapper + token handling
    │
    ├── 📁 store/                        # Estado global (ej.: Zustand / Redux)
    │   └── index.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── formatters.js
    │   └── buildFileUrl.js
    │
    └── 📁 styles/                       # Estilos SCSS globales
        ├── 📁 components/
        │   ├── _buttons.scss
        │   ├── _cards.scss
        │   ├── _inputs.scss
        │   ├── _serviceCard.scss
        │   └── _serviceFilters.scss
        │
        ├── 📁 layout/
        │   ├── _footer.scss
        │   ├── _header.scss
        │   └── _sideMenu.scss
        │
        ├── 📁 pages/
        │   ├── 📁 empresa/
        │   │   ├── _empresaPerfil.scss
        │   │   ├── _empresaEditar.scss
        │   │   ├── _empresaUsuarios.scss
        │   │   └── _empresaDashboard.scss
        │   └── 📁 usuario/
        │       ├── _usuarioPerfil.scss
        │       ├── _usuarioEditar.scss
        │       └── _usuarioDashboard.scss
        │
        ├── 📁 utils/
        │   ├── _containers.scss
        │   ├── _mixins.scss
        │   └── _variables.scss
        │
        └── 📄 globals.scss