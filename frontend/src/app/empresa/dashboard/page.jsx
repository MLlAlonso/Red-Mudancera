"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ServiceFilters from "@/components/filters/ServiceFilters";
import Button_crud from "@/components/common/Button_crud";
import SearchBar from "@/components/common/SearchBar";
import ServiceCard from "@/components/cards/ServiceCard";

import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function EmpresaDashboard() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/servicios`,
          { headers: { Accept: "application/json" } }
        );

        const json = await res.json();
        setServices(json.data || []);
      } catch (err) {
        console.error("Error cargando servicios", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const filteredServices =
    filter === "todos"
      ? services
      : services.filter((s) => s.tipo === filter);

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">Últimas publicaciones</h1>
          <p className="empresa-dashboard__subtitle">
            Servicios recientemente publicados
          </p>
        </div>

        <div className="empresa-dashboard__controls">
          <div className="empresa-dashboard__left">
            <ServiceFilters onChange={setFilter} />

            <Button_crud
              value="Agregar"
              onClick={() =>
                (window.location.href = "../empresa/cargas")
              }
            />
          </div>

          <SearchBar />
        </div>

        <div className="empresa-dashboard__cards">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}

          {!loading &&
            filteredServices.map((servicio) => (
              <ServiceCard
                key={servicio.id}
                id={servicio.id}   // 🔥 ESTE ERA EL PUTO FALTANTE
                type={servicio.tipo}
                origen={servicio.origen}
                destino={servicio.destino}
                volumen={
                  servicio.volumen
                    ? `${servicio.volumen} m³`
                    : "No especificado"
                }
                empresa={servicio.empresa?.empresa ?? "Empresa"}
                fecha={new Date(servicio.created_at).toLocaleDateString()}
              />
            ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
