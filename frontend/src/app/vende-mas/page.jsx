import ContactoFrescoHero from "@/components/vende-mas/ContactoFrescoHero";
import ClientePerspective from "@/components/vende-mas/ClientePerspective";
import FrescuraContacto from "@/components/vende-mas/FrescuraContacto";
import RutinaTresPorTres from "@/components/vende-mas/RutinaTresPorTres";
import ViajeProgramado from "@/components/vende-mas/ViajeProgramado";
import ReglaDeOro from "@/components/vende-mas/ReglaDeOro";

export const metadata = {
    title: "Vende más con Mudanza Fácil",
    description: "Contacta a tus clientes cuando realmente están buscando resolver su mudanza.",
};

export default function VendeMasPage() {
    return (
        <main className="vende-mas-page">
            <ContactoFrescoHero />
            <ClientePerspective />
            <FrescuraContacto />
            <RutinaTresPorTres />
            <ViajeProgramado />
            <ReglaDeOro />
        </main>
    );
}