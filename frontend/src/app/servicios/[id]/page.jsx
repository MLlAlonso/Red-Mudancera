"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_crud from "@/components/common/Button_crud";
import Button_cta from "@/components/common/Button_cta";
import { openWhatsappMessage } from "@/utils/whatsapp";

import "@/styles/pages/servicios/_detallesServicio.scss";

export default function DetalleServicioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [servicio, setServicio] = useState(null);
  const [empresaAuth, setEmpresaAuth] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(null);

  /* =========================
     Obtener servicio
  ========================= */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`)
      .then(res => res.json())
      .then(res => {
        const servicio = res.data ?? res;
        setServicio(servicio);
      });
  }, [id]);

  /* =========================
     Obtener empresa autenticada
  ========================= */
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(r => r.startsWith("token_empresa="))
      ?.split("=")[1];

    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setEmpresaAuth(data));
  }, []);

  if (!servicio) return null;
  const isOwner = empresaAuth && empresaAuth.id === servicio.empresa_id;
  const isOffer = servicio.tipo === "ofrezco";

  /* =========================
     Ir al perfil de empresa
  ========================= */
  const goToEmpresaPerfil = () => {
    if (!servicio?.empresa?.id) return;
    router.push(`/empresa/${servicio.empresa.id}`);
  };

  const telefonoContacto =
    servicio.responsable_telefono ||
    servicio.empresa?.tel ||
    "";

  const estadoCargaLabel = (estado) => {
    switch (estado) {
      case "mi_almacen":
        return "En bodega";
      case "tu_almacen":
        return "Directo en tu bodega";
      case "en_ruta":
        return "Pendiente de recolección";
      default:
        return "—";
    }
  };

  return (
    <>
      <Header />

      <main className="detalle-servicio">
        <div className="detalle-servicio__header">
          <h1 className="detalle-servicio__title">Detalle de servicio</h1>
          <p className="detalle-servicio__subtitle">
            Información detallada del servicio
          </p>
        </div>

        <div className="detalle-servicio__card">
          <div className={`detalle-servicio__route ${isOffer ? "offer" : "search"}`}>
            <div className="detalle-servicio__route-tags">
              <span className="service-card__tag">
                {isOffer ? "Ofrezco" : "Busco"}
              </span>

              {isOwner && (
                <Button_crud
                  value="Editar"
                  onClick={() =>
                    router.push(
                      `/servicios/${servicio.id}/editar/${servicio.tipo}`
                    )
                  }
                />
              )}
            </div>

            <div className="detalle-servicio__route-tags">
              <h2 className="detalle-servicio__route-title">
                {/* <img src="/icons/place-marker.png" alt="" /> */}
                {servicio.origen}
                {" → "}
                {servicio.destino}
              </h2>
            </div>
          </div>

          <div className="detalle-servicio__grid">
            <div>
              <label>Volumen:</label>
              <span>{servicio.volumen} m³</span>
            </div>

            {isOffer && (
              <div>
                <label>Distancia:</label>
                <span>
                  {servicio.distancia_km
                    ? `${servicio.distancia_km} km`
                    : "—"}
                </span>
              </div>
            )}

            {isOffer && (
              <div>
                <label>Oferta:</label>
                <span>
                  {Number(servicio.importe) === 0
                    ? "A convenir"
                    : `$${Number(servicio.importe).toLocaleString()}`}
                </span>
              </div>
            )}

            <div>
              <label>Tipo de carga:</label>
              <span>{servicio.tipo_carga}</span>
            </div>

            <div>
              <label>Rango de salida:</label>
              <span id="salida">
                {servicio.inicio && servicio.fin
                  ? `${new Date(servicio.inicio).toLocaleDateString()} – ${new Date(servicio.fin).toLocaleDateString()}`
                  : "—"}
              </span>
            </div>

            {servicio.tipo === "ofrezco" && (
              <div>
                <label>Estado de carga:</label>
                <span>{estadoCargaLabel(servicio.estado_carga)}</span>
              </div>
            )}

          </div>

          <div className="detalle-servicio__divider">
            <img src="/icons/truck.png" alt="divider" className="divider__icon" />
          </div>

          {/* =========================
             Empresa
          ========================= */}
          <div className="detalle-servicio__empresa">

            <div className="empresa-clickable" onClick={goToEmpresaPerfil}>
              <label>Nombre empresa:</label>
              <span>{servicio.empresa?.empresa || "—"}</span>
            </div>

            <div>
              <label>Reputación:</label>
              <span className="reputacion">
                ⭐{" "}
                {servicio.empresa?.reputacion > 0
                  ? servicio.empresa.reputacion
                  : "Sin reseñas aún"}
              </span>

            </div>

            <div>
              <label>Nombre de vendedor:</label>
              <span id="vendedor">{servicio.responsable_nombre || "—"}</span>
            </div>

            <div>
              <label>Número alternativo:</label>
              <span>{servicio.responsable_telefono || "—"}</span>
            </div>
          </div>

          <label>Descripción de la carga:</label>
          <div
            className="nota-html"
            dangerouslySetInnerHTML={{
              __html: servicio.nota || "<p>Sin nota adicional</p>",
            }}
          />

          {/* =========================
                Galería de imágenes
              ========================= */}
          {servicio.imagenes?.length > 0 && (
            <div className="servicio-galeria">
              {servicio.imagenes.map((img, index) => (
                <div key={img.id} className="servicio-galeria__item" onClick={() => setImagenActiva(img.url)} >
                  <img src={img.url} alt={`imagen-${index}`} />
                </div>
              ))}
            </div>
          )}

          {!isOwner && (
            <div className="detalle-servicio__actions">
              <Button_cta
                value="Contactar"
                icon="/icons/whatsapp.png"
                iconAlt="WhatsApp"
                onClick={() =>
                  openWhatsappMessage({
                    telefono: telefonoContacto,
                    tipo: isOffer ? "Ofrezco" : "Busco",
                    origen: servicio.origen,
                    destino: servicio.destino,
                    volumen: `${servicio.volumen} m³`,
                    servicioId: servicio.id,
                  })
                }
              />
            </div>
          )}

        </div>

        {/* =========================
              Modal imagen ampliada
            ========================= */}
        {imagenActiva && (
          <div
            className="imagen-modal"
            onClick={() => setImagenActiva(null)}
          >
            <div className="imagen-modal__content" onClick={(e) => e.stopPropagation()} >
              <button className="imagen-modal__close" onClick={() => setImagenActiva(null)} >
                ✕
              </button>
              <img src={imagenActiva} alt="Imagen ampliada" />
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}