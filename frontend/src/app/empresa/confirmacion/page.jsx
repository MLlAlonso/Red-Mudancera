"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_cta from "@/components/common/Button_cta";
import { useRouter } from "next/navigation";
import "@/styles/pages/empresa/_empresaConfirmacion.scss";

export default function EmpresaConfirmacion() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const router = useRouter();

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

      // Guardar token
      document.cookie = `token_empresa=${data.token}; path=/`;
      setVerified(true);
      localStorage.removeItem("empresa_email");

    } catch (err) {
      console.error(err);
      setError("No se pudo conectar al servidor.");
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <>
        <Header className="header--no-menu" />

        <main className="empresa-confirmacion">
          <div className="empresa-confirmacion__card">
            <h1 className="empresa-confirmacion__title">
              🎉 ¡Bienvenido!
            </h1>

            <p className="empresa-confirmacion__subtitle">
              Tu cuenta fue creada correctamente, comencemos a explorar.
            </p>

            <div className="empresa-confirmacion__tokens-box">
              <h2 className="empresa-confirmacion__tokens-title">
                🎁 Recibiste 30 créditos de Bienvenida
              </h2>

              <p className="empresa-confirmacion__tokens-text">
                Úsalos para comprar <strong>Contactos de Clientes</strong>
              </p>

              <p className="empresa-confirmacion__warning">
                ⚠️ No se utilizan para publicar servicios de Busco u Ofrezco.
              </p>
            </div>

            <Button_cta
              value="Iniciemos tu experiencia"
              onClick={() => router.push("/empresa/bienvenida")}
            />
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header className="header--no-menu" />

      <main className="empresa-register">
        <div className="empresa-register__card" id="code_card" style={{ height: "auto", maxHeight: "280px" }}>
          <h1 className="empresa-register__title">Código de verificación</h1>

          {error && <p className="empresa-register__error">{error}</p>}

          <div className="empresa-register__code-wrapper">
            <p className="empresa-register__code-text">
              Enviamos un código de verificación a tu correo, revisa tu bandeja de entrada, Spam u otros. 
              <br />
              <br />

              <span>
                El código puede tardar de 1 a 2 minutos en llegar, ten paciencia.
              </span>
            </p>
          </div>
          <Input label="Código" placeholder="Ingresa código de verificación" value={code} onChange={(e) => setCode(e.target.value)} />

          <Button_cta value={loading ? "Validando..." : "Continuar"} onClick={handleSubmit} />
        </div>
      </main>

      <Footer />
    </>
  );

}