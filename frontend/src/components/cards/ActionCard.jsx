"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ActionCard = ({ type }) => {
  const router = useRouter();

  const dataMap = {
    ofrezco: {
      icon: "/icons/ofrezco_btn.png",
      title: "Ofrecer Carga",
      info: "Tengo mercancía para compartir",
      bg: "actioncard--ofrezco",
      url: "/empresa/cargas/ofrezco",
    },
    busco: {
      icon: "/icons/busco_btn.png",
      title: "Buscar Carga",
      info: "Encuentra carga disponible en tu ruta",
      bg: "actioncard--busco",
      url: "/empresa/cargas/busco",
    },
    referir: {
      icon: "/icons/clientew.png",
      title: "Referir Contacto",
      info: "No trabajas esa ruta. Refiérelo y gana créditos",
      bg: "actioncard--referir",
      url: "/empresa/cargas/referir",
    },
  };

  const data = dataMap[type];

  const handleClick = () => {
    router.push(data.url);
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