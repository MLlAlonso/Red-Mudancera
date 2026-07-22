"use client";

import "@/styles/components/_tutorialVideoModal.scss";

export default function TutorialVideoModal({ tutorial, onClose, onConfirm, automatico = false, }) {
    if (!tutorial) return null;

    return (
        <div className="tutorial-video-modal" onClick={onClose} >
            <div className="tutorial-video-modal__content" onClick={(e) => e.stopPropagation()} >
                <button className="tutorial-video-modal__close" onClick={onClose} aria-label="Cerrar" >
                    ×
                </button>

                <div className="tutorial-video-modal__header">
                    <h2> {tutorial.titulo} </h2>

                    {tutorial.descripcion && (
                        <p> {tutorial.descripcion} </p>
                    )}
                </div>

                <div className="tutorial-video-modal__player">
                    <video controls controlsList="nodownload" preload="metadata" >
                        <source src={tutorial.video_url} type="video/mp4" />
                        Tu navegador no soporta la reproducción de video.
                    </video>
                </div>

                {automatico && (
                    <div className="tutorial-video-modal__actions">
                        <button className="tutorial-video-modal__secondary" onClick={onClose} >
                            Ver después
                        </button>

                        <button className="tutorial-video-modal__primary" onClick={onConfirm} >
                            Entendido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}