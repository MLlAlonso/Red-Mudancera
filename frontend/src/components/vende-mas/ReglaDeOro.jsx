const actions = [
    "Compra fresco",
    "Contacta rápido",
    "Cotiza",
    "Da seguimiento",
    "Publica tus rutas",
    "Usa Radar",
];

export default function ReglaDeOro() {
    return (
        <section className="regla-de-oro">
            <div className="regla-de-oro__container">
                <div className="regla-de-oro__eyebrow">
                    🏆 REGLA DE ORO
                </div>

                <h2 className="regla-de-oro__title">
                    Si hoy hay un contacto que te interesa,
                    <span> hoy es el mejor momento para comprarlo.</span>
                </h2>

                <p className="regla-de-oro__text">
                    Mañana el contacto puede seguir ahí.
                    <span> El cliente quizá no.</span>
                </p>

                <div className="regla-de-oro__divider" />

                <h3 className="regla-de-oro__subtitle">
                    NO COMPRES CONTACTOS. <br />
                    <span>COMPRA OPORTUNIDADES</span> EN EL MOMENTO CORRECTO.
                </h3>

                <div className="regla-de-oro__actions">
                    {actions.map((action) => (
                        <div key={action} className="action-item" >
                            <span className="action-item__check">
                                ✓
                            </span>

                            <span className="action-item__text">
                                {action}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="regla-de-oro__cta">
                    <a href="https://app.mudanzafacil.com.mx/empresa/login" className="regla-de-oro__button" >
                        Ver oportunidades reales
                    </a>
                </div>

                <p className="regla-de-oro__closing">
                    ⭐ Los clientes buscan soluciones  <span>ahora</span>.
                    <br />
                    Tú decides si eres tú quien los ayuda.
                </p>

            </div>
        </section>
    );
}