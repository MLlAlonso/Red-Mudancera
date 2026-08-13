"use client";

import { useEffect, useState } from "react";
import { getLeadPurchasingCompanies, getLatestLeadPurchases, getLeadPurchasesByEmpresa, } from "@/services/superAdmin";

export default function LeadPurchasesSection() {
    const [companies, setCompanies] = useState([]);
    const [latestPurchases, setLatestPurchases] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyPurchases, setCompanyPurchases] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPurchases, setLoadingPurchases] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {
        try {
            setLoading(true);
            setError(null);

            const [companiesResponse, latestResponse,] = await Promise.all([
                getLeadPurchasingCompanies(),
                getLatestLeadPurchases(),
            ]);

            setCompanies(companiesResponse.data || []);
            setLatestPurchases(latestResponse.data || []);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar las compras de contactos.");
        } finally {
            setLoading(false);
        }
    };

    const handleCompanyClick = async (company) => {
        try {
            setLoadingPurchases(true);
            setSelectedCompany(company);
            setCompanyPurchases(null);
            const response = await getLeadPurchasesByEmpresa(company.id);
            setCompanyPurchases(response);
        } catch (error) {
            console.error(error);
            setCompanyPurchases({
                empresa: company,
                resumen: {
                    compras: 0,
                    creditos_consumidos: 0,
                },
                compras: [],
            });
        } finally {
            setLoadingPurchases(false);
        }
    };

    const closeCompanyDetail = () => {
        setSelectedCompany(null);
        setCompanyPurchases(null);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "es-MX",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    const formatDateTime = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString(
            "es-MX",
            {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    if (loading) {
        return (
            <section className="admin-block admin-purchases">
                <div className="admin-block__header">
                    <div>
                        <span>Actividad comercial</span>
                        <h2>Compras de contactos</h2>
                    </div>
                </div>

                <div className="purchases-loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="admin-block admin-purchases">
                <div className="admin-block__header">
                    <div>
                        <span>Actividad comercial</span>
                        <h2> Compras de contactos </h2>
                    </div>
                </div>

                {error && (
                    <div className="purchases-error">
                        {error}
                    </div>
                )}

                <div className="purchases-layout">

                    {/* EMPRESAS COMPRADORAS */}
                    <div className="purchases-panel">
                        <div className="purchases-panel__header">
                            <div>
                                <span> Este mes </span>
                                <h3> Empresas compradoras </h3>
                            </div>

                            <strong>
                                {companies.length}
                            </strong>
                        </div>

                        {companies.length === 0 ? (
                            <div className="purchases-empty">
                                <p>
                                    Todavía no hay empresas que hayan comprado contactos este mes.
                                </p>
                            </div>
                        ) : (
                            <div className="buyers-list">
                                {companies.map((company) => (
                                    <button
                                        type="button"
                                        className="buyer-item"
                                        key={company.id}
                                        onClick={() => handleCompanyClick(company)}
                                    >
                                        <div className="buyer-item__identity">

                                            <div className="buyer-item__logo">
                                                {company.logo ? (
                                                    <img src={company.logo} alt="" />
                                                ) : (
                                                    <span>
                                                        {company.empresa
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h4> {company.empresa} </h4>

                                                <p>
                                                    {company.compras_mes}{" "}
                                                    {
                                                        company.compras_mes === 1 ? "contacto comprado" : "contactos comprados"
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="buyer-item__stats">
                                            <strong>
                                                {
                                                    company.creditos_consumidos_mes
                                                }
                                            </strong>

                                            <span> créditos </span>
                                        </div>

                                        <span className="buyer-item__arrow">
                                            →
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ÚLTIMAS COMPRAS */}
                    <div className="purchases-panel">
                        <div className="purchases-panel__header">
                            <div>
                                <span> Actividad reciente </span>
                                <h3> Últimas compras </h3>
                            </div>

                            <strong> {latestPurchases.length} </strong>
                        </div>

                        {latestPurchases.length === 0 ? (
                            <div className="purchases-empty">
                                <p> Todavía no hay compras registradas. </p>
                            </div>
                        ) : (
                            <div className="latest-purchases">
                                {latestPurchases.map((purchase) => (
                                    <article className="latest-purchase" key={purchase.id}  >
                                        <div className="latest-purchase__main">
                                            <div>
                                                <h4>
                                                    {purchase.empresa?.nombre}
                                                </h4>

                                                <p>
                                                    {purchase.lead?.origen}
                                                    {" → "}
                                                    {purchase.lead?.destino}
                                                </p>
                                            </div>

                                            <span className={purchase.exclusivo ? "purchase-badge exclusive" : "purchase-badge"} >
                                                {
                                                    purchase.exclusivo
                                                        ? "Exclusivo"
                                                        : "Compra"
                                                }
                                            </span>
                                        </div>

                                        <div className="latest-purchase__footer">
                                            <span>
                                                {purchase.lead?.nombre}
                                            </span>

                                            <span>
                                                {purchase.tokens_pagados}{" "}
                                                créditos
                                            </span>

                                            <span>
                                                {
                                                    formatDateTime(purchase.created_at)
                                                }
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* DETALLE EMPRESA */}
            {selectedCompany && (
                <div
                    className="purchase-detail-overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeCompanyDetail();
                        }
                    }}
                >
                    <div className="purchase-detail">
                        <div className="purchase-detail__header">
                            <div>
                                <span> Compras del mes </span>

                                <h2>
                                    {selectedCompany.empresa}
                                </h2>
                            </div>

                            <button type="button" onClick={closeCompanyDetail} aria-label="Cerrar" className="purchase-detail__close" >
                                ×
                            </button>
                        </div>

                        {loadingPurchases ? (
                            <div className="purchase-detail__loading">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        ) : (
                            <>
                                <div className="purchase-detail__summary">
                                    <div>
                                        <span> Contactos comprados </span>

                                        <strong>
                                            {
                                                companyPurchases?.resumen?.compras ?? 0
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <span> Créditos consumidos </span>

                                        <strong>
                                            {
                                                companyPurchases?.resumen?.creditos_consumidos ?? 0
                                            }
                                        </strong>
                                    </div>
                                </div>

                                <div className="purchase-detail__list">

                                    {companyPurchases?.compras?.length === 0 ? (
                                        <div className="purchases-empty">
                                            <p> No hay compras para mostrar este mes. </p>
                                        </div>
                                    ) : (
                                        companyPurchases?.compras?.map(
                                            (purchase) => (
                                                <article className="company-purchase" key={purchase.id}  >
                                                    <div className="company-purchase__route">
                                                        <strong>
                                                            {purchase.lead?.origen}
                                                            {" → "}
                                                            {purchase.lead?.destino}
                                                        </strong>

                                                        <span>
                                                            {
                                                                formatDate(purchase.lead?.fecha_recoleccion)
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="company-purchase__data">
                                                        <div>
                                                            <span> Cliente </span>

                                                            <strong>
                                                                {purchase.lead?.nombre}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span> Contacto </span>

                                                            <strong>
                                                                {purchase.lead?.telefono}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span> Compra </span>

                                                            <strong>
                                                                {
                                                                    purchase.tokens_pagados
                                                                }{" "}
                                                                créditos
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span> Estado </span>

                                                            <strong>
                                                                {purchase.estado_operacion}
                                                            </strong>
                                                        </div>
                                                    </div>

                                                    <div className="company-purchase__footer">
                                                        <span>
                                                            Comprado el{" "}
                                                            {
                                                                formatDateTime(purchase.created_at)
                                                            }
                                                        </span>

                                                        {purchase.exclusivo && (
                                                            <span className="purchase-badge exclusive">
                                                                Exclusivo
                                                            </span>
                                                        )}
                                                    </div>
                                                </article>
                                            )
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}