"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import BaseModal from "@/components/modals/BaseModal";
import useClickOutside from "@/hooks/useClickOutside";

export default function SeguroClient({ action = "whatsapp" }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const API = process.env.NEXT_PUBLIC_API_URL;

    const actionConfig = {
        whatsapp: {
            label: "Solicitar información por WhatsApp",
            icon: "icons/whatsapp.png",
            url: `https://wa.me/5214421896433?text=${encodeURIComponent(
                "Hola, me gustaría recibir más información sobre el seguro para mudanzas de Mudanza Fácil."
            )}`
        },
        agenda: {
            label: "Agendar asesoría gratuita",
            icon: "icons/calendario.png",
            url: "https://app.mudanzafacil.com.mx/empresa/login"
        }
    };

    const selectedAction = actionConfig[action] || actionConfig.whatsapp;
    const [solicitud, setSolicitud] = useState(null);
    const [modalMsg, setModalMsg] = useState("");
    const [modalError, setModalError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const successModalRef = useRef(null);
    const cerrarModalExito = useCallback(() => { setModalMsg(""); }, []);
    useClickOutside(successModalRef, cerrarModalExito);

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        origen: "",
        destino: "",
        inventario: "",
        fecha_recoleccion: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Recuperar solicitud cuando el usuario viene desde Mudanza Fácil.
    useEffect(() => {
        if (!id) return;

        const fetchSolicitud = async () => {
            try {
                const res = await fetch(`${API}/solicitudes-mudanza/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setSolicitud(data.data);
                } else {
                    setModalError(data.message || "No fue posible recuperar tu solicitud.");
                }
            } catch (error) {
                console.error("Error al recuperar solicitud:", error);
                setModalError("No fue posible conectar con el servidor.");
            }
        };

        fetchSolicitud();
    }, [id, API]);

    /* =========================
       FLUJO NORMAL
    ========================= */
    const handleSeguro = async () => {
        if (!solicitud || sent || loading) return;
        setLoading(true);

        try {
            const res = await fetch(
                `${API}/solicitudes-mudanza/solicitar-seguro`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        id: solicitud.id
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "No fue posible registrar tu solicitud.");
            }

            setSent(true);
            window.location.assign(selectedAction.url);
        } catch (error) {
            setModalError(error.message || "Ocurrió un error.");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       FLUJO EXTERNO
    ========================= */
    const handleExterno = async () => {
        if (sent || loading) return;

        if (!form.fecha_recoleccion) {
            setModalError("Selecciona cuándo necesitas la mudanza.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${API}/solicitudes-mudanza/solicitar-seguro-externo`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "No fue posible registrar tu solicitud.");
            }

            setSent(true);
            setShowForm(false);
            window.location.assign(selectedAction.url);
        } catch (error) {
            setModalError(error.message || "Ocurrió un error.");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       MODALES COMPARTIDOS
    ========================= */
    const renderModales = () => (
        <>
            {modalMsg && (
                <BaseModal>
                    <div className="success-modal" ref={successModalRef}>
                        <img src="/icons/verificado.png" alt="verificado" className="success-img" />
                        <h3>Solicitud enviada</h3>
                        <div className="success-divider"></div>

                        <p>
                            {modalMsg || "Tu interés fue registrado correctamente."}
                        </p>

                        <p>
                            Un especialista del área de seguros se pondrá en contacto contigo
                            para darte más información sobre la protección para tu mudanza.
                        </p>

                        <section>
                            <img src="/icons/mensaje.png" alt="correo" />

                            <p>
                                <span>¿Qué sigue?</span>
                                <br />
                                Revisa tu correo electrónico. Ahí recibirás los siguientes pasos
                                para continuar con el proceso de protección de tu mudanza.
                            </p>
                        </section>

                        <p className="privacy-note">
                            <img src="/icons/candado.png" alt="Privacidad" />
                            Tu información será utilizada únicamente para dar seguimiento a tu solicitud.
                        </p>
                    </div>
                </BaseModal>
            )}

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

    /* =========================
       FLUJO NORMAL
    ========================= */
    if (id) {
        return (
            <>
                <button className="btnSeguro" onClick={handleSeguro} disabled={!solicitud || sent || loading} >
                    <span className="btnSeguro__content">
                        <img src={selectedAction.icon} alt="" />
                        <span className="text">
                            {loading ? "Procesando..." : sent ? "Solicitud enviada" : selectedAction.label}
                        </span>
                    </span>

                    {!loading && !sent && (
                        <span className="arrow">&gt;</span>
                    )}
                </button>

                {renderModales()}
            </>
        );
    }

    /* =========================
       USUARIO EXTERNO
    ========================= */
    return (
        <>
            {!showForm && (
                <button className="btnSeguro" onClick={() => setShowForm(true)} disabled={sent || loading} >
                    <span className="btnSeguro__content">
                        <img src={selectedAction.icon} alt="" />
                        <span className="text">
                            {sent ? "Solicitud enviada" : selectedAction.label}
                        </span>
                    </span>

                    {!sent && (
                        <span className="arrow">&gt;</span>
                    )}
                </button>
            )}

            {showForm && (
                <div className="seguroFormModal" role="dialog" aria-modal="true" aria-labelledby="seguroFormTitle" >
                    <div className="seguroFormModal__backdrop" onClick={() => { if (!loading) setShowForm(false); }} ></div>

                    <div className="seguroFormModal__content">
                        <button
                            type="button"
                            className="seguroFormModal__close"
                            onClick={() => { if (!loading) setShowForm(false);  }}
                            aria-label="Cerrar formulario"
                            disabled={loading}
                        >
                            ×
                        </button>

                        <div className="seguroFormModal__header">
                            <h2 id="seguroFormTitle">
                                Protege tu mudanza
                            </h2>

                            <p>
                                Déjanos algunos datos para que un especialista pueda orientarte 
                                sobre la protección de tus pertenencias.
                            </p>
                        </div>

                        <div className="seguroForm">
                            <div className="form-group">
                                <label htmlFor="nombre">
                                    Nombre completo
                                </label>

                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="Ej: Juan Pérez"
                                    value={form.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Correo electrónico
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Ej: correo@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">
                                    Teléfono de contacto
                                </label>

                                <input
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    placeholder="Ej: 9211234567"
                                    value={form.telefono}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="origen">
                                    ¿Desde dónde se realizará la mudanza?
                                </label>

                                <input
                                    id="origen"
                                    name="origen"
                                    type="text"
                                    placeholder="Ciudad, Estado de origen"
                                    value={form.origen}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="destino">
                                    ¿Hacia dónde se realizará la mudanza?
                                </label>

                                <input
                                    id="destino"
                                    name="destino"
                                    type="text"
                                    placeholder="Ciudad, Estado de destino"
                                    value={form.destino}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inventario">
                                    ¿Qué artículos deseas asegurar?
                                </label>

                                <textarea
                                    id="inventario"
                                    name="inventario"
                                    placeholder="Ej: sala, comedor, refrigerador, cajas, etc."
                                    value={form.inventario}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fecha_recoleccion">
                                    ¿Cuándo necesitas la mudanza?
                                </label>

                                <select
                                    id="fecha_recoleccion"
                                    name="fecha_recoleccion"
                                    value={form.fecha_recoleccion}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>

                                    <option value="1-7">1-7 días</option>
                                    <option value="8-15">8-15 días</option>
                                    <option value="15-30">15-30 días</option>
                                    <option value="30+">Más de 30 días</option>
                                    <option value="lo_antes_posible">
                                        Lo antes posible
                                    </option>
                                </select>
                            </div>

                            <button type="button" className="btnSeguro seguroForm__submit" onClick={handleExterno}  disabled={sent || loading} >
                                <span className="text">
                                    {loading ? "Enviando..." : sent ? "Solicitud enviada" : "Enviar solicitud"}
                                </span>

                                {!loading && !sent && (
                                    <span className="arrow">&gt;</span>
                                )}
                            </button>

                            <p className="seguroForm__privacy">
                                Tus datos serán utilizados únicamente para dar seguimiento a tu solicitud.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {renderModales()}
        </>
    );
}