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
        setEmpresa(data);
        setLoading(false);
      })
      .catch(() => {
        setEmpresa(null);
        setLoading(false);
      });
  }, [id]);

  // =========================
  // FETCH RESEÑAS (4)
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

  // =========================
  // FETCH TODAS LAS RESEÑAS
  // =========================
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

  return (
    <>
      <Header />

      <main className="empresa-perfil">

        <h1 className="empresa-perfil__title">Perfil empresa</h1>
        <p className="empresa-perfil__subtitle">
          Información pública de la empresa
        </p>

        {/* TOP PERFIL */}
        <div className="empresa-perfil__top">

          <img
            src={empresa.logo_url || "/icons/user-placeholder.png"}
            className="empresa-perfil__avatar"
            alt="Logo empresa"
          />

          <div className="empresa-perfil__name-block">

            <h2 className="empresa-perfil__name">
              {empresa.empresa}
            </h2>

            <span className="empresa-perfil__base">
              {empresa.base ?? "Sede no especificada"}
            </span>

            <span className="empresa-perfil__verified">
              <img src="/icons/verificado.png" alt="Verificada" />
              Empresa verificada
            </span>

          </div>

        </div>

        {/* STATS */}
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

        </div>

        {/* CARD DETALLES */}
        <div className="empresa-perfil__card">

          <div className="empresa-perfil__card-header">
            <h3 className="empresa-perfil__section-title">
              Detalles de empresa
            </h3>
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

        {/* CARD RESEÑAS */}

        <div className="empresa-perfil__card">

          <div className="empresa-perfil__card-header">

            <h3 className="empresa-perfil__section-title">
              Reseñas
            </h3>

          </div>

          <div className="empresa-perfil__card-body">

            {resenas.length === 0 && !showAllReviews && (
              <div className="empresa-perfil__reviews-empty">
                ⭐ Esta empresa aún no tiene reseñas.

                <p>
                  Esta es una empresa nueva en la plataforma.
                  Cuando comience a trabajar con otras empresas o clientes,
                  aquí aparecerán sus reseñas.
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

          {resenas.length > 0 && (
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

      <Footer />

    </>
  );
}