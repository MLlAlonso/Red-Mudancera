"use client";

import { useEffect, useState } from "react";
import "@/styles/pages/_bienvenida.scss";

export default function BienvenidaPage() {

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const [showCTA, setShowCTA] = useState(false);

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));

        // CTA sticky logic
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowCTA(true);
            } else {
                setShowCTA(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bienvenida">

            {/* HERO */}
            <section className="hero">
                <div className="hero__content reveal">
                    <h1>
                        Encuentra cargas. <br />
                        Llena tus viajes. <br />
                        <span>Gana más.</span>
                    </h1>

                    <p>
                        Conecta con empresas de mudanza en todo México y recibe oportunidades
                        automáticamente sin perder tiempo buscando.
                    </p>

                    <div className="hero__actions">
                        <button className="btn-primary" onClick={() => window.location.href = "https://app.mudanzafacil.com.mx/empresa/dashboard"}>
                            Comienza ahora
                        </button>
                    </div>
                </div>

                <div className="hero__image reveal delay-1">
                    <img src="/images/hero_02.png" alt="Plataforma Mudanza Fácil" className="hero__img" />
                </div>
            </section>

            {/* TUTORIAL */}
            <section className="tutorial">
                <h2 className="reveal">Empieza en minutos</h2>

                <div className="tutorial__block reveal">
                    <div className="tutorial__content">
                        <h3>1. Regístrate</h3>
                        <ul>
                            <li>Ingresa nombre de empresa, teléfono y correo</li>
                            <li>Crea tu contraseña</li>
                            <li>Verifica tu correo</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img
                            src="/images/registro.png"
                            alt="Registro de empresa"
                        />
                    </div>
                </div>

                <div className="tutorial__block reveal delay-1">
                    <div className="tutorial__content">
                        <h3>2. Crea un servicio</h3>
                        <ul>
                            <li>Ve a "Ofrezco" si tienes espacio disponible</li>
                            <li>O a "Busco" si necesitas transportar</li>
                            <li>Agrega origen, destino y fechas</li>
                            <li>Define el volumen y detalles</li>
                            <li>Publica en segundos</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img
                            src="/images/servicios.png"
                            alt="Crear servicio"
                        />
                    </div>
                </div>

                <div className="tutorial__block reveal delay-2">
                    <div className="tutorial__content">
                        <h3>3. Recibe oportunidades con Radar</h3>
                        <ul>
                            <li>El sistema detecta coincidencias automáticamente</li>
                            <li>No necesitas buscar todo el tiempo</li>
                            <li>Recibes oportunidades listas para contactar</li>
                            <li>Nuestro sistema detecta coincidencias entre servicios y te notifica
                                automáticamente cuando hay una oportunidad para ti.</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img
                            src="/images/radar.png"
                            alt="Radar de oportunidades"
                        />
                    </div>


                </div>

                <div className="tutorial__block reveal delay-3">
                    <div className="tutorial__content">
                        <h3>4. Contacta y cierra trato</h3>
                        <ul>
                            <li>Abre contacto con un clic</li>
                            <li>Se abre WhatsApp automáticamente</li>
                            <li>Negocian directo sin intermediarios</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img
                            src="/images/contacta.png"
                            alt="Contactar con oportunidades"
                        />
                    </div>
                </div>

                <div className="tutorial__block tutorial__block--highlight reveal delay-4">
                    <div className="tutorial__content">
                        <h3>Gana con contactos que no puedes tomar</h3>
                        <ul>
                            <li>¿Te contacta alguien pero no puedes hacer ese servicio?</li>
                            <li>En lugar de perderlo, envíalo a la plataforma</li>
                            <li>Nosotros lo convertimos en una solicitud de mudanza</li>
                            <li>Gana créditos cuando otras empresas compren ese contacto</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img src="/images/referidos.png" alt="Referir solicitudes de mudanza" />
                    </div>
                </div>
            </section>

            {/* SCREENSHOTS */}
            <section className="screenshots">
                <h2 className="reveal">Todo en un solo lugar</h2>

                <div className="screenshots__grid">

                    <div className="screenshot-card reveal">
                        <div className="screenshot-card__img">
                            <img src="/images/publicar.png" alt="Publicar servicio" />
                        </div>
                        <p>Publicar servicio</p>
                    </div>

                    <div className="screenshot-card reveal delay-1">
                        <div className="screenshot-card__img">
                            <img src="/images/buscar.png" alt="Buscar cargas" />
                        </div>
                        <p>Buscar cargas</p>
                    </div>

                    <div className="screenshot-card reveal delay-2">
                        <div className="screenshot-card__img">
                            <img src="/images/dashboard.png" alt="Dashboard" />
                        </div>
                        <p>Dashboard</p>
                    </div>

                </div>
            </section>

            {/* PAGOS */}
            <section className="pagos">
                <h2 className="reveal">💳 Suscripciones y pagos</h2>

                <p className="reveal delay-1">
                    Puedes mejorar tu cuenta con una suscripción para obtener más
                    oportunidades, publicaciones y beneficios dentro de la plataforma.
                </p>

                <div className="pagos__box reveal delay-2">
                    <h3>Modo prueba (sandbox)</h3>
                    <p>
                        Actualmente puedes probar los pagos sin costo real usando esta tarjeta:
                    </p>

                    <ul>
                        <li><strong>Tarjeta:</strong> 4242 4242 4242 4242</li>
                        <li><strong>Fecha:</strong> cualquiera futura</li>
                        <li><strong>CVV:</strong> cualquier número</li>
                        <li><strong>Nombre:</strong> cualquiera</li>
                    </ul>

                    <span>No se realizará ningún cobro real.</span>
                </div>
            </section>

            {/* CTA */}
            <section className="cta reveal">
                <h2>Empieza a generar oportunidades hoy</h2>
                <p>No pierdas más viajes vacíos.</p>

                <button className="btn-primary" onClick={() => window.location.href = "https://app.mudanzafacil.com.mx/empresa/dashboard"}>
                    Comienza ahora
                </button>
            </section>
        </div>
    );
}