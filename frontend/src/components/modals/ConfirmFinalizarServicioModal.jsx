"use client";

import Button_error from "@/components/common/Button_error";
import Button_success from "@/components/common/Button_success";

export default function ConfirmFinalizarServicioModal({
  open,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Finalizar servicio</h2>

        <p className="modal-message">
          ¿Estás seguro de finalizar este servicio?
          <br />
          Esta acción no se puede deshacer.
        </p>

        <div className="modal-body">
          <Button_success value="Aceptar" onClick={onConfirm} />
          <Button_error value="Cancelar" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}
