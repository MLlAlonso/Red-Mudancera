export default function ViajeProgramado() {
    return (
        <section className="viaje-programado">
            <div className="viaje-programado__container">
                <header className="viaje-programado__header">
                    <span className="viaje-programado__eyebrow">
                        Aprovecha tus rutas
                    </span>

                    <h2 className="viaje-programado__title">
                        ¿Ya tienes un viaje programado?
                    </h2>
                </header>

                <div className="viaje-programado__grid">
                    <article className="ruta-card">
                        <div className="ruta-card__header">
                            <h3 className="ruta-card__title">
                                Publícalo.
                            </h3>
                        </div>

                        <p className="ruta-card__text">
                            Por ejemplo:
                        </p>

                        <div className="ruta-example">
                            <strong>
                                Querétaro → Cancún
                            </strong>

                            <span>
                                📅 Salida: 24 de agosto
                            </span>
                        </div>

                        <p className="ruta-card__description">
                            Mudanza Fácil puede ayudarte a detectar oportunidades compatibles con tu ruta.
                        </p>
                    </article>

                    <article className="ruta-card ruta-card--radar">
                        <div className="ruta-card__header">
                            <h3 className="ruta-card__title">
                                Activa Radar.
                            </h3>
                        </div>

                        <p className="ruta-card__description">
                            Si aparece una oportunidad compatible con
                            una ruta que ya tienes, Radar te ayuda a
                            detectarla para que puedas reaccionar rápido.
                        </p>

                        <strong className="ruta-card__highlight">
                            No entres únicamente cuando necesitas trabajo.
                            Entra también cuando ya tienes una ruta.
                        </strong>
                    </article>
                </div>
            </div>
        </section>
    );
}