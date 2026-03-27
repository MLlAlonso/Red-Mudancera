"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReviewCard from "@/components/cards/ReviewCard";
import Button_crud from "@/components/common/Button_crud";
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

  if (loading) return <p>Cargando...</p>;
  if (!empresa) return <p>Error: no se pudo cargar el perfil.</p>;

  return (
    <>
      <Header />

      <main className="empresa-perfil">
        <h1 className="empresa-perfil__title">Perfil empresa</h1>
        <p className="empresa-perfil__subtitle">Datos sobre la empresa</p>

        {/* Foto + nombre */}
        <div className="empresa-perfil__top">
          <img
            src={empresa.logo_url || "/icons/user-placeholder.png"}
            className="empresa-perfil__avatar"
          />

          <div className="empresa-perfil__name-block">
            <h2 className="empresa-perfil__name">{empresa.empresa}</h2>

            <span className="empresa-perfil__base">
              {empresa.base ?? "Sede no especificada"}
            </span>

            <div className="empresa-perfil-bagdes">
              <span className="empresa-perfil__verified">
                <img src="/icons/verificado.png" alt="Verificada" />
                Empresa verificada
              </span>

              <div className={`plan-badge plan-badge--${empresa.plan}`}>
                {empresa.plan === "free" && "Explorador"}
                {empresa.plan === "conector" && "Conector"}
                {empresa.plan === "radar" && "Radar"}
              </div>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="empresa-perfil__stats">
          <div className="stat">
            <span>⭐ Reputación</span>

            {empresa.reputacion > 0
              ? empresa.reputacion
              : "Sin reseñas"}
          </div>

          <div className="stat">
            <span>📦 Acuerdos</span>

            {empresa.numServicios > 0
              ? empresa.numServicios
              : "Usuario nuevo"}
          </div>

          <div className="stat stat--tokens" id="empresa_tokens">
            <div className="stat__top">
              <img src="/icons/token_color.png" alt="Tokens" />
              <span>Créditos</span>
            </div>

            {empresa.tokens > 0
              ? empresa.tokens
              : "Sin créditos"}
          </div>
        </div>

        {/* ACCIONES DE PERFIL */}
        <div className="empresa-perfil__actions">
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
            {copiedReferral ? "Link copiado" : "Copiar link de referidos"}
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

        {/* DETALLES EMPRESA */}
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

        {/* Reseñas */}
        <div className="empresa-perfil__card">
          <div className="empresa-perfil__card-header" id="header_resena">
            <h3 className="empresa-perfil__section-title">
              Reseñas
            </h3>

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
                  Comparte tu link de reseñas con clientes o empresas con las que hayas
                  trabajado para comenzar a construir tu reputación.
                </p>
              </div>
            )}

            {!showAllReviews &&
              resenas.map((r) => (
                <ReviewCard
                  key={r.id}
                  empresa={r.empresa}
                  fecha={r.fecha}
                  comentario={r.comentario}
                  rating={r.rating}
                />
              ))}

            {showAllReviews &&
              allResenas.map((r) => (
                <ReviewCard
                  key={r.id}
                  empresa={r.empresa}
                  fecha={r.fecha}
                  comentario={r.comentario}
                  rating={r.rating}
                />
              ))}
          </div>

          {(resenas.length > 0 || allResenas.length > 0) && (
            <div className="empresa-perfil__card-footer">

              {!showAllReviews && (
                <button
                  className="empresa-perfil__vermas"
                  onClick={() => setShowAllReviews(true)}
                >
                  Ver más reseñas
                </button>
              )}

              {showAllReviews && (
                <button
                  className="empresa-perfil__vermas"
                  onClick={() => setShowAllReviews(false)}
                >
                  Ver menos
                </button>
              )}

            </div>
          )}
        </div>

      </main>

      <ShareReviewLinkModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <Footer />
    </>
  );
}