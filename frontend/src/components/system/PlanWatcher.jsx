"use client";

import { useEffect, useState } from "react";
import BaseModal from "@/components/modals/BaseModal";

export default function PlanWatcher() {
  const [planModal, setPlanModal] = useState(null);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      let data;

      try {
        data = await res.clone().json();
      } catch {
        return res;
      }

      if (
        !res.ok &&
        (
          data?.error === "PLAN_LIMIT" ||
          data?.error === "PLAN_LIMIT_SERVICIOS" ||
          data?.error === "PLAN_LIMIT_EXCLUSIVO"
        )
      ) {
        window.dispatchEvent(
          new CustomEvent("plan-limit", {
            detail: data,
          })
        );
      }

      return res;
    };

    const handler = (e) => setPlanModal(e.detail);
    window.addEventListener("plan-limit", handler);

    return () => {
      window.removeEventListener("plan-limit", handler);
      window.fetch = originalFetch;
    };
  }, []);

  if (!planModal) return null;

  return (
    <BaseModal onClose={() => setPlanModal(null)}>

      {/* LIMITE SERVICIOS */}
      {planModal.error === "PLAN_LIMIT_SERVICIOS" ? (
        <>
          <h2 className="modal-title">Has alcanzado tu límite</h2>

          <p className="modal-message">
            Ya utilizaste las publicaciones disponibles de tu plan.
            <br /><br />
            Activa Radar para publicar sin límite y acceder a más oportunidades todos los días.
          </p>

          <div className="modal-actions">
            <button
              className="btn-solid"
              onClick={() => (window.location.href = "/empresa/planes")}
            >
              Publicar sin límite
            </button>

            <button
              className="btn-outline"
              onClick={() => (window.location.href = "/empresa/planes")}
            >
              Ver mi plan
            </button>
          </div>
        </>
      ) : planModal.error === "PLAN_LIMIT_EXCLUSIVO" ? (

        <>
          <h2 className="modal-title">Función exclusiva</h2>

          <p className="modal-message">
            Tu plan actual no permite comprar contactos exclusivos.
            <br /><br />
            Activa Radar para acceder a oportunidades sin competencia.
          </p>

          <div className="modal-actions">
            <button className="btn-outline" onClick={() => setPlanModal(null)}>
              Cancelar
            </button>

            <button
              className="btn-solid"
              onClick={() => (window.location.href = "/empresa/planes")}
            >
              Activar Radar
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="modal-title">Activa tu cuenta para participar</h2>

          <p className="modal-message">
            {planModal.message}
          </p>

          <div className="modal-actions">
            <button
              className="btn-outline"
              onClick={() => setPlanModal(null)}
            >
              Cancelar
            </button>

            <button
              className="btn-solid"
              onClick={() => (window.location.href = "/empresa/planes")}
            >
              Ver planes
            </button>
          </div>
        </>
      )}
    </BaseModal>
  );
}