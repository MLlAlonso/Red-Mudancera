"use client";

import BaseModal from "./BaseModal";

export default function CancelSubscriptionModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <BaseModal onClose={onClose}>
      <h2>Cancelar suscripción</h2>
      <p>
        Tu suscripción seguirá activa hasta el final del periodo actual.
        Después de eso, no se renovará automáticamente.
      </p>

      <div className="modal-actions">
        <button className="btn-confirm" onClick={onConfirm}>
          Confirmar cancelación
        </button>

        <button className="btn-cancel" onClick={onClose}>
          Volver
        </button>
      </div>
    </BaseModal>
  );
}