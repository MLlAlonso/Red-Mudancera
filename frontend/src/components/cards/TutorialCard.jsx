"use client";

import "@/styles/components/_tutorialCard.scss";

export default function TutorialCard({ tutorial, onPlay }) {
    return (
        <article className="tutorial-card">
            <div className="tutorial-card__thumbnail">
                <img src={tutorial.thumbnail_url || "/images/hero_02.png"} alt={tutorial.titulo} />

                <span className={`tutorial-card__status ${tutorial.visto
                    ? "tutorial-card__status--done"
                    : "tutorial-card__status--pending"
                    }`}
                >
                    {tutorial.visto ? "Visto" : "Pendiente"}
                </span>
            </div>

            <div className="tutorial-card__content">
                <h3> {tutorial.titulo} </h3>

                {tutorial.descripcion && (
                    <p> {tutorial.descripcion} </p>
                )}

                <button className="tutorial-card__button" onClick={() => onPlay(tutorial)} >
                    Ver tutorial
                </button>
            </div>
        </article>
    );
}