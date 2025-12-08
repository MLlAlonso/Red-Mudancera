"use client";

import React from "react";
import Button_error from "../common/Button_error";
import Button_success from "../common/Button_success";

const UserCard = ({
  avatar,
  nombre,
  telefono,
  email,
  fechaUnion,
  onDelete,
  onPause,
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

      <div className="user-card__actions">
        <Button_error value="Eliminar" onClick={onDelete} />
        <Button_success value="Pausar" onClick={onPause} />
      </div>
    </div>
  );
};

export default UserCard;