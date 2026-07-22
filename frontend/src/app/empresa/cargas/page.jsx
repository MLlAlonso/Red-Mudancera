"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ActionCard from "@/components/cards/ActionCard";
import TutorialVideoModal from "@/components/modals/TutorialVideoModal";
import { getTutoriales, marcarTutorialComoVisto } from "@/services/tutorialAuth";

export default function CargaPage() {
  const router = useRouter();
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const hasToken = document.cookie.includes("token_empresa");

    if (!hasToken) {
      router.push("/empresa/login");
      return;
    }
    obtenerTutorial();
  }, [router]);

  async function obtenerTutorial() {
    try {
      const tutoriales = await getTutoriales();

      const tutorialCarga = tutoriales.find(
        (item) => item.orden === 2
      );

      if (tutorialCarga) {
        setTutorial(tutorialCarga);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmarTutorial() {
    try {
      await marcarTutorialComoVisto(tutorial.id);
    } catch (error) {
      console.error(error);
    }
    setTutorial(null);
  }

  function cerrarTutorial() {
    setTutorial(null);
  }

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

        <TutorialVideoModal tutorial={tutorial} automatico={true} onClose={cerrarTutorial} onConfirm={confirmarTutorial} />
      </main>

      <Footer />
    </>
  );
}