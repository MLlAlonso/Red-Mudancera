"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReviewCard from "@/components/cards/ReviewCard";

import "@/styles/pages/empresa/_empresaPerfil.scss";

export default function EmpresaPublicPerfil() {
  const { id } = useParams();
  const router = useRouter();

  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resenas, setResenas] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [allResenas, setAllResenas] = useState([]);

  // 🔥 FIX REAL
  const isVerified =
    empresa?.verificado === true || empresa?.verificado === 1;

  // =========================
  // FETCH EMPRESA
  // =========================
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/empresas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Empresa no encontrada");
        return res.json();
      })
      .then((data) => {
        console.log("EMPRESA DATA:", data); // 👈 DEBUG
        setEmpresa(data);
        setLoading(false);
      })
      .catch(() => {
        setEmpresa(null);
        setLoading(false);
      });
  }, [id]);

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
      .catch(() => setResenas([]));
  }, [empresa]);

  useEffect(() => {
    if (!showAllReviews || !empresa?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas/${empresa.id}/resenas`)
      .then((res) => res.json())
      .then((data) => setAllResenas(data))
      .catch(() => setAllResenas([]));
  }, [showAllReviews, empresa]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="empresa-perfil">
          <p>Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!empresa) {
    return (
      <>
        <Header />
        <main className="empresa-perfil">
          <p>No se pudo cargar la empresa.</p>
          <button onClick={() => router.back()}>Volver</button>
        </main>
        <Footer />
      </>
    );
  }

  // =========================
  // ACTIONS
  // =========================
  const handleShareProfile = () => {
    const link = `${window.location.origin}/empresa/${empresa.id}`;
    navigator.clipboard.writeText(link);
    alert("Link del perfil copiado");
  };

  const handleWhatsapp = () => {
    if (!empresa?.tel) {
      alert("Esta empresa no tiene teléfono disponible");
      return;
    }

    let phone = empresa.tel.replace(/\D/g, "");

    if (!phone.startsWith("52")) {
      phone = "52" + phone;
    }

    const message = encodeURIComponent(
      `Hola, vi tu empresa "${empresa.empresa}" en Mudanza Fácil y me gustaría obtener más información.`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="empresa-perfil">

        <h1 className="empresa-perfil__title">Perfil empresa</h1>
        <p className="empresa-perfil__subtitle">
          Información pública de la empresa
        </p>

        <div className="empresa-perfil__layout">

          {/* LEFT */}
          <div className="empresa-perfil__left">

            <div className="empresa-perfil__card">
              <div className="empresa-perfil__card-header">
                <h3>Detalles de empresa</h3>
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

            <div className="empresa-perfil__card">
              <div className="empresa-perfil__card-header">
                <h3>Reseñas</h3>
              </div>

              <div className="empresa-perfil__card-body">

                {resenas.length === 0 && !showAllReviews && (
                  <div className="empresa-perfil__reviews-empty">
                    ⭐ Esta empresa aún no tiene reseñas.
                  </div>
                )}

                {!showAllReviews &&
                  resenas.map((r) => (
                    <ReviewCard key={r.id} {...r} />
                  ))}

                {showAllReviews &&
                  allResenas.map((r) => (
                    <ReviewCard key={r.id} {...r} />
                  ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="empresa-perfil__right">

            <div className="empresa-perfil__hero">

              <img
                src={empresa.logo_url || "/icons/user-placeholder.png"}
                className="empresa-perfil__avatar"
              />

              <div className="empresa-perfil__name-block">

                <h2 className="empresa-perfil__name">
                  {isVerified && (
                    <img
                      src="/icons/verificado.png"
                      className="empresa-perfil__verified-icon"
                      alt="Verificado"
                    />
                  )}

                  {empresa.empresa}
                </h2>

                <span className="empresa-perfil__base">
                  {empresa.base ?? "Sede no especificada"}
                </span>

              </div>

            </div>

            <div className="empresa-perfil__stats">
              <div className="stat">
                <span>⭐ Reputación</span>
                {empresa.reputacion || "Sin reseñas"}
              </div>

              <div className="stat">
                <span>📦 Acuerdos</span>
                {empresa.numServicios || "Usuario nuevo"}
              </div>
            </div>

            <div className="empresa-perfil__actions">

              <button
                className="empresa-perfil__action-btn"
                onClick={handleShareProfile}
              >
                <img src="/icons/share.png" alt="Compartir" />
                Compartir perfil
              </button>

              <button
                className="empresa-perfil__action-btn"
                onClick={handleWhatsapp}
                id="contactar"
              >
                <img src="/icons/whatsapp.png" alt="WhatsApp" />
                Contactar
              </button>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}