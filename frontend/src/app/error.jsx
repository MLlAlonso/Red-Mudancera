"use client";

import "@/styles/pages/_error.scss";

export default function Error({ reset }) {
  const handleRetry = () => {
    // Recargar página completa para limpiar estado roto
    window.location.reload();
  };

  return (
    <div className="error-page container">
      <div className="error-card">
        <h1 className="error-title">Algo salió mal</h1>

        <p className="error-text">
          Ocurrió un problema inesperado.<br />
          Si el error persiste, por favor{" "}
          <a
            href="mailto:soporte@mudanzafacil.com"
            className="error-link"
          >
            contacta a soporte
          </a>.
        </p>

        <button
          className="btn btn-primary"
          onClick={handleRetry}
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
