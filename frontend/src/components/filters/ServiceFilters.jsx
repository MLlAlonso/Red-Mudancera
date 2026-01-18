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
      {/* <button
        className={`filter-btn ${active === "todos" ? "active" : ""}`}
        onClick={() => handleClick("todos")}
      >
        Todos
      </button>

      <button
        className={`filter-btn ${active === "busco" ? "active" : ""}`}
        onClick={() => handleClick("busco")}
      >
        Buscan
      </button>

      <button
        className={`filter-btn ${active === "ofrezco" ? "active" : ""}`}
        onClick={() => handleClick("ofrezco")}
      >
        Ofrecen
      </button> */}

      <button
        className={`filter-btn ${active === "todos" ? "active" : ""}`}
        onClick={() => handleClick("todos")}
      >
        <img src="/icons/todos.png  " alt="Todos" />
      </button>

      <button
        className={`filter-btn ${active === "busco" ? "active" : ""}`}
        onClick={() => handleClick("busco")}
      >
        <img src="/icons/acuerdo_2.png" alt="Buscan" />
      </button>

      <button
        className={`filter-btn ${active === "ofrezco" ? "active" : ""}`}
        onClick={() => handleClick("ofrezco")}
      >
        <img src="/icons/leave.png" alt="Ofrecen" />
      </button>

    </div>
  );
}