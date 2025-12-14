"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_crud from "@/components/common/Button_crud";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

import "@/styles/pages/usuario/_usuarioPerfil.scss";

export default function UsuarioPerfil() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  /**
   * Construye URL válida para imágenes:
   * - paths tipo: logos/archivo.jpg
   * - URLs completas (empresa.logo_url)
   */
  const buildFileUrl = (file) => {
    if (!file) return "/icons/default-user.png";

    // Si ya es URL completa (empresa)
    if (file.startsWith("http")) {
      return file;
    }

    // Si es path relativo (usuario avatar)
    const base = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");
    return `${base}/storage/${file}`;
  };

  useEffect(() => {
    const token = getCookie("token_usuario");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <ProfileSkeleton />
        <Footer />
      </>
    );
  }

  if (!data) return <p>Error: no se pudo cargar el perfil.</p>;

  const { usuario, empresa } = data;

  return (
    <>
      <Header />

      <main className="usuario-perfil">
        <h1 className="usuario-perfil__title">Perfil de usuario</h1>
        <p className="usuario-perfil__subtitle">Datos sobre el usuario</p>

        {/* Avatar usuario */}
        <div className="usuario-perfil__top">
          <img
            src={buildFileUrl(usuario.avatar)}
            className="usuario-perfil__avatar"
            alt="avatar"
          />
          <h2 className="usuario-perfil__name">{usuario.nombre}</h2>
        </div>

        {/* Stats */}
        <div className="usuario-perfil__stats">
          <div className="stat">
            ⭐ {empresa.reputacion}
            <span>Reputación</span>
          </div>
          <div className="stat">
            📦 {empresa.acuerdos}
            <span>Acuerdos</span>
          </div>
        </div>

        {/* Header sección */}
        <div className="usuario-perfil__row">
          <h3 className="usuario-perfil__section-title">Detalles usuario</h3>
          <Button_crud
            value="Editar"
            onClick={() => router.push("/usuario/perfil/editar")}
          />
        </div>

        {/* Info usuario */}
        <div className="usuario-perfil__info">
          <p><strong>Correo:</strong> {usuario.email}</p>
          <p><strong>Tel:</strong> {usuario.telefono}</p>
          <p><strong>Empresa:</strong> {empresa.nombre}</p>
        </div>

        <div className="usuario-perfil__divider"></div>

        {/* Empresa */}
        <div className="usuario-perfil__empresa">
          <img
            src={buildFileUrl(empresa.logo)}
            className="usuario-perfil__empresa-logo"
            alt="logo empresa"
          />
          <div>
            <p className="empresa-nombre">{empresa.nombre}</p>
            <p className="empresa-reputacion">
              ⭐ {empresa.reputacion} — Reputación
            </p>
            <p className="empresa-acuerdos">
              📦 {empresa.acuerdos} — Acuerdos
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
