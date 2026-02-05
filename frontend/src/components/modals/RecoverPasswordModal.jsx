"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";

export default function RecoverPasswordModal({ onClose, onConfirm }) {
  const [email, setEmail] = useState("");

  return (
    <BaseModal onClose={onClose}>
      <h2 className="modal-title">Recuperar contraseña</h2>

      <p className="modal-message">
        Se enviará un código a tu correo con el cual podrás iniciar sesión.
      </p>

      <div className="modal-body">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          id="modal_email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
        <Button_cta
          value="Continuar"
          onClick={() => {
            if (!email) return;
            onConfirm(email);
          }}
        />
    </BaseModal>
  );
}
