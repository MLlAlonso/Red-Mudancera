import SolicitarMudanzaClient from "@/app/solicitar-mudanza/SolicitarMudanzaClient";

export default async function Page({ params }) {
    const { empresaSlug } = await params;

    return (
        <SolicitarMudanzaClient empresaSlug={empresaSlug} />
    );
}