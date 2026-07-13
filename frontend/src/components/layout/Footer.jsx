"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [showActivationBanner, setShowActivationBanner] = useState(false);
  const getToken = () => document.cookie.match(/token_empresa=([^;]+)/)?.[1];

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const token = getToken();

        // No hay sesión
        if (!token) {
          setShowActivationBanner(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          setShowActivationBanner(false);
          return;
        }

        const empresa = await res.json();
        // Mostrar solamente si NO está verificada
        setShowActivationBanner(!empresa.verificado);

      } catch (error) {
        console.error("Error obteniendo empresa:", error);
        setShowActivationBanner(false);
      }
    };

    fetchEmpresa();
  }, []);

  return (
    <>
      {showActivationBanner && (
        <section className="footer_activation">
          <div className="footer_activation__content">
            <div className="footer_activation__text">
              <h3>🎁 Activar tu empresa</h3>

              <p>
                Comienza a comprar contactos con <strong>100 créditos</strong> de bienvenida.
              </p>
            </div>

            <a href="https://wa.me/524421896433?text=Activa" target="_blank" rel="noopener noreferrer" className="footer_activation__button">
              Comenzar <span>🠮</span>
            </a>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="footer__content">

          <div className="footer__top">
            <h2 className="footer__title">
              MudanzaFácil <span>®</span>
            </h2>

            <p className="footer__description">
              Plataforma de colaboración para empresas de mudanzas en México
            </p>

            <div className="footer__links">
              <a href="/ayuda" target="_blank">
                Términos y Condiciones
              </a>

              <span>|</span>

              <a href="/ayuda" target="_blank">
                Aviso de Privacidad
              </a>

              <span>|</span>

              <a href="/reglas" target="_blank">
                Reglas de la comunidad
              </a>

              <span>|</span>

              <a href="/ayuda" target="_blank">
                Soporte
              </a>
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__bottom">
            © {new Date().getFullYear()} MudanzaFácil. Todos los derechos
            reservados
          </div>
        </div>
      </footer>
    </>
  );
}