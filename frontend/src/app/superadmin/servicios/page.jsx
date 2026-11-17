"use client";

import { useEffect, useState } from "react";
import { exportarSolicitudesMudanza } from "@/services/superAdmin";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import "@/styles/pages/superadmin/_superAdminServicios.scss";

export default function SuperAdminServiciosPage() {
    const [data, setData] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        loadData();

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const loadData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/servicios-dashboard`);

        if (!res.ok) {
            const text = await res.text();
            console.error(text);
            return;
        }

        const json = await res.json();
        setData(json);
    };

    if (!data) return null;

    return (
        <SuperAdminLayout title="Servicios" subtitle="Resumen operativo de la plataforma" >
            {/* SERVICIOS */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <div>
                        <h2> Operación logística </h2>
                    </div>
                </div>

                <div className="metrics-grid">
                    <article className="metric-card">
                        <span> Publicados este mes </span>

                        <strong>
                            {data.metrics.servicios.publicados_mes}
                        </strong>
                    </article>

                    <article className="metric-card success">
                        <span> Servicios activos </span>

                        <strong>
                            {data.metrics.servicios.servicios_activos}
                        </strong>
                    </article>

                    <article className="metric-card warning">
                        <span> Matchings generados </span>

                        <strong>
                            {data.metrics.operacion.matchings_mes}
                        </strong>
                    </article>

                    <article className="metric-card success">
                        <span> Servicios locales </span>

                        <strong>
                            {data.metrics.servicios.locales}
                        </strong>
                    </article>

                    <article className="metric-card warning">
                        <span> Servicios foráneos </span>

                        <strong>
                            {data.metrics.servicios.foraneos}
                        </strong>
                    </article>

                    <article className="metric-card premium">
                        <span> Ruta más repetida </span>

                        <strong id="rutaPopular">
                            {data.metrics.servicios.ruta_top || "-"}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Origen más frecuente </span>

                        <strong>
                            {data.metrics.servicios.origen_top || "-"}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Hora más activa </span>

                        <strong>
                            {data.metrics.servicios.hora_top || "-"}h
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Día más activo </span>

                        <strong>
                            {data.metrics.servicios.dia_top || "-"}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Tipo de carga más publicado </span>

                        <strong>
                            {data.metrics.servicios.tipo_carga_top || "-"}
                        </strong>
                    </article>
                </div>
            </section>

            {/* ÚLTIMOS SERVICIOS */}
            <section className="admin-list">
                <h2> Últimos servicios publicados </h2>

                <div className="admin-list__items">
                    {
                        data.ultimos_servicios.map((servicio) => (
                            <article className="admin-item" key={servicio.id}  >
                                <div>
                                    <h3>
                                        {servicio.origen} {" → "} {servicio.destino}
                                    </h3>

                                    <p>
                                        {servicio.empresa?.empresa}
                                    </p>
                                </div>

                                <span className={servicio.estado}>
                                    {servicio.estado}
                                </span>
                            </article>
                        ))
                    }
                </div>
            </section>

            {showScrollTop && (
                <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver al inicio" title="Volver al inicio" >
                    ↑
                </button>
            )}

        </SuperAdminLayout>
    );
}