"use client";

const handleScrollToCliente = () => {
    const section = document.getElementById("cliente-perspective");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};

export default function ContactoFrescoHero() {
    return (
        <section className="vende-mas-hero">
            <div className="vende-mas-hero__container">
                <div className="vende-mas-hero__content">
                    <span className="vende-mas-hero__eyebrow">
                        Vende más con Mudanza Fácil
                    </span>

                    <h1 className="vende-mas-hero__title">
                        EL CONTACTO <br/> <span>FRESCO</span> VENDE MÁS
                    </h1>

                    <p className="vende-mas-hero__text">
                        No es el origen, no es el destino, ni la plataforma.
                        La diferencia muchas veces no está en el cliente.
                        Está en <strong>cuándo lo contactas.</strong>
                    </p>
                </div>

                <div className="vende-mas-hero__visual">
                    <div className="phone">
                        <div className="phone__frame">
                            <div className="phone__speaker" />

                            <div className="phone__screen">
                                <div className="phone-notification">
                                    <div className="phone-notification__top">
                                        <div className="phone-notification__app-icon">
                                            MF
                                        </div>

                                        <span className="phone-notification__time">
                                            Ahora
                                        </span>
                                    </div>

                                    <div className="phone-notification__content">
                                        <h3> Nuevo contacto disponible </h3>

                                        <p> Una persona acaba de solicitar una mudanza.</p>
                                    </div>

                                    <button type="button" className="phone-notification__button" onClick={handleScrollToCliente} >
                                        Ver ahora
                                    </button>
                                </div>
                            </div>

                            <div className="phone__home-indicator" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}