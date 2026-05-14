"use client";

import { useEffect } from "react";
import "@/styles/pages/empresa/_empresaBienvenida.scss";

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

    return (
        <div className="empresa-bienvenida">

            {/* HERO */}
            <section className="hero">
                <div className="hero__bg"></div>

                {/* LEFT */}
                <div className="hero__content reveal">
                    <h1>
                        ¡Bienvenido a <span>Mudanza Fácil</span>!
                    </h1>

                    <div className="hero__badge">
                        <span>
                            Tu cuenta fue creada correctamente
                        </span>

                        <img src="/icons/check_success.png" alt="Cuenta creada" />
                    </div>

                    <p>
                        Mudanza Fácil conecta empresas de mudanzas con
                        oportunidades reales de carga, rutas y clientes en todo México.
                    </p>

                    <p>
                        Antes de comenzar, aquí te mostramos cómo funciona la
                        plataforma y qué necesitas para activar tu acceso completo.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="hero__visual reveal delay-1">
                    <div className="hero-card">
                        <img src="/logo/logo.png" alt="Mudanza Fácil" />
                    </div>
                </div>
            </section>

            {/* STEPS*/}
            <section className="step-section">
                <div className="step-card reveal">

                    {/* LEFT */}
                    <div className="step-card__content">
                        <div className="step-card__badge">
                            01
                        </div>

                        <h2>
                            ¿Cómo funciona Mudanza Fácil?
                        </h2>

                        <div className="step-card__subtitle">
                            <div className="step-card__icon">
                                <img src="/icons/busco.png" alt="Radar" />
                            </div>

                            <span>
                                Encuentra oportunidades reales dentro de la red
                            </span>
                        </div>

                        <ul className="step-card__list">
                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Comprar contactos de clientes interesados
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Publicar cargas disponibles
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Encontrar empresas por ruta
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Detectar coincidencias automáticamente
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Acceder a contactos exclusivos
                                </span>
                            </li>
                        </ul>

                        <p className="step-card__footer">
                            Solo trabajamos con empresas verificadas para mantener
                            una red profesional y funcional.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="step-card__video">
                        <div className="step-card__video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/17ozSeGw-fY"
                                title="Cómo funciona Mudanza Fácil"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="step-card reveal">
                    {/* LEFT */}
                    <div className="step-card__content">
                        <div className="step-card__badge">
                            02
                        </div>

                        <h2>
                            Explora la plataforma
                        </h2>

                        <div className="step-card__subtitle">
                            <div className="step-card__icon">
                                <img src="/icons/default-user.png" alt="Radar" />
                            </div>

                            <span>
                                Actualmente tu cuenta se encuentra en modo Explorador
                            </span>
                        </div>

                        <ul className="step-card__list">
                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Explora la app
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Ver oportunidades disponibles
                                </span>
                            </li>

                            <li>
                                <img src="/icons/check_success.png" alt="check" />

                                <span>
                                    Conoce las herramientas y módulos
                                </span>
                            </li>
                        </ul>

                        <p className="step-card__footer">
                            Entra y conoce cómo funciona nuestra plataforma, verfica tu cuenta para activar tu acceso completo.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="step-card__locked">
                        <div className="step-card__locked-box">
                            <div className="step-card__locked-header">
                                <div className="step-card__locked-icon">
                                    <img src="/icons/candado.png" alt="Bloqueado" />
                                </div>

                                <h3>
                                    No disponible aún:
                                </h3>
                            </div>

                            <ul className="step-card__locked-list">
                                <li>
                                    Comprar contactos
                                </li>

                                <li>
                                    Publicar cargas
                                </li>

                                <li>
                                    Contactar empresas
                                </li>
                            </ul>

                            <p className="step-card__locked-footer">
                                Estas funciones se desbloquean al verificar tu cuenta.
                            </p>
                        </div>

                        <button className="step-card__button" onClick={() => window.location.href = "/empresa/dashboard"} >
                            <span>
                                Entra y explora
                            </span>

                            <img src="/icons/arrow_down.png" alt="Ir" />
                        </button>
                    </div>
                </div>

                <div className="step-card reveal">
                    {/* LEFT */}
                    <div className="step-card__content">
                        <div className="step-card__badge">
                            03
                        </div>

                        <h2>
                            Verifica tu empresa
                        </h2>

                        <div className="step-card__subtitle">
                            <div className="step-card__icon">
                                <img src="/icons/verificado.png" alt="Verificado" />
                            </div>

                            <span>
                                Para proteger la red y garantizar contactos reales, necesitamos validar tu empresa
                            </span>
                        </div>

                        <ul className="step-card__list">
                            <li>
                                <span>
                                    La validación ayuda a mantener una comunidad más segura, profesional y confiable para todos
                                </span>
                            </li>
                        </ul>

                        <div className="step-card__footer step-card__footer--with-image">
                            <img src="/icons/reloj_de_arena.png" alt="Tiempo de validación" />

                            <span>
                                El proceso normalmente toma menos de 24 horas hábiles
                            </span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="step-card__locked">
                        <div className="step-card__image-box">
                            <img src="/images/verificarCuenta.png" alt="Verificación empresa" />
                        </div>

                        <button className="step-card__button" onClick={() => window.location.href = "/empresa/planes"} >
                            <span>
                                Verificar cuenta
                            </span>

                            <img src="/icons/arrow_down.png" alt="Ir" />
                        </button>
                    </div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="beneficios">
                <h2 className="reveal">
                    ¿Qué desbloqueas al verificar tu cuenta?
                </h2>

                <div className="beneficios__grid">
                    {/* CARD */}
                    <article className="beneficio-card reveal">
                        <div className="beneficio-card__icon">
                            <img src="/icons/cliente.png" alt="Contactos" />
                        </div>

                        <h3>
                            Comprar contactos
                        </h3>

                        <p>
                            de clientes interesados
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-1">
                        <div className="beneficio-card__icon">
                            <img src="/icons/busco.png" alt="Busco" />
                        </div>

                        <h3>
                            Publicar cargas
                        </h3>

                        <p>
                            y encontrar empresas
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-2">
                        <div className="beneficio-card__icon">
                            <img src="/icons/team.png" alt="Contactar" />
                        </div>

                        <h3>
                            Contactar empresas
                        </h3>

                        <p>
                            de mudanzas verificadas
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-3">
                        <div className="beneficio-card__icon">
                            <img src="/icons/notificacion.png" alt="notificacion" />
                        </div>

                        <h3>
                            Recibir alertas de rutas
                        </h3>

                        <p>
                            y coincidencias automáticas
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-4">
                        <div className="beneficio-card__icon">
                            <img src="/icons/suscripcion.png" alt="Leads" />
                        </div>

                        <h3>
                            Acceder a contactos exclusivos
                        </h3>

                        <p>
                            de la red
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-1">
                        <div className="beneficio-card__icon">
                            <img src="/icons/conector.png" alt="Visibilidad" />
                        </div>

                        <h3>
                            Participar en la red completa
                        </h3>

                        <p>
                            y aumentar tu visibilidad
                        </p>
                    </article>

                    {/* CARD */}
                    <article className="beneficio-card reveal delay-2">
                        <div className="beneficio-card__icon">
                            <img src="/icons/talento.png" alt="Negocio" />
                        </div>

                        <h3>
                            Impulsa tu negocio
                        </h3>

                        <p>
                            con más oportunidades
                        </p>
                    </article>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bienvenida-footer">
                <div className="bienvenida-footer__content">
                    <div className="bienvenida-footer__top">
                        <div className="bienvenida-footer__icon">
                            <img src="/icons/verificado.png" alt="Verificado" />
                        </div>

                        <p>
                            En Mudanza Fácil trabajamos para que tu empresa crezca con seguridad, confianza y oportunidades reales.
                        </p>
                    </div>

                    <strong>
                        ¡Gracias por ser parte de nuestra red!
                    </strong>
                </div>
            </footer>
        </div>
    );
}