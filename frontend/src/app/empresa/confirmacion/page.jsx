"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_cta from "@/components/common/Button_cta";

export default function EmpresaConfirmacion() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener el email guardado después del registro
  useEffect(() => {
    const savedEmail = localStorage.getItem("empresa_email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError("No se encontró el correo de la empresa. Regístrate nuevamente.");
    }
  }, []);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Ingresa el código de verificación.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/verify-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Código incorrecto, intenta nuevamente.");
        return;
      }

      // Código correcto
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

      <main className="empresa-register">
        <div className="empresa-register__card" style={{ height: "auto", maxHeight: "280px" }}>
          <h1 className="empresa-register__title">Código de verificación</h1>

          {error && <p className="empresa-register__error">{error}</p>}

          <Input
            label="Código"
            placeholder="Ingresa código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button_cta
            value={loading ? "Validando..." : "Continuar"}
            onClick={handleSubmit}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
