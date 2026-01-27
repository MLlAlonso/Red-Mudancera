"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmpresaCard from "@/components/cards/EmpresaCard";

import "@/styles/pages/empresa/_empresaEmpresas.scss";

export default function EmpresaCatalogo() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sede, setSede] = useState("");

  const fetchEmpresas = () => {
    setLoading(true);

    const query = sede ? `?sede=${encodeURIComponent(sede)}` : "";

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/empresas${query}`)
      .then(res => res.json())
      .then(data => {
        setEmpresas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmpresas();
  }, [sede]);

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
