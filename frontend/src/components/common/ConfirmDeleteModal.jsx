"use client";

import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import "@/styles/components/_confirmDeleteModal.scss";

export default function ConfirmDeleteModal({
  open,
  title,
  text,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{text}</p>

        <div className="modal-actions">
          <Button_error value="Cancelar" onClick={onCancel} />
          <Button_success value="Aceptar" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}