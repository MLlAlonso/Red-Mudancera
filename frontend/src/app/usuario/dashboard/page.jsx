"use client";

import { useState, useEffect, useMemo } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ServiceFilters from "@/components/filters/ServiceFilters";
import ServiceAdvancedFilters from "@/components/filters/ServiceAdvancedFilters";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";

import useServicios from "@/hooks/useServicios";
import { useSearch } from "@/store/searchContext";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function UsuarioDashboard() {
  const { search } = useSearch(); // ✅ SEARCH GLOBAL DEL HEADER

  const [filter, setFilter] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);

  /* =========================
     Filtros
  ========================= */
  const emptyFilters = {
    origen: "",
    destino: "",
    volumen: "",
    fechaInicio: "",
    fechaFin: "",
    sede: "",
    tipoCarga: "",
  };

  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState({});

  /* =========================
     Textos dinámicos
  ========================= */
  const dashboardTexts = {
    todos: {
      title: "Últimas publicaciones",
      subtitle: "Servicios disponibles de todas las empresas",
    },
    busco: {
      title: "Publicaciones de Búsqueda",
      subtitle:
        "En esta pantalla puedes ver lo que están buscando las empresas",
    },
    ofrezco: {
      title: "Publicaciones de Cargas a ofrecer",
      subtitle:
        "En esta pantalla puedes ver las cargas que ofrecen las empresas",
    },
  };

  /* =========================
     Helpers
  ========================= */
  const hasActiveFilters =
    search.trim() !== "" ||
    Object.values(appliedFilters).some((v) => v !== "");

  const clearAllFilters = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters({});
    setShowFilters(false);
    // ⛔️ el search se limpia desde el Header
  };

  /* =========================
     Data
  ========================= */
  const { servicios, loading, hasMore, loadMore } = useServicios({
    search,
    filters: appliedFilters,
  });

  const visible = useMemo(() => {
    if (filter === "todos") return servicios;
    return servicios.filter((s) => s.tipo === filter);
  }, [servicios, filter]);

  /* =========================
     Infinite scroll
  ========================= */
  useEffect(() => {
    const onScroll = () => {
      if (
        hasMore &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore, hasMore]);

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        {/* =========================
            Header textos
        ========================= */}
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">
            {dashboardTexts[filter].title}
          </h1>
          <p className="empresa-dashboard__subtitle">
            {dashboardTexts[filter].subtitle}
          </p>
        </div>

        {/* =========================
            Controls
        ========================= */}
        <div className="empresa-dashboard__controls">
          <div className="empresa-dashboard__left">
            <ServiceFilters onChange={setFilter} />

            {/* Botón filtros / borrar */}
            <button
              className={`btn-advanced-filters ${
                hasActiveFilters ? "active" : ""
              }`}
              onClick={() => {
                if (hasActiveFilters) {
                  clearAllFilters();
                } else {
                  setShowFilters(true);
                }
              }}
              aria-label={
                hasActiveFilters ? "Borrar filtros" : "Filtros avanzados"
              }
            >
              <img
                src={
                  hasActiveFilters
                    ? "/icons/borrar.png"
                    : "/icons/filtrar.png"
                }
                alt={
                  hasActiveFilters
                    ? "Borrar filtros"
                    : "Filtros avanzados"
                }
              />
            </button>
          </div>
        </div>

        {/* =========================
            Advanced filters
        ========================= */}
        {showFilters && (
          <div className="filters-overlay">
            <ServiceAdvancedFilters
              values={draftFilters}
              onChange={setDraftFilters}
              onApply={() => {
                setAppliedFilters(draftFilters);
                setShowFilters(false);
              }}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        {/* =========================
            Cards
        ========================= */}
        <div className="empresa-dashboard__cards">
          {visible.map((s) => (
            <ServiceCard
              key={s.id}
              id={s.id}
              type={s.tipo}
              origen={s.origen}
              destino={s.destino}
              volumen={`${s.volumen} m³`}
              empresa={s.empresa?.empresa ?? "Empresa"}
              fecha={
                s.updated_at
                  ? new Date(s.updated_at).toLocaleDateString()
                  : "—"
              }
            />
          ))}

          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
