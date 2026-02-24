"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ActionCard = ({ type }) => {
  const router = useRouter();
  const isOfrezco = type === "ofrezco";

  const data = {
    icon: isOfrezco ? "/icons/ofrezco_btn.png" : "/icons/busco_btn.png",
    title: isOfrezco ? "Ofrecer Carga" : "Buscar Carga",
    info: isOfrezco
      ? "Tengo mercancia para compartir"
      : "Tengo ruta y quiero llenar mi camión",
    bg: isOfrezco ? "actioncard--ofrezco" : "actioncard--busco",
  };

  const handleClick = () => {
    router.push(`/empresa/cargas//${type}`);
  };

  return (
    <div className={`actioncard ${data.bg}`} onClick={handleClick}>
      <img
        src={data.icon}
        alt={data.title}
        className="actioncard__icon"
      />

      <h2 className="actioncard__title">{data.title}</h2>
      <p className="actioncard__info">{data.info}</p>
    </div>
  );
};

export default ActionCard;