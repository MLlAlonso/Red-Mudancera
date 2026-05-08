"use client";

import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function ConfirmDeleteNotificationModal({ onCancel, onConfirm }) {
  return (
    <BaseModal onClose={onCancel}>
      <h2 className="modal-title">Eliminar notificación</h2>

      <p className="modal-message">
        ¿Estás seguro de que deseas eliminar esta notificación?
      </p>

      <div className="modal-body">
        <Button_success value="Eliminar" onClick={onConfirm} />
        <Button_error value="Cancelar" onClick={onCancel} />
      </div>
    </BaseModal>
  );
}