"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEmpresaToken } from "@/utils/auth";
import { openLeadWhatsappMessage } from "@/utils/whatsapp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_cta from "@/components/common/Button_cta";
import ComprarLeadModal from "@/components/modals/ComprarLeadModal";
import LiveViewToast from "@/components/common/LiveViewToast";
import "@/styles/pages/solicitudes/_detalleSolicitud.scss";

export default function DetalleSolicitudPage() {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [haComprado, setHaComprado] = useState(false);
    const [fueExclusivo, setFueExclusivo] = useState(false);
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const token = getEmpresaToken();

        if (token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
                .then(res => res.json())
                .then(setEmpresa);
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/${id}`, {
            headers: {
                Accept: "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        })
            .then(res => res.json())
            .then(data => {
                setSolicitud(data.data);
                setHaComprado(data.ha_comprado);
                setFueExclusivo(data.fue_exclusivo);
            });

    }, [id]);

    if (!solicitud) return null;

    const formatFecha = (value) => {
        const map = {
            "1-7": "1 a 7 días",
            "8-15": "8 a 15 días",
            "+15": "Más de 15 días",
            "lo_antes_posible": "Lo antes posible",
        };
        return map[value] || value;
    };

    return (
        <>
            <Header />

            <main className="detalle-solicitud">
                <div className="detalle-solicitud__header">
                    <h1 className="detalle-solicitud__title">
                        Detalle de Contacto
                    </h1>
                    <p className="detalle-solicitud__subtitle">
                        Información completa de la solicitud de mudanza
                    </p>
                </div>

                <div className="detalle-solicitud__card">

                    {/* RUTA */}
                    <div className="detalle-solicitud__route">
                        <div className="detalle-solicitud__head">
                            <span className="detalle-solicitud__tag">
                                Contacto
                            </span>

                            {fueExclusivo && (
                                <span className="badge-exclusivo">
                                    Exclusivo
                                </span>
                            )}
                        </div>

                        <h2 className="detalle-solicitud__route-title">
                            {solicitud.origen} → {solicitud.destino}
                        </h2>
                    </div>

                    {/* ================= ORIGEN ================= */}
                    <h3 className="detalle-solicitud__section-title">Origen</h3>
                    <div className="detalle-solicitud__grid">
                        <div>
                            <label>Tipo vivienda:</label>
                            <span>{solicitud.tipo_vivienda}</span>
                        </div>

                        <div>
                            <label>Pisos:</label>
                            <span>{solicitud.origen_pisos || "—"}</span>
                        </div>

                        <div>
                            <label>Elevador:</label>
                            <span>{solicitud.origen_elevador || "—"}</span>
                        </div>

                        <div>
                            <label>Acarreo:</label>
                            <span>{solicitud.origen_acarreo || "—"}</span>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="detalle-solicitud__divider">
                        <img src="/icons/truck.png" alt="divider" />
                    </div>

                    {/* ================= DESTINO ================= */}
                    <h3 className="detalle-solicitud__section-title">Destino</h3>
                    <div className="detalle-solicitud__grid">
                        <div>
                            <label>Tipo vivienda:</label>
                            <span>{solicitud.vivienda_destino}</span>
                        </div>

                        <div>
                            <label>Pisos:</label>
                            <span>{solicitud.destino_pisos || "—"}</span>
                        </div>

                        <div>
                            <label>Elevador:</label>
                            <span>{solicitud.destino_elevador || "—"}</span>
                        </div>

                        <div>
                            <label>Acarreo:</label>
                            <span>{solicitud.destino_acarreo || "—"}</span>
                        </div>
                    </div>

                    {/* ================= INFORMACIÓN GENERAL ================= */}
                    <div className="detalle-solicitud__divider">
                        <img src="/icons/docs.png" alt="divider" />
                    </div>

                    <h3 className="detalle-solicitud__section-title">Detalles generales</h3>

                    <div className="detalle-solicitud__grid">
                        <div>
                            <label>Tipo servicio:</label>
                            <span>{solicitud.tipo_servicio === "local" ? "Local" : "Foránea"}</span>
                        </div>

                        <div>
                            <label>Fecha estimada:</label>
                            <span>{formatFecha(solicitud.fecha_recoleccion)}</span>
                        </div>

                        <div>
                            <label>Modalidad:</label>
                            <span>{solicitud.tipo_mudanza}</span>
                        </div>

                        <div>
                            <label>Distancia:</label>
                            <span>
                                {solicitud.distancia_km
                                    ? `${solicitud.distancia_km} km`
                                    : "—"}
                            </span>
                        </div>

                        {!fueExclusivo && (
                            <div>
                                <label>Compras realizadas:</label>
                                <span>{solicitud.compras_count} / 3</span>
                            </div>
                        )}
                    </div>

                    {/* INVENTARIO */}
                    <label>Inventario:</label>
                    <div
                        className="nota-html"
                        dangerouslySetInnerHTML={{
                            __html: solicitud.inventario || "<p>Sin detalle</p>",
                        }}
                    />

                    {haComprado && (
                        <div className="detalle-solicitud__contacto">
                            <div className="detalle-solicitud__divider">
                                <img src="/icons/default-user.png" alt="divider" />
                            </div>

                            <h3 className="detalle-solicitud__section-title">Datos de contacto</h3>

                            <div className="detalle-solicitud__grid">
                                <div>
                                    <label>Nombre:</label>
                                    <span>{solicitud.nombre} </span>
                                </div>

                                <div>
                                    <label>Telefono:</label>
                                    <span>{solicitud.telefono} </span>
                                </div>

                                <div>
                                    <label>Correo electronico:</label>
                                    <span>{solicitud.email} </span>
                                </div>
                            </div>

                        </div>
                    )}

                    <div className="detalle-solicitud__actions">
                        {!haComprado && (
                            <Button_cta
                                value="Comprar"
                                onClick={() => setShowModal(true)}
                            />
                        )}

                        {haComprado && (
                            <Button_cta
                                value="Contactar"
                                icon="/icons/whatsapp.png"
                                iconAlt="WhatsApp"
                                onClick={() =>
                                    openLeadWhatsappMessage({
                                        telefono: solicitud.telefono,
                                        empresaNombre: empresa?.empresa || "Mi empresa",
                                        nombreCliente: solicitud.nombre,
                                        origen: solicitud.origen,
                                        destino: solicitud.destino,
                                        tipoVivienda: solicitud.tipo_vivienda,
                                    })
                                }
                            />
                        )}

                    </div>

                </div>
            </main>

            <LiveViewToast tipo="contacto" registroId={solicitud.id} />

            <Footer />

            {!haComprado && showModal && (
                <ComprarLeadModal
                    solicitudId={id}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}

        </>
    );
}