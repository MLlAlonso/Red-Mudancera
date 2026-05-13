"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/pages/partner/_partnerDashboard.scss";

export default function PartnerDashboardClient({ slug }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const currentDate = new Date();

    const [month, setMonth] = useState(
        currentDate.getMonth() + 1
    );

    const [year, setYear] = useState(
        currentDate.getFullYear()
    );

    /*
    |--------------------------------------------------------------------------
    | Meses
    |--------------------------------------------------------------------------
    */
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    /*
    |--------------------------------------------------------------------------
    | Años dinámicos
    |--------------------------------------------------------------------------
    */
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2025;
        const yearsArray = [];

        for (
            let y = currentYear;
            y >= startYear;
            y--
        ) {
            yearsArray.push(y);
        }
        return yearsArray;
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Fetch dashboard
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        async function fetchDashboard() {
            try {
                setLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/partners/${slug}?month=${month}&year=${year}`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar dashboard");
                }

                const result = await response.json();
                setData(result.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            fetchDashboard();
        }

    }, [slug, month, year]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */
    if (loading) {
        return (
            <>
                <main className="partner-dashboard">
                    <p className="partner-dashboard__loading">
                        Cargando dashboard...
                    </p>
                </main>

                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */
    if (!data) {
        return (
            <>
                <main className="partner-dashboard">
                    <p className="partner-dashboard__loading">
                        No se pudo cargar la información.
                    </p>
                </main>
                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Metrics
    |--------------------------------------------------------------------------
    */
    const metrics = [
        {
            title: "Solicitudes generadas",
            value: data.metricas.solicitudes_generadas,
            icon: "📦",
            description:
                "Solicitudes generadas durante este periodo"
        },

        {
            title: "Compras realizadas",
            value:
                data.metricas.ventas_normales +
                data.metricas.ventas_exclusivas,

            icon: "💰",

            description:
                `Tus solicitudes se vendieron ${data.metricas.average_sales_per_request} veces en promedio`
        },

        {
            title: "Créditos generados",
            value: data.metricas.creditos_generados,

            icon: "🪙",

            description:
                `${data.metricas.average_tokens} créditos por compra`
        }
    ];

    /*
    |--------------------------------------------------------------------------
    | Export PDF
    |--------------------------------------------------------------------------
    */
    function exportPdf() {
        const url =
            `${process.env.NEXT_PUBLIC_API_URL}` +
            `/partners/${slug}/export-pdf` +
            `?month=${month}&year=${year}`;
        window.open(url, "_blank");
    }

    const referralUrl =
        `${window.location.origin}` +
        `/solicitar-mudanza/${slug}`;

    async function copyReferralUrl() {
        try {
            await navigator.clipboard.writeText(
                referralUrl
            );
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <main className="partner-dashboard">

                {/* HERO */}

                <div className="partner-dashboard__hero">
                    <div className="hero-logo">
                        <img src="/logo/logo.png" alt="Mudanza Fácil" />
                    </div>

                    <h1 className="title">{data.partner.nombre}</h1>

                    <p className="subtitle">
                        Dashboard de rendimiento · {" "}
                        <strong>
                            {months[month - 1]} {year}
                        </strong>
                    </p>
                </div>

                {/* CONTENT */}
                <section className="partner-dashboard__container">
                    {/* FILTERS */}
                    <div className="partner-dashboard__filters-wrapper">
                        <div className="partner-dashboard__filters">
                            <div className="partner-dashboard__actions">
                                <div className="partner-dashboard__filter">
                                    <label>
                                        Mes
                                    </label>

                                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))} >
                                        {months.map((monthName, index) => (
                                            <option key={index + 1} value={index + 1} >
                                                {monthName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="partner-dashboard__filter">
                                    <label>
                                        Año
                                    </label>

                                    <select value={year} onChange={(e) => setYear(Number(e.target.value))} >
                                        {years.map((yearOption) => (
                                            <option key={yearOption} value={yearOption} >
                                                {yearOption}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button onClick={exportPdf} className="partner-dashboard__export-btn" >
                                Exportar PDF
                            </button>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="partner-dashboard__stats">
                        {metrics.map((metric) => (
                            <div key={metric.title} className="partner-dashboard__stat-card" >
                                <div className="partner-dashboard__stat-top">
                                    <span className="partner-dashboard__icon">
                                        {metric.icon}
                                    </span>

                                    <h3>
                                        {metric.title}
                                    </h3>
                                </div>

                                <p>
                                    {metric.value}
                                </p>

                                <span className="partner-dashboard__stat-description">
                                    {metric.description}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* REFERRAL LINK */}
                    <div className="partner-dashboard__referral-card">
                        <div className="partner-dashboard__referral-header">
                            <div>
                                <h2>
                                    Tu enlace de referidos
                                </h2>

                                <p>
                                    Comparte este enlace para generar solicitudes.
                                </p>
                            </div>

                            <div className="partner-dashboard__referral-badge">
                                Activo
                            </div>
                        </div>

                        <div className="partner-dashboard__referral-box">
                            <span>
                                {referralUrl}
                            </span>
                        </div>

                        <div className="partner-dashboard__referral-actions">
                            <button onClick={copyReferralUrl} className="partner-dashboard__copy-btn" >
                                {copied
                                    ? "Enlace copiado"
                                    : "Copiar enlace"}
                            </button>
                        </div>
                    </div>

                    {/* PERFORMANCE */}
                    <div className="partner-dashboard__performance">
                        <div className="partner-dashboard__performance-header">
                            <h2>
                                Rendimiento mensual
                            </h2>

                            <span>
                                {data.metricas.conversion_rate}% conversión
                            </span>
                        </div>

                        <div className="partner-dashboard__progress">
                            <div className="partner-dashboard__progress-fill"
                                style={{
                                    width: `${Math.min(
                                        data.metricas.conversion_rate,
                                        100
                                    )}%`
                                }}
                            />
                        </div>
                    </div>

                    {/* ACTIVITY */}
                    <div className="partner-dashboard__activity">
                        <div className="partner-dashboard__section-header">
                            <h2>
                                Últimas solicitudes
                            </h2>
                        </div>

                        {data.latest_requests.length === 0 ? (
                            <div className="partner-dashboard__empty">
                                Aún no hay actividad para este periodo.
                            </div>
                        ) : (
                            data.latest_requests.map((request) => (
                                <div key={request.id} className="partner-dashboard__activity-item" >
                                    <div>
                                        <strong>
                                            {request.origen}
                                        </strong>

                                        <span>
                                            {request.destino}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            {request.tipo_servicio}
                                        </strong>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}