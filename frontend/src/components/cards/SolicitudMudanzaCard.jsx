"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServiceStatusDropdown from "@/components/common/ServiceStatusDropdown";
import ComprarLeadModal from "@/components/modals/ComprarLeadModal";
import EmpresaNotesModal from "@/components/modals/EmpresaNotesModal";
import Button_cta from "@/components/common/Button_cta";
import { openLeadWhatsappMessage } from "@/utils/whatsapp";

export default function SolicitudMudanzaCard({
  id, origen = "", destino = "",
  fechaRecoleccion = "", distanciaKm = null, tipoMudanza = "",
  inventario = "", fecha = "", telefono = "",
  estado = "activo", showContact = true, onChangeEstado = null,
  isLead = false, nombreCliente = "", tipoVivienda = "",
  empresaNombre = "", empresaId = null, showDelete = false,
  onDelete = null,
  showNotes = false,
}) {

  const router = useRouter();
  const [estadoLocal, setEstadoLocal] = useState(estado);
  const [showModal, setShowModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    setEstadoLocal(estado);
  }, [estado]);

  const formatFechaRecoleccion = (value) => {
    const map = {
      "1-7": "1 a 7 días",
      "8-15": "8 a 15 días",
      "+15": "Más de 15 días",
      "lo_antes_posible": "Lo antes posible",
    };

    return map[value] || value;
  };

  return (
    <>
      <motion.div
        className="service-card solicitud-card"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >

        {showDelete && (
          <button className="lead-delete-btn" onClick={onDelete}>
            <img src="/icons/delete.png" alt="Eliminar" />
          </button>
        )}

        {showNotes && (
          <button className="lead-notes-btn" onClick={() => setShowNotesModal(true)} title="Notas" >
            <p>📝</p>
          </button>
        )}

        <div className="service-card__title">
          <span className="service-card__tag">
            Contacto
          </span>

          <h2 className="service-card__route">
            {origen} → {destino}
          </h2>
        </div>

        <p className="service-card__info" id="solicitud">
          <strong>Fecha deseada:</strong> {formatFechaRecoleccion(fechaRecoleccion)} días
        </p>

        <p className="service-card__info" id="solicitud">
          <strong>Modalidad:</strong>  {tipoMudanza}
        </p>

        <p className="service-card__info solicitud-card__inventario" id="solicitud">
          <strong>Inventario:</strong>{" "}
          {inventario?.replace(/<[^>]*>/g, "").slice(0, 80)}
          {inventario?.length > 80 && "..."}
        </p>

        {distanciaKm && (
          <p className="service-card__info" id="kilometros">
            {distanciaKm} km
          </p>
        )}

        <p className="service-card__date">
          Publicado el {fecha}
        </p>

        <div className="service-card__actions">
          <button className="btn-outline" onClick={() => router.push(`/empresa/solicitudes/${id}`)} >
            Ver detalles
          </button>

          {onChangeEstado ? (
            <ServiceStatusDropdown
              estado={estadoLocal}
              options={["activo", "asignado", "en_proceso", "finalizado", "sin_respuesta", "perdido",]}
              labels={{
                activo: "Pendiente",
                sin_respuesta: "Sin respuesta",
                asignado: "En proceso",
                en_proceso: "Cotizado",
                finalizado: "Vendido",
                perdido: "Perdido",
              }}
              onSelect={(nuevoEstado) => {
                setEstadoLocal(nuevoEstado);
                onChangeEstado(id, nuevoEstado);
              }}
            />
          ) : (

            <>
              {/* HOME */}
              {isLead ? (
                <Button_cta
                  value="Contactar"
                  icon="/icons/whatsapp.png"
                  iconAlt="WhatsApp"
                  onClick={() => {
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

                    openLeadWhatsappMessage({
                      telefono,
                      nombreCliente,
                      origen,
                      destino,
                      tipoVivienda,
                      empresaNombre,
                      empresaId,
                    });
                  }}
                />
              ) : (
                <button className="btn-solid btn-contact" onClick={() => setShowModal(true)}>
                  <img src="/icons/token.png" alt="Comprar" className="btn-contact__icon" />
                  <span>Comprar</span>
                </button>
              )}
            </>

          )}
        </div>
      </motion.div>

      {showModal && (
        <ComprarLeadModal
          solicitudId={id}
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

      <EmpresaNotesModal open={showNotesModal} leadId={id} onClose={() => setShowNotesModal(false)} />
    </>
  );
}