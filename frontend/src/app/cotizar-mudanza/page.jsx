import CotizadorMudanzaClient from "./CotizadorMudanzaClient";

export const metadata = {
  title: "Cotizador de Mudanza | Mudanza Fácil",
  description:
    "Cotiza tu mudanza en segundos. Obtén un estimado rápido según tu origen, destino y tipo de servicio.",
  keywords: [
    "cotizador mudanza",
    "precio mudanza",
    "cuanto cuesta mudanza",
    "cotizar mudanza México",
  ],
  openGraph: {
    title: "Cotizador de Mudanza | Mudanza Fácil",
    description:
      "Calcula el costo aproximado de tu mudanza en minutos.",
    url: "https://app.mudanzafacil.com.mx/cotizador-mudanza",
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
  return <CotizadorMudanzaClient />;
}