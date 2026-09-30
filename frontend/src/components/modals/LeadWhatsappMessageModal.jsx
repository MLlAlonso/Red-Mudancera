"use client";

import { useEffect, useState } from "react";
import { buildLeadWhatsappMessage, openLeadWhatsappMessage,} from "@/utils/whatsapp";
import "@/styles/components/__leadWhatsappMessageModal.scss";

export default function LeadWhatsappMessageModal({ open, onClose, solicitud, empresa,}) {
    const [mensaje, setMensaje] = useState("");
    const [copiado, setCopiado] = useState(false);

    useEffect(() => {
        if (!open || !solicitud) return;

        const mensajeInicial = buildLeadWhatsappMessage({
            telefono: solicitud.telefono,
            empresaNombre: empresa?.empresa || "Mi empresa",
            nombreCliente: solicitud.nombre,
            emailCliente: solicitud.email,
            origen: solicitud.origen,
            destino: solicitud.destino,
            tipoVivienda: solicitud.tipo_vivienda,
            viviendaDestino: solicitud.vivienda_destino,
            origenPisos: solicitud.origen_pisos,
            origenElevador: solicitud.origen_elevador,
            origenAcarreo: solicitud.origen_acarreo,
            destinoPisos: solicitud.destino_pisos,
            destinoElevador: solicitud.destino_elevador,
            destinoAcarreo: solicitud.destino_acarreo,
            inventario: solicitud.inventario,
            fechaRecoleccion: solicitud.fecha_recoleccion,
            tipoServicio: solicitud.tipo_servicio,
            tipoMudanza: solicitud.tipo_mudanza,
        });

        setMensaje(mensajeInicial);
        setCopiado(false);
    }, [open, solicitud, empresa]);

    if (!open || !solicitud) {
        return null;
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(mensaje);
            setCopiado(true);

            setTimeout(() => {
                setCopiado(false);
            }, 2000);
        } catch (error) {
            console.error("Error al copiar el mensaje:", error);
            alert("No fue posible copiar el mensaje.");
        }
    };

    const handleWhatsapp = () => {
        openLeadWhatsappMessage({
            telefono: solicitud.telefono,
            empresaNombre: empresa?.empresa || "Mi empresa",
            nombreCliente: solicitud.nombre,
            emailCliente: solicitud.email,
            origen: solicitud.origen,
            destino: solicitud.destino,
            tipoVivienda: solicitud.tipo_vivienda,
            viviendaDestino: solicitud.vivienda_destino,
            origenPisos: solicitud.origen_pisos,
            origenElevador: solicitud.origen_elevador,
            origenAcarreo: solicitud.origen_acarreo,
            destinoPisos: solicitud.destino_pisos,
            destinoElevador: solicitud.destino_elevador,
            destinoAcarreo: solicitud.destino_acarreo,
            inventario: solicitud.inventario,
            fechaRecoleccion: solicitud.fecha_recoleccion,
            tipoServicio: solicitud.tipo_servicio,
            tipoMudanza: solicitud.tipo_mudanza,
            mensajePersonalizado: mensaje,
        });
    };

    return (
        <div className="lead-whatsapp-modal">
            <div className="lead-whatsapp-modal__overlay" onClick={onClose} />

            <div className="lead-whatsapp-modal__content" role="dialog" aria-modal="true" aria-labelledby="lead-whatsapp-modal-title" >
                <div className="lead-whatsapp-modal__header">
                    <div>
                        <span className="lead-whatsapp-modal__eyebrow">
                            WhatsApp
                        </span>

                        <h2 id="lead-whatsapp-modal-title">
                            Mensaje de contacto
                        </h2>

                        <p> Revisa, edita o copia el mensaje antes de contactar al cliente. </p>
                    </div>

                    <button type="button" className="lead-whatsapp-modal__close" onClick={onClose} aria-label="Cerrar" >
                        ×
                    </button>
                </div>

                <div className="lead-whatsapp-modal__body">
                    <div className="lead-whatsapp-modal__recipient">
                        <div className="lead-whatsapp-modal__recipient-icon">
                            💬
                        </div>

                        <div>
                            <strong>
                                {solicitud.nombre || "Cliente"}
                            </strong>

                            <span>
                                {solicitud.telefono || "Sin teléfono"}
                            </span>
                        </div>
                    </div>

                    <label htmlFor="lead-whatsapp-message" className="lead-whatsapp-modal__label" >
                        Mensaje
                    </label>

                    <textarea
                        id="lead-whatsapp-message"
                        className="lead-whatsapp-modal__textarea"
                        value={mensaje}
                        onChange={(event) => { setMensaje(event.target.value); setCopiado(false); }}
                        spellCheck={false}
                    />

                    <div className="lead-whatsapp-modal__counter">
                        <span> Puedes modificar el mensaje antes de enviarlo. </span>

                        <span> {mensaje.length} caracteres </span>
                    </div>
                </div>

                <div className="lead-whatsapp-modal__footer">
                    <button
                        type="button"
                        className="lead-whatsapp-modal__button lead-whatsapp-modal__button--secondary"
                        onClick={handleCopy}
                    >
                        {copiado ? "✓ Copiado" : "Copiar mensaje"}
                    </button>

                    <button
                        type="button"
                        className="lead-whatsapp-modal__button lead-whatsapp-modal__button--whatsapp"
                        onClick={handleWhatsapp}
                    >
                        <img src="/icons/whatsapp.png" alt="" />
                        Abrir WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}