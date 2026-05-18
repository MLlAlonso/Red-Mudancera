"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";

import { getTrialRequests, approveTrial, rejectTrial } from "@/services/superAdmin";

export default function TrialRequestsPage() {
    const [trials, setTrials] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getTrialRequests();
        const processed = processTrials(data.data);
        setTrials(processed);
    };

    const processTrials = (items) => {
        const now = new Date();

        // =========================================
        // FILTRAR APROBADOS > 30 DÍAS
        // =========================================
        const filtered = items.filter((trial) => {
            if (trial.status !== "aprobado") {
                return true;
            }

            const updatedAt = new Date(trial.updated_at);
            const diffDays =
                (now - updatedAt) / (1000 * 60 * 60 * 24);
            return diffDays <= 30;
        });

        // =========================================
        // PRIORIDAD DE STATUS
        // =========================================
        const priority = {
            pendiente: 0,
            rechazado: 1,
            aprobado: 2
        };

        // =========================================
        // SORT
        // =========================================
        return filtered.sort((a, b) => {
            // status primero
            const statusCompare =
                priority[a.status] - priority[b.status];
            if (statusCompare !== 0) {
                return statusCompare;
            }

            // luego fecha reciente
            return (
                new Date(b.created_at) -
                new Date(a.created_at)
            );
        });
    };

    const handleApprove = async (id) => {
        await approveTrial(id);
        loadData();
    };

    const handleReject = async (id) => {
        await rejectTrial(id);
        loadData();
    };

    return (
        <SuperAdminLayout title="Verificar empresas" subtitle="Solicitudes de verificación" >
            <div className="trial-table">
                {
                    trials.map((trial) => (
                        <article className="trial-card" key={trial.id} >
                            <div className="trial-card__top">
                                <div className="trial-card__company">
                                    <div className="trial-card__logo">
                                        {
                                            trial.empresa?.logo ? (
                                                <img src={trial.empresa.logo} alt="logo" />
                                            ) : (
                                                <span>
                                                    {
                                                        trial
                                                            .empresa
                                                            ?.empresa
                                                            ?.charAt(0)
                                                    }
                                                </span>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <h3>
                                            {trial.empresa?.empresa}
                                        </h3>

                                        <p>
                                            {trial.representante}
                                        </p>
                                    </div>
                                </div>

                                <span className={`status ${trial.status}`} >
                                    {trial.status}
                                </span>
                            </div>

                            <div className="trial-card__body">
                                <div className="info-item">
                                    <span>Teléfono</span>
                                    <p>{trial.tel}</p>
                                </div>

                                <div className="info-item">
                                    <span>Correo</span>
                                    <p>{trial.empresa?.email}</p>
                                </div>

                                <div className="info-item">
                                    <span>Base</span>
                                    <p>{trial.base}</p>
                                </div>

                                <div className="info-item">
                                    <span>RFC</span>
                                    <p>{trial.rfc}</p>
                                </div>
                            </div>

                            <div className="trial-card__actions">
                                <a href={`mailto:${trial.empresa?.email}`} >
                                    Correo
                                </a>

                                <a href={`https://wa.me/${trial.tel.replace(/\D/g, "")}`} target="_blank" >
                                    WhatsApp
                                </a>

                                {
                                    trial.status === "pendiente" && (
                                        <>
                                            <button className="reject" onClick={() => handleReject(trial.id) } >
                                                Rechazar
                                            </button>

                                            <button onClick={() => handleApprove(trial.id) } >
                                                Aprobar
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </article>
                    ))
                }
            </div>
        </SuperAdminLayout>
    );
}