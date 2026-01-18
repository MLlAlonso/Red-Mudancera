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

  const getLogo = (empresa) => {
    if (!empresa?.logo_url) return "/icons/user-placeholder.png";
    return empresa.logo_url;
  };

  // =========================
  // FETCH EMPRESA PÚBLICA
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

  return (
    <>
      <Header />

      <main className="empresa-perfil">
        <h1 className="empresa-perfil__title">Perfil empresa</h1>
        <p className="empresa-perfil__subtitle">
          Información pública de la empresa
        </p>

        <div className="empresa-perfil__top">
          <img
            src={getLogo(empresa)}
            className="empresa-perfil__avatar"
            alt="Logo empresa"
          />
          <h2 className="empresa-perfil__name">{empresa.empresa}</h2>
        </div>

        <div className="empresa-perfil__stats">
          <div className="stat">
            ⭐ {empresa.reputacion ?? "—"}
            <span>Reputación</span>
          </div>

          <div className="stat">
            📦 {empresa.numServicios ?? 0}
            <span>Acuerdos</span>
          </div>
        </div>

        <h3 className="empresa-perfil__section-title">Detalles de empresa</h3>

        <div className="empresa-perfil__info">
          <p><strong>Nombre:</strong> {empresa.empresa}</p>
          <p><strong>Descripción:</strong> {empresa.descripcion ?? "—"}</p>
          <p><strong>Sede:</strong> {empresa.base ?? "—"}</p>
          <p><strong>Representante legal:</strong> {empresa.representante}</p>
          <p><strong>Teléfono:</strong> {empresa.tel}</p>
        </div>

        <div className="empresa-perfil__divider"></div>

        <h3 className="empresa-perfil__section-title">Reseñas</h3>

        <div className="empresa-perfil__reviews">
          {resenas.length === 0 && <p>⭐ Aún no hay reseñas</p>}

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
      </main>

      <Footer />
    </>
  );
}
