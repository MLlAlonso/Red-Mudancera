import SolicitarMudanzaClient from "./SolicitarMudanzaClient";

export const metadata = {
  title: "Solicitar Mudanza en México | Cotiza Gratis | Mudanza Fácil",
  description:
    "Publica tu solicitud de mudanza en minutos. Recibe contacto de empresas verificadas en todo México. Servicio rápido, seguro y confiable.",
  keywords: [
    "solicitar mudanza",
    "cotizar mudanza",
    "empresas de mudanza en México",
    "mudanza CDMX",
    "mudanza Monterrey",
    "mudanza Guadalajara"
  ],
  openGraph: {
    title: "Solicitar Mudanza en México | Mudanza Fácil",
    description:
      "Recibe cotizaciones de empresas verificadas en minutos.",
    url: "https://mudanzafacil.com.mx/solicitar-mudanza",
    siteName: "Mudanza Fácil",
    images: [
      {
        url: "https://mudanzafacil.com.mx/logo/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function Page() {
  return <SolicitarMudanzaClient />;
}