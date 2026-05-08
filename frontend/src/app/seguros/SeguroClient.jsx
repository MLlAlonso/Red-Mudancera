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
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const PREVIEW_MODAL = true;

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        origen: "",
        destino: "",
        inventario: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

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

    /* =========================
       FLUJO NORMAL
    ========================= */
    const handleSeguro = async () => {
        if (!solicitud || sent) return;

        setLoading(true);

        try {
            const res = await fetch(`${API}/solicitudes-mudanza/solicitar-seguro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ id: solicitud.id })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setModalMsg("Un asesor se pondrá en contacto contigo en breve.");
            setSent(true);

        } catch (error) {
            setModalError(error.message || "Ocurrió un error.");
        }

        setLoading(false);
    };

    /* =========================
       FLUJO EXTERNO
    ========================= */
    const handleExterno = async () => {
        if (sent) return;

        setLoading(true);

        try {
            const res = await fetch(`${API}/solicitudes-mudanza/solicitar-seguro-externo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setModalMsg("Un asesor se pondrá en contacto contigo en breve.");
            setSent(true);

        } catch (error) {
            setModalError(error.message || "Ocurrió un error.");
        }

        setLoading(false);
    };

    /* =========================
       RENDER
    ========================= */

    // FLUJO NORMAL
    if (id) {
        return (
            <>
                <button
                    className="btnSeguro"
                    onClick={handleSeguro}
                    disabled={sent || loading}
                >
                    <span className="text">
                        {sent ? "Solicitud enviada" : "Quiero proteger mi Mudanza"}
                    </span>
                    <span className="arrow"> &gt; </span>
                </button>

                {/* MODALES */}
                {modalMsg && (
                    <BaseModal onClose={() => {
                        setModalMsg("");
                        window.location.href = "https://segurosdecarga.com/";
                    }}>
                        <div className="success-modal">
                            <h3>Solicitud enviada</h3>
                            <p>{modalMsg}</p>
                            <button onClick={() => {
                                setModalMsg("");
                                window.location.href = "https://segurosdecarga.com/";
                            }}>
                                Cerrar
                            </button>
                        </div>
                    </BaseModal>
                )}

                {modalError && (
                    <BaseModal onClose={() => setModalError("")}>
                        <div className="error-modal">
                            <h3>Error</h3>
                            <p>{modalError}</p>
                            <button onClick={() => setModalError("")}>Cerrar</button>
                        </div>
                    </BaseModal>
                )}
            </>
        );
    }

    // USUARIO EXTERNO
    return (
        <>
            {!showForm && (
                <button
                    className="btnSeguro"
                    onClick={() => setShowForm(true)}
                >
                    Solicitar información de protección
                </button>
            )}

            {showForm && (
                <div className="seguroForm">
                    <div className="form-group">
                        <label>Nombre completo</label>
                        <input name="nombre" placeholder="Ej: Juan Pérez" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input name="email" placeholder="Ej: correo@gmail.com" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Teléfono de contacto</label>
                        <input name="telefono" placeholder="Ej: 9211234567" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>¿Desde dónde se realizará la mudanza?</label>
                        <input name="origen" placeholder="Ciudad,Estado de origen" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>¿Hacia dónde se realizará la mudanza?</label>
                        <input name="destino" placeholder="Ciudad,Estado de destino" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>¿Qué artículos deseas asegurar?</label>
                        <textarea
                            name="inventario"
                            placeholder="Ej: sala, comedor, refrigerador, cajas, etc."
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="btnSeguro"
                        onClick={handleExterno}
                        disabled={sent || loading}
                    >
                        {sent ? "Solicitud enviada" : "Enviar solicitud"}
                    </button>
                </div>
            )}

            {/* MODALES */}
            {(modalMsg) && (
                <BaseModal onClose={() => { setModalMsg(""); window.location.href = "https://segurosdecarga.com/"; }}>
                    <div className="success-modal">
                        <img src="/icons/verificado.png" alt="verificado" className="success-img" />

                        <h3>Solicitud enviada</h3>

                        <div className="success-divider"></div>

                        <p>
                            {modalMsg || "Tu interés fue registrado correctamente."}
                        </p>

                        <p>
                            Un especialista del área de seguros se pondrá en contacto contigo para darte más información sobre la protección para tu mudanza.
                        </p>

                        <section>
                            <img src="/icons/web.png" alt="web" />
                            <p>
                                Al continuar podrás visitar el sitio oficial de <span>Chubb Seguros México</span> 
                            </p>
                        </section>

                        <button onClick={() => { setModalMsg(""); window.location.href = "https://segurosdecarga.com/"; }}>
                            Ir al sitio oficial de Chubb
                        </button>

                        <p className="privacy-note">
                            <img src="/icons/candado.png"/>
                            Tu información será utilizada únicamente para dar seguimiento a tu solicitud
                        </p>
                    </div>
                </BaseModal>
            )}

            {modalError && (
                <BaseModal onClose={() => setModalError("")}>
                    <div className="error-modal">
                        <h3>Error</h3>
                        <p>{modalError}</p>
                        <button onClick={() => setModalError("")}>Cerrar</button>
                    </div>
                </BaseModal>
            )}
        </>
    );
}