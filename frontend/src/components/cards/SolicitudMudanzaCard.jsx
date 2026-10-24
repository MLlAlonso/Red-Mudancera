"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_WHATSAPP_TEMPLATES } from "@/utils/whatsappTemplates";
import { buildLeadWhatsappVariables, openWhatsappTemplate, } from "@/utils/whatsapp";
import Button_cta from "@/components/common/Button_cta";
import ComprarLeadModal from "@/components/modals/ComprarLeadModal";
import EmpresaNotesModal from "@/components/modals/EmpresaNotesModal";
import WhatsappMensajeSelectorModal from "@/components/modals/WhatsappMensajeSelectorModal";

import "@/styles/components/_solicitudMudanzaCard.scss";

const ESTADOS = {
  activo: "Pendiente",
  asignado: "Cotizado",
  en_proceso: "En proceso",
  sin_respuesta: "Sin respuesta",
  finalizado: "Vendido",
  perdido: "Perdido",
};


const abreviarUbicacion = (ubicacion = "") => {
  const nombre = ubicacion.trim();

  const equivalencias = {
    "Ciudad de México, Ciudad de México": "CDMX",
    "Ciudad de México": "CDMX",
    "Veracruz de Ignacio de la Llave, Veracruz": "Veracruz",
  };

  return equivalencias[nombre] || nombre;
};


export default function SolicitudMudanzaCard({
  id,
  origen = "",
  destino = "",
  fechaRecoleccion = "",
  distanciaKm = null,
  tipoMudanza = "",
  inventario = "",
  fecha = "",
  telefono = "",
  estado = "activo",
  isLead = false,
  nombreCliente = "",
  tipoVivienda = "",
  empresaNombre = "",
  emailCliente = "",
  viviendaDestino = "",
  origenPisos = "",
  origenElevador = "",
  origenAcarreo = "",
  destinoPisos = "",
  destinoElevador = "",
  destinoAcarreo = "",
  tipoServicio = "",
  showNotes = true,
  showDelete = true,
  onDelete,
}) {
  const router = useRouter();
  const menuRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [mostrarMensajesWhatsapp, setMostrarMensajesWhatsapp] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [menuAccionesAbierto, setMenuAccionesAbierto] = useState(false);

  useEffect(() => {
    setShowModal(false);
    setMostrarMensajesWhatsapp(false);
    setShowNotesModal(false);
    setMenuAccionesAbierto(false);
  }, [id]);

  // Cierra el menú al hacer clic fuera de él o pulsar Escape.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAccionesAbierto(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuAccionesAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const formatFechaRecoleccion = (value) => {
    const map = {
      "1-7": "1 a 7 días",
      "8-15": "8 a 15 días",
      "+15": "Más de 15 días",
      lo_antes_posible: "Lo antes posible",
      "30+": "Más de 30 días",
    };

    return map[value] || value || "No especificada";
  };

  const contactarCliente = () => {
    const plan = document.cookie.match(/plan=([^;]+)/)?.[1];

    if (plan === "free" || plan === "explorador") {
      window.dispatchEvent(
        new CustomEvent("plan-limit", {
          detail: {
            message: "Necesitas un plan activo para contactar clientes.",
            required_plan: "conector",
          },
        })
      );
      return;
    }

    if (!telefono) {
      alert("Este lead no tiene teléfono disponible");
      return;
    }

    setMostrarMensajesWhatsapp(true);
  };

  const estadoClase = String(estado || "activo").replace(/[^a-z_]/g, "");

  const abrirNotas = () => {
    setMenuAccionesAbierto(false);
    setShowNotesModal(true);
  };

  const eliminarSolicitud = () => {
    setMenuAccionesAbierto(false);

    if (typeof onDelete === "function") {
      onDelete(id);
    }
  };

  return (
    <>
      <motion.div className="service-card solicitud-card" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }} >

        <div className="solicitud-card__header">
          <div className="solicitud-card__top-row">
            <span className="service-card__tag">Contacto</span>

            {isLead && (
              <div className="solicitud-card__header-actions">
                <span className={`solicitud-card__status solicitud-card__status--${estadoClase}`} aria-label={`Estado: ${ESTADOS[estado] || estado}`} >
                  {ESTADOS[estado] || estado}
                </span>

                {(showNotes || showDelete) && (
                  <div
                    ref={menuRef}
                    className={`solicitud-card__menu ${menuAccionesAbierto ? "is-open" : ""}`}
                    onMouseEnter={() => setMenuAccionesAbierto(true)}
                    onMouseLeave={() => setMenuAccionesAbierto(false)}
                  >
                    <button
                      type="button"
                      className="solicitud-card__menu-trigger"
                      aria-label="Más acciones"
                      aria-haspopup="true"
                      aria-expanded={menuAccionesAbierto}
                      onClick={() => setMenuAccionesAbierto((abierto) => !abierto)}
                    >
                      <span aria-hidden="true">⋮</span>
                    </button>

                    <div className="solicitud-card__menu-dropdown" role="menu" aria-label="Acciones de la solicitud"  >
                      {showNotes && (
                        <button type="button" role="menuitem" className="solicitud-card__menu-item" onClick={abrirNotas} >
                          <img src="/icons/notes.png" alt="" aria-hidden="true" />
                          <span>Notas</span>
                        </button>
                      )}

                      {showDelete && (
                        <button
                          type="button"
                          role="menuitem"
                          className="solicitud-card__menu-item solicitud-card__menu-item--delete"
                          onClick={eliminarSolicitud}
                          disabled={typeof onDelete !== "function"}
                          title={typeof onDelete !== "function" ? "La acción de eliminar no está configurada" : "Eliminar solicitud"}
                        >
                          <img src="/icons/delete.png" alt="" aria-hidden="true" />
                          <span>Eliminar</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <h2 className="service-card__route">
            {abreviarUbicacion(origen)} → {abreviarUbicacion(destino)}
          </h2>
        </div>

        <p className="service-card__info" id="recoleccion">
          <strong>Fecha deseada:</strong>{" "}
          {formatFechaRecoleccion(fechaRecoleccion)}
        </p>

        <p className="service-card__info">
          <strong>Modalidad:</strong> {tipoMudanza || "No especificada"}
        </p>

        <p className="service-card__info solicitud-card__inventario">
          <strong>Inventario:</strong>{" "}
          {inventario?.replace(/<[^>]*>/g, "").slice(0, 80) || "Sin inventario"}
          {inventario?.replace(/<[^>]*>/g, "").length > 80 && "..."}
        </p>

        {distanciaKm != null && distanciaKm !== "" && (
          <p className="service-card__info" id="kilometros">
            {distanciaKm} km
          </p>
        )}

        <p className="service-card__date">Publicado el {fecha}</p>

        <div className="service-card__actions solicitud-card__actions">
          <button
            type="button"
            className="btn-outline solicitud-card__btn solicitud-card__btn--details"
            onClick={() => router.push(`/empresa/solicitudes/${id}`)}
          >
            <img src="/icons/eye.png" alt="" aria-hidden="true" />
            <span>Ver detalles</span>
          </button>

          {isLead ? (
            <Button_cta value="Contactar" icon="/icons/whatsapp.png" iconAlt="WhatsApp" onClick={contactarCliente} />
          ) : (
            <button type="button" className="btn-solid btn-contact solicitud-card__btn" id="contact_contact" onClick={() => setShowModal(true)} >
              <img src="/icons/token.png" alt="" aria-hidden="true" className="btn-contact__icon" />
              <span>Comprar</span>
            </button>
          )}
        </div>
      </motion.div>

      {showModal && (
        <ComprarLeadModal solicitudId={id} onClose={() => setShowModal(false)} onSuccess={() => window.location.reload()} />
      )}

      <EmpresaNotesModal open={showNotesModal} leadId={id} onClose={() => setShowNotesModal(false)} />

      <WhatsappMensajeSelectorModal
        open={mostrarMensajesWhatsapp}
        onClose={() => setMostrarMensajesWhatsapp(false)}
        tipoContacto="empresa_cliente"
        telefono={telefono}
        mensajesDefault={DEFAULT_WHATSAPP_TEMPLATES.empresa_cliente}
        variables={buildLeadWhatsappVariables({
          empresaNombre,
          nombreCliente,
          emailCliente,
          origen,
          destino,
          tipoVivienda,
          viviendaDestino,
          origenPisos,
          origenElevador,
          origenAcarreo,
          destinoPisos,
          destinoElevador,
          destinoAcarreo,
          inventario,
          fechaRecoleccion,
          tipoServicio,
          tipoMudanza,
        })}
        onContactar={({ telefono, mensaje, conMensaje }) => { openWhatsappTemplate({ telefono, mensaje, conMensaje }); }}
      />
    </>
  );
}