import { Geist, Geist_Mono } from "next/font/google";
import { SearchProvider } from "@/store/searchContext";
import '../styles/globals.scss';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mudanza Facil",
  description: "Plataforma web full-stack diseñada para conectar empresas de mudanzas en México",
  icons: {
    icon: "/APP/public/icon.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SearchProvider>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}