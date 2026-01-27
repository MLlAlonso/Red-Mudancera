"use client";

import { useRouter } from "next/navigation";

const EmpresaCard = ({ id, logo, nombre, sede, reputacion }) => {
  const router = useRouter();

  const getLogo = () => {
    if (!logo) return "/icons/user-placeholder.png";
    return logo;
  };

  return (
    <div className="empresa-card">
      <div className="empresa-card__avatar-wrapper">
        <img
          src={getLogo()}
          alt="Logo empresa"
          className="empresa-card__avatar"
        />
      </div>

      <h2
        className="empresa-card__name"
        onClick={() => router.push(`/empresa/${id}`)}
      >
        {nombre}
      </h2>

      <p className="empresa-card__sede">
        {sede || "Sede no especificada"}
      </p>

      {reputacion !== null && reputacion !== undefined && (
          <div className="empresa-card__reputation">
            ⭐ {Number(reputacion).toFixed(1)}
          </div>
        )}
    </div>
  );
};

export default EmpresaCard;