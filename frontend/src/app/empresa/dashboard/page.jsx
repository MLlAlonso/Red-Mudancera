"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceFilters from "@/components/filters/ServiceFilters";
import ServiceAdvancedFilters from "@/components/filters/ServiceAdvancedFilters";
import Button_crud from "@/components/common/Button_crud";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import { useSearch } from "@/store/searchContext";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function EmpresaDashboard() {
  const { search, setSearch } = useSearch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  const [filters, setFilters] = useState({
    origen: "",
    destino: "",
    volumen: "",
    fechaInicio: "",
    fechaFin: "",
    sede: "",
    tipoCarga: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  /* =========================
     Textos dinámicos
  ========================= */
  const dashboardTexts = {
    todos: {
      title: "Últimas publicaciones",
      subtitle:
        "Nuevas oportunidades todos los días: Empresas que ofrecen, empresas que buscan y clientes listos para cerrar.",
    },
    busco: {
      title: "Publicaciones de Búsqueda",
      subtitle:
        "Empresas que buscan carga disponible para completar sus viajes.",
    },
    ofrezco: {
      title: "Publicaciones de Cargas a ofrecer",
      subtitle:
        "Empresas que publican carga disponible.",
    },
    /* clientes: {
      title: "Publicaciones de clientes",
      subtitle:
        "Clientes publicando su mudanza para recibir cotizaciones..",
    }, */
  };

  /* =========================
     Helpers
  ========================= */
  const hasActiveFilters =
    search.trim() !== "" ||
    Object.values(filters).some((value) => value !== "");

  const clearAllFilters = () => {
    setFilters({
      origen: "",
      destino: "",
      volumen: "",
      fechaInicio: "",
      fechaFin: "",
      sede: "",
      tipoCarga: "",
    });

    setSearch("");
    setShowFilters(false);
  };

  /* =========================
     Fetch services
  ========================= */
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams({
      search,
      ...filters,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios?${params}`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((json) => setServices(json.data || []))
      .finally(() => setLoading(false));
  }, [search, filters]);

  const visible =
    filter === "todos"
      ? services
      : services.filter((s) => s.tipo === filter);

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        {/* =========================
            Header
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
          <ServiceFilters onChange={setFilter} />

          {/* Botón filtros avanzados / borrar */}
{/*           <button
            className={`btn-advanced-filters ${hasActiveFilters ? "active" : ""
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
          </button> */}
        </div>

        {/* =========================
            Floating CRUD button
        ========================= */}
        <Button_crud
          value="+"
          onClick={() => (window.location.href = "/empresa/cargas")}
        />

        {/* =========================
            Advanced filters overlay
        ========================= */}
        {/* {showFilters && (
          <div className="filters-overlay">
            <ServiceAdvancedFilters
              values={filters}
              onChange={setFilters}
              onApply={() => setShowFilters(false)}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )} */}

        {/* =========================
            Cards
        ========================= */}
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
                telefono={s.empresa?.tel}
                fecha={new Date(s.created_at).toLocaleDateString()}
                distanciaKm={s.distancia_km}
                importe={s.importe}
              />
            ))}
        </div>
      </main>

      <Footer />
    </>
  );
}