"use client";

export default function ErrorModal({ show, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <button className="modal-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
}