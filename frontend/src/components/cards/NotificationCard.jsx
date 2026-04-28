"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button_error from "../common/Button_error";
import Button_success from "../common/Button_success";
import campanaIcon from "../../../public/icons/campana.png";

const DEFAULT_ICON = campanaIcon;

const NotificationCard = ({
  title,
  message,
  leida,
  url,
  onAccept,
  onDelete,
  icon = DEFAULT_ICON,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
  if (!url) return;

  // Navega primero
  router.push(url);

  // Luego marca como leída sin bloquear navegación
  if (!leida && onAccept) {
    setTimeout(() => {
      onAccept();
    }, 0);
  }
};

  return (
    <div
      className={`notification-card ${leida ? "notification-card--leida" : ""} ${url ? "notification-card--clickable" : ""}`}
      onClick={handleNavigate}
    >
      <div className="notification-card__header">
        <img src={icon.src || icon} alt="icon" className="notification-card__icon" />
        <h3 className="notification-card__title">{title}</h3>
      </div>

      <p className="notification-card__message">{message}</p>

      <div className="notification-card__actions" onClick={(e) => e.stopPropagation()} >
        <Button_error value="Eliminar" onClick={onDelete} />
        <Button_success
          value={leida ? "Visto" : "Ver"}
          onClick={onAccept}
          disabled={leida}
        />
      </div>
    </div>
  );
};

export default NotificationCard;