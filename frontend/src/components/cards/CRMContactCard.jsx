"use client";

import { useEffect, useState } from "react";
import Button_cta from "@/components/common/Button_cta";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ServiceStatusDropdown from "@/components/common/ServiceStatusDropdown";

import "@/styles/crm/_crmContactCard.scss";

export default function CRMContactCard({
    id, tipoLead, nombre, telefono,
    origen, destino, distanciaKm,
    tipoServicio, tipoMudanza, tipoVivienda,
    viviendaDestino, inventario, fechaRecoleccion,
    fecha, estado, exclusivo,
    tokensPagados, compradoAt, ganancia,
    onChangeEstado, onDelete, onSell,
}) {
    const [estadoLocal, setEstadoLocal] = useState(estado);
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmSell, setConfirmSell] = useState(false);

    useEffect(() => {
        setEstadoLocal(estado);
    }, [estado]);

    /*
    |--------------------------------------------------------------------------
    | BADGE NUEVO
    |--------------------------------------------------------------------------
    */
    const horasDesdeCompra = (new Date() - new Date(compradoAt)) / (1000 * 60 * 60);
    const mostrarNuevo = horasDesdeCompra <= 24 && estadoLocal === "activo";

    /*
    |--------------------------------------------------------------------------
    | FORMATO FECHA
    |--------------------------------------------------------------------------
    */
    const fechaPublicacion = new Date(fecha).toLocaleDateString(
        "es-MX",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

    /*
    |--------------------------------------------------------------------------
    | FORMATO RECOLECCIÓN
    |--------------------------------------------------------------------------
    */
    const formatFechaRecoleccion = (value) => {
        const map = {
            "1-7": "1 a 7 días",
            "8-15": "8 a 15 días",
            "+15": "Más de 15 días",
            "15-30": "15 a 30 días",
            "30+": "Más de 30 días",
            "lo_antes_posible": "Lo antes posible",
        };
        return map[value] || value;
    };

    return (
        <article className={`crm-contact-card crm-contact-card--${tipoLead}`} >

            <div className="crm-contact-card__header">
                <div className="crm-contact-card__headerLeft">

                    <div className="crm-contact-card__title">

                        {mostrarNuevo && (
                            <span className="crm-contact-card__new">
                                Nuevo
                            </span>
                        )}

                        <h2>{nombre}</h2>

                    </div>

                    <div className="crm-contact-card__source">
                        <img src={tipoLead === "privado" ? "/icons/doc-verificado.png" : "/icons/icon-192.png"} />

                        <span>
                            {
                                tipoLead === "privado" ? "Directo" : "Mudanza Facil"
                            }
                        </span>
                    </div>
                </div>

                <div className="crm-contact-card__headerActions">
                    {tipoLead === "privado" &&
                        (estadoLocal === "activo" ||
                            estadoLocal === "sin_respuesta") && (

                            <button className="crm-contact-card__sellIcon" onClick={() => setConfirmSell(true)} disabled={loading} >
                                <img src="/icons/token-verde.png" alt="Vender" />
                            </button>
                        )}

                    <button className="crm-contact-card__deleteIcon" onClick={() => setConfirmDelete(true)} disabled={loading} >
                        <img src="/icons/delete.png" />
                    </button>
                </div>
            </div>

            <div className="crm-contact-card__route">
                <strong>{origen}</strong>
                <span>→</span>
                <strong>{destino}</strong>
            </div>

            <div className="crm-contact-card__details">
                <div>
                    <img src="/icons/calendario.png" alt="" />
                    <span><strong>Fecha deseada:</strong> {formatFechaRecoleccion(fechaRecoleccion)} </span>
                </div>
            </div>

            <div className="crm-contact-card__buttons">
                <button
                    className={`crm-contact-card__detail ${tipoLead !== "privado" ||
                        (estadoLocal !== "activo" && estadoLocal !== "sin_respuesta")
                        ? "crm-contact-card__detail--full" : ""
                        }`}
                >
                    Ver detalle
                </button>

                <button className="crm-contact-card__asign crm-contact-card__asign--icon">
                    <img src="/icons/default-user.png" alt="Asigar" />
                    <span>Asignar</span>
                </button>

                {/* 
                    <div className="crm-contact-card__status">
                        <ServiceStatusDropdown
                            estado={estadoLocal}
                            options={[
                                "activo",
                                "asignado",
                                "en_proceso",
                                "finalizado",
                                "sin_respuesta",
                                "perdido",
                            ]}
                            labels={{
                                activo: "Pendiente",
                                sin_respuesta: "Sin respuesta",
                                asignado: "En proceso",
                                en_proceso: "Cotizado",
                                finalizado: "Vendido",
                                perdido: "Perdido",
                            }}
                            onSelect={(nuevoEstado) => {
                                setEstadoLocal(nuevoEstado);
                                setLoading(true);
                                onChangeEstado(id, nuevoEstado);
                                setLoading(false);
                            }}
                            disabled={loading}
                        />
                    </div>

                    
                    <div>
                        <img src="/icons/reloj.png" alt="" />
                        <span> Publicado {fechaPublicacion} </span>
                    </div>

                    <Button_cta
                        value="Contactar"
                        icon="/icons/whatsapp.png"
                        iconAlt="WhatsApp"
                        onClick={() => window.open(`https://wa.me/52${telefono}`, "_blank")
                        }
                    />
 */}
            </div>

            {
                confirmDelete && (

                    <ConfirmModal
                        title="Ocultar contacto"
                        message="El contacto dejará de mostrarse en tu CRM. Esta acción no elimina el registro."
                        confirmText="Ocultar"
                        danger
                        onClose={() => setConfirmDelete(false)}
                        onConfirm={() => {
                            setConfirmDelete(false);
                            setLoading(true);
                            onDelete(id);
                            setLoading(false);
                        }}
                    />
                )
            }

            {
                confirmSell && (
                    <ConfirmModal
                        title="Poner contacto a la venta"
                        message="Perderás la propiedad de este contacto y volverá a estar disponible en el Marketplace."
                        confirmText="Poner a la venta"
                        onClose={() => setConfirmSell(false)}
                        onConfirm={() => {
                            setConfirmSell(false);
                            setLoading(true);
                            onSell(id);
                            setLoading(false);
                        }}
                    />
                )
            }
        </article>
    );
}