"use client";

import "@/styles/components/_feedbackModal.scss";

export default function FeedbackModal({ type = "success", message, onClose }) {
  return (
    <div className="feedback-overlay">
      <div className={`feedback-modal ${type}`}>
        
        <h3>
          {type === "success" ? "✅ Éxito" : "⚠️ Atención"}
        </h3>

        <p>{message}</p>

        <button onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}