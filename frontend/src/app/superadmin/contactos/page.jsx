"use client";

import { useEffect, useState } from "react";
import { exportarSolicitudesMudanza } from "@/services/superAdmin";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import LeadPurchasesSection from "@/components/superadmin/LeadPurchasesSection";
import "@/styles/pages/superadmin/_superAdminServicios.scss";

export default function SuperAdminServiciosPage() {
    const [data, setData] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const [fechaInicioExportacion, setFechaInicioExportacion] = useState(() => {
        const ahora = new Date();
        return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;
    });

    const [fechaFinExportacion, setFechaFinExportacion] = useState(() => {
        const ahora = new Date();
        return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;
    });

    const [exportando, setExportando] = useState(false);

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

    const handleExportarSolicitudes = async () => {
        try {
            setExportando(true);
            const blob = await exportarSolicitudesMudanza(fechaInicioExportacion, fechaFinExportacion);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `solicitudes-mudanza-${fechaInicioExportacion}-a-${fechaFinExportacion}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("No fue posible exportar las solicitudes de mudanza.");
        } finally {
            setExportando(false);
        }
    };

    if (!data) return null;

    return (
        <SuperAdminLayout title="Contactos" subtitle="Resumen operativo de la plataforma" >
            {/* CONTACTOS */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <div>
                        <h2> Leads y demanda </h2>
                    </div>
                </div>

                <div className="metrics-grid">
                    <article className="metric-card">
                        <span> Créditos consumidos este mes </span>

                        <strong>
                            {data.metrics.negocio.creditos_consumidos_mes}
                        </strong>
                    </article>

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

                    <article className="metric-card">
                        <span> Leads exclusivos este mes </span>

                        <strong>
                            {data.metrics.negocio.leads_exclusivos_mes}
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
                            {data.metrics.contactos.tipo_mudanza_top || "-"}
                        </strong>
                    </article>

                    <article className="metric-card danger">
                        <span> Solicitudes reportadas </span>

                        <strong>
                            {data.metrics.contactos.solicitudes_reportadas}
                        </strong>
                    </article>

                    <article className="metric-card warning">
                        <span> Solicitudes expiradas </span>

                        <strong>
                            {data.metrics.contactos.solicitudes_expiradas}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span> Partners activos </span>

                        <strong>
                            {data.metrics.operacion.partners_activos}
                        </strong>
                    </article>
                </div>
            </section>

            {/* EXPORTACIÓN */}
            <section className="admin-block">
                <div className="admin-block__header">
                    <div>
                        <h2> Exportar solicitudes de mudanza </h2>
                    </div>
                </div>

                <div className="export-solicitudes">
                    <div className="export-solicitudes__range">
                        <div className="export-solicitudes__date">
                            <label htmlFor="fecha-inicio-exportacion">
                                Desde
                            </label>

                            <input id="fecha-inicio-exportacion" type="date" value={fechaInicioExportacion} max={fechaFinExportacion} onChange={(e) => setFechaInicioExportacion(e.target.value)} />
                        </div>

                        <span className="export-solicitudes__separator">
                            →
                        </span>

                        <div className="export-solicitudes__date">
                            <label htmlFor="fecha-fin-exportacion">
                                Hasta
                            </label>

                            <input id="fecha-fin-exportacion" type="date" value={fechaFinExportacion} min={fechaInicioExportacion} onChange={(e) => setFechaFinExportacion(e.target.value)} />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="export-solicitudes__button"
                        onClick={handleExportarSolicitudes}
                        disabled={exportando || !fechaInicioExportacion || !fechaFinExportacion}
                    >
                        {exportando ? "Generando Excel..." : "Exportar solicitudes"}
                    </button>
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
                                        {item.origen} {" → "} {item.destino}
                                    </h3>

                                    <p>
                                        {item.nombre}
                                    </p>
                                </div>

                                <span>
                                    {item.compras_count} compras
                                </span>
                            </article>
                        ))
                    }
                </div>
            </section>

            {/* COMPRAS DE CONTACTOS */}
            <LeadPurchasesSection />

            {showScrollTop && (
                <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver al inicio" title="Volver al inicio" >
                    ↑
                </button>
            )}

        </SuperAdminLayout>
    );
}