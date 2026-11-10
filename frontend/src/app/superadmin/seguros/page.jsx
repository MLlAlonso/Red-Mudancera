
"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import SeguroExpedienteCard from "@/components/cards/SeguroExpedienteCard";
import { getExpedientesSeguro } from "@/services/superAdminSeguros";
import "@/styles/pages/superadmin/_seguros.scss";

export default function SuperAdminSegurosPage() {
    const [metrics, setMetrics] = useState(null);
    const [expedientes, setExpedientes] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("bimestre");
    const [modalidad, setModalidad] = useState("todas");
    const [estado, setEstado] = useState("todos");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let active = true;
        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getExpedientesSeguro(search, month, modalidad, estado);
                if (!active) return;
                setMetrics(data.metrics);
                setExpedientes(data.data || []);
                setPeriods(data.periods || []);

            } catch (error) {
                console.error(error);

                if (active) {
                    setError("No fue posible cargar los expedientes. Intenta nuevamente.");
                }

            } finally {
                if (active) {
                    setLoading(false);
                }
            }

        }, 300);

        return () => { active = false; clearTimeout(timeout); };
    }, [search, month, modalidad, estado, refreshKey]);

    function handleDeleted(id) {
        setExpedientes((actuales) => actuales.filter((item) => item.id !== id));
    }

    return (
        <SuperAdminLayout title="Seguros" subtitle="Administración de expedientes" >

            {/* MÉTRICAS */}
            {metrics && (
                <section className="superadmin-tools">
                    <section className="seguros-metrics">
                        <article className="metric-card success">
                            <span>Nuevos</span>
                            <strong>{metrics.nuevos}</strong>
                        </article>

                        <article className="metric-card warning">
                            <span>Esperando cliente</span>
                            <strong>{metrics.esperando_cliente}</strong>
                        </article>

                        <article className="metric-card premium">
                            <span>Capturando</span>
                            <strong>{metrics.capturando}</strong>
                        </article>

                        <article className="metric-card">
                            <span>En revisión</span>
                            <strong>{metrics.revision}</strong>
                        </article>

                        <article className="metric-card dark">
                            <span>Finalizados</span>
                            <strong>{metrics.completados}</strong>
                        </article>
                    </section>
                </section>
            )}

            {/* FILTROS */}
            <section className="seguros-toolbar">
                <div className="search-box">
                    <img src="/icons/lupa.png" alt="" />
                    <input type="search" placeholder="Buscar por folio, cliente o correo..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <select className="period-filter" value={month} onChange={(e) => setMonth(e.target.value)} >
                    {periods.map((period) => (
                        <option key={period.value} value={period.value} >
                            {period.label}
                        </option>
                    ))}
                </select>

                <select className="period-filter status-filter" value={estado} onChange={(e) => setEstado(e.target.value)} >
                    <option value="todos">
                        Todos los estados
                    </option>

                    <option value="nuevo">
                        Nuevos
                    </option>

                    <option value="esperando_cliente">
                        Esperando cliente
                    </option>

                    <option value="capturando">
                        Capturando información
                    </option>

                    <option value="revision">
                        En revisión
                    </option>

                    <option value="completado">
                        Completados
                    </option>

                    <option value="cancelado">
                        Cancelados
                    </option>
                </select>
            </section>

            {/* RESULTADOS */}
            <section className="seguros-results">
                <div className="seguros-results__header">
                    <div>
                        <h2>Expedientes</h2>

                        <p>
                            {loading ? "Actualizando resultados..." : `${expedientes.length} expedientes encontrados`}
                        </p>
                    </div>

                    {loading && (
                        <span className="seguros-loading">
                            Actualizando
                        </span>
                    )}
                </div>

                {error && (
                    <div className="seguros-error">
                        <p>{error}</p>

                        <button type="button" onClick={() => setRefreshKey((value) => value + 1)} >
                            Reintentar
                        </button>
                    </div>
                )}

                {!error && !loading && expedientes.length === 0 && (
                    <div className="empty-state">
                        <img src="/icons/empty.png" alt="" />
                        <h3>No hay expedientes</h3>
                        <p>  No encontramos expedientes para los filtros seleccionados. </p>
                    </div>

                )}

                <div className="seguros-grid">

                    {expedientes.map((exp) => (
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
                            modalidadDatos={exp.modalidad_datos}
                            onDeleted={handleDeleted}
                        />
                    ))}
                </div>
            </section>

        </SuperAdminLayout>
    );
}