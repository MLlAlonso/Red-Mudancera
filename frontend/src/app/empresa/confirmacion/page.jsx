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
            <div className="empresa-confirmacion__badge">
              <span className="empresa-confirmacion__badge-dot"></span>
              YA ERES PARTE DE LA RED
            </div>

            <h1 className="empresa-confirmacion__title">
              ¡Bienvenido a Mudanza <span> Fácil!</span>
            </h1>

            <p className="empresa-confirmacion__subtitle">
              Activa tu cuenta para comenzar a hacer negocio.
            </p>

            <div className="empresa-confirmacion__activation">
              <div className="empresa-confirmacion__activation-header">
                <div className="empresa-confirmacion__activation-title">
                  <img src="/icons/credito.png" alt="" />

                  <h2>
                    Activa hoy y recibe
                  </h2>
                </div>
              </div>

              <div className="empresa-confirmacion__reward">
                <div className="empresa-confirmacion__reward-info">
                  <div className="empresa-confirmacion__reward-item">
                    <div>
                      <h3> <span>100</span> créditos</h3>

                      <p>
                        <img src="/icons/check_success.png" alt="" />
                        Puedes comprar más de 6 contactos de clientes potenciales.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="empresa-confirmacion__reward-image">
                  <img src="/images/ticket.png" alt="Créditos" />
                </div>
              </div>

              <div className="empresa-confirmacion__divider"></div>

              <div className="empresa-confirmacion__whatsapp">
                <img src="/icons/whatsapp.png" alt="Whatsapp" />

                <p>
                  Envía la palabra ACTIVAal WhatsApp de Mudanza Fácil.
                </p>
              </div>

              <a href="https://wa.me/524421896433?text=ACTIVA" target="_blank" rel="noopener noreferrer" className="empresa-confirmacion__whatsapp-btn" >
                <img src="/icons/whatsapp.png" alt="" />

                <span>Enviar ACTIVA por WhatsApp</span>
              </a>
            </div>

            <div className="empresa-confirmacion__info">
              <div className="empresa-confirmacion__info-header">
                <div className="empresa-confirmacion__info-icon">
                  <img src="/icons/team.png" alt="" />
                </div>

                <div>
                  <p>
                    Mi equipo <span> activará tu empresa</span>, te ayudará a comenzar y acreditará tus
                    <strong> 100 créditos.</strong>
                  </p>

                  <p>
                    Además, podrás resolver cualquier duda sobre la plataforma.
                  </p>
                </div>
              </div>

              <div className="empresa-confirmacion__info-divider"></div>

              <h3 className="empresa-confirmacion__section-title">
                Lo que puedes hacer ahora
              </h3>

              <div className="empresa-confirmacion__feature">
                <div className="empresa-confirmacion__feature-icon">
                  <img src="/icons/busco.png" alt="" />
                </div>

                <div>
                  <h4>Buscar cargas</h4>

                  <p>
                    Encuentra viajes disponibles que se ajusten a tus rutas y llena tus unidades.
                  </p>
                </div>
              </div>

              <div className="empresa-confirmacion__feature">
                <div className="empresa-confirmacion__feature-icon">
                  <img src="/icons/ofrezco.png" alt="" />
                </div>

                <div>
                  <h4>Ofrecer cargas</h4>

                  <p>
                    Tienes una carga y quieres colocarla, ofrécela a colegas de confianza.
                  </p>
                </div>

              </div>

              <div className="empresa-confirmacion__feature">
                <div className="empresa-confirmacion__feature-icon">
                  <img src="/icons/cliente.png" alt="" />
                </div>

                <div>
                  <h4>Comprar contactos</h4>

                  <p>
                    Compra contactos de clientes verificados que necesitan mudanza en tu ruta.
                  </p>
                </div>
              </div>

              <div className="empresa-confirmacion__feature">
                <div className="empresa-confirmacion__feature-icon">
                  <img src="/icons/radar.png" alt="" />
                </div>

                <div>
                  <h4>Recibir coincidencias</h4>

                  <p>
                    Recibe alertas de rutas que coinciden con tus viajes para que no regreses vacío.
                  </p>
                </div>
              </div>
            </div>

            <div className="empresa-confirmacion__contact">
              <div className="empresa-confirmacion__contact-left">
                <img src="/icons/help.png" alt="" />

                <div>
                  <h4>¿Prefieres hablar con nosotros?</h4>
                  <p>Escríbenos por WhatsApp.</p>
                </div>
              </div>

              <a href="https://wa.me/524421896433" target="_blank" rel="noopener noreferrer" className="empresa-confirmacion__contact-btn">
                <img src="/icons/whatsapp.png" alt="" />
                <span>442 189 6433</span>
              </a>
            </div>

            <div className="empresa-confirmacion__footer-card">
              <div className="empresa-confirmacion__balance">
                <img src="/icons/token_color.png" alt="" />

                <div>
                  <span>Saldo actual:</span>
                  <h3>15 créditos</h3>
                </div>
              </div>

              <div className="empresa-confirmacion__footer-divider"></div>

              <div className="empresa-confirmacion__footer-action">
                <Button_cta value="Entrar a la plataforma" onClick={() => router.push("/empresa/dashboard")} />
              </div>
            </div>

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