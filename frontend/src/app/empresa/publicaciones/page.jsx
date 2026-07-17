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
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import FloatingNoteButton from "@/components/common/FloatingNoteButton";
import EmpresaNotesModal from "@/components/modals/EmpresaNotesModal";
import { useSearch } from "@/store/searchContext";
import ShareClienteReviewLinkModal from "@/components/modals/ShareClienteReviewLinkModal";

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
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewLink, setReviewLink] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const now = new Date();

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const cambiarEstadoDirecto = async (id, estado, tipo) => {
    const token = getEmpresaToken();

    const endpoint =
      tipo === "lead"
        ? `/solicitudes-mudanza/leads/${id}/estado`
        : `/servicios/${id}/estado`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      }
    );

    if (!res.ok) {
      alert("No se pudo actualizar el estado");
      return;
    }

    const json = await res.json();

    setServices((prev) =>
      prev.map((s) =>
        s.id === json.data.id ? { ...s, ...json.data } : s
      )
    );
  };

  const ocultarLead = async () => {
    const token = getEmpresaToken();

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${selectedLeadId}/ocultar`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setServices((prev) =>
      prev.filter(
        (s) =>
          !(s.tipo_item === "lead" && s.id === selectedLeadId)
      )
    );

    setShowDeleteModal(false);
    setSelectedLeadId(null);
  };

  const ocultarServicio = async () => {
    const token = getEmpresaToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servicios/${selectedServiceId}/estado`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          estado: "finalizado",
        }),
      }
    );

    if (!res.ok) {
      alert("No se pudo finalizar el servicio");
      return;
    }

    setServices((prev) =>
      prev.filter(
        (s) =>
          !(
            s.tipo_item === "servicio" &&
            s.id === selectedServiceId
          )
      )
    );

    setShowDeleteServiceModal(false);
    setSelectedServiceId(null);
  };

  useEffect(() => {
    const token = getEmpresaToken();
    if (!token) return;

    setLoading(true);

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/servicios?month=${selectedMonth}&year=${selectedYear}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(r => r.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/mis-leads?month=${selectedMonth}&year=${selectedYear}`, {
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

        const estadoOrder = {
          activo: 1,
          asignado: 2,
          finalizado: 3,
        };

        const combinado = [...servicios, ...leads]
          .sort((a, b) => {
            const estadoA = estadoOrder[a.estado_operacion || a.estado] || 99;
            const estadoB = estadoOrder[b.estado_operacion || b.estado] || 99;

            // primero por estado
            if (estadoA !== estadoB) {
              return estadoA - estadoB;
            }

            // luego por fecha
            return new Date(b.created_at) - new Date(a.created_at);
          });


        setServices(combinado);
      })
      .finally(() => setLoading(false));

  }, [selectedMonth, selectedYear]);

  const visible = services
    .filter((s) => {
      if (filter === "todos") return true;

      if (filter === "cliente") {
        return s.tipo_item === "lead";
      }

      if (filter === "busco" || filter === "ofrezco") {
        return (
          s.tipo_item === "servicio" &&
          s.tipo === filter
        );
      }

      return true;
    })
    .filter((s) => {
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
          <h1 className="empresa-dashboard__title">Mi Actividad</h1>
          <p className="empresa-dashboard__subtitle">
            Aquí puedes ver y gestionar tus cargas y contactos comprados
          </p>
        </div>

        <div className="empresa-dashboard__controls" id="publicaciones">
          <ServiceFilters onChange={setFilter} />

          <div className="actividad-filter">
            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(Number(e.target.value))
              }
            >
              <option value={1}>Enero</option>
              <option value={2}>Febrero</option>
              <option value={3}>Marzo</option>
              <option value={4}>Abril</option>
              <option value={5}>Mayo</option>
              <option value={6}>Junio</option>
              <option value={7}>Julio</option>
              <option value={8}>Agosto</option>
              <option value={9}>Septiembre</option>
              <option value={10}>Octubre</option>
              <option value={11}>Noviembre</option>
              <option value={12}>Diciembre</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(Number(e.target.value))
              }
            >
              {[2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-outline" id="reporte" onClick={() => setShowReporte(true)} >
            Crear reporte
          </button>
        </div>

        {/* BOTÓN CREAR */}
        <Button_crud value="+" onClick={() => (window.location.href = "/empresa/cargas")} />
        <FloatingNoteButton onClick={() => setShowNotes(true)} />

        <div className="empresa-dashboard__cards">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}

          {!loading &&
            visible.map((s) => {
              if (s.tipo_item === "lead") {
                const estadoLead = s.estado_operacion || "activo";

                return (
                  <SolicitudMudanzaCard
                    key={`lead-${s.id}`}
                    id={s.id}
                    origen={s.origen}
                    destino={s.destino}
                    fechaRecoleccion={s.fecha_recoleccion}
                    inventario={s.inventario}
                    tipoMudanza={s.tipo_mudanza}
                    fecha={new Date(s.created_at).toLocaleDateString()}
                    telefono={s.telefono}
                    isLead={true}
                    showContact={false}
                    estado={estadoLead}
                    nombreCliente={s.nombre}
                    tipoVivienda={s.tipo_vivienda}
                    empresaNombre={empresa?.empresa}
                    showDelete={true}
                    onDelete={() => {
                      setSelectedLeadId(s.id);
                      setShowDeleteModal(true);
                    }}
                    onChangeEstado={(id, nuevoEstado) => {
                      setSelectedService({ ...s, tipo_item: "lead" });

                      if (nuevoEstado === "finalizado") {
                        setShowConfirmFinalizar(true);
                        return;
                      }

                      cambiarEstadoDirecto(id, nuevoEstado, "lead");
                      setSelectedService(null);
                    }}
                  />
                );
              }

              return (
                <ServiceCard
                  key={`servicio-${s.id}`}
                  id={s.id}
                  estado={s.estado}
                  type={s.tipo}
                  origen={s.origen}
                  destino={s.destino}
                  volumen={s.volumen ? `${s.volumen} m³` : "No especificado"}
                  tipoCarga={s.tipo_carga}
                  tipoVehiculo={s.tipo_vehiculo}
                  empresa={s.empresa?.empresa ?? "Empresa"}
                  fecha={new Date(s.created_at).toLocaleDateString()}
                  showContact={false}
                  showDelete={true}
                  onDelete={() => {
                    setSelectedServiceId(s.id);
                    setShowDeleteServiceModal(true);
                  }}
                  onChangeEstado={(id, nuevoEstado) => {
                    setSelectedService(s);
                    if (nuevoEstado === "finalizado") {
                      setShowConfirmFinalizar(true);
                      return;
                    }
                    cambiarEstadoDirecto(id, nuevoEstado, "servicio");
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
        onSuccess={async (updated) => {
          setServices((prev) =>
            prev.map((s) =>
              s.id === updated.id
                ? { ...s, ...updated }
                : s
            )
          );

          try {
            const token = getEmpresaToken();
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/empresa/resenas/link`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await res.json();
            if (data?.url) {
              setReviewLink(data.url);
              setShowReviewModal(true);
            }

          } catch (err) {
            console.error("Error generando link de reseña");
          }

        }}
      />

      <ReporteMensualModal open={showReporte} onClose={() => setShowReporte(false)} />

      <ShareClienteReviewLinkModal
        open={showReviewModal}
        link={reviewLink}
        onClose={() => {
          setShowReviewModal(false);
          setReviewLink("");
        }}
      />

      <ConfirmDeleteModal
        open={showDeleteModal}
        title="Eliminar solicitud"
        message="Esta solicitud dejará de mostrarse en Mi Actividad."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedLeadId(null);
        }}
        onConfirm={ocultarLead}
      />

      <ConfirmDeleteModal
        open={showDeleteServiceModal}
        title="Finalizar servicio"
        message="El servicio será marcado como finalizado y dejará de mostrarse en Mi Actividad."
        confirmText="Finalizar"
        cancelText="Cancelar"
        onCancel={() => {
          setShowDeleteServiceModal(false);
          setSelectedServiceId(null);
        }}
        onConfirm={ocultarServicio}
      />

      <EmpresaNotesModal open={showNotes} onClose={() => setShowNotes(false)} />

      <Footer />
    </>
  );
}