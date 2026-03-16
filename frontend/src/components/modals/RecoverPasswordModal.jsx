"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";
import Button_error from "../common/Button_error";

export default function RecoverPasswordModal({ onClose, onConfirm }) {
  const [email, setEmail] = useState("");

  return (
    <BaseModal onClose={onClose}>
      <h2 className="modal-title">Recuperar contraseña</h2>

      <p className="modal-message">
        Te enviaremos un código a tu correo para restablecer tu contraseña.
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

      <p className="modal_securityText">
        <img src="/icons/candado.png" alt="" />
        Tu información está protegida y no compartiremos tu correo
      </p>

      <Button_cta
        value="Enviar código"
        onClick={() => {
          if (!email) return;
          onConfirm(email);
        }}
      />

      <Button_error
        value="Cancelar"
        onClick={onClose}
      />

    </BaseModal>
  );
}
