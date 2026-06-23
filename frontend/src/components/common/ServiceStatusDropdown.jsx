"use client";
import { useState } from "react";

export default function ServiceStatusDropdown({
  estado,
  onSelect,
  labels = {},
}) {
  const [open, setOpen] = useState(false);

  const labelMap = {
    activo: labels.activo || "Activo",
    asignado: labels.asignado || "Asignado",
    finalizado: labels.finalizado || "Finalizado",
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
              {labelMap.asignado}
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
              {labelMap.finalizado}
            </div>
          )}
        </div>
      )}
    </div>
  );
}