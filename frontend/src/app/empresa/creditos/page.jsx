"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreditPackageCard from "@/components/cards/CreditPackageCard";
import CompraCreditosModal from "@/components/modals/CompraCreditosModal";
import MessageModal from "@/components/modals/MessageModal";
import PlanRequiredModal from "@/components/modals/PlanRequiredModal";
import TutorialVideoModal from "@/components/modals/TutorialVideoModal";
import { getTutoriales, marcarTutorialComoVisto } from "@/services/tutorialAuth";

import "@/styles/pages/empresa/_empresaCreditos.scss";

export default function ComprarCreditos() {
    const [loading, setLoading] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [folio, setFolio] = useState(null);
    const [creditos, setCreditos] = useState(null);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [plan, setPlan] = useState(null);
    const [planModal, setPlanModal] = useState(false);
    const [verificado, setVerificado] = useState(false);
    const [tutorial, setTutorial] = useState(null);

    const comprar = async (packagePlan) => {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

        if (!verificado) {
            setPlanModal(true);
            return;
        }

        if (plan === "free") {
            setPlanModal(true);
            return;
        }

        setLoading(packagePlan);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/stripe/creditos/checkout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ plan: packagePlan })
                }
            );
            const data = await res.json();
            if (!data.url) {
                throw new Error("No hay URL");
            }
            window.location.href = data.url;
        } catch (e) {
            setErrorMessage("No se pudo iniciar el pago.");
            setErrorModal(true);
        }
        setLoading(null);
    };

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];
                if (!token) return;
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                if (!res.ok) return;
                const data = await res.json();
                setPlan(data.plan ?? "free");
                setVerificado(data.verificado ?? false);
            } catch (error) {
                console.error("Error obteniendo plan", error);
            }
        };
        fetchEmpresa();
    }, []);

    async function obtenerTutorial() {
        try {
            const tutoriales = await getTutoriales();
            const tutorialCreditos = tutoriales.find((item) => item.orden === 3);

            if (tutorialCreditos && !tutorialCreditos.visto) {
                setTutorial(tutorialCreditos);
            }
        } catch (error) {
            console.error("Error obteniendo tutorial de créditos", error);
        }
    }

    async function confirmarTutorial() {
        try {
            await marcarTutorialComoVisto(tutorial.id);
        } catch (error) {
            console.error("Error marcando tutorial como visto", error);
        }

        setTutorial(null);
    }

    function cerrarTutorial() {
        setTutorial(null);
    }

    return (
        <>
            <Header />

            <main className="creditos">
                <h1 className="creditos__title">
                    Consigue más servicios de mudanza
                </h1>

                <p className="creditos__subtitle">
                    Eligue un paquete de créditos y úsalos para comprar contactos de clientes que están buscando una mudanza.
                </p>

                <div className="creditos__grid">
                    <CreditPackageCard
                        title="Impulso"
                        credits={120}
                        maxContacts={8}
                        price="890 mxn"
                        description="Perfecto para empresas que comienzan a generar oportunidades."
                        onBuy={() => comprar("impulso")}
                    />

                    <CreditPackageCard
                        title="Profesional"
                        credits={330}
                        maxContacts={22}
                        price="2,190 mxn"
                        description="La opción más popular para empresas con flujo constante."
                        badge="Más popular"
                        onBuy={() => comprar("profesional")}
                    />

                    <CreditPackageCard
                        title="Crecimiento"
                        credits={800}
                        maxContacts={53}
                        price="4,990 mxn"
                        description="Para empresas que quieren maximizar oportunidades."
                        onBuy={() => comprar("crecimiento")}
                    />
                </div>
                <p className="creditos__subtitle">
                    Cálculo considerando contactos compartidos de 15 créditos. Los contactos exclusivos requieren más créditos.
                </p>

                <p className="creditos__help">
                    <a href="ayuda/">¿Cómo funcionan los créditos?</a>
                    Cada crédito te permite acceder a clientes que ya solicitaron una mudanza.
                    Cada solicitud se comparte con un máximo de 3 empresas para mantener la calidad y competencia justa.
                </p>

            </main>

            <Footer />

            <CompraCreditosModal open={modalOpen} onClose={() => setModalOpen(false)} folio={folio} creditos={creditos} />

            {errorModal && (
                <MessageModal title="Error en la compra" message={errorMessage} onClose={() => setErrorModal(false)} />
            )}

            {planModal && (
                <PlanRequiredModal onClose={() => setPlanModal(false)} />
            )}

            <TutorialVideoModal tutorial={tutorial} automatico={true} onClose={cerrarTutorial} onConfirm={confirmarTutorial} />
        </>
    );
}