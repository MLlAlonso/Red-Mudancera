"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function ShareClienteReviewLinkModal({
  open,
  link,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("No se pudo copiar el enlace");
    }
  };

  const compartirWhatsapp = () => {
    const mensaje = encodeURIComponent(
      `Hola, puedes dejar una reseña de nuestro servicio aquí:\n\n${link}\n\nGracias por tu confianza.`
    );
    const url = `https://wa.me/?text=${mensaje}`;
    window.open(url, "_blank");
  };

  return (
    <BaseModal onClose={onClose}>
      <h2 className="modal-title">Solicitar reseña</h2>

      <p className="modal-message">
        Comparte este enlace con tu cliente para que pueda dejar una reseña
        sobre tu servicio.
      </p>

      <input type="text" value={link} readOnly className="modal-input" />

      <div className="modal-body">

        <Button_error value="Cerrar" onClick={onClose} />

        <button className="btn-outline" onClick={copiar} >
          {copied ? "Copiado ✓" : "Copiar link"}
        </button>

        <button className="btn-solid" onClick={compartirWhatsapp} >
          <img src="/icons/whatsapp.png" alt="WhatsApp" />
          Compartir
        </button>

      </div>
    </BaseModal>
  );
}