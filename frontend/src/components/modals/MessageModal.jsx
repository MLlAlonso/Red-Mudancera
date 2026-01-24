"use client";

import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";

export default function MessageModal({ title, message, onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <h2 className="modal-title">{title}</h2>
      <p className="modal-message">{message}</p>

      <Button_cta value="Entendido" onClick={onClose} />
    </BaseModal>
  );
}