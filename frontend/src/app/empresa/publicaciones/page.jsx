"use client";

import { useEffect, useState } from "react";

import { getEmpresaToken } from "@/utils/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceFilters from "@/components/filters/ServiceFilters";
import ServiceAdvancedFilters from "@/components/filters/ServiceAdvancedFilters";
import Button_crud from "@/components/common/Button_crud";
import SearchBar from "@/components/common/SearchBar";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import ChangeServiceStatusModal from "@/components/modals/ChangeServiceStatusModal";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function MisServiciosEmpresa() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("todos");
    const [showFilters, setShowFilters] = useState(false);
    const [showEstadoModal, setShowEstadoModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // filtros del modal
    const [draftFilters, setDraftFilters] = useState({
        origen: "",
        destino: "",
        volumen: "",
        fechaInicio: "",
        fechaFin: "",
        sede: "",
        tipoCarga: "",
    });

    // filtros aplicados
    const [appliedFilters, setAppliedFilters] = useState({});

    useEffect(() => {
        const token = getEmpresaToken();
        if (!token) return;

        setLoading(true);

        const params = new URLSearchParams({
            search,
            ...appliedFilters,
        });

        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/servicios?${params}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`, // 🔥 CLAVE
                },
            }
        )
            .then((r) => {
                if (r.status === 401) {
                    window.location.href = "/empresa/login";
                    return;
                }
                return r.json();
            })
            .then((json) => setServices(json?.data || []))
            .finally(() => setLoading(false));
    }, [search, appliedFilters]);

    const visible =
        filter === "todos"
            ? services
            : services.filter((s) => s.tipo === filter);

    return (
        <>
            <Header />

            <main className="empresa-dashboard">
                <div className="empresa-dashboard__header">
                    <h1 className="empresa-dashboard__title">Publicaciones activas</h1>
                    <p className="empresa-dashboard__subtitle">
                        Aquí puedes ver y editar todos tus servicios publicados
                    </p>
                </div>

                <div className="empresa-dashboard__controls">
                    <div className="empresa-dashboard__left">
                        <ServiceFilters onChange={setFilter} />
                    </div>
                </div>
                {/* =========================
            Button CRUD
        ========================= */}
                <Button_crud
                    value="+"
                    onClick={() => (window.location.href = "/empresa/cargas")}
                />

                {/* =========================
            Advanced filters overlay
        ========================= */}
                {showFilters && (
                    <div className="filters-overlay">
                        <ServiceAdvancedFilters
                            values={filters}
                            onChange={setFilters}
                            onApply={() => setShowFilters(false)}
                            onClose={() => setShowFilters(false)}
                        />
                    </div>
                )}

                <div className="empresa-dashboard__cards">
                    {loading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <ServiceCardSkeleton key={i} />
                        ))}

                    {!loading &&
                        visible.map((s) => (
                            <ServiceCard
                                key={s.id}
                                id={s.id}
                                type={s.tipo}
                                origen={s.origen}
                                destino={s.destino}
                                volumen={s.volumen ? `${s.volumen} m³` : "No especificado"}
                                empresa={s.empresa?.empresa ?? "Empresa"}
                                fecha={new Date(s.created_at).toLocaleDateString()}
                                showContact={false}
                                onChangeEstado={() => {
                                    setSelectedService(s);
                                    setShowEstadoModal(true);
                                }}
                            />
                        ))}
                </div>
            </main>

            <ChangeServiceStatusModal
                open={showEstadoModal}
                servicio={selectedService}
                onClose={() => {
                    setShowEstadoModal(false);
                    setSelectedService(null);
                }}
                onUpdated={(updatedService) => {
                    setServices((prev) =>
                        prev.map((s) =>
                            s.id === updatedService.id ? updatedService : s
                        )
                    );
                }}
            />

            <Footer />
        </>
    );
}