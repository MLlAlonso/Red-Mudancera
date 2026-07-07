"use client";

import { useState } from "react";

export default function ServiceStatusDropdown({ estado, onSelect, labels = {}, options = [], }) {
  const [open, setOpen] = useState(false);

  const estados =
    options.length > 0
      ? options
      : ["activo", "asignado", "finalizado"];

  const labelMap = {
    activo: labels.activo || "Activo",
    asignado: labels.asignado || "Asignado",
    en_proceso: labels.en_proceso || "En proceso",
    sin_respuesta: labels.sin_respuesta || "Sin respuesta",
    perdido: labels.perdido || "Perdido",
    finalizado: labels.finalizado || "Finalizado",
  };

  return (
    <div className="service-status">
      <button
        type="button"
        className={`service-status__btn is-${estado}`}
        onClick={() => setOpen(!open)}
      >
        {labelMap[estado]}
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="service-status__menu">
          {estados
            .filter((item) => item !== estado)
            .map((item) => (
              <div
                key={item}
                className={`service-status__item ${item}`}
                onClick={() => { setOpen(false); onSelect(item); }}
              >
                {labelMap[item]}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}