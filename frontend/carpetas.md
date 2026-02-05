frontend/
├── 📄 .env.local
├── 📄 carpetas.md                      # [frontend/carpetas.md](frontend/carpetas.md)
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
    │   ├── 📁 empresa/
    │   │   ├── 📁 cargas/
    │   │   │   ├── page.jsx            # [frontend/src/app/empresa/cargas/page.jsx](frontend/src/app/empresa/cargas/page.jsx)
    │   │   │   ├── 📁 busco/
    │   │   │   │   └── page.jsx        # [frontend/src/app/empresa/cargas/busco/page.jsx](frontend/src/app/empresa/cargas/busco/page.jsx)
    │   │   │   └── 📁 ofrezco/
    │   │   │       └── page.jsx        # [frontend/src/app/empresa/cargas/ofrezco/page.jsx](frontend/src/app/empresa/cargas/ofrezco/page.jsx)
    │   │   ├── 📁 confirmacion/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/confirmacion/page.jsx](frontend/src/app/empresa/confirmacion/page.jsx)
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   ├── 📁 empresas/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/empresas/page.jsx](frontend/src/app/empresa/empresas/page.jsx)
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 logout/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/logout/page.jsx](frontend/src/app/empresa/logout/page.jsx)
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx            # [frontend/src/app/empresa/perfil/page.jsx](frontend/src/app/empresa/perfil/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       └── page.jsx        # [frontend/src/app/empresa/perfil/editar/page.jsx](frontend/src/app/empresa/perfil/editar/page.jsx)
    │   │   ├── 📁 publicaciones/
    │   │   │   └── page.jsx            # [frontend/src/app/empresa/publicaciones/page.jsx](frontend/src/app/empresa/publicaciones/page.jsx)
    │   │   ├── 📁 usuarios/
    │   │   │   └── page.jsx
    │   │   └── 📁 [id]/
    │   │       └── page.jsx            # [frontend/src/app/empresa/[id]/page.jsx](frontend/src/app/empresa/[id]/page.jsx)
    │   ├── 📁 resena/
    │   │   └── 📁 [token]/
    │   │       └── page.jsx            # [frontend/src/app/resena/[token]/page.jsx](frontend/src/app/resena/[token]/page.jsx)
    │   ├── 📁 servicios/
    │   │   ├── 📁 [id]/
    │   │   │   ├── page.jsx            # [frontend/src/app/servicios/[id]/page.jsx](frontend/src/app/servicios/[id]/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       ├── 📁 busco/
    │   │   │       │   └── page.jsx    # [frontend/src/app/servicios/[id]/editar/busco/page.jsx](frontend/src/app/servicios/[id]/editar/busco/page.jsx)
    │   │   │       └── 📁 ofrezco/
    │   │   │           └── page.jsx    # [frontend/src/app/servicios/[id]/editar/ofrezco/page.jsx](frontend/src/app/servicios/[id]/editar/ofrezco/page.jsx)
    │   ├── 📁 usuario/
    │   │   ├── 📁 perfil/
    │   │   │   ├── page.jsx            # [frontend/src/app/usuario/perfil/page.jsx](frontend/src/app/usuario/perfil/page.jsx)
    │   │   │   └── 📁 editar/
    │   │   │       └── page.jsx        # [frontend/src/app/usuario/perfil/editar/page.jsx](frontend/src/app/usuario/perfil/editar/page.jsx)
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.jsx
    │   │   ├── 📁 login/
    │   │   │   └── page.jsx
    │   │   ├── 📁 logout/
    │   │   │   └── page.jsx
    │   │   └── 📁 notificaciones/
    │   │       └── page.jsx
    │   ├── 📄 layout.js                 # [frontend/src/app/layout.js](frontend/src/app/layout.js)
    │   ├── 📄 page.js                   # [frontend/src/app/page.js](frontend/src/app/page.js)
    │   └── 📄 page.module.css           # [frontend/src/app/page.module.css](frontend/src/app/page.module.css)
    │
    ├── 📁 components/                  # Componentes React reutilizables
    │   ├── 📁 cards/
    │   │   ├── ActionCard.jsx
    │   │   ├── AcuerdoCard.jsx
    │   │   ├── EmpresaCard.jsx
    │   │   ├── NotificationCard.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── ServiceCard.jsx         # [frontend/src/components/cards/ServiceCard.jsx](frontend/src/components/cards/ServiceCard.jsx)
    │   │   └── UserCard.jsx
    │   ├── 📁 common/
    │   │   ├── Button_cta.jsx
    │   │   ├── Button_crud.jsx
    │   │   ├── Button_error.jsx
    │   │   ├── Button_success.jsx
    │   │   ├── ConfirmDeleteModal.jsx   # [frontend/src/components/common/ConfirmDeleteModal.jsx](frontend/src/components/common/ConfirmDeleteModal.jsx)
    │   │   ├── ErrorModal.jsx
    │   │   ├── Input.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── SimpleEditor.jsx
    │   ├── 📁 filters/
    │   │   ├── ServiceFilters.jsx
    │   │   └── ServiceAdvancedFilters.jsx
    │   ├── 📁 layout/
    │   │   ├── Footer.jsx                # [frontend/src/components/layout/Footer.jsx](frontend/src/components/layout/Footer.jsx)
    │   │   ├── Header.jsx                # [frontend/src/components/layout/Header.jsx](frontend/src/components/layout/Header.jsx)
    │   │   ├── SideMenu.jsx
    │   │   └── SideMenuUsuario.jsx
    │   ├── 📁 modals/
    │   │   ├── ChangeServiceStatusModal.jsx  # [frontend/src/components/modals/ChangeServiceStatusModal.jsx](frontend/src/components/modals/ChangeServiceStatusModal.jsx)
    │   │   ├── ConfirmFinalizarServicioModal.jsx
    │   │   ├── FinalizarServicioGananciaModal.jsx
    │   │   ├── ReporteMensualModal.jsx
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
    │   ├── index.js
    │   └── searchContext.js
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   ├── buildFileUrl.js              # [frontend/src/utils/buildFileUrl.js](frontend/src/utils/buildFileUrl.js)
    │   ├── formatters.js
    │   ├── getEmpresaToken.js
    │   └── whatsapp.js                  # [frontend/src/utils/whatsapp.js](frontend/src/utils/whatsapp.js)
    │
    └── 📁 styles/                       # Estilos SCSS globales
        ├── 📁 components/
        │   ├── _buttons.scss            # [frontend/src/styles/components/_buttons.scss](frontend/src/styles/components/_buttons.scss)
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
        │   │   ├── _empresaBusco.scss
        │   │   ├── _empresaDashboard.scss
        │   │   ├── _empresaEditar.scss    # [frontend/src/styles/pages/empresa/_empresaEditar.scss](frontend/src/styles/pages/empresa/_empresaEditar.scss)
        │   │   ├── _empresaEmpresas.scss
        │   │   ├── _empresaOfrezco.scss
        │   │   └── _empresaPerfil.scss    # [frontend/src/styles/pages/empresa/_empresaPerfil.scss](frontend/src/styles/pages/empresa/_empresaPerfil.scss)
        │   └── 📁 usuario/
        │       └── _usuarioPerfil.scss    # [frontend/src/styles/pages/usuario/_usuarioPerfil.scss](frontend/src/styles/pages/usuario/_usuarioPerfil.scss)
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