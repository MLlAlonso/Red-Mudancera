"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { openWhatsappMessage } from "@/utils/whatsapp";

export default function ServiceCard({
  id,
  type = "busco",
  origen = "",
  destino = "",
  volumen = "",
  empresa = "",
  fecha = "",
}) {
  const router = useRouter();
  const isOffer = type === "ofrezco";

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

      <p className="service-card__info">Volumen: {volumen}</p>
      <p className="service-card__info">{empresa}</p>
      <p className="service-card__date">Publicado el {fecha}</p>

      <div className="service-card__actions">
        <button
          className="btn-outline"
          onClick={() => router.push(`/servicios/${id}`)}
        >
          Ver detalles
        </button>

        <button
          className={`btn-solid ${isOffer ? "offer-btn" : ""}`}
          onClick={() =>
            openWhatsappMessage({
              tipo: isOffer ? "Ofrezco" : "Busco",
              origen,
              destino,
              volumen,
              servicioId: id,
            })
          }
        >
          Contactar
        </button>
      </div>
    </motion.div>
  );
}