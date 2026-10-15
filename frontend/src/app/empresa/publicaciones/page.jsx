"use client";

import { useEffect, useState } from "react";
import { getEmpresaToken } from "@/utils/auth";
import { useSearch } from "@/store/searchContext";
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
import ShareClienteReviewLinkModal from "@/components/modals/ShareClienteReviewLinkModal";

import "@/styles/pages/empresa/_empresaPublicaciones.scss";

const ESTADOS_PUBLICACION = [
  {
    id: "activo",
    titulo: "Pendientes",
    descripcion: "Sin gestionar",
    icono: "●",
  },
  {
    id: "asignado",
    titulo: "Asignadas",
    descripcion: "Con vendedor",
    icono: "↗",
  },
  {
    id: "finalizado",
    titulo: "Vendidas",
    descripcion: "Concluidas",
    icono: "✓",
  },
  {
    id: "en_proceso",
    titulo: "Cotizadas",
    descripcion: "Cotización enviada",
    icono: "$",
  },
  {
    id: "sin_respuesta",
    titulo: "Sin respuesta",
    descripcion: "No se logró contactar",
    icono: "…",
  },
  {
    id: "perdido",
    titulo: "Perdidas",
    descripcion: "No se concretaron",
    icono: "×",
  },
];

const DEFAULT_MONTH = "recentes";

const getEstadoPublicacion = (item) => {
  return String(item.estado_operacion || item.estado || "activo")
    .trim()
    .toLowerCase();
};

export default function MisPublicacionesEmpresa() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  // Wizard de estados
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("activo");
  // Filtros existentes
  const [filter, setFilter] = useState("todos");
  const { search } = useSearch();
  // Datos de empresa
  const [empresa, setEmpresa] = useState(null);
  // Filtro de periodo
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Finalizar servicio
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmFinalizar, setShowConfirmFinalizar] = useState(false);
  const [showGananciaModal, setShowGananciaModal] = useState(false);
  // Reportes
  const [showReporte, setShowReporte] = useState(false);
  // Reseñas
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewLink, setReviewLink] = useState("");
  // Ocultar solicitudes y servicios
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  /**
   * Actualiza el estado de un servicio o lead.
   */
  const cambiarEstadoDirecto = async (id, estado, tipo) => {
    const token = getEmpresaToken();
    const endpoint = tipo === "lead" ? `/solicitudes-mudanza/leads/${id}/estado` : `/servicios/${id}/estado`;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ estado }),
        }
      );

      if (!res.ok) {
        alert("No se pudo actualizar el estado.");
        return;
      }

      const json = await res.json();

      setServices((prev) => prev.map((item) => item.id === json.data.id && item.tipo_item
        === (tipo === "lead" ? "lead" : "servicio") ? { ...item, ...json.data } : item));
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("Ocurrió un error al actualizar el estado.");
    }
  };

  /**
   * Oculta un lead de la actividad de la empresa.
   */
  const ocultarLead = async () => {
    const token = getEmpresaToken();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${selectedLeadId}/ocultar`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert("No se pudo ocultar la solicitud.");
        return;
      }

      setServices((prev) => prev.filter((item) => !(item.tipo_item === "lead" && item.id === selectedLeadId))
      );

      setShowDeleteModal(false);
      setSelectedLeadId(null);
    } catch (error) {
      console.error("Error al ocultar la solicitud:", error);
      alert("Ocurrió un error al ocultar la solicitud.");
    }
  };

  /**
   * Finaliza un servicio y lo retira de esta lista, conservando el comportamiento actual de la aplicación.
   */
  const ocultarServicio = async () => {
    const token = getEmpresaToken();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/servicios/${selectedServiceId}/estado`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            estado: "finalizado",
          }),
        }
      );

      if (!res.ok) {
        alert("No se pudo finalizar el servicio.");
        return;
      }

      const json = await res.json();

      setServices((prev) => prev.map((item) => item.tipo_item === "servicio" && item.id === selectedServiceId ?
        { ...item, ...(json.data || {}), estado: "finalizado", } : item));

      setShowDeleteServiceModal(false);
      setSelectedServiceId(null);
    } catch (error) {
      console.error("Error al finalizar el servicio:", error);
      alert("Ocurrió un error al finalizar el servicio.");
    }
  };

  /**
   * Carga los servicios, los leads y los datos de la empresa.
   */
  useEffect(() => {
    const token = getEmpresaToken();

    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchServicios = async (month) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/servicios?month=${month}&year=${selectedYear}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("No se pudieron cargar los servicios.");
      }

      return res.json();
    };

    const fetchLeads = async (month) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/mis-leads?month=${month}&year=${selectedYear}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("No se pudieron cargar las solicitudes.");
      }

      return res.json();
    };

    const cargar = async () => {
      setLoading(true);

      try {
        const fechaActual = new Date();
        let meses = [];

        if (selectedMonth === DEFAULT_MONTH) {
          const actual = fechaActual.getMonth() + 1;
          const anterior = actual === 1 ? 12 : actual - 1;
          meses = [actual, anterior];
        } else {
          meses = [selectedMonth];
        }

        const servicios = [];
        const leads = [];

        for (const mes of meses) {
          const [serviciosRes, leadsRes] = await Promise.all([fetchServicios(mes), fetchLeads(mes),]);
          servicios.push(...(serviciosRes?.data || []).map((item) => ({ ...item, tipo_item: "servicio", })));
          leads.push(...(leadsRes?.data || []).map((item) => ({ ...item, tipo_item: "lead", })));
        }

        const empresaRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!empresaRes.ok) {
          throw new Error("No se pudieron cargar los datos de la empresa.");
        }

        const empresaData = await empresaRes.json();
        const estadoOrder = { activo: 1, asignado: 2, finalizado: 3, };

        const combinado = [...servicios, ...leads].sort((a, b) => {
          const estadoA = estadoOrder[getEstadoPublicacion(a)] ?? 99;
          const estadoB = estadoOrder[getEstadoPublicacion(b)] ?? 99;

          if (estadoA !== estadoB) {
            return estadoA - estadoB;
          }

          return new Date(b.created_at) - new Date(a.created_at);
        });

        if (!cancelled) {
          setEmpresa(empresaData);
          setServices(combinado);
        }
      } catch (error) {
        console.error("Error al cargar las publicaciones:", error);

        if (!cancelled) {
          setServices([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    cargar();
    return () => {
      cancelled = true;
    };
  }, [selectedMonth, selectedYear]);

  /**
   * Primero aplicamos los filtros complementarios, Después el wizard filtra por estado.
   */
  const publicacionesFiltradas = services
    .filter((item) => {
      if (filter === "todos") return true;

      if (filter === "cliente") {
        return item.tipo_item === "lead";
      }

      if (filter === "busco" || filter === "ofrezco") {
        return (item.tipo_item === "servicio" && item.tipo === filter);
      }

      return true;
    })
    .filter((item) => {
      if (!search?.trim()) return true;
      const query = search.trim().toLowerCase();

      return (
        item.empresa?.empresa?.toLowerCase().includes(query) ||
        item.origen?.toLowerCase().includes(query) ||
        item.destino?.toLowerCase().includes(query) ||
        item.nombre?.toLowerCase().includes(query) ||
        item.telefono?.toLowerCase().includes(query)
      );
    });

  // Los contadores reflejan el resultado de los filtros complementarios.
  const conteos = ESTADOS_PUBLICACION.reduce((resultado, estado) => {
    resultado[estado.id] = publicacionesFiltradas.filter((item) => getEstadoPublicacion(item) === estado.id).length;
    return resultado;
  }, {});

  const publicacionesVisibles = publicacionesFiltradas.filter((item) => getEstadoPublicacion(item) === estadoSeleccionado);

  const cambiarPeriodo = (value) => {
    setSelectedMonth(value === DEFAULT_MONTH ? DEFAULT_MONTH : Number(value));
  };

  const abrirFinalizacion = (item) => {
    setSelectedService(item);
    setShowConfirmFinalizar(true);
  };

  const cancelarFinalizacion = () => {
    setShowConfirmFinalizar(false);
    setSelectedService(null);
  };

  const abrirEliminarLead = (id) => {
    setSelectedLeadId(id);
    setShowDeleteModal(true);
  };

  const abrirFinalizarServicio = (id) => {
    setSelectedServiceId(id);
    setShowDeleteServiceModal(true);
  };

  const cerrarEliminarLead = () => {
    setShowDeleteModal(false);
    setSelectedLeadId(null);
  };

  const cerrarFinalizarServicio = () => {
    setShowDeleteServiceModal(false);
    setSelectedServiceId(null);
  };

  return (
    <>
      <Header />

      <main className="empresa-publicaciones">
        {/* Encabezado */}
        <header className="empresa-publicaciones__header">
          <div className="empresa-publicaciones__heading">
            <h1 className="empresa-publicaciones__title">
              Mi Actividad
            </h1>

            <p className="empresa-publicaciones__subtitle">
              Aquí puedes ver y gestionar tus cargas y contactos comprados
            </p>
          </div>

          <div className="empresa-publicaciones__header-actions">
            <button type="button" className="empresa-publicaciones__report-button" onClick={() => setShowReporte(true)}  >
              <span aria-hidden="true">▤</span>
              Crear reporte
            </button>
          </div>
        </header>

        {/* Filtros y herramientas */}
        <section className="publicaciones-toolbar" aria-label="Filtros de publicaciones" >
          <div className="publicaciones-toolbar__filters">
            <div className="publicaciones-toolbar__filter-group">
              <span className="publicaciones-toolbar__label">
                Tipo de publicación
              </span>

              <ServiceFilters onChange={setFilter} />
            </div>

            <div className="publicaciones-toolbar__period">
              <label className="publicaciones-toolbar__field" htmlFor="publicaciones-month" >
                <span>Periodo</span>

                <select id="publicaciones-month" value={selectedMonth} onChange={(event) => cambiarPeriodo(event.target.value)} >
                  <option value={DEFAULT_MONTH}>Último bimestre</option>
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
              </label>

              <label className="publicaciones-toolbar__field" htmlFor="publicaciones-year" >
                <span>Año</span>

                <select id="publicaciones-year" value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value))} >
                  {[2026, 2027, 2028, 2029, 2030].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="publicaciones-toolbar__actions">
            <Button_crud value="+" onClick={() => { window.location.href = "/empresa/cargas"; }} />
          </div>
        </section>

        {/* Navegación wizard */}
        <section className="publicaciones-wizard" aria-label="Estados de las publicaciones" >
          <div className="publicaciones-wizard__intro">
            <div>
              <h2 className="publicaciones-wizard__title">
                Tu actividad
              </h2>

              <p className="publicaciones-wizard__description">
                Selecciona una etapa para consultar sus publicaciones.
              </p>
            </div>

            <span className="publicaciones-wizard__total">
              {publicacionesFiltradas.length}{" "}
              {publicacionesFiltradas.length === 1 ? "publicación" : "publicaciones"}
            </span>
          </div>

          <div className="publicaciones-wizard__steps">
            {ESTADOS_PUBLICACION.map((estado, index) => {
              const activo = estadoSeleccionado === estado.id;

              return (
                <button
                  key={estado.id}
                  type="button"
                  className={["publicaciones-wizard__step", `publicaciones-wizard__step--${estado.id}`, activo ? "publicaciones-wizard__step--selected" : "",].filter(Boolean).join(" ")}
                  aria-pressed={activo}
                  onClick={() => setEstadoSeleccionado(estado.id)}
                >
                  <span className="publicaciones-wizard__step-top">
                    <span className="publicaciones-wizard__step-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="publicaciones-wizard__step-icon" aria-hidden="true" >
                      {estado.icono}
                    </span>
                  </span>

                  <span className="publicaciones-wizard__step-name">
                    {estado.titulo}
                  </span>

                  <span className="publicaciones-wizard__step-description">
                    {estado.descripcion}
                  </span>

                  <span className="publicaciones-wizard__step-bottom">
                    <span className="publicaciones-wizard__step-count">
                      {conteos[estado.id]}
                    </span>

                    <span className="publicaciones-wizard__step-link">
                      {activo ? "Seleccionada" : "Ver publicaciones"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Resultados */}
        <section className="publicaciones-resultados" aria-live="polite" aria-busy={loading} >
          <div className="publicaciones-resultados__heading">
            <div>
              <h2 className="publicaciones-resultados__title">
                {ESTADOS_PUBLICACION.find((estado) => estado.id === estadoSeleccionado)?.titulo}
              </h2>

              <p className="publicaciones-resultados__subtitle">
                {ESTADOS_PUBLICACION.find((estado) => estado.id === estadoSeleccionado)?.descripcion}
              </p>
            </div>

            <span className="publicaciones-resultados__count">
              {conteos[estadoSeleccionado]}{" "}
              {conteos[estadoSeleccionado] === 1 ? "resultado" : "resultados"}
            </span>
          </div>

          <div className="empresa-publicaciones__cards">
            {loading && Array.from({ length: 6 }).map((_, index) => (<ServiceCardSkeleton key={`skeleton-${index}`} />))}

            {!loading && publicacionesVisibles.map((item) => {
              if (item.tipo_item === "lead") {
                return (
                  <SolicitudMudanzaCard
                    key={`lead-${item.id}`}
                    id={item.id}
                    origen={item.origen}
                    destino={item.destino}
                    fechaRecoleccion={item.fecha_recoleccion}
                    inventario={item.inventario}
                    tipoMudanza={item.tipo_mudanza}
                    fecha={item.created_at ? new Date(item.created_at).toLocaleDateString("es-MX") : "Sin fecha"}
                    telefono={item.telefono}
                    isLead={true}
                    showContact={false}
                    estado={getEstadoPublicacion(item)}
                    nombreCliente={item.nombre}
                    tipoVivienda={item.tipo_vivienda}
                    empresaNombre={empresa?.empresa}
                    showDelete={true}
                    showNotes={true}
                    onDelete={() => abrirEliminarLead(item.id)}
                    onChangeEstado={(id, nuevoEstado) => {
                      if (nuevoEstado === "finalizado") {
                        abrirFinalizacion({ ...item, tipo_item: "lead", });
                        return;
                      }
                      cambiarEstadoDirecto(id, nuevoEstado, "lead");
                    }}
                  />
                );
              }

              return (
                <ServiceCard
                  key={`servicio-${item.id}`}
                  id={item.id}
                  estado={getEstadoPublicacion(item)}
                  type={item.tipo}
                  origen={item.origen}
                  destino={item.destino}
                  volumen={item.volumen ? `${item.volumen} m³` : "No especificado"}
                  tipoCarga={item.tipo_carga}
                  tipoVehiculo={item.tipo_vehiculo}
                  empresa={item.empresa?.empresa ?? "Empresa"}
                  fecha={item.created_at ? new Date(item.created_at).toLocaleDateString("es-MX") : "Sin fecha"}
                  showContact={false}
                  showDelete={true}
                  onDelete={() => abrirFinalizarServicio(item.id)}
                  onChangeEstado={(id, nuevoEstado) => {
                    if (nuevoEstado === "finalizado") {
                      abrirFinalizacion({ ...item, tipo_item: "servicio", });
                      return;
                    }
                    cambiarEstadoDirecto(id, nuevoEstado, "servicio");
                  }}
                />
              );
            })}
          </div>

          {!loading && publicacionesVisibles.length === 0 && (
            <div className="publicaciones-empty">
              <div className="publicaciones-empty__icon" aria-hidden="true">
                {estadoSeleccionado === "activo" && "○"}
                {estadoSeleccionado === "asignado" && "↗"}
                {estadoSeleccionado === "finalizado" && "✓"}
              </div>

              <h3 className="publicaciones-empty__title">
                No hay publicaciones en este estado
              </h3>

              <p className="publicaciones-empty__description">
                No encontramos publicaciones que coincidan con el estado y
                los filtros seleccionados. Prueba con otro periodo o tipo de
                publicación.
              </p>

              <button type="button" className="publicaciones-empty__button" onClick={() => { setFilter("todos"); setSelectedMonth(DEFAULT_MONTH); setSelectedYear(new Date().getFullYear()); }} >
                Restablecer filtros
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Confirmación de finalización */}
      <ConfirmFinalizarServicioModal open={showConfirmFinalizar} onCancel={cancelarFinalizacion} onConfirm={() => { setShowConfirmFinalizar(false); setShowGananciaModal(true); }} />

      {/* Ganancia y generación de enlace de reseña */}
      <FinalizarServicioGananciaModal
        open={showGananciaModal}
        servicio={selectedService}
        onClose={() => { setShowGananciaModal(false); setSelectedService(null); }}
        onSuccess={async (updated) => {
          setServices((prev) => prev.map((item) => item.id === updated.id && item.tipo_item === (selectedService?.tipo_item || "servicio")
            ? { ...item, ...updated, estado: updated.estado || "finalizado", } : item));
          setShowGananciaModal(false);
          setSelectedService(null);

          try {
            const token = getEmpresaToken();

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/empresa/resenas/link`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await res.json();

            if (res.ok && data?.url) {
              setReviewLink(data.url);
              setShowReviewModal(true);
            }
          } catch (error) {
            console.error("Error generando link de reseña:", error);
          }
        }}
      />

      {/* Reporte mensual */}
      <ReporteMensualModal open={showReporte} onClose={() => setShowReporte(false)} />

      {/* Compartir reseña */}
      <ShareClienteReviewLinkModal open={showReviewModal} link={reviewLink} onClose={() => { setShowReviewModal(false); setReviewLink(""); }} />

      {/* Ocultar solicitud */}
      <ConfirmDeleteModal
        open={showDeleteModal}
        title="Eliminar solicitud"
        message="Esta solicitud dejará de mostrarse en Mi Actividad."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={cerrarEliminarLead}
        onConfirm={ocultarLead}
      />

      {/* Finalizar y retirar servicio de la lista */}
      <ConfirmDeleteModal
        open={showDeleteServiceModal}
        title="Finalizar servicio"
        message="El servicio será marcado como finalizado y dejará de mostrarse en Mi Actividad."
        confirmText="Finalizar"
        cancelText="Cancelar"
        onCancel={cerrarFinalizarServicio}
        onConfirm={ocultarServicio}
      />

      <Footer />
    </>
  );
}