"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SearchProvider } from "@/store/searchContext";
import BaseModal from "@/components/modals/BaseModal";
import "../styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [planModal, setPlanModal] = useState(null);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      let data;

      try {
        data = await res.clone().json();
      } catch {
        return res;
      }

      if (
        !res.ok &&
        (
          data?.error === "PLAN_LIMIT" ||
          data?.error === "PLAN_LIMIT_SERVICIOS" ||
          data?.error === "PLAN_LIMIT_EXCLUSIVO"
        )
      ) {
        window.dispatchEvent(
          new CustomEvent("plan-limit", {
            detail: data,
          })
        );
      }

      return res;
    };

    const handler = (e) => setPlanModal(e.detail);
    window.addEventListener("plan-limit", handler);

    return () => {
      window.removeEventListener("plan-limit", handler);
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&language=es`}
          strategy="afterInteractive"
        />

        <SearchProvider>{children}</SearchProvider>

        {planModal && (
          <BaseModal onClose={() => setPlanModal(null)}>

            {/* LIMITE SERVICIOS */}
            {planModal.error === "PLAN_LIMIT_SERVICIOS" ? (
              <>
                <h2 className="modal-title">Has alcanzado tu límite</h2>

                <p className="modal-message">
                  Ya utilizaste las publicaciones disponibles de tu plan.
                  <br /><br />
                  Activa Radar para publicar sin límite y acceder a más oportunidades todos los días.
                </p>

                <div className="modal-actions">
                  <button
                    className="btn-solid"
                    onClick={() => (window.location.href = "/empresa/planes")}
                  >
                    Publicar sin límite
                  </button>

                  <button
                    className="btn-outline"
                    onClick={() => (window.location.href = "/empresa/planes")}
                  >
                    Ver mi plan
                  </button>
                </div>
              </>
            ) : planModal.error === "PLAN_LIMIT_EXCLUSIVO" ? (

              <>
                <h2 className="modal-title">Función exclusiva</h2>

                <p className="modal-message">
                  Tu plan actual no permite comprar contactos exclusivos.
                  <br /><br />
                  Activa Radar para acceder a oportunidades sin competencia.
                </p>

                <div className="modal-actions">
                  <button className="btn-outline" onClick={() => setPlanModal(null)} >
                    Cancelar
                  </button>

                  <button className="btn-solid" onClick={() => (window.location.href = "/empresa/planes")} >
                    Activar Radar
                  </button>
                </div>
              </>
            ) : (

              /* MODAL NORMAL (FREE) */
              <>
                <h2 className="modal-title">Activa tu cuenta para participar</h2>

                <p className="modal-message">
                  {planModal.message}
                </p>

                <div className="modal-actions">
                  <button className="btn-outline" onClick={() => setPlanModal(null)} >
                    Cancelar
                  </button>

                  <button className="btn-solid" onClick={() => (window.location.href = "/empresa/planes")} >
                    Ver planes
                  </button>
                </div>
              </>
            )}
          </BaseModal>
        )}
      </body>
    </html>
  );
}