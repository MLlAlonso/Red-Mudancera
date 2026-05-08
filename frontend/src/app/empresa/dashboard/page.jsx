"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceFilters from "@/components/filters/ServiceFilters";
import Button_crud from "@/components/common/Button_crud";
import ServiceCard from "@/components/cards/ServiceCard";
import SolicitudMudanzaCard from "@/components/cards/SolicitudMudanzaCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import { useSearch } from "@/store/searchContext";
import { getEmpresaToken } from "@/utils/auth";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function EmpresaDashboard() {
  const { search, setSearch } = useSearch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [empresa, setEmpresa] = useState(null);

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
      title: "Actividad reciente",
      subtitle:
        "Publicaciones recientes de carga y contactos de mudanza.",
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
    cliente: {
      title: "Contactos de Clientes",
      subtitle:
        "Contactos de mudanza, cargas publicadas en la red.",
    },
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
    Fetch solicitudes
 ========================= */
  useEffect(() => {
    const token = getEmpresaToken();
    if (!token) return;

    setLoading(true);

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/feed`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(r => r.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(r => r.json())
    ])
      .then(([feed, empresaData]) => {
        setServices(feed.data || []);
        setEmpresa(empresaData);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleServicios = services
    .filter((s) => {
      if (filter === "todos") return true;

      if (filter === "cliente") {
        return s.tipo_item === "solicitud";
      }

      if (filter === "busco" || filter === "ofrezco") {
        return (
          s.tipo_item === "servicio" &&
          s.subtipo === filter
        );
      }

      return true;
    })
    .filter((s) => {
      if (!search) return true;

      const q = search.toLowerCase();

      return (
        s.empresa?.toLowerCase().includes(q) ||
        s.origen?.toLowerCase().includes(q) ||
        s.destino?.toLowerCase().includes(q)
      );
    });

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

          {!loading && (
            <>
              {visibleServicios.map((item) => {
                if (item.tipo_item === "servicio") {
                  return (
                    <ServiceCard
                      key={`serv-${item.id}`}
                      id={item.id}
                      type={item.subtipo}
                      origen={item.origen}
                      destino={item.destino}
                      volumen={item.volumen ? `${item.volumen} m³` : "No especificado"}
                      tipoCarga={item.tipoCarga}
                      tipoVehiculo={item.tipoVehiculo}
                      empresa={item.empresa}
                      telefono={item.telefono}
                      fecha={new Date(item.created_at).toLocaleDateString()}
                      distanciaKm={item.distancia_km}
                      importe={item.importe}
                    />
                  );
                }

                if (item.tipo_item === "solicitud") {
                  return (
                    <SolicitudMudanzaCard
                      key={`sol-${item.id}`}
                      id={item.id}
                      origen={item.origen}
                      destino={item.destino}
                      fechaRecoleccion={item.fecha_recoleccion}
                      distanciaKm={item.distancia_km}
                      tipoMudanza={item.tipo_mudanza}
                      inventario={item.inventario}
                      fecha={new Date(item.created_at).toLocaleDateString()}
                      isLead={item.ya_comprado}
                      telefono={item.telefono}
                      nombreCliente={item.nombre_cliente}
                      tipoVivienda={item.tipo_vivienda}
                      empresaNombre={empresa?.empresa}
                      empresaId={empresa?.id}
                    />
                  );
                }
              })}
            </>
          )}

        </div>


      </main>

      <Footer />
    </>
  );
}