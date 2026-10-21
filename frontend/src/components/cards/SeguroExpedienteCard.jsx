"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { eliminarExpedienteSeguro } from "@/services/superAdminSeguros";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import "@/styles/components/_seguroExpedienteCard.scss";

export default function SeguroExpedienteCard({
    id,
    folio,
    nombre,
    email,
    telefono,
    origen,
    destino,
    modalidadDatos,
    estado,
    progreso,
    tipoSeguro,
    esExterno,
    fecha,
    onDeleted,
}) {
    const router = useRouter();
    const [eliminando, setEliminando] = useState(false);
    const [modalEliminarAbierta, setModalEliminarAbierta] = useState(false);

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

    const abrirModalEliminar = (event) => {
        event.stopPropagation();
        if (eliminando) return;
        setModalEliminarAbierta(true);
    };

    const cancelarEliminacion = () => {
        if (eliminando) return;
        setModalEliminarAbierta(false);
    };

    const confirmarEliminacion = async () => {
        if (eliminando) return;

        try {
            setEliminando(true);
            await eliminarExpedienteSeguro(id);
            setModalEliminarAbierta(false);

            if (onDeleted) {
                onDeleted(id);
            }
        } catch (error) {
            console.error("Error al eliminar expediente:", error);
            setModalEliminarAbierta(false);
            window.alert(error.message || "No se pudo eliminar el expediente.");
        } finally {
            setEliminando(false);
        }
    };

    return (
        <>
            <motion.article
                className="seguro-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                    if (!eliminando && !modalEliminarAbierta) {
                        router.push(`/superadmin/seguros/${id}`);
                    }
                }}
            >
                <div className="seguro-card__header">
                    <span className={`status ${estado}`}>
                        {estadoTexto[estado] || estado}
                    </span>

                    <span className="folio">{folio}</span>
                </div>

                <div className="seguro-card__body">
                    <div className="cliente">
                        <strong>{nombre}</strong>
                        <span>{email}</span>
                        {telefono && <small>{telefono}</small>}
                    </div>

                    <div className="ruta">
                        <img src="/icons/place-marker.png" alt="" />

                        <span>
                            {origen} {" → "} {destino}
                        </span>
                    </div>

                    <div className="tipo">
                        <span>
                            {tipoTexto[tipoSeguro] || "Pendiente"}
                        </span>

                        <span>
                            {esExterno ? "Solicitud externa" : "Mudanza Fácil"}
                        </span>

                        <span className={modalidadDatos === "asistida" ? "policy assisted" : "policy standard"} >
                            {modalidadDatos === "asistida" ? "Póliza asistida" : "Póliza estándar"}
                        </span>
                    </div>
                </div>

                <div className="seguro-card__progress">
                    <div className="progress-top">
                        <span>Progreso</span>
                        <strong>{progreso}%</strong>
                    </div>

                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progreso}%` }} />
                    </div>
                </div>

                <div className="seguro-card__footer">
                    <span>{fecha}</span>

                    <div className="seguro-card__actions">
                        <button type="button" className="btn-eliminar-seguro" onClick={abrirModalEliminar} disabled={eliminando}  >
                            Eliminar
                        </button>

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();

                                if (!eliminando) {
                                    router.push(`/superadmin/seguros/${id}`);
                                }
                            }}
                            disabled={eliminando}
                        >
                            Ver expediente
                        </button>
                    </div>
                </div>
            </motion.article>

            <ConfirmDeleteModal
                open={modalEliminarAbierta}
                title="Eliminar expediente"
                message={`¿Estás seguro de que deseas eliminar el expediente de ${nombre}? Esta acción puede ser irreversible.`}
                confirmText={eliminando ? "Eliminando..." : "Sí, eliminar"}
                cancelText="Cancelar"
                onCancel={cancelarEliminacion}
                onConfirm={confirmarEliminacion}
            />
        </>
    );
}