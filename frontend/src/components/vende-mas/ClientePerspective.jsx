"use client";

import { useState } from "react";

const expectations = [
    {
        id: "hora",
        text: "En 1 hora",
        icon: "◷",
    },
    {
        id: "tarde",
        text: "Hoy por la tarde",
        icon: "☀",
    },
    {
        id: "manana",
        text: "Mañana",
        icon: "→",
    },
    {
        id: "dias",
        text: "En 3 o 4 días",
        icon: "↗",
    },
];

export default function ClientePerspective() {
    const [selectedExpectation, setSelectedExpectation] = useState(null);

    const handleCardClick = (id) => {
        setSelectedExpectation((current) => current === id ? null : id);
    };

    return (
        <section id="cliente-perspective" className="cliente-perspective" >
            <div className="cliente-perspective__container">
                <div className="cliente-perspective__header">
                    <span className="cliente-perspective__eyebrow">
                        Antes de vender, entiende
                    </span>

                    <h2 className="cliente-perspective__title">
                        <span>👤</span> Ponte del otro lado
                    </h2>

                    <p className="cliente-perspective__text">
                        Acabas de dejar tus datos porque necesitas una mudanza.
                        <br />
                        <strong>¿Cuándo esperarías que te contacten?</strong>
                    </p>
                </div>

                <div className="cliente-perspective__options">
                    {expectations.map((expectation) => {
                        const isSelected = selectedExpectation === expectation.id;

                        return (
                            <button
                                key={expectation.id}
                                type="button"
                                className={`expectation-card ${isSelected ? "expectation-card--active" : ""}`}
                                onClick={() => handleCardClick(expectation.id)}
                            >
                                <span className="expectation-card__icon">
                                    {expectation.icon}
                                </span>

                                <span className="expectation-card__text">
                                    {expectation.text}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {selectedExpectation && (
                    <div className="cliente-perspective__message">
                        <div className="cliente-perspective__message-icon">
                            !
                        </div>

                        <div>
                            <strong>
                                Tu cliente piensa igual.
                            </strong>

                            <p>
                                No dejó sus datos para ver qué sucede la próxima semana.
                                Los dejó porque está buscando resolver su mudanza ahora.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}