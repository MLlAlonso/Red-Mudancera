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

  return (
    <>
      <Header />

      <main className="detalle-servicio">
        <div className="detalle-servicio__header">
          <div>
            <h1 className="detalle-servicio__title">Detalle de servicio</h1>
            <p className="detalle-servicio__subtitle">
              Información detallada del servicio
            </p>
          </div>
        </div>

        <div className="detalle-servicio__card">
          <div className={`detalle-servicio__route ${isOffer ? "offer" : "search"}`}>
            <span className="service-card__tag">
              {isOffer ? "Ofrezco" : "Busco"}
            </span>

            <h2 className="detalle-servicio__route-title">
              {servicio.origen} → {servicio.destino}
            </h2>

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

          <div className="detalle-servicio__grid">
            <div>
              <label>Volumen:</label>
              <span>{servicio.volumen} m³</span>
            </div>

            <div>
              <label>Publicado el:</label>
              <span>
                {servicio.created_at
                  ? new Date(servicio.created_at).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            <div>
              <label>Tipo de carga:</label>
              <span>{servicio.tipo_carga}</span>
            </div>

            <div>
              <label>Estado de la carga:</label>
              <span>{servicio.estado}</span>
            </div>

            <div>
              <label>Ciudad de origen:</label>
              <span>{servicio.origen}</span>
            </div>

            <div>
              <label>Ciudad de destino:</label>
              <span>{servicio.destino}</span>
            </div>

            <div>
              <label>Rango de salida:</label>
              <span id="salida">
                {servicio.inicio && servicio.fin
                  ? `${new Date(servicio.inicio).toLocaleDateString()} – ${new Date(servicio.fin).toLocaleDateString()}`
                  : "—"}
              </span>
            </div>

            <div>
              <label>Fecha límite de entrega:</label>
              <span>
                {servicio.fin
                  ? new Date(servicio.fin).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>

          <hr />

          <div className="detalle-servicio__empresa">
            <div>
              <label>Nombre empresa:</label>
              <span>{servicio.empresa?.empresa || "—"}</span>
            </div>

            <div>
              <label>Reputación:</label>
              <span className="reputacion">
                ⭐ {servicio.empresa?.reputacion ?? "—"}
              </span>
            </div>

            <div>
              <label>Nombre de vendedor:</label>
              <span>{servicio.responsable_nombre || "—"}</span>
            </div>

            <div>
              <label>Número alternativo:</label>
              <span>{servicio.responsable_telefono || "—"}</span>
            </div>
          </div>

          <hr />

          <div className="detalle-servicio__nota">
            <label>Nota:</label>
            <p>{servicio.nota || "Sin nota adicional"}</p>
          </div>

          <div className="detalle-servicio__importe">
            <label>Importe:</label>
            <span>
              {servicio.importe ? `$${servicio.importe}` : "No especificado"}
            </span>
          </div>

          <div className="detalle-servicio__actions">
            <Button_cta
              value="Contactar"
              onClick={() =>
                openWhatsappMessage({
                  tipo: servicio.tipo === "ofrezco" ? "Ofrezco" : "Busco",
                  origen: servicio.origen,
                  destino: servicio.destino,
                  volumen: `${servicio.volumen} m³`,
                  servicioId: servicio.id,
                })
              }
            />

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}