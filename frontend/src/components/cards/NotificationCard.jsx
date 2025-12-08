"use client";

import React from "react";
import Button_error from "../common/Button_error";
import Button_success from "../common/Button_success";
import campanaIcon from "../../../public/icons/campana.png";

const DEFAULT_ICON = campanaIcon;

const NotificationCard = ({
  title,
  message,
  onAccept,
  onDelete,
  icon = DEFAULT_ICON,
}) => {
  return (
    <div className="notification-card">
      {/* Header */}
      <div className="notification-card__header">
        <img src={icon.src || icon} alt="icon" className="notification-card__icon" />
        <h3 className="notification-card__title">{title}</h3>
      </div>

      {/* Message */}
      <p className="notification-card__message">{message}</p>

      {/* Footer botones */}
      <div className="notification-card__actions">
        <Button_error value="Eliminar" onClick={onDelete} />
        <Button_success value="Visto" onClick={onAccept} />
      </div>
    </div>
  );
};

export default NotificationCard;