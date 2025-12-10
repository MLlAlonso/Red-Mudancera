"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReviewCard from "@/components/cards/ReviewCard";
import Button_crud from "@/components/common/Button_crud";

import "@/styles/pages/empresa/_empresaPerfil.scss";

export default function EmpresaPerfil() {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

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
            src={
              empresa.logo
                ? `${process.env.NEXT_PUBLIC_STORAGE}/${empresa.logo}`
                : "/icons/user-placeholder.png"
            }
            className="empresa-perfil__avatar"
          />
          <h2 className="empresa-perfil__name">{empresa.empresa}</h2>
        </div>

        {/* Stats */}
        <div className="empresa-perfil__stats">
          <div className="stat">
            ⭐ {empresa.reputacion}
            <span>Reputación</span>
          </div>

          <div className="stat">
            📦 {empresa.numServicios}
            <span>Acuerdos</span>
          </div>
        </div>

        {/* Título + botón editar */}
        <div className="empresa-perfil__row">
          <h3 className="empresa-perfil__section-title">Detalles de empresa</h3>

          <Button_crud
            value="Editar"
            onClick={() => router.push("/empresa/perfil/editar")}
          />
        </div>

        {/* Info */}
        <div className="empresa-perfil__info">
          <p><strong>Nombre:</strong> {empresa.empresa}</p>
          <p><strong>Descripción:</strong> {empresa.descripcion ?? "—"}</p>
          <p><strong>Correo:</strong> {empresa.email}</p>
          <p><strong>Representante legal:</strong> {empresa.representante}</p>
          <p><strong>Teléfono:</strong> {empresa.tel}</p>
          <p><strong>Sede:</strong> {empresa.base ?? "—"}</p>
        </div>

        <div className="empresa-perfil__divider"></div>

        {/* Reseñas */}
        <div className="empresa-perfil__row">
          <h3 className="empresa-perfil__section-title">Reseñas</h3>
          <span className="empresa-perfil__vermas">Ver más</span>
        </div>

        <div className="empresa-perfil__reviews">
          <ReviewCard
            empresa="Mudanzas López"
            fecha="05/12/2025"
            rating={4.5}
            comentario="Excelente servicio, muy profesional."
          />

          <ReviewCard
            empresa="Transportes Ramírez"
            fecha="04/12/2025"
            rating={5}
            comentario="Todo perfecto, muy recomendados."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
