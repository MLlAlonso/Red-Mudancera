"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTutoriales } from "@/services/tutorialAuth";
import TutorialCard from "@/components/cards/TutorialCard";
import TutorialVideoModal from "@/components/modals/TutorialVideoModal";

import "@/styles/pages/empresa/_tutoriales.scss";

export default function TutorialesPage() {
    const [tutoriales, setTutoriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tutorialSeleccionado, setTutorialSeleccionado] = useState(null);

    useEffect(() => {
        cargarTutoriales();
    }, []);

    async function cargarTutoriales() {
        try {
            const response = await getTutoriales();
            setTutoriales(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function abrirTutorial(tutorial) {
        setTutorialSeleccionado(tutorial);
    }

    function cerrarTutorial() {
        setTutorialSeleccionado(null);
    }

    return (
        <>
            <Header />

            <main className="tutoriales">
                <h1 className="tutoriales__title">
                    Tutoriales
                </h1>

                <p className="tutoriales__subtitle">
                    Aprende a usar <span>Mudanza Fácil</span> y aprovecha sus herramientas para hacer crecer tu empresa.
                </p>

                <div className="tutoriales__content">
                    {loading ? (
                        <div className="tutoriales__loading">
                            Cargando tutoriales...
                        </div>
                    ) : tutoriales.length === 0 ? (
                        <div className="tutoriales__empty">
                            No hay tutoriales disponibles.
                        </div>
                    ) : (
                        <div className="tutoriales__grid">
                            {tutoriales.map((tutorial) => (
                                <TutorialCard key={tutorial.id} tutorial={tutorial} onPlay={abrirTutorial} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <TutorialVideoModal tutorial={tutorialSeleccionado} onClose={cerrarTutorial} />

            <Footer />
        </>
    );
}