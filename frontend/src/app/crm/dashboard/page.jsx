"use client";

import { useEffect, useState } from "react";
import SolicitudMudanzaCard from "@/components/cards/SolicitudMudanzaCard";
import { getCRMDashboard } from "@/services/crmAuth";
import { getCRMToken } from "@/utils/crmAuth";
import "@/styles/crm/_crmDashboard.scss";

export default function CRMDashboardPage() {
  const now = new Date();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  useEffect(() => {
    loadDashboard();
  }, [selectedMonth, selectedYear]);

  async function loadDashboard() {
    setLoading(true);

    try {
      const data = await getCRMDashboard(selectedMonth, selectedYear);
      setDashboard(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function cambiarEstado(id, estado) {
    const token = getCRMToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${id}/estado`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado, }),
    }
    );

    if (!res.ok) {
      alert("No se pudo actualizar.");
      return;
    }

    const json = await res.json();

    setDashboard(prev => ({
      ...prev,
      contactos:
        prev.contactos.map(contacto => contacto.id === id
          ? { ...contacto, ...json.data, }
          : contacto
        )
    }));
  }

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="crm-dashboard">
      <div className="crm-dashboard__header">
        <div>
          <h1> Dashboard CRM </h1>
          <p> Gestión de clientes provenientes de Mudanza Fácil. </p>
        </div>

        <div className="crm-dashboard__filters">
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} >
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

              setSelectedYear(

                Number(e.target.value)

              )

            }

          >

            {[2025, 2026, 2027, 2028].map(y => (

              <option

                key={y}

                value={y}

              >

                {y}

              </option>

            ))}

          </select>

        </div>
      </div>

      <div className="crm-dashboard__stats">
        <div className="crm-stat-card">
          <div className="crm-stat-card__icon">
            <img src="/icons/cliente.png" alt="contactos" />
          </div>

          <div>
            <span> Total contactos </span>

            <h2> {dashboard.stats.total_contactos} </h2>
          </div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-card__icon">
            <img src="/icons/reloj.png" alt="Activos" />
          </div>

          <div>
            <span> Activos  </span>
            <h2> {dashboard.stats.activos} </h2>
          </div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-card__icon">
            <img src="/icons/telefono.png" alt="" />
          </div>

          <div>
            <span>Contactados</span>
            <h2>{dashboard.stats.contactados}</h2>
          </div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-card__icon">
            <img src="/icons/todos.png" alt="" />
          </div>

          <div>
            <span> Finalizados </span>
            <h2> {dashboard.stats.finalizados} </h2>
          </div>
        </div>
      </div>

      <section className="crm-section">
        <div className="crm-section__header">
          <div>
            <h2> Contactos de Mudanza Fácil </h2>

            <p> Administra los clientes adquiridos desde la plataforma. </p>
          </div>

        </div>

        <div className="crm-dashboard__cards">
          {
            dashboard.contactos.map(
              contacto => (
                <SolicitudMudanzaCard
                  key={contacto.id}
                  id={contacto.id}
                  origen={contacto.origen}
                  destino={contacto.destino}
                  telefono={contacto.telefono}
                  nombreCliente={contacto.nombre}
                  tipoVivienda={contacto.tipo_vivienda}
                  inventario={contacto.inventario}
                  tipoMudanza={contacto.tipo_mudanza}
                  fechaRecoleccion={contacto.fecha_recoleccion}
                  fecha={new Date(contacto.created_at).toLocaleDateString()}
                  estado={contacto.estado_operacion}
                  isLead
                  showContact={false}
                  onChangeEstado={cambiarEstado}
                />
              )
            )
          }
        </div>
      </section>
    </div>
  );
}