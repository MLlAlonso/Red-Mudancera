"use client";

import { useEffect, useRef, useState } from "react";

const ESTADOS_CONFIG = {
  activo: {
    label: "Pendiente",
    descripcion: "Sin gestionar",
  },
  en_proceso: {
    label: "En proceso",
    descripcion: "Seguimiento en curso",
  },
  asignado: {
    label: "Cotizada",
    descripcion: "Cotización enviada",
  },
  finalizado: {
    label: "Vendida",
    descripcion: "Venta concretada",
  },
  sin_respuesta: {
    label: "Sin respuesta",
    descripcion: "No se logró contactar",
  },
  perdido: {
    label: "Perdida",
    descripcion: "No se concretó",
  },
};

const ESTADOS_DEFAULT = ["activo", "en_proceso", "asignado", "finalizado", "sin_respuesta", "perdido",];

export default function ServiceStatusDropdown({ estado, onSelect, labels = {}, options = [], }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const estados = options.length > 0 ? options : ESTADOS_DEFAULT;

  const labelMap = {
    activo: labels.activo || ESTADOS_CONFIG.activo.label,
    en_proceso: labels.en_proceso || ESTADOS_CONFIG.en_proceso.label,
    asignado: labels.asignado || ESTADOS_CONFIG.asignado.label,
    sin_respuesta: labels.sin_respuesta || ESTADOS_CONFIG.sin_respuesta.label,
    perdido: labels.perdido || ESTADOS_CONFIG.perdido.label,
    finalizado: labels.finalizado || ESTADOS_CONFIG.finalizado.label,
  };

  const estadoActual = ESTADOS_CONFIG[estado] ? estado : "activo";

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const seleccionarEstado = (nuevoEstado) => {
    setOpen(false);

    if (nuevoEstado !== estado) {
      onSelect(nuevoEstado);
    }
  };

  return (
    <div ref={dropdownRef} className={`service-status ${open ? "is-open" : ""}`} >
      <button
        type="button"
        className={`service-status__btn is-${estadoActual}`}
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Estado actual: ${labelMap[estadoActual]}. Cambiar estado`}
      >
        <span className="service-status__current-label">
          {labelMap[estadoActual]}
        </span>

        <span className={`service-status__arrow ${open ? "is-open" : ""}`} aria-hidden="true" >
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" >
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="service-status__menu" role="menu" aria-label="Seleccionar estado del contacto" >

          <div className="service-status__options">
            {estados.filter((item) => ESTADOS_CONFIG[item] && item !== estado)
              .map((item) => (
                <button key={item} type="button" role="menuitem" className={`service-status__item is-${item}`} onClick={() => seleccionarEstado(item)} >
                  <span className="service-status__item-indicator" aria-hidden="true" />

                  <span className="service-status__item-content">
                    <span className="service-status__item-label">
                      {labelMap[item]}
                    </span>

                    <span className="service-status__item-description">
                      {ESTADOS_CONFIG[item].descripcion}
                    </span>
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}