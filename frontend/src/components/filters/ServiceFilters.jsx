"use client";

import { useState, useRef, useEffect } from "react";

const OPTIONS = {
  todos: {
    label: "Todos",
    icon: "/icons/todo.png",
  },
  busco: {
    label: "Busco",
    icon: "/icons/busco.png",
  },
  ofrezco: {
    label: "Ofrezco",
    icon: "/icons/ofrezco.png",
  },
  cliente: {
    label: "Contacto",
    icon: "/icons/cliente.png",
  },
};

export default function ServiceFilters({ onChange }) {
  const [active, setActive] = useState("todos");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (value) => {
    setActive(value);
    setOpen(false);
    if (onChange) onChange(value);
  };

  // cerrar dropdown al click fuera
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="service-filters" ref={ref}>
      {/* BOTÓN PRINCIPAL */}
      <button
        className="service-filters__trigger"
        onClick={() => setOpen(!open)}
      >
        <span className="service-filters__status">
          Mostrando:
        </span>

        <span className="service-filters__label">
          {OPTIONS[active].label}
        </span>

        <span className={`service-filters__arrow ${open ? "open" : ""}`}>
          ▾
        </span>

      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="service-filters__dropdown">
          {Object.entries(OPTIONS).map(([key, opt]) => (
            <button
              key={key}
              className={`dropdown-item ${active === key ? "active" : ""
                }`}
              onClick={() => handleSelect(key)}
            >
              <img src={opt.icon} alt={opt.label} />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}