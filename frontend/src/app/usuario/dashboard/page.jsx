"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ServiceFilters from "@/components/filters/ServiceFilters";
import ServiceAdvancedFilters from "@/components/filters/ServiceAdvancedFilters";
import SearchBar from "@/components/common/SearchBar";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";

import useServicios from "@/hooks/useServicios";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function UsuarioDashboard() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 👉 filtros del modal
  const [draftFilters, setDraftFilters] = useState({
    origen: "",
    destino: "",
    volumen: "",
    fechaInicio: "",
    fechaFin: "",
    sede: "",
    tipoCarga: "",
  });

  // 👉 filtros aplicados (estos sí disparan fetch)
  const [appliedFilters, setAppliedFilters] = useState({});

  const { servicios, loading, hasMore, loadMore } = useServicios({
    search,
    filters: appliedFilters,
  });

  const visible = useMemo(() => {
    if (filter === "todos") return servicios;
    return servicios.filter((s) => s.tipo === filter);
  }, [servicios, filter]);

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
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">Últimas publicaciones</h1>
          <p className="empresa-dashboard__subtitle">
            Servicios disponibles de todas las empresas
          </p>
        </div>

        <div className="empresa-dashboard__controls">
          <ServiceFilters onChange={setFilter} />

          <SearchBar
            value={search}
            onChange={setSearch}
            onFilterClick={() => setShowFilters(true)}
          />
        </div>

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
