"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { getDashboardMetrics } from "@/services/superAdmin";
import BaseModal from "@/components/modals/BaseModal";

export default function SuperAdminDashboardPage() {
    const [metrics, setMetrics] = useState(null);

    const [announcement, setAnnouncement] =
        useState({
            titulo: "",
            mensaje: ""
        });

    const [feedbackModal, setFeedbackModal] =
        useState({
            open: false,
            type: "success",
            title: "",
            message: ""
        });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getDashboardMetrics();
        setMetrics(data);
    };

    const createAnnouncement = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/system-announcements`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        announcement
                    )
                }
            );

            if (!res.ok) {
                throw new Error(
                    "No se pudo publicar el anuncio"
                );
            }

            setAnnouncement({
                titulo: "",
                mensaje: ""
            });

            setFeedbackModal({
                open: true,
                type: "success",
                title: "Anuncio publicado",
                message:
                    "El mensaje global fue enviado correctamente a todos los usuarios activos."
            });

        } catch (err) {
            setFeedbackModal({
                open: true,
                type: "error",
                title: "Error al publicar",
                message:
                    "Ocurrió un problema al intentar publicar el anuncio global."
            });
        }
    };

    if (!metrics) return null;

    return (
        <SuperAdminLayout title="Dashboard" subtitle="Resumen general del sistema" >
            {/* METRICS */}
            <section className="superadmin-dashboard__grid">

                {/* EMPRESAS */}
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
                        {metrics.metrics.empresas_total}
                    </span>

                    <p>
                        Empresas dentro de la plataforma
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge premium">
                            Premium
                        </span>
                    </div>

                    <h3>
                        Empresas premium
                    </h3>

                    <span className="admin-card__value">
                        {metrics.metrics.empresas_premium}
                    </span>

                    <p>
                        Plan Radar y Conector activos
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
                        {metrics.metrics.creditos_mes}
                    </span>

                    <p>
                        Créditos utilizados en leads
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge trial">
                            Trial
                        </span>
                    </div>

                    <h3>
                        Trials activos
                    </h3>

                    <span className="admin-card__value">
                        {metrics.metrics.trials_activos}
                    </span>

                    <p>
                        Empresas usando prueba gratuita
                    </p>
                </article>

                {/* VERIFICACIONES */}
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
                        {metrics.metrics.verificaciones_pendientes}
                    </span>

                    <p>
                        Empresas pendientes por aprobar
                    </p>
                </article>

                {/* OPERACIÓN */}
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
                        {metrics.metrics.servicios_activos}
                    </span>

                    <p>
                        Servicios visibles actualmente
                    </p>
                </article>

                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge leads">
                            Leads
                        </span>
                    </div>

                    <h3>
                        Solicitudes activas
                    </h3>

                    <span className="admin-card__value">
                        {metrics.metrics.solicitudes_activas}
                    </span>

                    <p>
                        Leads visibles actualmente
                    </p>
                </article>

                {/* NEGOCIO */}
                <article className="admin-card">
                    <div className="admin-card__top">
                        <span className="badge monthly">
                            Este mes
                        </span>
                    </div>

                    <h3>
                        Matchings generados
                    </h3>

                    <span className="admin-card__value">
                        {metrics.metrics.matchings_mes}
                    </span>

                    <p>
                        Compras y conexiones realizadas
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

            <section className="announcement-box">
                <h2> Anuncio global </h2>

                <p>
                    Este mensaje aparecerá a todos
                    los usuarios activos
                </p>
            </section>

            <div className="announcement-form">
                <input
                    type="text"
                    placeholder="Título"
                    value={announcement.titulo}
                    onChange={(e) =>
                        setAnnouncement({
                            ...announcement,
                            titulo: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Mensaje"
                    value={announcement.mensaje}
                    onChange={(e) =>
                        setAnnouncement({
                            ...announcement,
                            mensaje: e.target.value
                        })
                    }
                />

                <button onClick={createAnnouncement} >
                    Publicar anuncio
                </button>

            </div>

            {
                feedbackModal.open && (
                    <BaseModal
                        onClose={() =>
                            setFeedbackModal({
                                ...feedbackModal,
                                open: false
                            })
                        }
                    >

                        <div className="feedback-modal">

                            <div
                                className={`
                        feedback-modal__icon
                        ${feedbackModal.type}
                    `}
                            >

                                {
                                    feedbackModal.type === "success"
                                        ? "✓"
                                        : "!"
                                }

                            </div>

                            <h2>
                                {feedbackModal.title}
                            </h2>

                            <p>
                                {feedbackModal.message}
                            </p>

                            <button
                                onClick={() =>
                                    setFeedbackModal({
                                        ...feedbackModal,
                                        open: false
                                    })
                                }
                            >
                                Entendido
                            </button>
                        </div>
                    </BaseModal>
                )
            }
        </SuperAdminLayout>
    );
}