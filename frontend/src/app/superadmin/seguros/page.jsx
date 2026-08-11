"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import SeguroExpedienteCard from "@/components/cards/SeguroExpedienteCard";
import { getExpedientesSeguro } from "@/services/superAdminSeguros";

import "@/styles/pages/superadmin/_seguros.scss";

export default function SuperAdminSegurosPage() {
    const [metrics, setMetrics] = useState(null);
    const [expedientes, setExpedientes] = useState([]);
    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("recent");

    useEffect(() => { loadData(); }, [search, period]);

    async function loadData() {
        try {
            const data = await getExpedientesSeguro(search, period);
            setMetrics(data.metrics);
            setExpedientes(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SuperAdminLayout title="Seguros" subtitle="Administración de expedientes" >
            {
                metrics && (
                    <section className="superadmin-tools">
                        <section className="seguros-metrics">
                            <article className="metric-card success">
                                <span> Nuevos </span>
                                <strong> {metrics.nuevos} </strong>
                            </article>

                            <article className="metric-card warning">
                                <span> Esperando cliente </span>
                                <strong> {metrics.esperando_cliente} </strong>
                            </article>

                            <article className="metric-card premium">
                                <span> Capturando </span>
                                <strong> {metrics.capturando} </strong>
                            </article>

                            <article className="metric-card">
                                <span>  En revisión </span>
                                <strong> {metrics.revision} </strong>
                            </article>

                            <article className="metric-card dark">
                                <span> Finalizados </span>
                                <strong> {metrics.completados} </strong>
                            </article>
                        </section>
                    </section>
                )
            }

            <section className="seguros-toolbar">
                <div className="search-box">
                    <img src="/icons/lupa.png" alt="" />

                    <input placeholder="Buscar por folio, cliente o correo..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <select className="period-filter" value={period} onChange={(e) => setPeriod(e.target.value)}  >
                    <option value="recent">
                        Últimos 2 meses
                    </option>

                    <option value="year">
                        Este año
                    </option>

                    <option value="2026">
                        2026
                    </option>

                    <option value="2025">
                        2025
                    </option>

                    <option value="all">
                        Todos
                    </option>
                </select>
            </section>

            <section className="seguros-grid">
                {
                    expedientes.length === 0 && (
                        <div className="empty-state">
                            <img src="/icons/empty.png" alt=""  />

                            <h3> No hay expedientes </h3>

                            <p> No encontramos expedientes para el filtro seleccionado. </p>
                        </div>
                    )
                }

                {

                    expedientes.map(exp => (
                        <SeguroExpedienteCard
                            key={exp.id}
                            id={exp.id}
                            folio={exp.folio}
                            nombre={exp.nombre}
                            email={exp.email}
                            telefono={exp.telefono}
                            origen={exp.origen}
                            destino={exp.destino}
                            estado={exp.estado}
                            progreso={exp.progreso}
                            tipoSeguro={exp.tipo_seguro}
                            esExterno={exp.es_externo}
                            fecha={exp.created_at}
                        />
                    ))
                }
            </section>
        </SuperAdminLayout>
    );
}