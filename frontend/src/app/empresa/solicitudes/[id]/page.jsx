"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_cta from "@/components/common/Button_cta";
import ComprarLeadModal from "@/components/modals/ComprarLeadModal";

import "@/styles/pages/solicitudes/_detalleSolicitud.scss";

export default function DetalleSolicitudPage() {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/${id}`)
            .then(res => res.json())
            .then(data => setSolicitud(data));
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
                        Detalle de solicitud
                    </h1>
                    <p className="detalle-solicitud__subtitle">
                        Información completa de la solicitud de mudanza
                    </p>
                </div>

                <div className="detalle-solicitud__card">

                    {/* RUTA */}
                    <div className="detalle-solicitud__route">
                        <span className="detalle-solicitud__tag">
                            Solicitud
                        </span>

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

                        <div>
                            <label>Compras realizadas:</label>
                            <span>{solicitud.compras_count} / 3</span>
                        </div>
                    </div>

                    {/* INVENTARIO */}
                    <label>Inventario:</label>
                    <div
                        className="nota-html"
                        dangerouslySetInnerHTML={{
                            __html: solicitud.inventario || "<p>Sin detalle</p>",
                        }}
                    />

                    <div className="detalle-solicitud__actions">
                        <Button_cta
                            value="Comprar lead"
                            iconAlt="Comprar"
                            onClick={() => setShowModal(true)}
                        />
                    </div>

                </div>
            </main>

            <Footer />

            {showModal && (
                <ComprarLeadModal
                    solicitudId={id}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}
        </>
    );
}