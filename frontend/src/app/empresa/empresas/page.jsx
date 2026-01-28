"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmpresaCard from "@/components/cards/EmpresaCard";
import { useSearch } from "@/store/searchContext";

import "@/styles/pages/empresa/_empresaEmpresas.scss";

export default function EmpresaCatalogo() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  const fetchEmpresas = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.append("search", search);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/empresa/empresas?${params}`
    )
      .then((res) => res.json())
      .then(setEmpresas)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmpresas();
  }, [search]);

  return (
    <>
      <Header />

      <main className="empresa-empresas">
        <div className="empresa-empresas__header">
          <div>
            <h1 className="empresa-empresas__title">Directorio de empresas</h1>
            <p className="empresa-empresas__subtitle">
              Empresas registradas en la plataforma
            </p>
          </div>
        </div>

        {loading && <p>Cargando...</p>}

        {!loading && (
          <div className="empresa-empresas__grid">
            {empresas.map((e) => (
              <EmpresaCard
                key={e.id}
                id={e.id}
                logo={e.logo_url}
                nombre={e.empresa}
                sede={e.base}
                reputacion={e.reputacion}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}