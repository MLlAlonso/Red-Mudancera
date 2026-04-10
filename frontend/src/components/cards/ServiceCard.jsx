"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { openWhatsappMessage } from "@/utils/whatsapp";
import { getPlan, canContact } from "@/utils/plan";
import ServiceStatusDropdown from "@/components/common/ServiceStatusDropdown";

export default function ServiceCard({
  id,
  type = "busco",
  origen = "",
  destino = "",
  volumen = "",
  empresa = "",
  telefono = "",
  fecha = "",
  estado = "activo",
  showContact = true,
  onChangeEstado = null,
  distanciaKm = null,
  importe = null,
  tipoCarga = null,
  tipoVehiculo = null,
}) {

  const router = useRouter();
  const isOffer = type === "ofrezco";

  // ESTADO LOCAL VISUAL
  const [estadoLocal, setEstadoLocal] = useState(estado);

  const tipoCargaLabel = {
    menaje: "Menaje de casa",
    vehiculo: "Vehículo",
    menaje_vehiculo: "Menaje + vehículo",
    otro: "Otro",
  }[tipoCarga] || "No especificado";

  const tipoVehiculoLabel = {
    compacto: "Auto compacto",
    camioneta: "Camioneta",
    motocicleta: "Motocicleta",
  }[tipoVehiculo] || "No especificado";

  // Sincroniza cuando el backend responda
  useEffect(() => {
    setEstadoLocal(estado);
  }, [estado]);

  return (
    <motion.div
      className={`service-card ${isOffer ? "offer" : "search"}`}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="service-card__title">
        <span className="service-card__tag">
          {isOffer ? "Ofrezco" : "Busco"}
        </span>
        <h2 className="service-card__route">
          {origen} → {destino}
        </h2>
      </div>

      {/* ========================= INFO CARGA ========================= */}

      {/* BUSCO → comportamiento normal */}
      {!isOffer && (
        <p className="service-card__info">
          Volumen: {volumen || "No especificado"}
        </p>
      )}

      {/* OFREZCO → lógica avanzada */}
      {isOffer && (
        <>
          <p className="service-card__info">
            Tipo de carga: {tipoCargaLabel}
          </p>

          {tipoCarga === "vehiculo" ? (
            <p className="service-card__info">
              Vehículo: {tipoVehiculoLabel}
            </p>
          ) : (
            <p className="service-card__info">
              Volumen: {volumen || "No especificado"}
            </p>
          )}
        </>
      )}

      <p className="service-card__info">{empresa}</p>
      {distanciaKm && (
        <p className="service-card__info" id="kilometros">
          {distanciaKm} km
        </p>
      )}

      {isOffer && (
        <p className="service-card__info">
          <label>Oferta:</label>{" "}
          {Number(importe) > 0
            ? `$${Number(importe).toLocaleString()}`
            : "A convenir"}
        </p>
      )}

      <p className="service-card__date">Publicado el {fecha}</p>

      <div className="service-card__actions">
        <button
          className="btn-outline"
          onClick={() => router.push(`/servicios/${id}`)}
        >
          Ver detalles
        </button>

        {showContact && (
          <button
            className={`btn-solid btn-contact ${isOffer ? "offer-btn" : ""}`}
            onClick={() => {
              const plan = getPlan();

              if (!canContact(plan)) {
                window.dispatchEvent(
                  new CustomEvent("plan-limit", {
                    detail: {
                      error: "PLAN_LIMIT",
                      message: "Necesitas un plan activo para contactar empresas.",
                      required_plan: "conector",
                    },
                  })
                );
                return;
              }

              openWhatsappMessage({
                telefono,
                tipo: isOffer ? "Ofrezco" : "Busco",
                origen,
                destino,
                volumen,
                tipoCarga,
                tipoVehiculo,
                servicioId: id,
              });
            }}
          >
            <img src="/icons/whatsapp.png" alt="WhatsApp" className="btn-contact__icon" />
            <span>Contactar</span>
          </button>
        )}

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