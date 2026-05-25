import SolicitarMudanzaClient from "../SolicitarMudanzaClient";

export const metadata = {
    title: "Mudanzas Cancún Playa | Mudanza Fácil",
    description:
        "Solicita tu mudanza entre Cancún y la Riviera Maya con empresas verificadas.",
};

export default function Page() {
    return (
        <SolicitarMudanzaClient
            landingConfig={{
                heroTitle: "Cotiza tu Mudanza a Cancún",
                heroSubtitle:
                    "Recibe hasta 3 cotizaciones de empresas verificadas para mudanzas compartidas o exclusivas hacia Cancún y Riviera Maya.",
                buttonText: "Solicitar Mudanza al Sureste"
            }}
        />
    );
}