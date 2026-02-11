"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotificationCard from "@/components/cards/NotificationCard";
import ConfirmDeleteNotificationModal from "@/components/modals/ConfirmDeleteNotificationModal";

export default function EmpresaNotificacionesPage() {
    const [loading, setLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([]);

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

    const [confirmId, setConfirmId] = useState(null);
    const abrirModal = (id) => setConfirmId(id);
    const cerrarModal = () => setConfirmId(null);
    const confirmarEliminar = async () => {
        await eliminar(confirmId);
        cerrarModal();
    };

    const noVistas = notificaciones.filter(n => !n.leida_empresa);
    const vistas = notificaciones.filter(n => n.leida_empresa);

    return (
        <>
            <Header />

            <main className="empresa-notificaciones">
                <div className="empresa-notificaciones__header">
                    <h1 className="title">Notificaciones</h1>
                    <p className="subtitle">Avisos importantes del sistema</p>
                </div>

                {loading && <p>Cargando notificaciones…</p>}
                {!loading && notificaciones.length === 0 && (
                    <p>No tienes notificaciones por ahora.</p>
                )}

                <div className="empresa-notificaciones__list">

                    {/* NO VISTAS */}
                    {noVistas.length > 0 && (
                        <>
                            <h2 className="empresa-notificaciones__divider">
                                No leídas
                            </h2>

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
                            <h2 className="empresa-notificaciones__divider empresa-notificaciones__divider--vistas">
                                Leídas
                            </h2>

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