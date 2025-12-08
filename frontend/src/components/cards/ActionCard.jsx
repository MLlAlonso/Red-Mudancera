"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ActionCard = ({ type }) => {
  const router = useRouter();

  // Valores según tipo
  const isOfrezco = type === "ofrezco";

  const data = {
    icon: isOfrezco ? "/icons/ofrece.png" : "/icons/busca.png",
    title: isOfrezco ? "Ofrezco" : "Busco",
    info: isOfrezco
      ? "Tengo carga para transportar"
      : "Tengo espacio, quiero carga",
    bg: isOfrezco ? "actioncard--ofrezco" : "actioncard--busco",
  };

  const handleClick = () => {
    router.push(`/${type}`); // Ajustar la ruta después
  };

  return (
    <div className={`actioncard ${data.bg}`} onClick={handleClick}>
      <img src={data.icon} alt={data.title} className="actioncard__icon" />

      <h2 className="actioncard__title">{data.title}</h2>
      <p className="actioncard__info">{data.info}</p>
    </div>
  );
};

export default ActionCard;
