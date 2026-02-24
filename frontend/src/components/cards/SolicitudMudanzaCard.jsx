"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button_cta from "@/components/common/Button_cta";
import Button_success from "@/components/common/Button_success";

export default function SolicitudMudanzaCard({
  id,
  origen = "",
  destino = "",
  fechaRecoleccion = "",
  distanciaKm = null,
  tipoMudanza = "",
  inventario = "",
  fecha = "",
}) {

  const router = useRouter();

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

      <p className="service-card__info">
        <strong>Recolección:</strong> {fechaRecoleccion}
      </p>

      {distanciaKm && (
        <p className="service-card__info">
          <strong>Distancia:</strong> {distanciaKm} km
        </p>
      )}

      <p className="service-card__info">
        <strong>Tipo:</strong> {tipoMudanza}
      </p>

      <p className="service-card__info solicitud-card__inventario">
        <strong>Inventario:</strong>{" "}
        {inventario?.replace(/<[^>]*>/g, "").slice(0, 80)}
        {inventario?.length > 80 && "..."}
      </p>

      <p className="service-card__date">
        Publicado el {fecha}
      </p>

      <div className="service-card__actions">
        <Button_cta
          value="Ver detalle"
          onClick={() => router.push(`/empresa/solicitudes/${id}`)}
        />

        <Button_success
          value="Comprar"
          onClick={() => console.log("Comprar solicitud", id)}
        />
      </div>
    </motion.div>
  );
}