"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ActionCard from "@/components/cards/ActionCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CargaPage() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("token_empresa");
    if (!hasToken) {
      router.push("/empresa/login");
    }
  }, [router]);

  return (
    <>
      <Header />

      <main className="carga">
        <div className="carga__container">
          <div className="carga__header">
            <h1 className="title">¿Qué quieres hacer hoy?</h1>
            <h2 className="subtitle">Publica carga, busca espacio disponible y refiere un contacto y gana créditos.</h2>
          </div>

          <div className="carga__actions">
            <ActionCard type="ofrezco" />
            <ActionCard type="busco" />
            <ActionCard type="referir" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}