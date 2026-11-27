"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import BaseModal from "@/components/modals/BaseModal";
import OneSignal from "react-onesignal";
import MensajesWhatsappManager from "@/components/empresa/MensajesWhatsappManager";
import PerfilEmpresaDocumentos from "@/components/empresa/PerfilEmpresaDocumentos";
import "@/styles/pages/empresa/_empresaConfiguracion.scss";

export default function ConfiguracionPage() {
    const [empresa, setEmpresa] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const ciudadesValidas = ciudades.filter(c => c && c.trim() !== "");
    const [diasRestantes, setDiasRestantes] = useState(null);
    const [ultimaModificacion, setUltimaModificacion] = useState(null);
    const [pushEnabled, setPushEnabled] = useState(false);
    const [pushLoading, setPushLoading] = useState(true);

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    };

    const abrirConfirmacion = () => {
        if (ciudadesValidas.length < 2) {
            setErrorMessage("Debes seleccionar 2 destinos para activar el radar");
            setShowErrorModal(true);
            return;
        }
        setShowConfirmModal(true);
    };

    const calcularTiempoRestante = (updatedAt) => {
        const ultima = new Date(updatedAt);
        setUltimaModificacion(ultima);
        const ahora = new Date();
        const diffMs = ahora - ultima;
        const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const restantes = 30 - dias;

        if (restantes > 0) {
            setDiasRestantes(restantes);
        } else {
            setDiasRestantes(0);
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return "";

        return fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // =========================
    // FETCH EMPRESA + CONFIG
    // =========================
    useEffect(() => {
        const token = getCookie("token_empresa");
        if (!token) return;

        // EMPRESA
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
            headers: { Authorization: `Bearer ${token}`, },
        })
            .then(res => res.json())
            .then(data => setEmpresa(data));

        // CONFIG RADAR
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/radar/config`, {
            headers: { Authorization: `Bearer ${token}`, },
        })
            .then(res => res.json())
            .then(data => {
                if (data.config?.ciudades) {
                    setCiudades(data.config.ciudades);
                }

                if (data.config?.updated_at) {
                    calcularTiempoRestante(data.config.updated_at);
                }
            });

    }, []);

    useEffect(() => {
        async function loadPushStatus() {
            try {
                const optedIn = await OneSignal.User.PushSubscription.optedIn;
                setPushEnabled(!!optedIn);

            } catch (e) {
                console.error(e);
            } finally {
                setPushLoading(false);
            }
        }
        loadPushStatus();
    }, []);

    if (!empresa) return null;

    // =========================
    // HANDLERS
    // =========================
    const handleCiudadChange = (index, value) => {
        const nuevas = [...ciudades];
        nuevas[index] = value;
        setCiudades(nuevas);
    };

    const agregarCiudad = () => {
        if (ciudades.length >= 2) return;
        setCiudades([...ciudades, ""]);
    };

    const guardar = async () => {
        const token = getCookie("token_empresa");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/radar/config`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ciudades }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setShowConfirmModal(false);
                setErrorMessage(data.message);
                setShowErrorModal(true);
                return;
            }

            // SUCCESS
            setShowConfirmModal(false);
            setEditando(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const togglePushNotifications = async () => {
        try {
            if (pushEnabled) {
                await OneSignal.User.PushSubscription.optOut();
                await OneSignal.User.removeTag("empresa_id");
                setPushEnabled(false);
                return;
            }

            const permission = await OneSignal.Notifications.permission;

            if (!permission) {
                await OneSignal.Notifications.requestPermission();
            }

            await OneSignal.User.addTag("empresa_id", String(empresa.id));
            const token = getCookie("token_empresa");

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/test-push`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, },
            });

            setPushEnabled(true);
        } catch (e) {
            console.error(e);
        }
    };

    // =========================
    // UI POR PLAN
    // =========================
    return (
        <>
            <Header />

            <main className="configuracion">
                <h1 className="configuracion__title">
                    Ajustes
                </h1>

                <p className="configuracion__subtitle">
                    Personaliza tus preferencias y configura las herramientas que necesitas para gestionar tu cuenta.
                </p>

                <div className="configuracion__block">
                    <h2>Mis notificaciones</h2>

                    <p className="configuracion__copy">
                        Podrás activarlas o desactivarlas a tu gusto para recibir notificaciones push.
                    </p>

                    {!pushLoading && (
                        <button className={`push-btn ${pushEnabled ? "push-btn--active" : "push-btn--inactive"}`} onClick={togglePushNotifications} >
                            {pushEnabled ? "Desactivar notificaciones push" : "Activar notificaciones push"}
                        </button>
                    )}
                </div>

                <div id="recibo-colores" className="configuracion__block">
                    <PerfilEmpresaDocumentos empresa={empresa} />
                </div>

                <div className="configuracion__block">
                    <MensajesWhatsappManager />
                </div>
            </main>

            {showConfirmModal && (
                <BaseModal onClose={() => setShowConfirmModal(false)}>
                    <div className="configuracion__modal">
                        <h3>Confirmar cambios</h3>

                        <p> Estás por actualizar tus destinos a: </p>

                        <div className="configuracion__modal-list">
                            {ciudadesValidas.map((c, i) => (
                                <div key={i} className="configuracion__modal-item">
                                    {c}
                                </div>
                            ))}
                        </div>

                        <p> Los destinos solo se pueden modificar una vez cada 30 días. <strong>¿Deseas continuar?</strong> </p>

                        <div className="configuracion__modal-actions">
                            <button className="configuracion__btn--secondary" onClick={() => setShowConfirmModal(false)} >
                                Cancelar
                            </button>

                            <button className="configuracion__btn" onClick={guardar} >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}

            {showErrorModal && (
                <BaseModal onClose={() => setShowErrorModal(false)}>
                    <div className="configuracion__modal">
                        <h3>Error</h3>

                        <p className="configuracion__modal-error">{errorMessage}</p>

                        <div className="configuracion__modal-actions">
                            <button className="configuracion__btn" onClick={() => setShowErrorModal(false)} >
                                Entendido
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}
            <Footer />
        </>
    );
}