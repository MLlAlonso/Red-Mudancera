const freshnessCards = [
    {
        id: "hoy",
        title: "HOY",
        strong: "CALIENTE",
        text: "Está buscando, comparando y contestando.",
        level: "freshness--hot",
    },
    {
        id: "ayer",
        title: "AYER",
        strong: "MUY BUENA OPORTUNIDAD",
        text: "Todavía estás a tiempo.",
        level: "freshness--good",
    },
    {
        id: "dos-tres",
        title: "2–3 DÍAS",
        strong: "SE ENFRÍA",
        text: "Puede que ya tenga varias cotizaciones.",
        level: "freshness--cool",
    },
    {
        id: "cuatro",
        title: "4+ DÍAS",
        strong: "TODAVÍA HAY OPORTUNIDAD",
        text: "El contacto puede seguir disponible, aunque quizá ya esté comparando opciones.",
        level: "freshness--late",
    },
];

export default function FrescuraContacto() {
    return (
        <section className="frescura-contacto">
            <div className="frescura-contacto__container">
                <header className="frescura-contacto__header">
                    <span className="frescura-contacto__eyebrow">
                        El momento cuenta
                    </span>

                    <h2 className="frescura-contacto__title">
                        La frescura importa
                    </h2>
                </header>

                <div className="frescura-contacto__grid">
                    {freshnessCards.map((card) => (
                        <article key={card.id} className={`freshness-card ${card.level}`} >
                            <div className="freshness-card__top">
                                <span className="freshness-card__title">
                                    {card.title}
                                </span>

                                <span className="freshness-card__indicator" />
                            </div>

                            <strong className="freshness-card__strong">
                                {card.strong}
                            </strong>

                            <p className="freshness-card__text">
                                {card.text}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="frescura-contacto__message">
                    <span className="frescura-contacto__message-icon">
                        ⭐
                    </span>

                    <div>
                        <h3>
                            La frescura no es todo.
                        </h3>

                        <p>
                            Un contacto de 4 días todavía puede convertirse en
                            una venta. La diferencia es que, mientras más rápido
                            llegues, más posibilidades tienes de encontrar al
                            cliente buscando activamente.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}