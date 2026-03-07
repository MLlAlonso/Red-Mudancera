import SolicitarMudanzaClient from "../SolicitarMudanzaClient";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const empresaSlug = resolvedParams?.empresa ?? null;
  return <SolicitarMudanzaClient empresaSlug={empresaSlug} />;
}