"use client";

import { useEffect, useState } from "react";
import { getLeadPurchasingCompanies, getLatestLeadPurchases, getLeadPurchasesByEmpresa, } from "@/services/superAdmin";

export default function LeadPurchasesSection() {
    const getToday = () => {
        const ahora = new Date();
        return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;
    };

    const getFirstDayOfMonth = () => {
        const ahora = new Date();
        return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-01`;
    };

    const [fechaInicio, setFechaInicio] = useState(getFirstDayOfMonth());
    const [fechaFin, setFechaFin] = useState(getToday());
    const [fechaInicioAplicada, setFechaInicioAplicada] = useState(getFirstDayOfMonth());
    const [fechaFinAplicada, setFechaFinAplicada] = useState(getToday());
    const [companies, setCompanies] = useState([]);
    const [latestPurchases, setLatestPurchases] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyPurchases, setCompanyPurchases] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPurchases, setLoadingPurchases] = useState(false);
    const [applyingPeriod, setApplyingPeriod] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPurchases(fechaInicioAplicada, fechaFinAplicada);
    }, []);

    const loadPurchases = async (inicio, fin) => {
        try {
            setLoading(true);
            setError(null);

            const [companiesResponse, latestResponse,] =
                await Promise.all([getLeadPurchasingCompanies(inicio, fin), getLatestLeadPurchases(inicio, fin),]);
            setCompanies(companiesResponse.data || []);
            setLatestPurchases(latestResponse.data || []);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar las compras de contactos.");
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPeriod = async () => {
        if (!fechaInicio || !fechaFin) {
            return;
        }

        if (fechaInicio > fechaFin) {
            setError("La fecha inicial no puede ser posterior a la fecha final.");
            return;
        }

        try {
            setApplyingPeriod(true);
            setError(null);
            setSelectedCompany(null);
            setCompanyPurchases(null);
            await loadPurchases(fechaInicio, fechaFin);
            setFechaInicioAplicada(fechaInicio);
            setFechaFinAplicada(fechaFin);
        } finally {
            setApplyingPeriod(false);
        }
    };

    const handleCompanyClick = async (company) => {
        try {
            setLoadingPurchases(true);
            setSelectedCompany(company);
            setCompanyPurchases(null);
            const response = await getLeadPurchasesByEmpresa(company.id, fechaInicioAplicada, fechaFinAplicada);
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

    if (loading && companies.length === 0) {
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

                <div className="purchases-period">
                    <div className="purchases-period__header">
                        <div>
                            <span> Filtrar actividad </span>
                            <h3> Periodo de compras </h3>
                        </div>
                    </div>

                    <div className="purchases-period__controls">
                        <div className="purchases-period__date">
                            <label htmlFor="compras-fecha-inicio">
                                Desde
                            </label>

                            <input
                                id="compras-fecha-inicio"
                                type="date"
                                value={fechaInicio}
                                max={fechaFin}
                                onChange={(event) => setFechaInicio(event.target.value)}
                            />
                        </div>

                        <span className="purchases-period__separator">
                            →
                        </span>

                        <div className="purchases-period__date">
                            <label htmlFor="compras-fecha-fin">
                                Hasta
                            </label>

                            <input
                                id="compras-fecha-fin"
                                type="date"
                                value={fechaFin}
                                min={fechaInicio}
                                onChange={(event) => setFechaFin(event.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="purchases-period__button"
                            onClick={handleApplyPeriod}
                            disabled={applyingPeriod || !fechaInicio || !fechaFin || fechaInicio > fechaFin}
                        >
                            {applyingPeriod ? "Actualizando..." : "Aplicar periodo"}
                        </button>
                    </div>
                </div>

                <div className="purchases-layout">
                    <div className="purchases-panel">
                        <div className="purchases-panel__header">
                            <div>
                                <span> Este periodo </span>
                                <h3> Empresas compradoras </h3>
                            </div>

                            <strong>
                                {companies.length}
                            </strong>
                        </div>

                        {companies.length === 0 ? (
                            <div className="purchases-empty">
                                <p> No hay empresas que hayan comprado contactos durante este periodo. </p>
                            </div>
                        ) : (
                            <div className="buyers-list">
                                {companies.map((company) => (
                                    <button type="button" className="buyer-item" key={company.id} onClick={() => handleCompanyClick(company)} >
                                        <div className="buyer-item__identity">
                                            <div className="buyer-item__logo">
                                                {company.logo ? (
                                                    <img src={company.logo} alt="" />
                                                ) : (
                                                    <span>
                                                        {company.empresa?.charAt(0)?.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h4> {company.empresa} </h4>

                                                <p>
                                                    {company.compras_rango}{" "}

                                                    {company.compras_rango === 1 ? "contacto comprado" : "contactos comprados"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="buyer-item__stats">
                                            <strong>
                                                {company.creditos_consumidos_rango}
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
                                <p> No hay compras registradas durante este periodo. </p>
                            </div>
                        ) : (
                            <div className="latest-purchases">
                                {latestPurchases.map(
                                    (purchase) => (
                                        <article className="latest-purchase" key={purchase.id} >
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
                                                    {purchase.exclusivo ? "Exclusivo" : "Compra"}
                                                </span>
                                            </div>

                                            <div className="latest-purchase__footer">
                                                <span>
                                                    {purchase.lead?.nombre}
                                                </span>

                                                <span>
                                                    {purchase.tokens_pagados}{" "} créditos
                                                </span>

                                                <span>
                                                    {formatDateTime(purchase.created_at)}
                                                </span>
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

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
                                <span> Compras del periodo </span>
                                <h2> {selectedCompany.empresa} </h2>
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
                                            {companyPurchases?.resumen?.compras ?? 0}
                                        </strong>
                                    </div>

                                    <div>
                                        <span> Créditos consumidos </span>

                                        <strong>
                                            {companyPurchases?.resumen?.creditos_consumidos ?? 0}
                                        </strong>
                                    </div>
                                </div>

                                <div className="purchase-detail__list">
                                    {companyPurchases?.compras?.length === 0 ? (
                                        <div className="purchases-empty">
                                            <p> No hay compras para mostrar durante este periodo. </p>
                                        </div>
                                    ) : (
                                        companyPurchases?.compras?.map(
                                            (purchase) => (
                                                <article className="company-purchase" key={purchase.id} >
                                                    <div className="company-purchase__route">
                                                        <strong>
                                                            {purchase.lead?.origen}
                                                            {" → "}
                                                            {purchase.lead?.destino}
                                                        </strong>

                                                        <span>
                                                            {formatDate(purchase.lead?.fecha_recoleccion)}
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
                                                                {purchase.tokens_pagados}{" "} créditos
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
                                                            {formatDateTime(purchase.created_at)}
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