import SolicitarMudanzaClient from "../SolicitarMudanzaClient";

export const metadata = {
    title: "Mudanzas Tijuana Ensenada | Mudanza Fácil",
    description:
        "Solicita mudanzas entre Tijuana y Ensenada.",
};

export default function Page() {
    return (
        <SolicitarMudanzaClient
            landingConfig={{
                heroTitle: "Cotiza tu Mudanza a Tijuana",
                heroSubtitle:
                    "Recibe hasta 3 cotizaciones de empresas verificadas para mudanzas compartidas o exclusivas hacia Tijuana.",
                buttonText: "Solicitar Mudanza Tijuana"
            }}
        />
    );
}