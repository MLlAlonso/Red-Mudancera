import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SearchProvider } from "@/store/searchContext";
import PlanWatcher from "@/components/system/PlanWatcher"; // 👈 NUEVO
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
    "Plataforma web full-stack diseñada para conectar empresas de mudanzas en México",
  icons: {
    icon: "/APP/public/icon.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&language=es`}
          strategy="afterInteractive"
        />

        <SearchProvider>
          {children}

          {/* 👇 AQUÍ VA */}
          <PlanWatcher />
        </SearchProvider>

      </body>
    </html>
  );
}