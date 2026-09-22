import Footer from "@/components/layout/Footer";
import SeguroClient from "./SeguroClient";
import { Suspense } from "react";
import FAQItem from "./FAQItem";
import "@/styles/pages/_seguros.scss";

export const metadata = {
    title: "Seguro para Mudanza en México | Mudanza Fácil",
    description: "Protege tu mudanza con una póliza formal y verificable, tarifa preferencial y expediente digital. Inicia hoy y completa los detalles después.",

    authors: [
        {
            name: "Mudanza Fácil",
            url: "https://app.mudanzafacil.com.mx",
        },
    ],

    creator: "Mudanza Fácil",
    publisher: "Mudanza Fácil",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    alternates: {
        canonical: "https://app.mudanzafacil.com.mx/seguros",
    },

    openGraph: {
        title: "Seguro para Mudanza en México | Tarifa Preferencial",
        description: "Obtén una póliza formal y verificable para tu mudanza, con tarifa preferencial y expediente digital. Empieza hoy y completa los detalles después.",
        url: "https://app.mudanzafacil.com.mx/seguros",
        siteName: "Mudanza Fácil",
        locale: "es_MX",
        type: "website",

        images: [
            {
                url: "https://app.mudanzafacil.com.mx/images/hero_02.png",
                width: 1200,
                height: 630,
                alt: "Seguro para mudanza en México - Mudanza Fácil",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Seguro para Mudanza en México | Tarifa Preferencial",
        description: "Póliza formal y verificable, tarifa preferencial y expediente digital para proteger tu mudanza.",
        images: ["https://app.mudanzafacil.com.mx/images/hero_02.png",],
    },
};

export default function SegurosPage() {
    return (
        <div className="seguros">
            <section className="seguroHero">
                <div className="seguroHero__container">
                    <div className="seguroHero__content">
                        <span className="seguroHero__badge">
                            MUDANZA <strong>FÁCIL</strong>  <strong id="seguros">SEGUROS</strong>
                        </span>

                        <h1 className="seguroHero__title">
                            <span>Tu patrimonio va a viajar</span>
                            <br />
                            Ten la certeza de que está protegido.
                        </h1>

                        <p className="seguroHero__description">
                            Obtén una póliza formal y verificable para tu mudanza,
                            con tarifa preferencial y un expediente digital que puedes
                            comenzar hoy, aunque todavía estés organizando los detalles.
                        </p>

                        <div className="seguroHero__action">
                            <Suspense>
                                <SeguroClient />
                            </Suspense>
                        </div>

                        <p className="seguroHero__note">
                            Sin compromiso, puedes empezar aunque todavía no tengas todos los datos.
                        </p>
                    </div>

                    <div className="seguroHero__visual">
                        <img src="/images/hero_seguro.png" alt="Protección para tu mudanza" />
                    </div>
                </div>
            </section>

            <section className="seguroCaracteristicas">
                <div className="seguroCaracteristicas__container">
                    <article className="seguroCaracteristica seguroCaracteristica--dual">
                        <div className="seguroCaracteristica__icons">
                            <div className="seguroCaracteristica__icon">
                                <img src="/icons/doc-verificado.png" alt="Póliza verificable" />
                            </div>

                            <div className="seguroCaracteristica__divider" />

                            <div className="seguroCaracteristica__icon" id="chubb">
                                <img src="/logo/chubb.png" alt="Seguro verificado" />
                            </div>
                        </div>

                        <div className="seguroCaracteristica__content">
                            <h2>Póliza verificable</h2>
                            <p>Consulta y valida tu póliza en todo momento.</p>
                        </div>
                    </article>

                    <article className="seguroCaracteristica">
                        <div className="seguroCaracteristica__icon">
                            <img src="/icons/docs.png" alt="Expediente digital" />
                        </div>

                        <div className="seguroCaracteristica__content">
                            <h2>Expediente digital</h2>
                            <p> Tu información segura, en un solo lugar. </p>
                        </div>
                    </article>

                    <article className="seguroCaracteristica">
                        <div className="seguroCaracteristica__icon">
                            <img src="/icons/verificado.png" alt="Proceso sencillo" />
                        </div>

                        <div className="seguroCaracteristica__content">
                            <h2>Proceso sencillo</h2>
                            <p> Rápido, claro y sin complicaciones. </p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="seguroProceso">
                <div className="seguroProceso__container">
                    <span className="seguroProceso__badge">
                        ASÍ DE SENCILLO
                    </span>

                    <h2 className="seguroProceso__title">
                        Empieza hoy. Completa después.
                    </h2>

                    <div className="seguroProceso__steps">
                        <article className="seguroProceso__step">
                            <span className="seguroProceso__number" id="stepUno">
                                1
                            </span>

                            <div className="seguroProceso__content">
                                <h3> Inicia tu expediente </h3>
                                <p> Elige qué quieres proteger: Menaje, Menaje + Auto o Sólo Auto. </p>
                            </div>
                        </article>

                        <article className="seguroProceso__step">
                            <span className="seguroProceso__number">
                                2
                            </span>

                            <div className="seguroProceso__content">
                                <h3> Completa la información a tu ritmo </h3>
                                <p> Tu empresa de mudanza puede completar la información operativa mediante un enlace privado. </p>
                            </div>
                        </article>

                        <article className="seguroProceso__step">
                            <span className="seguroProceso__number" id="stepTres">
                                3
                            </span>

                            <div className="seguroProceso__content">
                                <h3> Recibe tu póliza </h3>
                                <p> Una vez confirmados los datos, recibes tu póliza formal para el traslado. </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="seguroBeneficios">
                <div className="seguroBeneficios__container">
                    <div className="seguroBeneficios__heading">
                        <span className="seguroBeneficios__badge">
                            TU TRANQUILIDAD, PRIMERO
                        </span>

                        <h2> Beneficios que te dan más tranquilidad </h2>
                    </div>

                    <div className="seguroBeneficios__columns">
                        <div className="seguroBeneficios__column">
                            <article className="seguroBeneficioCard">
                                <div className="seguroBeneficioCard__check">
                                    ✓
                                </div>

                                <div className="seguroBeneficioCard__content">
                                    <h3> Póliza formal y verificable </h3>
                                    <p> Respaldo real para tu patrimonio. </p>
                                </div>
                            </article>

                            <article className="seguroBeneficioCard">
                                <div className="seguroBeneficioCard__check">
                                    ✓
                                </div>

                                <div className="seguroBeneficioCard__content">
                                    <h3> Tarifa preferencial </h3>
                                    <p> Por ser parte de Mudanza Fácil. </p>
                                </div>
                            </article>
                        </div>

                        <div className="seguroBeneficios__column">
                            <article className="seguroBeneficioCard">
                                <div className="seguroBeneficioCard__check">
                                    ✓
                                </div>

                                <div className="seguroBeneficioCard__content">
                                    <h3> Pago directo a la aseguradora </h3>
                                    <p> Sin intermediarios en el pago. </p>
                                </div>
                            </article>

                            <article className="seguroBeneficioCard">
                                <div className="seguroBeneficioCard__check">
                                    ✓
                                </div>

                                <div className="seguroBeneficioCard__content">
                                    <h3> Acompañamiento en el proceso </h3>
                                    <p> Estamos contigo en cada etapa. </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section className="seguroPrecios">
                <div className="seguroPrecios__container">
                    <h2 className="seguroPrecios__title">
                        Más certeza no significa pagar más
                    </h2>

                    <div className="seguroPrecios__comparison">
                        <div className="seguroPrecio seguroPrecio--preferencial">
                            <p className="seguroPrecio__label">
                                Tarifa preferencial
                            </p>

                            <span className="seguroPrecio__tag">
                                Mudanza Fácil
                            </span>

                            <strong className="seguroPrecio__amount">
                                desde $1,350 
                            </strong>

                            <span className="seguroPrecio__currency">
                                por cada $100,000 asegurados
                            </span>
                        </div>

                        <div className="seguroPrecio seguroPrecio--referencia">
                            <p className="seguroPrecio__label">
                                Lo que cobran las empresas de mudanza
                            </p>

                            <span className="seguroPrecio__tag">
                                de referencia
                            </span>

                            <strong className="seguroPrecio__amount" id="amountMuted">
                                $2,500 – $3,500
                            </strong>

                            <span className="seguroPrecio__currency">
                                por cada $100,000 asegurados
                            </span>
                        </div>

                    </div>

                    <p className="seguroPrecios__disclaimer">
                        Precios de referencia. El costo final y la protección dependen
                        de la cotización, los bienes y las condiciones de la póliza.
                    </p>
                </div>
            </section>

            <section className="seguroCtaFinal">
                <div className="seguroCtaFinal__container">
                    <div className="seguroCtaFinal__content">
                        <h2>
                            Tu próximo comienzo, <br /> con más tranquilidad.
                        </h2>

                        <p> Protege tu mudanza con un proceso claro, sencillo y verificable. </p>
                    </div>

                    <div className="seguroCtaFinal__action">
                        <Suspense>
                            <SeguroClient />
                        </Suspense>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}