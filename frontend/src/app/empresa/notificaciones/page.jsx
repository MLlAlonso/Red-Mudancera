"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OneSignal from "react-onesignal";
import NotificationCard from "@/components/cards/NotificationCard";
import ConfirmDeleteNotificationModal from "@/components/modals/ConfirmDeleteNotificationModal";

export default function EmpresaNotificacionesPage() {
    const [loading, setLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([]);
    const [pushEnabled, setPushEnabled] = useState(false);
    const [pushLoading, setPushLoading] = useState(true);

    const getTokenEmpresa = () => {
        const match = document.cookie.match(
            new RegExp("(^| )token_empresa=([^;]+)")
        );
        return match ? match[2] : null;
    };

    /* =========================
       FETCH NOTIFICACIONES
    ========================= */
    const fetchNotificaciones = async () => {
        const token = getTokenEmpresa();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            const data = await res.json();
            setNotificaciones(data || []);
        } catch (e) {
            console.error("Error al cargar notificaciones", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
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

    /* =========================
       MARCAR COMO LEÍDA
    ========================= */
    const marcarLeida = async (id) => {
        const token = getTokenEmpresa();
        if (!token) return;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones/${id}/leer`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        fetchNotificaciones();
    };

    const marcarTodas = async () => {
        const token = getTokenEmpresa();
        if (!token) return;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones/marcar-todas`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        fetchNotificaciones();
    };

    /* =========================
       ELIMINAR
    ========================= */
    const eliminar = async (id) => {
        const token = getTokenEmpresa();
        if (!token) return;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        fetchNotificaciones();
    };

    const eliminarLeidas = async () => {
        const token = getTokenEmpresa();
        if (!token) return;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones/eliminar-leidas`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        fetchNotificaciones();
    };

    const togglePushNotifications = async () => {
        try {
            if (pushEnabled) {
                await OneSignal.User.PushSubscription.optOut();
                await OneSignal.User.removeTag( "empresa_id" );
                setPushEnabled(false);
                return;
            }

            const permission = await OneSignal.Notifications.permission;

            if (!permission) {
                await OneSignal.Notifications.requestPermission();
            }

            await OneSignal.User.addTag( "empresa_id", String(empresa.id) );
            const token = getTokenEmpresa();

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/test-push`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPushEnabled(true);
        } catch (e) {
            console.error(e);
        }
    };

    const [confirmId, setConfirmId] = useState(null);
    const abrirModal = (id) => setConfirmId(id);
    const cerrarModal = () => setConfirmId(null);
    const confirmarEliminar = async () => { await eliminar(confirmId); cerrarModal(); };
    const noVistas = notificaciones.filter(n => !n.leida_empresa);
    const vistas = notificaciones.filter(n => n.leida_empresa);

    return (
        <>
            <Header />
            <main className="empresa-notificaciones">
                <div className="empresa-notificaciones__header">
                    <div>
                        <h1 className="title">
                            Notificaciones
                        </h1>
                        <p className="subtitle">
                            Avisos importantes del sistema
                        </p>
                    </div>
                </div>

                {loading && <p>Cargando notificaciones…</p>}
                {!loading && notificaciones.length === 0 && (
                    <p>No tienes notificaciones por ahora.</p>
                )}

                <div className="empresa-notificaciones__list">
                    {/* NO VISTAS */}
                    {noVistas.length > 0 && (
                        <>
                            <div className="empresa-notificaciones__actions">
                                <div className="empresa-notificaciones__actions_title">
                                    <h2 className="empresa-notificaciones__divider">
                                        No leídas
                                    </h2>
                                </div>

                                {!pushLoading && (
                                    <button
                                        className={`push-btn ${pushEnabled
                                            ? "push-btn--active"
                                            : "push-btn--inactive"
                                            }`}
                                        onClick={togglePushNotifications}
                                    >
                                        {pushEnabled
                                            ? "Desactivar notificaciones push"
                                            : "Activar notificaciones push"}
                                    </button>
                                )}

                                {noVistas.length > 0 && (
                                    <button className="notif-btn notif-btn--secondary" onClick={marcarTodas} >
                                        Marcar todo como leído
                                    </button>
                                )}
                            </div>

                            <section className="empresa-notificaciones__consejo">
                                <img src="/icons/foco.png" alt="" />

                                <div >
                                    <strong>Consejo</strong>
                                    <p>Revisa tu bandeja de entrada y también tu carpeta de spam o promociones.</p>
                                </div>
                            </section>

                            <div className="empresa-notificaciones__grid">
                                {noVistas.map((item) => (
                                    <NotificationCard
                                        key={item.id}
                                        title={item.titulo}
                                        message={item.mensaje}
                                        leida={item.leida_empresa}
                                        url={item.url_destino}
                                        onAccept={() => marcarLeida(item.id)}
                                        onDelete={() => abrirModal(item.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* VISTAS */}
                    {vistas.length > 0 && (
                        <>
                            <div className="empresa-notificaciones__actions">
                                <div className="empresa-notificaciones__actions_title">
                                    <h2 className="empresa-notificaciones__divider empresa-notificaciones__divider--vistas">
                                        Leídas
                                    </h2>
                                </div>

                                {vistas.length > 0 && (
                                    <button className="notif-btn notif-btn--danger" onClick={eliminarLeidas} >
                                        Eliminar todas
                                    </button>
                                )}
                            </div>

                            <div className="empresa-notificaciones__grid">
                                {vistas.map((item) => (
                                    <NotificationCard
                                        key={item.id}
                                        title={item.titulo}
                                        message={item.mensaje}
                                        leida={item.leida_empresa}
                                        url={item.url_destino}
                                        onAccept={() => marcarLeida(item.id)}
                                        onDelete={() => abrirModal(item.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />

            {confirmId && (
                <ConfirmDeleteNotificationModal
                    onCancel={cerrarModal}
                    onConfirm={confirmarEliminar}
                />
            )}
        </>
    );
}