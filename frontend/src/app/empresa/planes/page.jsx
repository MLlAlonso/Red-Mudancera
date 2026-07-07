"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BaseModal from "@/components/modals/BaseModal";
import TrialRequestModal from "@/components/modals/TrialRequestModal";
import PlanRequiredModal from "@/components/modals/PlanRequiredModal";

import "@/styles/pages/empresa/_empresaPlanes.scss";

export default function PlanesPage() {
  const [loading, setLoading] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openTrial = params.get("trial");

    if (openTrial === "true") {
      setConfirm({ plan: "trial" });
      window.history.replaceState({}, "", "/empresa/planes?trial=true");
    }
  }, []);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();

        setVerificado(data.verificado ?? false);

      } catch (error) {
        console.error("Error obteniendo empresa", error);
      }
    };

    fetchEmpresa();
  }, []);

  // config del modal
  const [config, setConfig] = useState({
    tipo: "mensual",
    recurrente: true,
  });

  const getToken = () =>
    document.cookie.match(/token_empresa=([^;]+)/)?.[1];

  // PRECIOS CENTRALIZADOS
  const precios = {
    conector: {
      mensual: 649,
      mensual_auto: 616,
      anual: 6599,
    },
    radar: {
      mensual: 899,
      mensual_auto: 854,
      anual: 9199,
    },
  };

  // LÓGICA DE PRECIO
  const getPrecio = (plan, config) => {
    const p = precios[plan];
    if (!p) return "";

    if (config.tipo === "anual") {
      return `$${p.anual.toLocaleString()} / año`;
    }

    if (config.recurrente) {
      return `$${p.mensual_auto.toLocaleString()} / mes`;
    }

    return `$${p.mensual.toLocaleString()} / mes`;
  };

  // CAMBIO DE PLAN
  const cambiarPlan = async () => {
    const token = getToken();
    setLoading(confirm.plan);

    try {
      console.log("CONFIG ACTUAL:", config);

      // SOLO manual mensual usa backend directo
      const esManualMensual =
        config.tipo === "mensual" && config.recurrente === false;

      if (esManualMensual) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresa/plan/cambiar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              plan: confirm.plan,
              tipo: "mensual",
              recurrente: false,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error");
          setLoading(null);
          return;
        }

        window.location.reload();
        return;
      }

      console.log("👉 FLOW: STRIPE");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan: confirm.plan,
            tipo: config.tipo,
            recurrente: config.recurrente
          }),
        }
      );

      const data = await res.json();

      console.log("STRIPE RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Error creando sesión");
        setLoading(null);
        return;
      }

      if (!data.url) {
        alert("Stripe no devolvió URL");
        setLoading(null);
        return;
      }

      // REDIRECCIÓN REAL
      window.location.href = data.url;

    } catch (error) {
      console.error(error);
      alert("Error de conexión");
      setLoading(null);
    }
  };

  // ABRIR MODAL
  const abrirModal = (plan) => {

    // trial SIEMPRE permitido
    if (plan === "trial") {
      setConfirm({ plan });
      return;
    }

    // empresa NO verificada
    if (!verificado) {
      setVerificationModal(true);
      return;
    }

    // modal normal de planes
    setConfirm({ plan });

    setConfig({
      tipo: "mensual",
      recurrente: true,
    });
  };

  return (
    <>
      <Header />

      <main className="planes">
        <h1 className="planes__title">
          Elige cómo quieres participar en la red
        </h1>

        <p className="planes__subtitle">
          Empieza gratis o activa tu cuenta para recibir y aprovechar oportunidades reales de mudanza.
        </p>

        <div className="planes__grid">
          {/* CONECTOR */}
          <div className="plan-card plan-card--azul">
            <div className="top-badge">Más popular</div>

            <h2 className="plan-title">
              <img src="/icons/conectar.png" alt="Conector" />
              <span>Conector</span>
            </h2>

            <p className="plan_microCopy">Empieza a generar oportunidades dentro de la red</p>

            <div className="price">
              $649/mes
              <p className="price_year">
                <span className="year">o $6,599/año</span>
                <span className="badge">-15%</span>
              </p>
            </div>

            <button
              onClick={() => abrirModal("conector")}
              disabled={loading === "conector"}
            >
              {loading === "conector" ? "Procesando..." : "Empezar"}
            </button>

            <div className="divider"></div>

            <ul>
              <li><span>✔</span> 20 publicaciones al mes</li>
              <li><span>✔</span> Comprar contactos</li>
              <li><span>✔</span> Radar en 2 ciudades</li>
              <li><span>✔</span> Alertas limitadas</li>
            </ul>

            <div className="divider"></div>

            <p className="recurring">
              Cargo recurrente Mens:
              <strong>$616 <span>/mes</span></strong>
              <span>-5% descuento automático</span>
            </p>
          </div>

          {/* RADAR */}
          <div className="plan-card plan-card--morado">
            <h2 className="plan-title">
              <img src="/icons/radar.png" alt="Radar" />
              <span>Radar</span>
            </h2>

            <p className="plan_microCopy">Recibe oportunidades sin buscarlas</p>

            <div className="price">
              $899/mes
              <p className="price_year">
                <span className="year">$9,199/año</span>
                <span className="badge">-15%</span>
              </p>
            </div>

            <button
              onClick={() => abrirModal("radar")}
              disabled={loading === "radar"}
            >
              {loading === "radar" ? "Procesando..." : "Empezar"}
            </button>

            <div className="divider"></div>

            <ul>
              <li><span>✔</span> Publicaciones ilimitadas</li>
              <li><span>✔</span> Radar automático</li>
              <li><span>✔</span> Coincidencias en tiempo real</li>
              <li><span>✔</span> Compra exclusiva  de contactos</li>
              <li><span>✔</span> Prioridad en alertas</li>
            </ul>

            <div className="divider"></div>

            <p className="recurring">
              Cargo recurrente Mens:
              <strong>$854 <span>/mes</span></strong>
              <span>-5% descuento automático</span>
            </p>
          </div>

          {/* EXPLORADOR */}
          <div className="plan-card" id="free">
            <h2 className="plan-title">
              <img src="/icons/explorar.png" alt="Explorador" />
              <span>Explorador</span>
            </h2>

            <p className="plan_microCopy">Ideal para conocer cómo funciona la red</p>

            <p className="price">Gratis</p>
{/* 
            <button onClick={() => abrirModal("trial")} id="prueba_btn">
              Solicitar prueba gratuita
            </button>
 */}
            <div className="divider"></div>

            <ul>
              <li><span>✔</span> Explorar publicaciones</li>
              <li><span>✔</span> Explorar plataforma</li>
              <li><span>✔</span> Buscar empresas</li>
            </ul>

            <div className="divider"></div>
          </div>
        </div>
      </main>

      <Footer />

      {/* MODAL */}
      {verificationModal && (
        <PlanRequiredModal
          onClose={() => setVerificationModal(false)}
          onVerify={() => {
            setVerificationModal(false);
            setConfirm({ plan: "trial" });
          }}
        />
      )}

      {confirm?.plan === "trial" && (
        <BaseModal onClose={() => setConfirm(null)}>
          <TrialRequestModal onClose={() => setConfirm(null)} />
        </BaseModal>
      )}

      {confirm && confirm.plan !== "trial" && (
        <BaseModal onClose={() => setConfirm(null)}>
          <h2 className="modal_title">Configurar plan</h2>

          {/* SELECTOR */}
          <div className="plan-type">
            <button
              className={config.tipo === "mensual" ? "active" : ""}
              onClick={() =>
                setConfig({ ...config, tipo: "mensual" })
              }
            >
              Mensual
            </button>

            <button
              className={config.tipo === "anual" ? "active" : ""}
              onClick={() =>
                setConfig(prev => ({
                  ...prev,
                  tipo: "anual",
                  recurrente: true,
                }))
              }
            >
              Anual
            </button>
          </div>

          {/* PRECIO */}
          <div className="price-summary">
            <p>Total a pagar:</p>

            <h3>{getPrecio(confirm.plan, config)}</h3>
          </div>

          {/* CHECKBOX */}
          {/*           
          {config.tipo === "mensual" && (
            <div className="auto-option">
              <label>
                <input
                  type="checkbox"
                  checked={config.recurrente}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      recurrente: e.target.checked,
                    })
                  }
                />
                Ahorra 5% con pago automatico
              </label>
            </div>
          )}
 */}

          {/* BOTONES */}
          <div className="modal-actions">
            <button className="cancel" onClick={() => setConfirm(null)}>
              Cancelar
            </button>
            <button className="confirm" onClick={cambiarPlan}>
              Confirmar
            </button>
          </div>

          {/* NOTA */}
          <p className="price-note">
            {config.tipo === "anual"
              ? "Pago anual único. La suscripción dura 12 meses desde la fecha de compra."
              : config.recurrente
                  ? "Pago manual cada mes"
                  // ? "Se cobrará automáticamente cada mes, puedes cancelar en cualquier momento"
                  : "Pago manual cada mes"}
          </p>
        </BaseModal>
      )}
    </>
  );
}