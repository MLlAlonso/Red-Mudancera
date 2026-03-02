"use client";

import { useEffect, useState } from "react";
import { getEmpresaToken } from "@/utils/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceFilters from "@/components/filters/ServiceFilters";
import Button_crud from "@/components/common/Button_crud";
import ServiceCard from "@/components/cards/ServiceCard";
import SolicitudMudanzaCard from "@/components/cards/SolicitudMudanzaCard";
import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import ConfirmFinalizarServicioModal from "@/components/modals/ConfirmFinalizarServicioModal";
import FinalizarServicioGananciaModal from "@/components/modals/FinalizarServicioGananciaModal";
import ReporteMensualModal from "@/components/modals/ReporteMensualModal";
import { useSearch } from "@/store/searchContext";

import "@/styles/pages/empresa/_empresaDashboard.scss";

export default function MisServiciosEmpresa() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmFinalizar, setShowConfirmFinalizar] = useState(false);
  const [showGananciaModal, setShowGananciaModal] = useState(false);
  const [showReporte, setShowReporte] = useState(false);
  const { search, city } = useSearch(); const [empresa, setEmpresa] = useState(null);

  const cambiarEstadoDirecto = async (id, estado) => {
    try {
      const token = getEmpresaToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ estado }),
        }
      );

      if (!res.ok) throw new Error();
      const json = await res.json();

      setServices((prev) =>
        prev.map((s) => (s.id === json.data.id ? json.data : s))
      );
    } catch {
      alert("No se pudo actualizar el estado");
    }
  };

  useEffect(() => {
    const token = getEmpresaToken();
    if (!token) return;

    setLoading(true);

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/servicios`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(r => r.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/mis-leads`, {
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
      })
        .then(r => r.json())
        .then(setEmpresa),
    ])

      .then(([serviciosRes, leadsRes]) => {

        const servicios = (serviciosRes?.data || []).map(s => ({
          ...s,
          tipo_item: 'servicio'
        }));

        const leads = (leadsRes?.data || []).map(l => ({
          ...l,
          tipo_item: 'lead'
        }));

        const combinado = [...servicios, ...leads]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setServices(combinado);
      })
      .finally(() => setLoading(false));

  }, []);

  const visible = services.filter((s) => {
    if (!search) return true;

    const q = search.toLowerCase();

    return (
      s.empresa?.empresa?.toLowerCase().includes(q) ||
      s.origen?.toLowerCase().includes(q) ||
      s.destino?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Header />

      <main className="empresa-dashboard">
        <div className="empresa-dashboard__header">
          <h1 className="empresa-dashboard__title">Mis publicaciones</h1>
          <p className="empresa-dashboard__subtitle">
            Aquí puedes ver y gestionar todos tus servicios publicados
          </p>
        </div>

        <div className="empresa-dashboard__controls" id="publicaciones">
          <ServiceFilters onChange={setFilter} />

          <button className="btn-outline" onClick={() => setShowReporte(true)} >
            Crear reporte
          </button>
        </div>

        {/* BOTÓN CREAR */}
        <Button_crud
          value="+"
          onClick={() => (window.location.href = "/empresa/cargas")}
        />

        <div className="empresa-dashboard__cards">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}

          {!loading &&
            visible.map((s) => {

              if (s.tipo_item === 'lead') {
                return (
                  <SolicitudMudanzaCard
                    key={`lead-${s.id}`}
                    id={s.id}
                    origen={s.origen}
                    destino={s.destino}
                    fecha={new Date(s.created_at).toLocaleDateString()}
                    telefono={s.telefono}
                    showContact={true}
                    isLead
                    nombreCliente={s.nombre_cliente}
                    tipoVivienda={s.tipo_vivienda}
                    empresaNombre={empresa?.empresa}
                  />
                );
              }

              return (
                <ServiceCard
                  key={s.id}
                  id={s.id}
                  estado={s.estado}
                  type={s.tipo}
                  origen={s.origen}
                  destino={s.destino}
                  volumen={s.volumen ? `${s.volumen} m³` : "No especificado"}
                  empresa={s.empresa?.empresa ?? "Empresa"}
                  fecha={new Date(s.created_at).toLocaleDateString()}
                  showContact={false}
                  onChangeEstado={(id, nuevoEstado) => {
                    setSelectedService(s);

                    if (nuevoEstado === "finalizado") {
                      setShowConfirmFinalizar(true);
                      return;
                    }

                    // asignado → cambio directo
                    cambiarEstadoDirecto(id, nuevoEstado);
                    setSelectedService(null);
                  }}
                />
              );
            })}
        </div>
      </main>

      {/* CONFIRMAR FINALIZAR */}
      <ConfirmFinalizarServicioModal
        open={showConfirmFinalizar}
        onCancel={() => {
          setShowConfirmFinalizar(false);
          setSelectedService(null);
        }}
        onConfirm={() => {
          setShowConfirmFinalizar(false);
          setShowGananciaModal(true);
        }}
      />

      {/* GANANCIA */}
      <FinalizarServicioGananciaModal
        open={showGananciaModal}
        servicio={selectedService}
        onClose={() => {
          setShowGananciaModal(false);
          setSelectedService(null);
        }}
        onSuccess={(updated) => {
          setServices((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          );
        }}
      />

      <ReporteMensualModal
        open={showReporte}
        onClose={() => setShowReporte(false)}
      />

      <Footer />
    </>
  );
}