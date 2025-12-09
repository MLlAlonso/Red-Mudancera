"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_cta from "@/components/common/Button_cta";
import Link from "next/link";

export default function EmpresaRegister() {
  const [formData, setFormData] = useState({
    empresa: "",
    email: "",
    password: "",
    representante: "",
    tel: "", // CORRECTO: este nombre sí coincide con el backend
  });

  const [loading, setLoading] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validación más estricta (excelente decisión)
  const validateForm = () => {
    if (!formData.empresa.trim()) return "El nombre de la empresa es obligatorio.";
    if (!formData.email.includes("@")) return "Ingresa un correo válido.";
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password))
      return "La contraseña no cumple los requisitos.";
    if (!formData.representante.trim())
      return "El nombre del representante es obligatorio.";
    if (!/^\d{10}$/.test(formData.tel))
      return "Ingresa un teléfono válido (10 dígitos).";

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Error al registrar empresa");
        return;
      }

      // Registro exitoso
      window.location.href = "/empresa/confirmacion";
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
        <div className="empresa-register__card">
          <h1 className="empresa-register__title">Registro de empresa</h1>

          {error && <p className="empresa-register__error">{error}</p>}

          <Input
            label="Nombre de la empresa"
            placeholder="Nombre de la empresa"
            value={formData.empresa}
            onChange={(e) => handleChange("empresa", e.target.value)}
          />

          <Input
            label="Correo de la empresa"
            placeholder="Correo de la empresa"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          {/* Contraseña con tooltip */}
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <span
              className="empresa-register__help"
              onMouseEnter={() => setShowPasswordRules(true)}
              onMouseLeave={() => setShowPasswordRules(false)}
            >
              ?
            </span>

            {showPasswordRules && (
              <div className="empresa-register__tooltip">
                La contraseña debe incluir:
                <br />• Al menos 8 caracteres
                <br />• 1 mayúscula
                <br />• 1 número
              </div>
            )}
          </div>

          <Input
            label="Persona de contacto"
            placeholder="Administrador empresa"
            value={formData.representante}
            onChange={(e) => handleChange("representante", e.target.value)}
          />

          <Input
            label="Teléfono"
            placeholder="Teléfono de empresa"
            value={formData.tel}
            onChange={(e) => handleChange("tel", e.target.value)}
          />

          <Button_cta
            value={loading ? "Registrando..." : "Registrarse"}
            onClick={handleSubmit}
          />

          <p className="empresa-register__login-text">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/empresa/login" className="empresa-register__login-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
