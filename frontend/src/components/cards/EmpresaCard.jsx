"use client";

import { useRouter } from "next/navigation";

const EmpresaCard = ({ id, logo, nombre, sede, reputacion }) => {
  const router = useRouter();

  return (
    <div className="empresa-card">
      <div className="empresa-card__avatar-wrapper">
        <img src={logo || "/icons/user-placeholder.png"} alt="Logo empresa" className="empresa-card__avatar" />
      </div>

      <h2 className="empresa-card__name" onClick={() => router.push(`/empresa/${id}`)}>
        {nombre}
      </h2>

      <p className="empresa-card__sede">
        {sede || "Sede no especificada"}
      </p>

      {reputacion !== null && reputacion !== undefined && (
        <div className="empresa-card__reputation">
          ⭐{" "}
          {Number(reputacion) > 0
            ? Number(reputacion).toFixed(1)
            : "Sin reseñas"}
        </div>

      )}
    </div>
  );
};
export default EmpresaCard;