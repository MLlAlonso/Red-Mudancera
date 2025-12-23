"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ServiceFilters from "@/components/filters/ServiceFilters";
import SearchBar from "@/components/common/SearchBar";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";

import useServicios from "@/hooks/useServicios";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function UsuarioDashboard() {
  const [filter, setFilter] = useState("todos");
  const [limit, setLimit] = useState("infinite");

  const {
    servicios,
    loading,
    hasMore,
    loadMore,
  } = useServicios({
    tipo: filter,
    limit,
  });

  useEffect(() => {
    if (limit !== "infinite") return;

    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore, limit]);

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">
            Últimas publicaciones
          </h1>
          <p className="empresa-dashboard__subtitle">
            Servicios disponibles de todas las empresas
          </p>
        </div>

        <div className="empresa-dashboard__controls">
          <ServiceFilters onChange={setFilter} />

          <div className="empresa-dashboard__right">
            {/* <select
              className="limit-select"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="infinite">Scroll infinito</option>
              <option value="12">12</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="120">120</option>
            </select> */}

            <SearchBar />
          </div>
        </div>

        <div className="empresa-dashboard__cards">
          {servicios.map((s) => (
            <ServiceCard
              key={s.id}
              type={s.tipo}
              origen={s.origen}
              destino={s.destino}
              volumen={`${s.volumen} m³`}
              empresa={s.empresa?.nombre ?? "Empresa"}
              fecha={new Date(s.updated_at).toLocaleDateString()}
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
