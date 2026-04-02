"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreditPackageCard from "@/components/cards/CreditPackageCard";
import CompraCreditosModal from "@/components/modals/CompraCreditosModal";
import MessageModal from "@/components/modals/MessageModal";

import "@/styles/pages/empresa/_empresaCreditos.scss";

export default function ComprarCreditos() {
    const [loading, setLoading] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [folio, setFolio] = useState(null);
    const [creditos, setCreditos] = useState(null);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const comprar = async (plan) => {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];
        setLoading(plan);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/creditos/comprar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ plan })
                }
            );

            const data = await res.json();
            setFolio(data.folio);
            setCreditos(data.creditos);
            setModalOpen(true);
            window.dispatchEvent(new Event("creditosActualizados"));

        } catch (e) {
            setErrorMessage("No se pudo completar la compra. Intenta nuevamente.");
            setErrorModal(true);
        }
        setLoading(null);
    };

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
                        price="790 mxn"
                        description="Perfecto para empresas que comienzan a generar oportunidades."
                        onBuy={() => comprar("impulso")}
                    />

                    <CreditPackageCard
                        title="Profesional"
                        credits={250}
                        price="1,890 mxn"
                        description="La opción más popular para empresas con flujo constante."
                        badge="Más popular"
                        onBuy={() => comprar("profesional")}
                    />

                    <CreditPackageCard
                        title="Crecimiento"
                        credits={600}
                        price="4,290 mxn"
                        description="Para empresas que quieren maximizar oportunidades."
                        onBuy={() => comprar("crecimiento")}
                    />
                </div>

                <p className="creditos__help">
                    <a href="ayuda/">¿Cómo funcionan los créditos?</a>
                    Los créditos te permiten adquirir contactos de mudanza dentro de la red.
                    Cada contacto se comparte con un máximo de 3 empresas
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
        </>
    );
}