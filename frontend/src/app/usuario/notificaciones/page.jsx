"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotificationCard from "@/components/cards/NotificationCard";
import ConfirmDeleteNotificationModal from "@/components/modals/ConfirmDeleteNotificationModal";

export default function UsuarioNotificacionesPage() {
  const [loading, setLoading] = useState(true);
  const [notificaciones, setNotificaciones] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  const getTokenUsuario = () => {
    const match = document.cookie.match(
      new RegExp("(^| )token_usuario=([^;]+)")
    );
    return match ? match[2] : null;
  };

  /* =========================
     FETCH NOTIFICACIONES
  ========================= */
  const fetchNotificaciones = async () => {
    const token = getTokenUsuario();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuario/notificaciones`,
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
    const token = getTokenUsuario();
    if (!token) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/usuario/notificaciones/${id}/leer`,
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
  const eliminar = async () => {
    const token = getTokenUsuario();
    if (!token || !confirmId) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/usuario/notificaciones/${confirmId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    setConfirmId(null);
    fetchNotificaciones();
  };

  const noLeidas = notificaciones.filter(n => !n.leida);
  const leidas = notificaciones.filter(n => n.leida);

  return (
    <>
      <Header />

      <main className="usuario-notificaciones">
        <div className="usuario-notificaciones__header">
          <h1 className="title">Notificaciones</h1>
          <p className="subtitle">Avisos importantes del sistema</p>
        </div>

        {loading && <p>Cargando notificaciones…</p>}

        {!loading && notificaciones.length === 0 && (
          <p>No tienes notificaciones por ahora.</p>
        )}

        <div className="usuario-notificaciones__list">

          {/* NO LEÍDAS */}
          {noLeidas.length > 0 && (
            <>
              <h2 className="usuario-notificaciones__divider">
                No leídas
              </h2>

              <div className="usuario-notificaciones__grid">
                {noLeidas.map((item) => (
                  <NotificationCard
                    key={item.id}
                    title={item.notificacion.titulo}
                    message={item.notificacion.mensaje}
                    leida={item.leida}
                    onAccept={() => marcarLeida(item.id)}
                    onDelete={() => setConfirmId(item.id)}
                  />
                ))}
              </div>
            </>
          )}

          {/* LEÍDAS */}
          {leidas.length > 0 && (
            <>
              <h2 className="usuario-notificaciones__divider usuario-notificaciones__divider--vistas">
                Leídas
              </h2>

              <div className="usuario-notificaciones__grid">
                {leidas.map((item) => (
                  <NotificationCard
                    key={item.id}
                    title={item.notificacion.titulo}
                    message={item.notificacion.mensaje}
                    leida={item.leida}
                    onAccept={() => marcarLeida(item.id)}
                    onDelete={() => setConfirmId(item.id)}
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
          onCancel={() => setConfirmId(null)}
          onConfirm={eliminar}
        />
      )}
    </>
  );
}
