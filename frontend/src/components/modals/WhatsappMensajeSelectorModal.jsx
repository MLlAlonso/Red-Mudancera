"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BaseModal from "@/components/modals/BaseModal";
import { empresaMensajesWhatsapp } from "@/services/empresaMensajesWhatsapp";
import { renderWhatsappTemplate } from "@/utils/whatsapp";
import { DEFAULT_WHATSAPP_TEMPLATES } from "@/utils/whatsappTemplates";
import "@/styles/components/_whatsappMensajes.scss";

export default function WhatsappMensajeSelectorModal({ open, onClose, onContactar, tipoContacto, telefono, variables, mensajesDefault = [], }) {
    const router = useRouter();
    const [mensajesEmpresa, setMensajesEmpresa] = useState([]);
    const [seleccion, setSeleccion] = useState("none");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;
        let cancelled = false;

        async function cargar() {
            setLoading(true);
            setError("");
            setSeleccion("none");

            try {
                const result = await empresaMensajesWhatsapp.listar(tipoContacto);

                if (!cancelled) {
                    setMensajesEmpresa(result.data || []);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e.message || "No se pudieron cargar tus plantillas personalizadas.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        cargar();

        return () => {
            cancelled = true;
        };
    }, [open, tipoContacto]);

    const mensajes = useMemo(() => {
        const predeterminados = mensajesDefault.length > 0 ? mensajesDefault : DEFAULT_WHATSAPP_TEMPLATES[tipoContacto] ?? [];

        return [
            ...predeterminados.map((item) => ({
                ...item,
                id: `default:${item.id}`,
                origenPlantilla: "default",
            })),
            ...mensajesEmpresa.map((item) => ({
                ...item,
                id: `custom:${item.id}`,
                origenPlantilla: "custom",
            })),
        ];
    }, [mensajesDefault, mensajesEmpresa, tipoContacto]);

    const mensajesPredeterminados = mensajes.filter((item) => item.origenPlantilla === "default");
    const mensajesPersonalizados = mensajes.filter((item) => item.origenPlantilla === "custom");
    const mensajeSeleccionado = mensajes.find((item) => String(item.id) === String(seleccion));
    const mensajeFinal = mensajeSeleccionado ? renderWhatsappTemplate(mensajeSeleccionado.mensaje, variables) : "";

    const contactar = (conMensaje) => {
        if (!telefono) {
            setError("Este contacto no tiene teléfono disponible.");
            return;
        }

        if (conMensaje && (!mensajeSeleccionado || !mensajeFinal.trim())) {
            setError("Selecciona una plantilla con contenido para continuar.");
            return;
        }

        onContactar({ telefono, mensaje: conMensaje ? mensajeFinal : "", conMensaje, });
        onClose();
    };

    const irACrearPlantilla = () => {
        onClose();
        router.push("/empresa/configuracion");
    };

    if (!open) return null;

    const renderGrupo = (titulo, descripcion, items, tipo) => (
        <section className={`whatsapp-mensajes__group whatsapp-mensajes__group--${tipo}`} >
            <div className="whatsapp-mensajes__group-header">
                <h3>{titulo}</h3>
                <span className="whatsapp-mensajes__group-count">
                    {items.length}
                </span>
            </div>

            {descripcion && (
                <p className="whatsapp-mensajes__group-description">
                    {descripcion}
                </p>
            )}

            {items.length > 0 ? (
                <div className="whatsapp-mensajes__list">
                    {items.map((item) => {
                        const seleccionado = String(seleccion) === String(item.id);

                        return (
                            <label key={item.id} className={["whatsapp-mensajes__option", seleccionado ? "whatsapp-mensajes__option--selected" : "",].filter(Boolean).join(" ")}  >
                                <input type="radio" name="whatsapp-template" value={item.id} checked={seleccionado} onChange={() => setSeleccion(String(item.id))} />
                                <span className="whatsapp-mensajes__option-content">
                                    <span className="whatsapp-mensajes__option-title">
                                        <strong>{item.titulo}</strong>
                                    </span>

                                    <span className="whatsapp-mensajes__option-message">
                                        {renderWhatsappTemplate(item.mensaje, variables)}
                                    </span>
                                </span>
                            </label>
                        );
                    })}
                </div>
            ) : (
                <div className="whatsapp-mensajes__empty">
                    {tipo === "custom" ? "Todavía no tienes plantillas personalizadas de este tipo." : "No hay mensajes predeterminados disponibles."}
                </div>
            )}
        </section>
    );

    return (
        <BaseModal onClose={onClose}>
            <div className="whatsapp-mensajes__selector">
                <header className="whatsapp-mensajes__selector-header">
                    <h2>Elige tu mensaje</h2>

                    <p className="whatsapp-mensajes__description">
                        Elige una plantilla para personalizar tu mensaje o continúa directamente a WhatsApp.
                    </p>
                </header>

                {error && (
                    <p className="whatsapp-mensajes__error" role="alert">
                        {error}
                    </p>
                )}

                {loading && (
                    <div className="whatsapp-mensajes__loading">
                        <span className="whatsapp-mensajes__spinner" />
                        Cargando tus plantillas...
                    </div>
                )}

                {!loading && (
                    <div className="whatsapp-mensajes__groups">
                        {renderGrupo("Mensajes predeterminados", " ", mensajesPredeterminados, "default")}
                        {renderGrupo("Mis plantillas", " ", mensajesPersonalizados, "custom")}
                    </div>
                )}

                {mensajeSeleccionado && (
                    <section className="whatsapp-mensajes__preview">
                        <div className="whatsapp-mensajes__preview-header">
                            <div>
                                <h3>Vista previa</h3>
                                <p> {mensajeSeleccionado.titulo} </p>
                            </div>

                            <span className="whatsapp-mensajes__preview-count">
                                {mensajeFinal.length} caracteres
                            </span>
                        </div>

                        <textarea id="whatsapp-preview" value={mensajeFinal} readOnly rows={7} aria-label="Vista previa del mensaje de WhatsApp" />

                        <p className="whatsapp-mensajes__preview-help">
                            Revisa el contenido antes de abrir WhatsApp.
                        </p>
                    </section>
                )}

                <div className="whatsapp-mensajes__info">
                    <span className="whatsapp-mensajes__info-icon">
                        i
                    </span>

                    <p>
                        ¿Quieres crear o personalizar tus mensajes? Ve a{" "}
                        <a href="/empresa/configuracion">
                            <strong>Configuración</strong>
                        </a>{" "}
                        para administrar tus plantillas y utilizarlas aquí cuando necesites contactar a una empresa o cliente.
                    </p>
                </div>

                <div className="whatsapp-mensajes__create">
                    <div>
                        <strong>¿Necesitas otro mensaje?</strong>
                        <p>Crea una plantilla adaptada a tu forma de trabajar.</p>
                    </div>

                    <button type="button" className="whatsapp-mensajes__create-button" onClick={irACrearPlantilla} >
                        <span aria-hidden="true">+</span>
                        Crear plantilla
                    </button>
                </div>


                <footer className="whatsapp-mensajes__actions">
                    <button type="button" className="whatsapp-mensajes__secondary" onClick={onClose} >
                        Cancelar
                    </button>

                    <button type="button" className="whatsapp-mensajes__secondary" onClick={() => contactar(false)} disabled={loading} >
                        Sin mensaje
                    </button>

                    <button type="button" className="whatsapp-mensajes__primary" onClick={() => contactar(true)} disabled={loading || !mensajeSeleccionado || !mensajeFinal.trim()} >
                        Abrir WhatsApp
                        <span aria-hidden="true"> ↗</span>
                    </button>
                </footer>
            </div>
        </BaseModal>
    );
}