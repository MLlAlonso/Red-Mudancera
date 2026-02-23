"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_cta from "@/components/common/Button_cta";
import RecoverPasswordModal from "@/components/modals/RecoverPasswordModal";
import ConfirmRecoverModal from "@/components/modals/ConfirmRecoverModal";
import MessageModal from "@/components/modals/MessageModal";
import Link from "next/link";

import "@/styles/pages/empresa/_empresaLogin.scss";

export default function EmpresaLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showRecover, setShowRecover] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [messageModal, setMessageModal] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      return setError("Completa todos los campos.");
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }

      // Guardamos token en cookies
      document.cookie = `token_empresa=${data.token}; path=/; max-age=86400`;

      window.location.href = "/empresa/dashboard";
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar al servidor.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header className="header--no-menu" />

      <main className="empresa-login">
        <div className="empresa-login__form">
          <h1 className="empresa-login__title">Iniciar sesión</h1>
          <p className="empresa-login__hint">
            Administra tu perfil, servicios y equipo desde aquí
          </p>

          {error && <p className="empresa-login__error">{error}</p>}

          {/* EMAIL */}
          <div className="empresa-login__input-wrapper">
            <Image src="/icons/mensaje.png" alt="email icon" width={24} height={24} className="empresa-login__icon" />

            <input type="email" placeholder="Correo empresa" className="empresa-login__input" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>

          {/* PASSWORD */}
          <div className="empresa-login__input-wrapper">
            <Image src="/icons/candado.png" alt="lock icon" width={24} height={24} className="empresa-login__icon" />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              className="empresa-login__input"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <span
              className="empresa-login__showpass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <Button_cta
            value={loading ? "Iniciando..." : "Iniciar sesión"}
            onClick={handleSubmit}
          />

          {/* Registrarse */}
          <p className="empresa-login__register">
            <Link href="/empresa/register">Regístrate y empieza</Link>
          </p>

          {/* Olvidé contraseña */}
          <p className="empresa-login__forgot" onClick={() => setShowRecover(true)}>
            Olvidé mi contraseña
          </p>

        </div>
      </main>

      <Footer />

      {showRecover && (
        <RecoverPasswordModal
          onClose={() => setShowRecover(false)}
          onConfirm={(email) => {
            setRecoverEmail(email);
            setShowRecover(false);
            setShowConfirm(true);
          }}
        />
      )}

      {showConfirm && (
        <ConfirmRecoverModal
          onCancel={() => setShowConfirm(false)}
          onAccept={async () => {
            setShowConfirm(false);

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/recover-password`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: recoverEmail,
                    from: "empresa",
                  }),
                }
              );

              const data = await res.json();

              setMessageModal({
                title: res.ok ? "Correo enviado" : "Atención",
                message: data.message,
              });

            } catch (e) {
              setMessageModal({
                title: "Error",
                message: "No se pudo conectar con el servidor.",
              });
            }
          }}
        />
      )}

      {messageModal && (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          onClose={() => setMessageModal(null)}
        />
      )}

    </>
  );
}