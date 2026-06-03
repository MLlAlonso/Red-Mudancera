"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import "@/styles/pages/superadmin/_superAdminServicios.scss";

export default function SuperAdminServiciosPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        loadData();

    }, []);

    const loadData = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/superadmin/servicios-dashboard`
        );

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
        <SuperAdminLayout title="Servicios y contactos" subtitle="Resumen operativo de la plataforma" >

            {/* SERVICIOS */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <div>
                        <span> Operación logística </span>

                        <h2> Servicios </h2>
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

            {/* CONTACTOS */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <div>
                        <span> Leads y demanda</span>

                        <h2> Contactos </h2>
                    </div>
                </div>

                <div className="metrics-grid">
                    <article className="metric-card">
                        <span> Leads publicados </span>

                        <strong>
                            {data.metrics.contactos.publicados_mes}
                        </strong>
                    </article>

                    <article className="metric-card success">
                        <span> Leads comprados </span>

                        <strong>
                            {data.metrics.contactos.comprados_mes}
                        </strong>
                    </article>

                    <article className="metric-card success">
                        <span> Leads locales </span>

                        <strong>
                            {data.metrics.contactos.locales}
                        </strong>
                    </article>

                    <article className="metric-card warning">
                        <span> Leads foráneos </span>

                        <strong>
                            {data.metrics.contactos.foraneos}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Tipo de mudanza top </span>

                        <strong>
                            {
                                data.metrics.contactos.tipo_mudanza_top || "-"
                            }
                        </strong>
                    </article>

                    <article className="metric-card danger">
                        <span>
                            Solicitudes reportadas
                        </span>

                        <strong>
                            {data.metrics.contactos.solicitudes_reportadas}
                        </strong>
                    </article>
                </div>
            </section>

            {/* NEGOCIO */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <h2>
                        Operación y negocio
                    </h2>
                </div>

                <div className="metrics-grid">
                    <article className="metric-card dark">
                        <span> Créditos consumidos este mes </span>

                        <strong>
                            {
                                data.metrics.negocio.creditos_consumidos_mes
                            }
                        </strong>
                    </article>

                    <article className="metric-card warning">
                        <span> Leads exclusivos este mes </span>

                        <strong>
                            {
                                data.metrics.negocio.leads_exclusivos_mes
                            }
                        </strong>
                    </article>

                    <article className="metric-card partner">
                        <span> Partners activos </span>

                        <strong>
                            {data.metrics.operacion.partners_activos}
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
                                        {servicio.origen}
                                        {" → "}
                                        {servicio.destino}
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

            {/* ÚLTIMOS CONTACTOS */}
            <section className="admin-list">
                <h2> Últimos contactos publicados </h2>

                <div className="admin-list__items">
                    {
                        data.ultimos_contactos.map((item) => (
                            <article className="admin-item" key={item.id} >
                                <div>
                                    <h3>
                                        {item.origen}
                                        {" → "}
                                        {item.destino}
                                    </h3>

                                    <p>
                                        {item.nombre}
                                    </p>
                                </div>

                                <span>
                                    {
                                        item.compras_count
                                    } compras
                                </span>
                            </article>
                        ))
                    }
                </div>
            </section>
        </SuperAdminLayout>
    );
}