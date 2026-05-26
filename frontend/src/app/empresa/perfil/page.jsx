"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReviewCard from "@/components/cards/ReviewCard";
import Button_crud from "@/components/common/Button_crud";
import CancelSubscriptionModal from "@/components/modals/CancelSubscriptionModal";
import ShareReviewLinkModal from "@/components/modals/ShareReviewLinkModal";

import "@/styles/pages/empresa/_empresaPerfil.scss";

export default function EmpresaPerfil() {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resenas, setResenas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [allResenas, setAllResenas] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState(null);


  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  // =========================
  // FETCH PERFIL (IGUAL)
  // =========================
  useEffect(() => {
    const token = getCookie("token_empresa");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpresa(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // =========================
  // FETCH RESEÑAS
  // =========================
  useEffect(() => {
    if (!empresa?.id) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/empresas/${empresa.id}/resenas?limit=4`
    )
      .then((res) => res.json())
      .then((data) => setResenas(data))
      .catch(() => { });
  }, [empresa]);

  useEffect(() => {
    if (!showAllReviews || !empresa?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas/${empresa.id}/resenas`)
      .then((res) => res.json())
      .then((data) => setAllResenas(data))
      .catch(() => { });
  }, [showAllReviews, empresa]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const payment = params.get("payment");
    const type = params.get("type");

    if (payment === "success") {
      if (type === "plan") {
        setPaymentMessage("Plan activado correctamente");
      } else if (type === "creditos") {
        setPaymentMessage("Créditos agregados correctamente");
      }

      window.history.replaceState({}, document.title, "/empresa/perfil");
    }
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!empresa) return <p>Error: no se pudo cargar el perfil.</p>;

  // =========================
  // SUBSCRIPCIÓN INFO
  // =========================
  const getDiasRestantes = () => {
    if (!empresa?.subFin) return null;
    const hoy = new Date();
    const fin = new Date(empresa.subFin);
    const diff = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const cancelarSuscripcion = async () => {
    const token = getCookie("token_empresa");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }

      setOpenCancelModal(false);
      alert("Suscripción cancelada al final del periodo");

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (e) {
      alert("Error de conexión");
    }
  };




  return (
    <>
      <Header />

      <main className="empresa-perfil">
        <h1 className="empresa-perfil__title">Perfil empresa</h1>
        <p className="empresa-perfil__subtitle">Datos sobre la empresa</p>

        {paymentMessage && (
          <div className="empresa-perfil__success">
            {paymentMessage}
          </div>
        )}

        <div className="empresa-perfil__layout">

          {/* LEFT */}
          <div className="empresa-perfil__left">
            {/* DETALLES */}
            <div className="empresa-perfil__card">
              <div className="empresa-perfil__card-header">
                <h3 className="empresa-perfil__section-title">
                  Detalles de empresa
                </h3>

                <Button_crud value="Editar" onClick={() => router.push("/empresa/perfil/editar")} />
              </div>

              <div className="empresa-perfil__card-body empresa-perfil__info">
                <p><strong>Nombre:</strong> {empresa.empresa}</p>
                <p><strong>Descripción:</strong> {empresa.descripcion ?? "—"}</p>
                <p><strong>Sede:</strong> {empresa.base ?? "—"}</p>
                <p><strong>Representante legal:</strong> {empresa.representante}</p>
                <p><strong>Correo:</strong> {empresa.email}</p>
                <p><strong>Teléfono:</strong> {empresa.tel}</p>
              </div>
            </div>

            {/* RESEÑAS */}
            <div className="empresa-perfil__card">
              <div className="empresa-perfil__card-header" id="header_resena">
                <h3 className="empresa-perfil__section-title">Reseñas</h3>

                <Button_crud
                  value="Copiar link de reseñas"
                  onClick={() => setOpenModal(true)}
                />
              </div>

              <div className="empresa-perfil__card-body">
                {resenas.length === 0 && !showAllReviews && (
                  <div className="empresa-perfil__reviews-empty">
                    ⭐ Esta empresa aún no tiene reseñas.
                    <p>
                      Comparte tu link de reseñas para comenzar a construir tu reputación.
                    </p>
                  </div>
                )}

                {!showAllReviews && resenas.map((r) => (
                  <ReviewCard key={r.id} {...r} />
                ))}

                {showAllReviews && allResenas.map((r) => (
                  <ReviewCard key={r.id} {...r} />
                ))}
              </div>

              {(resenas.length > 0 || allResenas.length > 0) && (
                <div className="empresa-perfil__card-footer">
                  <button
                    className="empresa-perfil__vermas"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Ver menos" : "Ver más reseñas"}
                  </button>
                </div>
              )}
            </div>

            {/* Imagenes */}
            <div className="empresa-perfil__card">
              <div className="empresa-perfil__card-header" id="header_resena">
                <h3 className="empresa-perfil__section-title">Imagenes</h3>
              </div>

              {empresa.imagenes?.length > 0 && (
                <div className="empresa-galeria">
                  {empresa.imagenes.map((img) => (
                    <img key={img.id} src={img.url} onClick={() => setImagenSeleccionada(img.url)} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="empresa-perfil__right">
            <div className="empresa-perfil__hero">
              <div className={`empresa-perfil__avatar-wrapper plan-${empresa.plan}`}>
                <img src={empresa.logo_url || "/icons/user-placeholder.png"} className="empresa-perfil__avatar" />
              </div>

              <div className="empresa-perfil__name-block">
                <h2 className="empresa-perfil__name">
                  {empresa.verificado && (
                    <img src="/icons/verificado.png" className="empresa-perfil__verified-icon" />
                  )}

                  {empresa.empresa}
                </h2>

                <span className="empresa-perfil__base">
                  {empresa.base ?? "Sede no especificada"}
                </span>
              </div>
            </div>

            {/* STATS */}
            <div className="empresa-perfil__stats">
              <div className="stat stat--tokens">
                <div className="stat__top">
                  <img src="/icons/token_color.png" />
                  <span>Créditos</span>
                </div>
                {empresa.tokens > 0 ? empresa.tokens : "Sin créditos"}
              </div>

              <div className="stat">
                <span>⭐ Reputación</span>
                {empresa.reputacion > 0 ? empresa.reputacion : "Sin reseñas"}
              </div>

              <div className="stat">
                <span>📦 Acuerdos</span>
                {empresa.numServicios > 0 ? empresa.numServicios : "Usuario nuevo"}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="empresa-perfil__actions">
              <button className="empresa-perfil__action-btn" onClick={() => router.push("/empresa/configuracion")} >
                Configuración
              </button>

              {/* Copiar link de referidos */}
              <button className="empresa-perfil__action-btn"
                onClick={() => {
                  const slug = empresa.empresa
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-");

                  const link = `app.mudanzafacil.com.mx/solicitar-mudanza/${slug}`;
                  navigator.clipboard.writeText(link);
                  setCopiedReferral(true);
                  setTimeout(() => setCopiedReferral(false), 2000);
                  console.log("Link copiado:", link);
                }}
              >
                <img src="/icons/copy.png" alt="Referidos" />
                {copiedReferral ? "Link copiado" : "Copiar link referidos"}
              </button>

              {/* Compartir perfil */}
              <button
                className="empresa-perfil__action-btn"
                onClick={() => {
                  const link = `${window.location.origin}/empresa/${empresa.id}`;
                  navigator.clipboard.writeText(link);
                  setCopiedProfile(true);
                  setTimeout(() => setCopiedProfile(false), 2000);
                  console.log("Perfil copiado:", link);
                }}
              >
                <img src="/icons/share.png" alt="Perfil" />
                {copiedProfile ? "Link copiado" : "Compartir perfil"}
              </button>
            </div>



            {/* SUSCRIPCIÓN */}
            {empresa.plan !== "free" && (
              <div className="empresa-perfil__card" id="suscripcion_card">
                <h3 className="empresa-perfil__section-title">
                  Suscripción
                </h3>

                <div className="empresa-perfil__card-body empresa-perfil__subscription">

                  <div className="suscripcion-info">
                    <p>
                      <strong>Renovación:</strong>{" "}
                      {empresa.subFin
                        ? new Date(empresa.subFin).toLocaleDateString()
                        : "—"}
                    </p>

                    <p>
                      <strong>Días restantes:</strong>{" "}
                      {getDiasRestantes() ?? "—"}
                    </p>
                  </div>

                  {/* SOLO SI ES AUTOMÁTICA */}
                  {empresa.stripe_subscription_id && empresa.subActiva && !Boolean(empresa.cancel_at_period_end) && (
                    <button className="empresa-perfil__cancel-btn" onClick={() => setOpenCancelModal(true)} >
                      Cancelar renovación automática
                    </button>
                  )}

                  {empresa.cancel_at_period_end && (
                    <p className="empresa-perfil__no-auto">
                      Tu suscripción se cancelará el{" "}
                      {empresa.subFin
                        ? new Date(empresa.subFin).toLocaleDateString()
                        : "—"}
                    </p>
                  )}

                  {!empresa.stripe_subscription_id && (
                    <p className="empresa-perfil__no-auto">
                      Pago manual (sin suscripción activa)
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <ShareReviewLinkModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <CancelSubscriptionModal
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        onConfirm={cancelarSuscripcion}
      />

      {imagenSeleccionada && (
        <div
          className="imagen-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setImagenSeleccionada(null);
            }
          }}
        >
          <div className="imagen-modal__content">
            <button
              className="imagen-modal__close"
              onClick={() => setImagenSeleccionada(null)}
            >
              ✕
            </button>

            <img src={imagenSeleccionada} alt="preview" />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}