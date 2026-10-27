"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_crud from "@/components/common/Button_crud";
import Button_cta from "@/components/common/Button_cta";
import LiveViewToast from "@/components/common/LiveViewToast";
import WhatsappMensajeSelectorModal from "@/components/modals/WhatsappMensajeSelectorModal";
import { getPlan, canContact, canSeePhone } from "@/utils/plan";
import { buildServiceWhatsappVariables, openWhatsappTemplate, } from "@/utils/whatsapp";

import "@/styles/pages/servicios/_detallesServicio.scss";

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
  };

  const paths = {
    truck: (
      <>
        <path d="M3 6h11v12H3z" />
        <path d="M14 10h4l3 3v5h-7z" />
        <circle cx="7.5" cy="18" r="1.8" />
        <circle cx="17.5" cy="18" r="1.8" />
      </>
    ),
    package: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8" />
        <path d="M12 13v9M7.5 5.5l9 5" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 7h2M14 7h1M9 11h2M14 11h1M9 15h2M14 15h1M10 21v-3h4v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    note: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    money: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.5a8.4 8.4 0 0 1-12.4 7.4L4 20l1.1-3.4A8.4 8.4 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1.2-1.2 2 1c-.2 1.5-1.2 2.2-2.5 2.2-3.5-.5-6.7-3.7-7.2-7.2 0-1.3.7-2.3 2.2-2.5l1 2z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.note}</svg>;
}

function formatTipoCarga(value) {
  const map = {
    menaje: "Menaje de casa",
    vehiculo: "Vehículo",
    menaje_vehiculo: "Menaje + vehículo",
    otro: "Otro",
  };

  return map[value] || value || "—";
}

function formatTipoVehiculo(value) {
  const map = {
    compacto: "Auto compacto",
    camioneta: "Camioneta",
    motocicleta: "Motocicleta",
  };

  return map[value] || "—";
}

function formatEstadoCarga(estado) {
  const map = {
    mi_almacen: "En bodega",
    tu_almacen: "Directo en tu bodega",
    en_ruta: "Pendiente de recolección",
  };

  return map[estado] || "—";
}

function formatFecha(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatImporte(value) {
  if (Number(value) === 0) return "A convenir";

  return `$${Number(value).toLocaleString("es-MX", {
    maximumFractionDigits: 2,
  })}`;
}

export default function DetalleServicioPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [servicio, setServicio] = useState(null);
  const [empresaAuth, setEmpresaAuth] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(null);
  const [showWhatsappSelector, setShowWhatsappSelector] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No fue posible cargar el servicio.");
        }

        return res.json();
      })
      .then((res) => {
        if (cancelado) return;
        const servicioData = res.data ?? res;
        setServicio(servicioData);
      })
      .catch((error) => {
        console.error("Error al cargar servicio:", error);
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelado = false;
    const token = document.cookie.split("; ").find((item) => item.startsWith("token_empresa="))?.split("=")[1];
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No fue posible obtener la empresa autenticada.");
        }

        return res.json();
      })
      .then((data) => {
        if (!cancelado) {
          setEmpresaAuth(data);
        }
      })
      .catch((error) => { console.error("Error al obtener empresa autenticada:", error); });

    return () => {
      cancelado = true;
    };
  }, []);

  if (!servicio) return null;
  const isOwner = empresaAuth && empresaAuth.id === servicio.empresa_id;
  const isOffer = servicio.tipo === "ofrezco";
  const telefonoContacto = servicio.responsable_telefono || servicio.empresa?.tel || "";
  const tipoCargaVehiculo = isOffer && servicio.tipo_carga === "vehiculo";

  const goToEmpresaPerfil = () => {
    if (!servicio?.empresa?.id) return;
    router.push(`/empresa/${servicio.empresa.id}`);
  };

  const contactarEmpresa = () => {
    const plan = getPlan();

    if (!canContact(plan)) {
      window.dispatchEvent(new CustomEvent("plan-limit", {
        detail: {
          error: "PLAN_LIMIT",
          message: "Necesitas un plan activo para contactar empresas.",
          required_plan: "conector",
        },
      })
      );

      return;
    }

    setShowWhatsappSelector(true);
  };

  const fechaRango = servicio.inicio && servicio.fin ? `${formatFecha(servicio.inicio)} – ${formatFecha(servicio.fin)}` : "—";
  const telefonoVisible = canSeePhone(getPlan());

  const variablesWhatsapp = buildServiceWhatsappVariables({
    telefono: telefonoContacto,
    tipo: isOffer ? "Ofrezco" : "Busco",
    origen: servicio.origen,
    destino: servicio.destino,
    tipoCarga: servicio.tipo_carga,
    volumen: servicio.volumen,
    tipoVehiculo: servicio.tipo_vehiculo,
    servicioId: servicio.id,
  });

  return (
    <>
      <Header />

      <main className="detalle-servicio">
        <header className="detalle-servicio__header">
          <h1 className="detalle-servicio__title">
            Detalle de servicio
          </h1>

          <p className="detalle-servicio__subtitle">
            Información detallada del servicio
          </p>
        </header>

        <div className="detalle-servicio__content">
          <section className="detalle-servicio__card detalle-servicio__summary">
            <div className="detalle-servicio__top-row">
              <div className="detalle-servicio__badges">
                <span className={`detalle-servicio__badge ${isOffer ? "detalle-servicio__badge--ofrezco" : "detalle-servicio__badge--busco"}`} >
                  <span className="detalle-servicio__badge-dot" aria-hidden="true" />
                  {isOffer ? "Ofrezco" : "Busco"}
                </span>
              </div>

              {isOwner && (
                <Button_crud value="Editar" onClick={() => router.push(`/servicios/${servicio.id}/editar/${servicio.tipo}`)} />
              )}
            </div>

            <div className="detalle-servicio__route">
              <h2 className="detalle-servicio__route-title">
                <span>{servicio.origen || "Origen no especificado"}</span>

                <span className="detalle-servicio__route-arrow" aria-hidden="true" >
                  →
                </span>

                <span>{servicio.destino || "Destino no especificado"}</span>
              </h2>
            </div>

            <div className="detalle-servicio__quick-info">
              <div className="detalle-servicio__info-badge">
                <Icon name="package" />
                <span>{formatTipoCarga(servicio.tipo_carga)}</span>
              </div>

              {tipoCargaVehiculo ? (
                <div className="detalle-servicio__info-badge">
                  <Icon name="truck" />
                  <span>
                    {formatTipoVehiculo(servicio.tipo_vehiculo)}
                  </span>
                </div>
              ) : (
                <div className="detalle-servicio__info-badge">
                  <Icon name="package" />
                  <span>
                    {servicio.volumen ? `${servicio.volumen} m³` : "Volumen no especificado"}
                  </span>
                </div>
              )}

              {isOffer && (
                <div className="detalle-servicio__info-badge">
                  <Icon name="map" />
                  <span>
                    {servicio.distancia_km ? `${servicio.distancia_km} km` : "Distancia no disponible"}
                  </span>
                </div>
              )}

              {isOffer && (
                <div className="detalle-servicio__info-badge">
                  <Icon name="truck" />
                  <span>
                    {formatEstadoCarga(servicio.estado_carga)}
                  </span>
                </div>
              )}

              {isOffer && (
                <div className="detalle-servicio__info-badge">
                  <Icon name="money" />
                  <span>{formatImporte(servicio.importe)}</span>
                </div>
              )}

              <div className="detalle-servicio__info-badge">
                <Icon name="calendar" />
                <span>{fechaRango}</span>
              </div>
            </div>
          </section>

          <section className="detalle-servicio__card detalle-servicio__section">
            <div className="detalle-servicio__section-heading">
              <span className="detalle-servicio__section-icon">
                <Icon name="building" size={24} />
              </span>

              <h3>Empresa</h3>
            </div>

            <div className="detalle-servicio__empresa">
              <div
                className="empresa-clickable"
                onClick={goToEmpresaPerfil}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToEmpresaPerfil();
                  }
                }}
              >
                <label>Nombre empresa</label>
                <span>{servicio.empresa?.empresa || "—"}</span>
              </div>

              <div>
                <label>Reputación</label>
                <span className="reputacion">
                  <span aria-hidden="true">★</span>
                  {servicio.empresa?.reputacion > 0 ? servicio.empresa.reputacion : "Sin reseñas aún"}
                </span>
              </div>

              <div>
                <label>Nombre de vendedor</label>
                <span>{servicio.responsable_nombre || "—"}</span>
              </div>

              <div>
                <label>Número alternativo</label>

                {telefonoVisible ? (
                  <span>
                    {servicio.responsable_telefono || "—"}
                  </span>
                ) : (
                  <span className="detalle-servicio__phone-locked">
                    Disponible con plan activo
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="detalle-servicio__card detalle-servicio__section">
            <div className="detalle-servicio__section-heading">
              <span className="detalle-servicio__section-icon">
                <Icon name="note" size={24} />
              </span>

              <h3>Descripción de la carga</h3>
            </div>

            <div className="nota-html" dangerouslySetInnerHTML={{ __html: servicio.nota || "<p>Sin nota adicional</p>", }} />
          </section>

          {servicio.imagenes?.length > 0 && (
            <section className="detalle-servicio__card detalle-servicio__section">
              <div className="detalle-servicio__section-heading">
                <span className="detalle-servicio__section-icon">
                  <Icon name="package" size={24} />
                </span>

                <h3>Imágenes del servicio</h3>
              </div>

              <div className="servicio-galeria">
                {servicio.imagenes.map((img, index) => (
                  <button key={img.id} type="button" className="servicio-galeria__item" onClick={() => setImagenActiva(img.url)} aria-label={`Ampliar imagen ${index + 1}`} >
                    <img src={img.url} alt={`Imagen ${index + 1} del servicio`} />
                  </button>
                ))}
              </div>
            </section>
          )}

          {!isOwner && (
            <div className="detalle-servicio__actions">
              <Button_cta value="Contactar" icon="/icons/whatsapp.png" iconAlt="WhatsApp" onClick={contactarEmpresa} />
            </div>
          )}
        </div>

        {imagenActiva && (
          <div className="imagen-modal" onClick={() => setImagenActiva(null)} role="presentation" >
            <div className="imagen-modal__content" onClick={(event) => event.stopPropagation()} role="presentation" >
              <button type="button" className="imagen-modal__close" onClick={() => setImagenActiva(null)} aria-label="Cerrar imagen"  >
                ✕
              </button>

              <img src={imagenActiva} alt="Imagen ampliada del servicio" />
            </div>
          </div>
        )}
      </main>

      <LiveViewToast tipo="servicio" registroId={servicio.id} />

      <WhatsappMensajeSelectorModal
        open={showWhatsappSelector}
        onClose={() => setShowWhatsappSelector(false)}
        tipoContacto="empresa_empresa"
        telefono={telefonoContacto}
        variables={variablesWhatsapp}
        onContactar={({ telefono, mensaje, conMensaje }) => {
          setShowWhatsappSelector(false);
          openWhatsappTemplate({
            telefono,
            mensaje,
            conMensaje,
          });
        }}
      />

      <Footer />
    </>
  );
}