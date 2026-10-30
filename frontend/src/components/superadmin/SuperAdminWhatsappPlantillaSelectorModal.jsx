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

function moneda(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "No registrado";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
        return "No registrado";
    }

    return numero.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, });
}

function fechaLocal(valor) {
    if (!valor) {
        return "No registrada";
    }

    const texto = String(valor);
    const fecha = /^\d{4}-\d{2}-\d{2}$/.test(texto) ? new Date(`${texto}T00:00:00`) : new Date(texto);

    if (Number.isNaN(fecha.getTime())) {
        return texto;
    }

    return fecha.toLocaleDateString("es-MX");
}

function obtenerVariables(expediente) {
    const folio = expediente.folio || "";
    const tipoSeguro = { menaje: "Menaje", automovil: "Automóvil", menaje_auto: "Menaje + Automóvil", }[expediente.tipo_seguro] || "Sin capturar";
    const modalidad = { asistida: "Póliza asistida", autogestion: "Autogestión", }[expediente.modalidad_datos] || "Sin definir";

    return {
        nombre: mostrar(expediente.nombre),
        email: mostrar(expediente.email),
        telefono: mostrar(expediente.telefono),
        folio: mostrar(folio),
        origen: mostrar(expediente.origen),
        destino: mostrar(expediente.destino),
        fechaRecoleccion: fechaLocal(expediente.fecha_recoleccion),
        tipoSeguro,
        valorMenaje: moneda(expediente.valor_menaje),
        valorAutomovil: moneda(expediente.valor_automovil),
        primaEstimada: moneda(expediente.prima_estimada),
        modalidad,
        enlaceExpediente: folio ? `https://app.mudanzafacil.com.mx/seguros/${encodeURIComponent(folio)}` : "No disponible",
        enlaceEmpresa: expediente.enlace_empresa || "No disponible",
    };
}

function renderMensaje(mensaje, variables) {
    return String(mensaje || "").replace(/\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}/g, (_, key) => {
        const valor = variables[key];

        if (valor === null || valor === undefined) {
            return "—";
        }

        return String(valor).trim() || "—";
    });
}

export default function SuperAdminWhatsappPlantillaSelectorModal({ open, onClose, onContactar, expediente, }) {
    const [plantillas, setPlantillas] = useState([]);
    const [seleccion, setSeleccion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) { return; }
        let cancelado = false;

        async function cargar() {
            setLoading(true);
            setError("");
            setPlantillas([]);
            setSeleccion("");

            try {
                const result = await listarPlantillasWhatsapp("seguros");

                if (!cancelado) {
                    setPlantillas(result.data || []);
                }
            } catch (e) {
                if (!cancelado) {
                    setError(e.message || "No se pudieron cargar las plantillas de seguros.");
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

    const variables = useMemo(() => obtenerVariables(expediente || {}), [expediente]);
    const plantillaSeleccionada = plantillas.find((item) => String(item.id) === String(seleccion));
    const mensajeFinal = plantillaSeleccionada ? renderMensaje(plantillaSeleccionada.mensaje, variables) : "";

    const contactar = (conMensaje) => {
        if (!expediente?.telefono) {
            setError("El cliente no tiene un teléfono registrado.");
            return;
        }

        if (conMensaje && (!plantillaSeleccionada || !mensajeFinal.trim())) {
            setError("Selecciona una plantilla con contenido.");
            return;
        }

        // La apertura de WhatsApp ocurre directamente desde el clic.
        onContactar({ mensaje: conMensaje ? mensajeFinal : "", conMensaje, });
    };

    if (!open) { return null; }

    return (
        <BaseModal onClose={onClose}>
            <div className="sawp-modal">
                <header className="sawp-modal__header">
                    <h2>Enviar mensaje por WhatsApp</h2>
                    <p> Selecciona una plantilla para  el mensaje con los datos de este cliente. </p>
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
                            Puedes crear una desde el dashboard de SuperAdmin
                            o continuar abriendo WhatsApp sin un mensaje predefinido.
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
                                    name="superadmin-whatsapp-plantilla"
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
                            <span>{mensajeFinal.length} caracteres</span>
                        </div>

                        <textarea value={mensajeFinal} readOnly rows={8} aria-label="Vista previa del mensaje" />
                    </section>
                )}

                <footer className="sawp-modal__actions">
                    <button type="button" className="sawp__button sawp__button--secondary" onClick={onClose} >
                        Cancelar
                    </button>

                    <button type="button" className="sawp__button sawp__button--secondary" onClick={() => contactar(false)} disabled={loading} >
                        Sin mensaje
                    </button>

                    <button type="button" className="sawp__button sawp__button--primary" onClick={() => contactar(true)} disabled={loading || !plantillaSeleccionada || !mensajeFinal.trim()} >
                        Abrir WhatsApp
                    </button>
                </footer>
            </div>
        </BaseModal>
    );
}