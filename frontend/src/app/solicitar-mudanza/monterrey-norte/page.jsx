import SolicitarMudanzaClient from "../SolicitarMudanzaClient";

export const metadata = {
    title: "Mudanzas Monterrey Norte | Mudanza Fácil",
    description:
        "Solicita mudanzas en Monterrey y zona norte.",
};

export default function Page() {
    return (
        <SolicitarMudanzaClient
            landingConfig={{
                heroTitle: "Cotiza tu Mudanza a Monterrey",
                heroSubtitle:
                    "Recibe hasta 3 cotizaciones de empresas verificadas para mudanzas compartidas o exclusivas hacia Monterrey.",
                buttonText: "Solicitar Mudanza Monterrey"
            }}
        />
    );
}