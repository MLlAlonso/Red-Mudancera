"use client";

import { useEffect, useState } from "react";
import Button_cta from "@/components/common/Button_cta";
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
        <article className="crm-contact-card">
            <div className="crm-contact-card__content">
                <div className="crm-contact-card__title">
                    {
                        mostrarNuevo && (
                            <span className="crm-contact-card__new">
                                Nuevo
                            </span>
                        )
                    }

                    {
                        tipoLead === "privado" && (
                            <span className="crm-contact-card__badge crm-contact-card__badge--private">
                                Lead privado
                            </span>
                        )
                    }

                    {
                        tipoLead === "comprado" && (
                            <span className="crm-contact-card__badge crm-contact-card__badge--marketplace">
                                Marketplace
                            </span>
                        )
                    }

                    <h2>
                        {nombre}
                    </h2>
                </div>

                <div className="crm-contact-card__route">
                    <strong>{origen}</strong>
                    <span>→</span>
                    <strong>{destino}</strong>
                </div>

                <div className="crm-contact-card__details">
                    <div>
                        <img src="/icons/telefono.png" alt="" />
                        <span>{telefono}</span>
                    </div>

                    <div>
                        <img src="/icons/destino.png" alt="" />
                        <span>{tipoServicio}</span>
                    </div>

                    <div>
                        <img src="/icons/truck.png" alt="" />
                        <span>{tipoMudanza}</span>
                    </div>

                    <div>
                        <img src="/icons/calendario.png" alt="" />
                        <span>
                            {formatFechaRecoleccion(
                                fechaRecoleccion
                            )}
                        </span>
                    </div>

                    <div>
                        <img src="/icons/reloj.png" alt="" />
                        <span>
                            Publicado {fechaPublicacion}
                        </span>
                    </div>
                </div>
            </div>

            <div className="crm-contact-card__actions">
                <ServiceStatusDropdown
                    estado={estadoLocal}
                    options={["activo", "asignado", "en_proceso", "finalizado", "sin_respuesta", "perdido",]}
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

                <Button_cta
                    value="Contactar"
                    icon="/icons/whatsapp.png"
                    iconAlt="WhatsApp"
                    onClick={() => window.open(`https://wa.me/52${telefono}`, "_blank")}
                />

                <button
                    className="crm-contact-card__delete"
                    onClick={() => {
                        if (
                            confirm("¿Ocultar este contacto permanentemente?")
                        ) {
                            setLoading(true);
                            onDelete(id);
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                >

                    <img src="/icons/delete.png" alt="" />
                    Descartar
                </button>

                {
                    tipoLead === "privado" &&
                    (
                        estadoLocal === "activo" ||
                        estadoLocal === "sin_respuesta"
                    ) &&
                    (
                        <button
                            className="crm-contact-card__sell"
                            onClick={() => {
                                if (
                                    confirm(
                                        "¿Deseas poner este contacto a la venta? Perderás la propiedad del contacto."
                                    )
                                ) {
                                    setLoading(true);
                                    onSell(id);
                                    setLoading(false);
                                }
                            }}
                            disabled={loading}
                        >
                            <img src="/icons/ofrezco.png" alt="" />
                            Poner a la venta
                        </button>
                    )
                }

                <button className="crm-contact-card__detail" >
                    Ver detalle
                </button>
            </div>
        </article>
    );
}