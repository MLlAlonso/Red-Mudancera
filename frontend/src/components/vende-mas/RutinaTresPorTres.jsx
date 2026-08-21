const routineCards = [
    {
        id: "manana",
        title: "MAÑANA",
        badge: "Entra · Revisa · Ataca",
        text: (
            <>
                <strong>Revisa los contactos nuevos de la noche y la mañana.</strong>
                <br /> <br />
                Compra los que encajen con tus rutas y contáctalos inmediatamente.
            </>
        ),
    },
    {
        id: "mediodia",
        title: "MEDIODÍA",
        badge: "Entra · Revisa · Ataca",
        text: (
            <>
                <strong>¿Entraron nuevas oportunidades?</strong>
                <br /> <br />
                No las guardes para después. Compra y contacta mientras el cliente sigue buscando.
            </>
        ),
    },
    {
        id: "tarde",
        title: "TARDE",
        badge: "Entra · Revisa · Ataca",
        text: (
            <>
                <strong>Haz una última revisión del día.</strong>
                <br /> <br />
                Busca oportunidades nuevas y da seguimiento a las que ya cotizaste.
            </>
        ),
    },
];

export default function RutinaTresPorTres() {
    return (
        <section className="rutina-tres-por-tres">
            <div className="rutina-tres-por-tres__container">
                <header className="rutina-tres-por-tres__header">
                    <span className="rutina-tres-por-tres__eyebrow">
                        Una rutina sencilla
                    </span>

                    <h2 className="rutina-tres-por-tres__title">
                        📅 La rutina 3×3 de Mudanza Fácil
                    </h2>

                    <p className="rutina-tres-por-tres__text">
                        No necesitas estar pegado a la plataforma todo el día.
                    </p>
                </header>

                <div className="rutina-tres-por-tres__grid">
                    {routineCards.map((card) => (
                        <article key={card.id} className="routine-card" >
                            <div className="routine-card__header">
                                <h3 className="routine-card__title">
                                    {card.title}
                                </h3>

                                <span className="routine-card__badge">
                                    {card.badge}
                                </span>
                            </div>

                            <div className="routine-card__body">
                                <p>
                                    {card.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="rutina-tres-por-tres__result">
                    <p>
                        3 entradas al día + contactos frescos + seguimiento <strong> = más posibilidades de cerrar</strong>
                    </p>
                </div>
            </div>
        </section>
    );
}