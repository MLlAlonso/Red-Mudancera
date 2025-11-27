"use client";

import { useState } from "react";

export default function ServiceFilters({ onChange }) {
  const [active, setActive] = useState("todos");

  const handleClick = (value) => {
    setActive(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="service-filters">
      <button
        className={`filter-btn ${active === "todos" ? "active" : ""}`}
        onClick={() => handleClick("todos")}
      >
        Todos
      </button>

      <button
        className={`filter-btn ${active === "busco" ? "active" : ""}`}
        onClick={() => handleClick("busco")}
      >
        Busco
      </button>

      <button
        className={`filter-btn ${active === "ofrezco" ? "active" : ""}`}
        onClick={() => handleClick("ofrezco")}
      >
        Ofrezco
      </button>
    </div>
  );
}
