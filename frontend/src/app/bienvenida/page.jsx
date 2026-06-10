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
                <div className="hero__bg"></div>
                <div className="hero__content reveal">
                    <div className="hero__logo">
                        <img src="/logo/logo.png" alt="Mudanza Fácil" />
                    </div>

                    <div className="hero__badge">
                        Bienvenido a MudanzaFacil, plataforma para empresas de mudanza
                    </div>

                    <h1>
                        Encuentra cargas. <br />
                        Llena tus viajes. <br />
                        <span>Gana más.</span>
                    </h1>

                    <p>
                        Conecta con empresas de mudanza en todo México y recibe
                        oportunidades automáticamente mediante nuestro sistema Radar.
                    </p>

                    <div className="hero__stats">
                        <div className="hero-stat">
                            <strong>+Más oportunidades</strong>
                            <span>Sin buscar manualmente</span>
                        </div>

                        <div className="hero-stat">
                            <strong>Radar inteligente</strong>
                            <span>Coincidencias automáticas</span>
                        </div>

                        <div className="hero-stat">
                            <strong>Menos viajes vacíos</strong>
                            <span>Optimiza tus rutas</span>
                        </div>

                    </div>

                    <div className="hero__actions">
                        <a href="#tutorial" className="btn-secondary">
                            Ver cómo funciona
                        </a>

                        <button className="btn-primary" onClick={() => window.location.href = "/empresa/register"} >
                            Comienza ahora
                        </button>
                    </div>
                </div>

                <div className="hero__visual reveal delay-1">
                    <div className="hero-card hero-card--main">
                        <img
                            src="/images/dashboard.png"
                            alt="Dashboard Mudanza Fácil"
                        />
                    </div>

                    <div className="hero-floating hero-floating--1">
                        ⚡ Nueva oportunidad detectada
                    </div>

                    <div className="hero-floating hero-floating--2">
                        🚚 CDMX → Monterrey
                    </div>

                    <div className="hero-floating hero-floating--3">
                        📦 Espacio disponible encontrado
                    </div>
                </div>
            </section>

            {/* TUTORIAL */}
            <section className="tutorial" id="tutorial">
                <h2 className="reveal">Empieza en minutos</h2>

                <div className="tutorial__block reveal">
                    <div className="tutorial__content">
                        <h3>1. Activa tu cuenta y prueba Radar</h3>

                        <ul>
                            <li>Ten listos tus documentos oficiales <span>(RFC, Constancia Fiscal, Comprobante de domicilio)</span></li>
                            <li>Ve a "Mi suscripción" dentro de tu dashboard</li>
                            <li><strong>Activa tu prueba gratuita</strong></li>
                            <li>Empieza a recibir oportunidades automáticamente</li>
                        </ul>
                    </div>

                    <div className="tutorial__img-wrapper">
                        <img
                            src="/images/prueba.png"
                            alt="Activar prueba gratuita"
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
                            <li><strong>Publica en segundos</strong></li>
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
                            <li>Recibes oportunidades listas para contactar</li>
                            <li>No necesitas buscar todo el tiempo</li>
                            <li><strong>El sistema detecta coincidencias automáticamente</strong></li>
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
                            <li>Abre <strong>contacto con un clic</strong></li>
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
                            <li><strong>Gana créditos</strong> cuando otras empresas compren ese contacto</li>
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
                    <div className="screenshot-card reveal delay-2">
                        <div className="screenshot-card__img">
                            <img src="/images/dashboard.png" alt="Dashboard" />
                        </div>
                        <p>Inicio</p>
                    </div>

                    <div className="screenshot-card reveal">
                        <div className="screenshot-card__img">
                            <img src="/images/publicar.png" alt="Publicar servicio" />
                        </div>
                        <p>Publicar servicio</p>
                    </div>

                    <div className="screenshot-card reveal delay-2">
                        <div className="screenshot-card__img">
                            <img src="/images/perfil.png" alt="Mi perfil" />
                        </div>
                        <p>Gestiona tu perfil</p>
                    </div>

                    <div className="screenshot-card reveal delay-2">
                        <div className="screenshot-card__img">
                            <img src="/images/reseña.png" alt="Reseñas" />
                        </div>
                        <p>Que no falten tus reseñas</p>
                    </div>

                    <div className="screenshot-card reveal">
                        <div className="screenshot-card__img">
                            <img src="/images/creditos.png" alt="Créditos" />
                        </div>
                        <p>Adquiere créditos</p>
                    </div>

                    <div className="screenshot-card reveal delay-1">
                        <div className="screenshot-card__img">
                            <img src="/images/planes.png" alt="Buscar cargas" />
                        </div>
                        <p>Administra tus suscripciones</p>
                    </div>
                </div>
            </section>

            {/* PAGOS */}
            <section className="pagos">

                <h2 className="reveal">
                    Pagos seguros y suscripciones flexibles
                </h2>

                <p className="reveal delay-1">
                    Activa tu prueba gratuita del Plan Radar y comienza a recibir
                    oportunidades automáticamente. Puedes cancelar en cualquier momento.
                </p>

                <div className="pagos__grid">
                    <div className="pagos__card reveal delay-2">
                        <div className="pagos__icon">
                            🔒
                        </div>

                        <h3>Pagos 100% seguros</h3>

                        <p>
                            Todos los pagos son procesados directamente por Stripe,
                            una de las plataformas de pago más utilizadas y seguras del mundo.
                        </p>
                    </div>

                    <div className="pagos__card reveal delay-3">
                        <div className="pagos__icon">
                            💳
                        </div>

                        <h3>No almacenamos tarjetas</h3>

                        <p>
                            Tu información bancaria nunca es almacenada en nuestra plataforma.
                            Todo el proceso de pago se realiza de forma segura mediante Stripe.
                        </p>
                    </div>

                    <div className="pagos__card reveal delay-4">
                        <div className="pagos__icon">
                            ⚡
                        </div>

                        <h3>Prueba gratuita disponible</h3>

                        <p>
                            Activa tu prueba del Plan Radar y descubre oportunidades,
                            coincidencias automáticas y más beneficios para tu empresa.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta reveal">
                <h2>Empieza a generar oportunidades hoy</h2>
                <p>No pierdas más viajes vacíos.</p>

                <button className="btn-primary" onClick={() => window.location.href = "/empresa/register"}>
                    Comienza ahora
                </button>
            </section>
        </div>
    );
}