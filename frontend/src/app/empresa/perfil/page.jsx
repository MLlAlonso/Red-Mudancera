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
          <img src={empresa.logo_url || "/icons/user-placeholder.png"} className="empresa-perfil__avatar" />
          <h2 className="empresa-perfil__name">{empresa.empresa}</h2>
        </div>

        {/* Stats */}
        <div className="empresa-perfil__stats">
          <div className="stat">
            ⭐{" "}
            {empresa.reputacion > 0
              ? empresa.reputacion
              : "Sin reseñas aún"}
            <span>Reputación</span>
          </div>

          <div className="stat">
            📦{" "}
            {empresa.numServicios > 0
              ? empresa.numServicios
              : "Usuario nuevo"}
            <span>Acuerdos</span>
          </div>

          <div className="stat stat--tokens">
            <div className="stat__top">
              <img src="/icons/token_color.png" alt="Tokens" />
              <strong>{empresa.tokens ?? 0}</strong>
            </div>
            <span>Tokens disponibles</span>
          </div>

        </div>

        {/* Título + botón editar */}
        <div className="empresa-perfil__row">
          <h3 className="empresa-perfil__section-title">
            Detalles de empresa
          </h3>

          <Button_crud value="Editar" onClick={() => router.push("/empresa/perfil/editar")} />
        </div>

        {/* Info */}
        <div className="empresa-perfil__info">
          <p><strong>Nombre:</strong> {empresa.empresa}</p>
          <p><strong>Descripción:</strong> {empresa.descripcion ?? "—"}</p>
          <p><strong>Sede:</strong> {empresa.base ?? "—"}</p>
          <p><strong>Representante legal:</strong> {empresa.representante}</p>
          <p><strong>Correo:</strong> {empresa.email}</p>
          <p><strong>Teléfono:</strong> {empresa.tel}</p>
        </div>

        <div className="empresa-perfil__divider"></div>

        {/* Reseñas */}
        <div className="empresa-perfil__row">
          <h3 className="empresa-perfil__section-title">Reseñas</h3>

          <div className="empresa-perfil__section-actions">
            <Button_crud value="Compartir link" onClick={() => setOpenModal(true)} />
          </div>
        </div>

        <div className="empresa-perfil__reviews">
          {resenas.length === 0 && (
            <p>⭐ Aún no tienes reseñas</p>
          )}

          {resenas.map((r) => (
            <ReviewCard
              key={r.id}
              empresa={r.empresa}
              fecha={r.fecha}
              comentario={r.comentario}
              rating={r.rating}
            />
          ))}

        </div>

        <span className="empresa-perfil__vermas">Ver más</span>
      </main>

      <ShareReviewLinkModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <Footer />
    </>
  );
}