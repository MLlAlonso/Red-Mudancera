"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { openWhatsappMessage } from "@/utils/whatsapp";
import ServiceStatusDropdown from "@/components/common/ServiceStatusDropdown";

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
  showContact = true,
  onChangeEstado = null,
}) {

  const router = useRouter();

  const [estadoLocal, setEstadoLocal] = useState(estado);

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
    <motion.div
      className="service-card solicitud-card"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="service-card__title">
        <span className="service-card__tag">
          Solicitud
        </span>

        <h2 className="service-card__route">
          {origen} → {destino}
        </h2>
      </div>

      <p className="service-card__info" id="solicitud">
        <strong>Recolección:</strong> {formatFechaRecoleccion(fechaRecoleccion)}
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
        {/* VER DETALLES */}
        <button
          className="btn-outline"
          onClick={() => router.push(`/empresa/solicitudes/${id}`)}
        >
          Ver detalles
        </button>

        {/* CONTACTAR */}
        {showContact && (
          <button
            className="btn-solid btn-contact"
            onClick={() =>
              openWhatsappMessage({
                telefono,
                tipo: "Solicitud",
                origen,
                destino,
                volumen: tipoMudanza,
                servicioId: id,
              })
            }
          >
            <img
              src="/icons/token.png"
              alt="WhatsApp"
              className="btn-contact__icon"
            />
            <span>Comprar</span>
          </button>
        )}

        {/* DROPDOWN ESTADO */}
        {!showContact && onChangeEstado && (
          <ServiceStatusDropdown
            estado={estadoLocal}
            onSelect={(nuevoEstado) => {
              setEstadoLocal(nuevoEstado);
              onChangeEstado(id, nuevoEstado);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}