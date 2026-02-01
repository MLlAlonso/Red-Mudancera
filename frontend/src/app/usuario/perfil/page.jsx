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
  const [data, setData] = useState({
    usuario: null,
    empresa: null,
  });

  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = getCookie("token_usuario");
    if (!token) return setLoading(false);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
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

  if (!data) return <p>Error al cargar perfil.</p>;
  const { usuario, empresa } = data;

  return (
    <>
      <Header />

      <main className="usuario-perfil">
        <h1>Perfil de usuario</h1>

        <div className="usuario-perfil__top">
          <img src={usuario.avatar || "/icons/default-user.png"} className="usuario-perfil__avatar" />
          <h2>{usuario.nombre}</h2>
        </div>

        <div className="usuario-perfil__row">
          <h3>Detalles usuario</h3>
          <Button_crud
            value="Editar"
            onClick={() => router.push("/usuario/perfil/editar")}
          />
        </div>

        <div className="usuario-perfil__info">
          <p><strong>Correo:</strong> {usuario.email}</p>
          <p><strong>Tel:</strong> {usuario.telefono}</p>

          {empresa?.nombre && (
            <p><strong>Empresa:</strong> {empresa.nombre}</p>
          )}
        </div>

        {/* SOLO SE MUESTRA SI EXISTE EMPRESA */}
        {empresa && (
          <>
            <div className="usuario-perfil__divider"></div>

            <div className="usuario-perfil__empresa">
              <img src={empresa.logo || "/icons/default-company.png"} className="usuario-perfil__empresa-logo" />

              <div className="usuario-perfil__empresa-info">
                <p className="empresa-nombre">{empresa.nombre}</p>

                {empresa.descripcion && (
                  <p className="empresa-descripcion">{empresa.descripcion}</p>
                )}

                {empresa.base && (
                  <p className="empresa-base">
                    <strong>Base:</strong> {empresa.base}
                  </p>
                )}
              </div>
            </div>

          </>
        )}
      </main>

      <Footer />
    </>
  );
}