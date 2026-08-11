"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "@/styles/components/_seguroExpedienteCard.scss";

export default function SeguroExpedienteCard({ id, folio, nombre, email, telefono, origen, destino, estado, progreso, tipoSeguro, esExterno, fecha, }) {
    const router = useRouter();

    const estadoTexto = {
        nuevo: "Nuevo",
        correo_programado: "Correo programado",
        esperando_cliente: "Esperando cliente",
        capturando: "Capturando",
        revision: "En revisión",
        completado: "Completado",
        cancelado: "Cancelado",
    };

    const tipoTexto = {
        menaje: "Menaje",
        menaje_auto: "Menaje + Auto",
        automovil: "Automóvil",
    };

    return (
        <motion.article
            className="seguro-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .25 }}
            onClick={() => router.push(`/superadmin/seguros/${id}`)}
        >
            <div className="seguro-card__header">
                <span className={`status ${estado}`}>
                    {estadoTexto[estado]}
                </span>

                <span className="folio">
                    {folio}
                </span>
            </div>

            <div className="seguro-card__body">
                <div className="cliente">
                    <strong> {nombre} </strong>
                    <span> {email} </span>

                    {
                        telefono && <small> {telefono} </small>
                    }
                </div>

                <div className="ruta">
                    <img src="/icons/location.png" alt="" />

                    <span>
                        {origen} {" → "} {destino}
                    </span>
                </div>

                <div className="tipo">
                    <span>
                        {tipoTexto[tipoSeguro] || "Pendiente"}
                    </span>

                    <span>
                        {
                            esExterno ? "Solicitud externa" : "Mudanza Fácil"
                        }
                    </span>
                </div>
            </div>

            <div className="seguro-card__progress">
                <div className="progress-top">
                    <span> Progreso </span>

                    <strong> {progreso}% </strong>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progreso}%` }} />
                </div>
            </div>

            <div className="seguro-card__footer">
                <span> {fecha} </span>

                <button>  Ver expediente </button>
            </div>
        </motion.article>
    );
}