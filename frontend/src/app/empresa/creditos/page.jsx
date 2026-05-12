"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreditPackageCard from "@/components/cards/CreditPackageCard";
import CompraCreditosModal from "@/components/modals/CompraCreditosModal";
import MessageModal from "@/components/modals/MessageModal";
import PlanRequiredModal from "@/components/modals/PlanRequiredModal";

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

    const comprar = async (packagePlan) => {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

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

            } catch (error) {
                console.error("Error obteniendo plan", error);
            }
        };

        fetchEmpresa();
    }, []);

    return (
        <>
            <Header />

            <main className="creditos">
                <h1 className="creditos__title">
                    Consigue más servicios de mudanza
                </h1>

                <p className="creditos__subtitle">
                    Compra créditos y accede a contactos reales que ya estan buscando mover sus cosas.
                </p>

                <div className="creditos__grid">
                    <CreditPackageCard
                        title="Impulso"
                        credits={100}
                        price="890 mxn"
                        description="Perfecto para empresas que comienzan a generar oportunidades."
                        onBuy={() => comprar("impulso")}
                    />

                    <CreditPackageCard
                        title="Profesional"
                        credits={250}
                        price="2,190 mxn"
                        description="La opción más popular para empresas con flujo constante."
                        badge="Más popular"
                        onBuy={() => comprar("profesional")}
                    />

                    <CreditPackageCard
                        title="Crecimiento"
                        credits={600}
                        price="4,990 mxn"
                        description="Para empresas que quieren maximizar oportunidades."
                        onBuy={() => comprar("crecimiento")}
                    />
                </div>

                <p className="creditos__help">
                    <a href="ayuda/">¿Cómo funcionan los créditos?</a>
                    Cada crédito te permite acceder a clientes que ya solicitaron una mudanza.
                    Cada solicitud se comparte con un máximo de 3 empresas para mantener la calidad y competencia justa.
                </p>

            </main>

            <Footer />

            <CompraCreditosModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                folio={folio}
                creditos={creditos}
            />

            {errorModal && (
                <MessageModal
                    title="Error en la compra"
                    message={errorMessage}
                    onClose={() => setErrorModal(false)}
                />
            )}

            {planModal && (
                <PlanRequiredModal
                    onClose={() => setPlanModal(false)}
                />
            )}
        </>
    );
}