import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SearchProvider } from "@/store/searchContext";
import PlanWatcher from "@/components/system/PlanWatcher";
import PWARegister from "@/components/system/PWARegister";
import "../styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mudanza Fácil",
  
  description:
    "Conecta empresas de mudanzas, encuentra cargas disponibles, publica servicios y genera oportunidades de transporte en todo México.",

  keywords: [
    "mudanzas México",
    "cargas para mudanzas",
    "transporte de mudanzas",
    "empresas de mudanza",
    "cargas disponibles",
    "mudanceras",
    "logística de mudanzas",
  ],

  manifest: "/manifest.json",

  icons: {
    icon: "/APP/public/icon.svg",
  },

  openGraph: {
    title: "Mudanza Fácil",
    description:
      "Plataforma para conectar empresas de mudanzas y generar oportunidades de carga en México.",
    url: "https://app.mudanzafacil.com.mx/bienvenida",
    siteName: "Mudanza Fácil",
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mudanza Fácil",
    description:
      "Encuentra cargas y conecta con empresas de mudanzas en México.",
  },

  robots: {
    index: true,
    follow: true,
  },
};





export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MC9GCXSJ');
            `,
          }}
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mudanza Fácil" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC9GCXSJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <PWARegister />

        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&language=es`}
          strategy="afterInteractive"
        />

        <SearchProvider>
          {children}
          <PlanWatcher />
        </SearchProvider>

      </body>
    </html>
  );
}