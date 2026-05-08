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
    "Plataforma web diseñada para conectar empresas de mudanzas en México",
  manifest: "/manifest.json",
  icons: {
    icon: "/APP/public/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mudanza Fácil" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>

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