"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { getDashboardMetrics } from "@/services/superAdmin";

export default function SuperAdminDashboardPage() {
    const [metrics, setMetrics] = useState(null);
    
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getDashboardMetrics();
        setMetrics(data);
    };

    if (!metrics) return null;

    return (
        <SuperAdminLayout title="Dashboard" subtitle="Resumen general del sistema" >

            {/* METRICS */}
            <section className="superadmin-dashboard__grid">
                <article className="admin-card">

                    <div className="admin-card__top">

                        <span className="badge total">
                            Total
                        </span>

                    </div>

                    <h3>
                        Empresas registradas
                    </h3>

                    <span className="admin-card__value">
                        {metrics.empresas}
                    </span>

                    <p>
                        Empresas dentro de la plataforma
                    </p>

                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge active">
                            Activo
                        </span>
                    </div>

                    <h3>
                        Servicios activos
                    </h3>

                    <span className="admin-card__value">
                        {metrics.servicios_activos}
                    </span>

                    <p>
                        Servicios visibles actualmente
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge active">
                            Activo
                        </span>
                    </div>

                    <h3>
                        Solicitudes activas
                    </h3>

                    <span className="admin-card__value">
                        {metrics.solicitudes_activas}
                    </span>

                    <p>
                        Leads disponibles actualmente
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge warning">
                            Pendiente
                        </span>
                    </div>

                    <h3>
                        Verificaciones
                    </h3>

                    <span className="admin-card__value">
                        {metrics.verificaciones_pendientes}
                    </span>

                    <p>
                        Empresas pendientes por aprobar
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge monthly">
                            Este mes
                        </span>
                    </div>

                    <h3>
                        Créditos consumidos
                    </h3>

                    <span className="admin-card__value">
                        {metrics.creditos_mes}
                    </span>

                    <p>
                        Créditos gastados en leads
                    </p>
                </article>
            </section>

            {/* EMPRESAS */}
            <section className="superadmin-section">
                <div className="superadmin-section__header">
                    <div>
                        <span>
                            Actividad reciente
                        </span>

                        <h2>
                            Últimas empresas registradas
                        </h2>
                    </div>
                </div>

                <div className="recent-companies">
                    {
                        metrics.ultimas_empresas.map((empresa) => (
                            <article className="recent-company-card" key={empresa.id} >
                                <div className="recent-company-card__left">
                                    <div className="recent-company-card__logo">
                                        {
                                            empresa.logo ? (
                                                <img src={empresa.logo} alt={empresa.empresa} />
                                            ) : (
                                                <span>
                                                    {empresa.empresa?.charAt(0)}
                                                </span>
                                            )
                                        }
                                    </div>

                                    <div className="recent-company-card__content">
                                        <h3>
                                            {empresa.empresa}
                                        </h3>

                                        <p>
                                            {empresa.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="recent-company-card__right">
                                    <span className={`plan ${empresa.plan}`}>
                                        {empresa.plan || "explorador"}
                                    </span>

                                    {
                                        empresa.verificado && (
                                            <span className="verified">
                                                Verificada
                                            </span>
                                        )
                                    }

                                    {
                                        empresa.isTrial && (
                                            <span className="trial">
                                                Trial
                                            </span>
                                        )
                                    }
                                </div>
                            </article>
                        ))
                    }

                </div>
            </section>

        </SuperAdminLayout>
    );
}