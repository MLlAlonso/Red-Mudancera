"use client";
import { useState } from "react";

export default function ServiceStatusDropdown({ estado, onSelect }) {
  const [open, setOpen] = useState(false);

  const labelMap = {
    activo: "Activo",
    asignado: "Asignado",
    finalizado: "Finalizado",
  };

  return (
    <div className="service-status">
      <button
        type="button"
        className={`service-status__btn is-${estado}`}
        onClick={() => setOpen((v) => !v)}
      >
        {labelMap[estado]}
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="service-status__menu">
          {estado !== "asignado" && (
            <div
              className="service-status__item asignado"
              onClick={() => {
                setOpen(false);
                onSelect("asignado");
              }}
            >
              Asignado
            </div>
          )}

          {estado !== "finalizado" && (
            <div
              className="service-status__item finalizado"
              onClick={() => {
                setOpen(false);
                onSelect("finalizado");
              }}
            >
              Finalizado
            </div>
          )}
        </div>
      )}
    </div>
  );
}