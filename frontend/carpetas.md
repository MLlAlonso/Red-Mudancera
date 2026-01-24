frontend/
├── 📄 .env.local
├── 📄 carpetas.md                      # (este archivo) [frontend/carpetas.md](frontend/carpetas.md)
├── 📄 eslint.config.mjs
├── 📄 jsconfig.json
├── 📄 next.config.js
├── 📄 package.json
├── 📁 .next/
│
├── 📁 public/                          # Archivos públicos estáticos
│   ├── 📁 icons/
│   ├── 📁 logo/
│   ├── next.svg
│   └── vercel.svg
│
└── 📁 src/                             # Código fuente de la aplicación
    ├── 📁 app/                         # Rutas y páginas (Next.js App Router)
    │   ├── 📁 dashboard/
    │   │   └── page.jsx
    │   ├── 📁 empresa/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   ├── 📁 publicaciones/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx
    │   │   │   └── editar/page.jsx
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   └── logout/page.jsx
    │   ├── 📁 servicios/               # Rutas públicas / detalles / edición
    │   │   ├── [id]/page.jsx
    │   │   └── [id]/editar/
    │   │       ├── ofrezco/page.jsx
    │   │       └── busco/page.jsx
    │   ├── 📁 test-ui/
    │   │   └── page.jsx
    │   ├── 📄 layout.js                 # [frontend/src/app/layout.js](frontend/src/app/layout.js)
    │   ├── 📄 page.js                   # [frontend/src/app/page.js](frontend/src/app/page.js)
    │   └── 📄 page.module.css
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx          # [`ServiceCard`](frontend/src/components/cards/ServiceCard.jsx)
    │   │   └── UserCard.jsx             # [`UserCard`](frontend/src/components/cards/UserCard.jsx)
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── Input.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── ConfirmDeleteModal.jsx   # [`ConfirmDeleteModal`](frontend/src/components/common/ConfirmDeleteModal.jsx)
    │   ├── 📁 filters/
    │   │   ├── ServiceFilters.jsx
    │   │   └── ServiceAdvancedFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx                # [`Footer`](frontend/src/components/layout/Footer.jsx)
    │   │   ├── Header.jsx                # [`Header`](frontend/src/components/layout/Header.jsx)
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   ├── 📁 modals/
    │   │   ├── ChangeServiceStatusModal.jsx  # [`ChangeServiceStatusModal`](frontend/src/components/modals/ChangeServiceStatusModal.jsx)
    │   │   └── ShareReviewLinkModal.jsx
    │   ├── 📁 skeletons/
    │   │   ├── ProfileSkeleton.jsx
    │   │   └── ServiceCardSkeleton.jsx
    │   └── 📁 ui/                       # Componentes UI adicionales (badges, loaders, etc.)
    │
    ├── 📁 hooks/                        # Custom React hooks
    │   └── useClickOutside.js           # [frontend/src/hooks/useClickOutside.js](frontend/src/hooks/useClickOutside.js)
    │
    ├── 📁 modules/                      # Módulos por funcionalidad (API wrappers organizados)
    │   ├── 📁 auth/
    │   │   └── auth.js
    │   ├── 📁 empresa/
    │   │   └── empresaService.js        # [frontend/src/modules/empresa/empresaService.js](frontend/src/modules/empresa/empresaService.js)
    │   ├── 📁 usuario/
    │   │   └── usuarioService.js
    │   └── 📁 servicios/
    │       └── serviciosService.js
    │
    ├── 📁 services/                     # API wrappers / fetch centralizado
    │   └── api.js                       # [frontend/src/services/api.js](frontend/src/services/api.js)
    │
    ├── 📁 store/                        # Estado global (opcional: Zustand / Redux)
    │   └── index.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── formatters.js
    │   ├── buildFileUrl.js              # [frontend/src/utils/buildFileUrl.js](frontend/src/utils/buildFileUrl.js)
    │   └── whatsapp.js                  # [frontend/src/utils/whatsapp.js](frontend/src/utils/whatsapp.js)
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
        └── 📄 globals.scss               # [frontend/src/styles/globals.scss](frontend/src/styles/globals.scss)

Archivos clave / puntos de entrada:
- Layout app: [`frontend/src/app/layout.js`](frontend/src/app/layout.js)
- Página principal: [`frontend/src/app/page.js`](frontend/src/app/page.js)
- Header: [`frontend/src/components/layout/Header.jsx`](frontend/src/components/layout/Header.jsx)
- ServiceCard: [`frontend/src/components/cards/ServiceCard.jsx`](frontend/src/components/cards/ServiceCard.jsx)
- API wrapper: [`frontend/src/services/api.js`](frontend/src/services/api.js)