"use client";

import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function ConfirmRecoverModal({ onCancel, onAccept }) {
  return (
    <BaseModal onClose={onCancel}>
      <h2 className="modal-title">Confirmar acción</h2>

      <p className="modal-message">
        ¿Estás seguro de que deseas continuar con la recuperación de contraseña?
      </p>

      <div className="modal-body">
        <Button_success value="Sí, continuar" onClick={onAccept} />
        <Button_error value="Cancelar" onClick={onCancel} />
      </div>
    </BaseModal>
  );
}
