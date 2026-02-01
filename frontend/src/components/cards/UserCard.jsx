"use client";

import React from "react";

const UserCard = ({
  avatar,
  nombre,
  telefono,
  email,
  fechaUnion,
  activo,
  onDelete,
  onPause,
  onShare,
}) => {
  return (
    <div className="user-card">
      <div className="user-card__avatar-wrapper">
        <img
          src={avatar || "/icons/default-user.png"}
          alt="avatar"
          className="user-card__avatar"
        />
      </div>

      <h2 className="user-card__name">{nombre}</h2>

      <div className="user-card__info">
        <p className="user-card__text">{telefono}</p>
        <p className="user-card__text">{email}</p>
        <p className="user-card__text">Se unió el: {fechaUnion}</p>
      </div>

      {/* Acciones */}
      <div className="user-card__actions">
        <img src="/icons/delete.png" alt="Eliminar" className="user-card__icon" onClick={onDelete} />

        <img src={activo ? "/icons/pause.png" : "/icons/play.png"} alt={activo ? "Pausar" : "Reanudar"} className="user-card__icon" onClick={onPause} />

        <img src="/icons/share.png" alt="Compartir" className="user-card__icon" onClick={onShare} />
      </div>

    </div>
  );
};
export default UserCard;