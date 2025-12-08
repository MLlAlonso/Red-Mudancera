"use client";

import React from "react";

const AcuerdoCard = ({
  type, // "busco" | "ofrezco"
  origen,
  destino,
  volumen,
  socio,
  fechaLimite,
  estado,
  onVerDetalles,
  onContactar,
}) => {
  const isOfrezco = type === "ofrezco";

  return (
    <div className={`acuerdo-card ${isOfrezco ? "ofrezco" : "busco"}`}>
      <div className="acuerdo-card__title">
        <span className={`tag ${isOfrezco ? "ofrezco-tag" : ""}`}>
          {isOfrezco ? "Ofrezco" : "Busco"}
        </span>

        <h2 className="route">
          {origen} → {destino}
        </h2>
      </div>

      <p className="info">Volumen: {volumen} m3</p>
      <p className="info">Socio comercial: {socio}</p>
      <p className="info estado">Estado: {estado}</p>

      <p className="date">Fecha límite de entrega: {fechaLimite}</p>

      <div className="actions">
        <button className="btn-outline" onClick={onVerDetalles}>
          Ver detalles
        </button>

        <button
          className={`btn-solid ${isOfrezco ? "ofrezco-btn" : ""}`}
          onClick={onContactar}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default AcuerdoCard;
