"use client";

import { useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ServiceFilters from "@/components/filters/ServiceFilters";
import SearchBar from "@/components/common/SearchBar";
import ServiceCard from "@/components/cards/ServiceCard";

import "@/styles/pages/empresa/_empresaDashboard.scss"; // reutilizamos estilos

export default function UsuarioDashboard() {
  // ================================
  //  Data temporal (igual al dashboard de empresa)
  // ================================
  const services = [
    {
      id: 1,
      type: "busco",
      origen: "CDMX",
      destino: "Guadalajara",
      volumen: "12 m³",
      empresa: "Mudanzas López",
      fecha: "05/12/2025",
    },
    {
      id: 2,
      type: "ofrezco",
      origen: "Monterrey",
      destino: "Puebla",
      volumen: "20 m³",
      empresa: "Transporte Ramírez",
      fecha: "06/12/2025",
    },
    {
      id: 3,
      type: "busco",
      origen: "Tijuana",
      destino: "Hermosillo",
      volumen: "8 m³",
      empresa: "Mudanzas del Norte",
      fecha: "06/12/2025",
    },
    {
      id: 4,
      type: "ofrezco",
      origen: "Veracruz",
      destino: "Puebla",
      volumen: "40 m³",
      empresa: "Transporte Alonso",
      fecha: "06/12/2025",
    }
  ];

  // ================================
  //  Estados de filtrado
  // ================================
  const [filter, setFilter] = useState("todos");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // ================================
  //  Filtrado real
  // ================================
  const filteredServices =
    filter === "todos"
      ? services
      : services.filter((s) => s.type === filter);

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        {/* Encabezado */}
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">Últimas publicaciones</h1>
          <p className="empresa-dashboard__subtitle">
            Servicios disponibles de todas las empresas
          </p>
        </div>

        {/* Filtros + Searchbar */}
        <div className="empresa-dashboard__controls">
          <div className="empresa-dashboard__left">
            <ServiceFilters onChange={handleFilterChange} />
          </div>

          <SearchBar />
        </div>

        {/* Cards */}
        <div className="empresa-dashboard__cards">
          {filteredServices.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              type={servicio.type}
              origen={servicio.origen}
              destino={servicio.destino}
              volumen={servicio.volumen}
              empresa={servicio.empresa}
              fecha={servicio.fecha}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
