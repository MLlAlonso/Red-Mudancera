"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BaseModal from "@/components/modals/BaseModal";

export default function SeguroClient() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const API = process.env.NEXT_PUBLIC_API_URL;

    const [solicitud, setSolicitud] = useState(null);
    const [modalMsg, setModalMsg] = useState("");
    const [modalError, setModalError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchSolicitud = async () => {
            try {
                const res = await fetch(`${API}/solicitudes-mudanza/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setSolicitud(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSolicitud();
    }, [id]);

    const handleSeguro = async () => {
        if (!solicitud) return;

        try {
            const res = await fetch(`${API}/solicitudes-mudanza/solicitar-seguro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    id: solicitud.id
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setModalMsg("Un asesor se pondrá en contacto contigo en breve.");

        } catch (error) {
            setModalError(error.message || "Ocurrió un error.");
        }
    };

    return (
        <>
            <button className="btnSeguro" onClick={handleSeguro}>
                <span className="text">
                    Quiero proteger mi Mudanza
                </span>
                <span className="arrow"> &gt; </span>
            </button>

            {/* MODAL ÉXITO */}
            {modalMsg && (
                <BaseModal onClose={() => setModalMsg("")}>
                    <div className="success-modal">
                        <h3>Solicitud enviada</h3>
                        <p>{modalMsg}</p>
                        <button onClick={() => setModalMsg("")}>
                            Cerrar
                        </button>
                    </div>
                </BaseModal>
            )}

            {/* MODAL ERROR */}
            {modalError && (
                <BaseModal onClose={() => setModalError("")}>
                    <div className="error-modal">
                        <h3>Error</h3>
                        <p>{modalError}</p>
                        <button onClick={() => setModalError("")}>
                            Cerrar
                        </button>
                    </div>
                </BaseModal>
            )}
        </>
    );
}