"use client";

export default function Error({ reset }) {
  return (
    <div className="error-page">
      <h1>Error</h1>
      <p>
        Ocurrió un problema inesperado.<br />
        Si el error persiste, por favor contacta a soporte.
      </p>

      <button onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
