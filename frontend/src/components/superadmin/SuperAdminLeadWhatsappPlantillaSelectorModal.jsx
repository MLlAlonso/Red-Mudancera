"use client";

import { useEffect, useMemo, useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { listarPlantillasWhatsapp } from "@/services/superAdminWhatsappPlantillas";
import "@/styles/components/_superAdminWhatsappPlantillas.scss";

function mostrar(valor) {
    if (valor === null || valor === undefined || String(valor).trim() === "") {
        return "—";
    }

    return String(valor).trim();
}

function fechaLocal(valor) {
    if (!valor) return "No registrada";

    const fecha = new Date(valor);

    if (Number.isNaN(fecha.getTime())) {
        return String(valor);
    }

    return fecha.toLocaleDateString("es-MX");
}

function obtenerVariables(lead) {
    return {
        nombre: mostrar(lead.nombre),
        email: mostrar(lead.email),
        telefono: mostrar(lead.telefono),
        empresa: mostrar(lead.empresa),
        origen: mostrar(lead.origen),
        destino: mostrar(lead.destino),
        tipoMudanza: mostrar(lead.tipo_mudanza),
        fechaRecoleccion: fechaLocal(lead.fecha_recoleccion),
        fechaCompra: fechaLocal(lead.fecha_compra),
        creditos: mostrar(lead.creditos),
        estadoOperacion: mostrar(lead.estado_operacion),
        tipoCompra: lead.exclusivo ? "Exclusivo" : "Compra",
    };
}

function renderMensaje(mensaje, variables) {
    return String(mensaje || "").replace(
        /\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}/g,
        (_, key) => {
            const valor = variables[key];

            if (valor === null || valor === undefined) {
                return "—";
            }

            return String(valor).trim() || "—";
        }
    );
}

export default function SuperAdminLeadWhatsappPlantillaSelectorModal({ open, onClose, onContactar, lead, }) {
    const [plantillas, setPlantillas] = useState([]);
    const [seleccion, setSeleccion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;
        let cancelado = false;

        async function cargar() {
            setLoading(true);
            setError("");
            setPlantillas([]);
            setSeleccion("");

            try {
                const result = await listarPlantillasWhatsapp("clientes");

                if (!cancelado) {
                    setPlantillas(result.data || []);
                }
            } catch (e) {
                if (!cancelado) {
                    setError(e.message || "No se pudieron cargar las plantillas.");
                }
            } finally {
                if (!cancelado) {
                    setLoading(false);
                }
            }
        }

        cargar();

        return () => { cancelado = true; };
    }, [open]);

    const variables = useMemo(() => obtenerVariables(lead || {}), [lead]);
    const plantillaSeleccionada = plantillas.find((item) => String(item.id) === String(seleccion));
    const mensajeFinal = plantillaSeleccionada ? renderMensaje(plantillaSeleccionada.mensaje, variables) : "";

    const contactar = (conMensaje) => {
        if (!lead?.telefono) {
            setError("El cliente no tiene un teléfono registrado.");
            return;
        }

        if (conMensaje && (!plantillaSeleccionada || !mensajeFinal.trim())) {
            setError("Selecciona una plantilla con contenido.");
            return;
        }

        onContactar({
            mensaje: conMensaje ? mensajeFinal : "",
            conMensaje,
        });
    };

    if (!open) return null;

    return (
        <BaseModal onClose={onClose}>
            <div className="sawp-modal">
                <header className="sawp-modal__header">
                    <h2>Contactar cliente por WhatsApp</h2>
                    <p> Selecciona una plantilla para conocer la experiencia del cliente con Mudanza Fácil. </p>
                </header>

                {error && (
                    <div className="sawp-modal__error" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="sawp-modal__state">
                        Cargando plantillas...
                    </div>
                ) : plantillas.length === 0 ? (
                    <div className="sawp-modal__empty">
                        <h3>No hay plantillas disponibles</h3>

                        <p>
                            Crea una plantilla en el dashboard de SuperAdmin
                            dentro de la categoría Clientes o continúa sin un mensaje predefinido.
                        </p>
                    </div>
                ) : (
                    <div className="sawp-modal__list">
                        {plantillas.map((plantilla) => (
                            <label
                                key={plantilla.id}
                                className={`sawp-modal__option ${String(seleccion) === String(plantilla.id) ? "sawp-modal__option--selected" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="superadmin-lead-whatsapp-plantilla"
                                    value={plantilla.id}
                                    checked={String(seleccion) === String(plantilla.id)}
                                    onChange={() => setSeleccion(String(plantilla.id))}
                                />

                                <span className="sawp-modal__option-content">
                                    <strong>{plantilla.titulo}</strong>

                                    <span>
                                        {renderMensaje(plantilla.mensaje, variables)}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}

                {plantillaSeleccionada && (
                    <section className="sawp-modal__preview">
                        <div className="sawp-modal__preview-heading">
                            <h3>Vista previa</h3>

                            <span>
                                {mensajeFinal.length} caracteres
                            </span>
                        </div>

                        <textarea value={mensajeFinal} readOnly rows={8} aria-label="Vista previa del mensaje" />
                    </section>
                )}

                <footer className="sawp-modal__actions">
                    <button type="button" className="sawp__button sawp__button--secondary" onClick={onClose} >
                        Cancelar
                    </button>

                    <button type="button" className="sawp__button sawp__button--secondary" onClick={() => contactar(false)} disabled={loading}  >
                        Sin mensaje
                    </button>

                    <button
                        type="button"
                        className="sawp__button sawp__button--primary"
                        onClick={() => contactar(true)}
                        disabled={loading || !plantillaSeleccionada || !mensajeFinal.trim()}
                    >
                        Abrir WhatsApp
                    </button>
                </footer>
            </div>
        </BaseModal>
    );
}