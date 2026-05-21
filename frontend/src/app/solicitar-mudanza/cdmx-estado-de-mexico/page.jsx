import SolicitarMudanzaClient from "../SolicitarMudanzaClient";

export const metadata = {
    title: "Mudanzas CDMX Estado de México | Mudanza Fácil",
    description:
        "Solicita mudanzas entre CDMX y Estado de México.",
};

export default function Page() {
    return (
        <SolicitarMudanzaClient
            landingConfig={{
                heroTitle: "Cotiza tu Mudanza a Estado de México",
                heroSubtitle:
                    "Recibe hasta 3 cotizaciones de empresas verificadas para mudanzas compartidas o exclusivas hacia Estado de México.",
                buttonText: "Solicitar Mudanza CDMX"
            }}
        />
    );
}