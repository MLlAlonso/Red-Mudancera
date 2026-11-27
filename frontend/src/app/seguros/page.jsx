import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import FAQItem from "./FAQItem";
import SeguroClient from "./SeguroClient";
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
                        <div className="seguroHero__badge">
                            <span> MUDANZA</span>
                            <strong>FÁCIL</strong>
                            <span id="seguros">SEGUROS</span>
                        </div>

                        <h1 className="seguroHero__title">
                            Tu patrimonio va a viajar.
                            <span> Protégelo con un seguro a tu medida. </span>
                        </h1>

                        <p className="seguroHero__description">
                            Accede a una tarifa preferencial y recibe asesoría
                            personalizada para asegurar tus pertenencias, aunque
                            todavía estés cotizando tu empresa de mudanzas.
                        </p>
                    </div>

                    <div className="seguroHero__visual">
                        <img src="/images/hero_seguro.png" alt="Protección de pertenencias durante una mudanza" />
                    </div>
                </div>
            </section>

            <section className="seguroCaracteristicas">
                <div className="seguroCaracteristicas__container">

                    <article className="seguroCaracteristica">
                        <div className="seguroCaracteristica__icon">
                            <img src="/icons/seguro.png" alt="Póliza verificable" />
                        </div>

                        <h2>Póliza verificable</h2>
                    </article>

                    <article className="seguroCaracteristica">
                        <div className="seguroCaracteristica__icon">
                            <img src="/icons/doc-verificado.png" alt="Asesoría personalizada" />
                        </div>

                        <h2>Asesoría personalizada</h2>
                    </article>

                    <article className="seguroCaracteristica">
                        <div className="seguroCaracteristica__icon">
                            <img src="/icons/derechos.png" alt="tarifa preferencial" />
                        </div>

                        <h2>Tarifa preferencial</h2>
                    </article>
                </div>
            </section>

            <section className="seguroProceso">
                <div className="seguroProceso__container">
                    <div className="seguroProceso__heading">
                        <span className="seguroProceso__badge">
                            Así de sencillo
                        </span>

                        <h2 className="seguroProceso__title">
                            Proteger tu mudanza es más fácil
                        </h2>
                    </div>

                    <div className="seguroProceso__steps">
                        <article className="seguroProceso__step">
                            <div className="seguroProceso__number" id="stepUno" >
                                1
                            </div>

                            <div className="seguroProceso__content">
                                <h3>Habla con un asesor</h3>
                                <p> Te explicamos cómo funciona y calculamos cuánto puede costar. </p>
                            </div>
                        </article>

                        <article className="seguroProceso__step">
                            <div className="seguroProceso__number" id="stepDos" >
                                2
                            </div>

                            <div className="seguroProceso__content">
                                <h3>Elige tu empresa de mudanzas</h3>
                                <p> Toma tu decisión con tranquilidad, sin contratar todavía el seguro. </p>
                            </div>
                        </article>

                        <article className="seguroProceso__step">
                            <div className="seguroProceso__number" id="stepTres" >
                                3
                            </div>

                            <div className="seguroProceso__content">
                                <h3>Contrata cuando estés listo</h3>
                                <p> Te ayudamos con los datos necesarios y realizas el pago directo a la empresa aseguradora. </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="seguroPrecios">
                <div className="seguroPrecios__container">
                    <div className="seguroPrecios__heading">
                        <h2 className="seguroPrecios__title">
                            Misma protección, menor costo
                        </h2>

                        <p className="seguroPrecios__subtitle">
                            Póliza con las mismas coberturas y condiciones.
                        </p>
                    </div>

                    <div className="seguroPrecios__comparison">
                        <article className="seguroPrecio seguroPrecio--preferencial">
                            <div className="seguroPrecio__content">
                                <h3 className="seguroPrecio__title">
                                    Tarifa preferencial Mudanza Fácil
                                </h3>

                                <strong className="seguroPrecio__amount">
                                    $1,350
                                </strong>

                                <p className="seguroPrecio__description">
                                    por cada $100,000 asegurados
                                </p>

                                <span className="seguroPrecio__percentage">
                                    1.35% del valor asegurado
                                </span>
                            </div>

                            <div className="seguroPrecio__footer">
                                <img src="/logo/chubb.png" id="chubb" alt="" />
                                <span> Pago directo a la empresa aseguradora </span>
                            </div>
                        </article>

                        <article className="seguroPrecio seguroPrecio--referencia">
                            <div className="seguroPrecio__content">
                                <h3 className="seguroPrecio__title">
                                    Otras tarifas de referencia en empresas de mudanza
                                </h3>

                                <strong className="seguroPrecio__amount" id="other_amount">
                                    $2,500 - $3,500
                                </strong>

                                <p className="seguroPrecio__description">
                                    por cada $100,000 asegurados
                                </p>

                                <span className="seguroPrecio__percentage">
                                    2.5% - 3.5% del valor asegurado
                                </span>
                            </div>

                            <div className="seguroPrecio__footer seguroPrecio__footer--muted">
                                <img src="icons/prohibicion.png" alt="" />
                                <span> Con intermediarios </span>
                            </div>
                        </article>
                    </div>

                    <div className="seguroPrecios__saving">
                        <div className="seguroPrecios__savingIcon">
                            <img src="icons/credito.png" alt="" />
                        </div>

                        <div className="seguroPrecios__savingContent">
                            <span className="seguroPrecios__savingLabel">
                                Ahorro potencial en este ejemplo
                            </span>

                            <strong className="seguroPrecios__savingAmount">
                                $1,150 - $2,150
                            </strong>
                        </div>
                    </div>

                    <div className="seguroPrecios__disclaimer">
                        <img src="icons/advertencia.png" alt="" />
                        <span> Comparación con coberturas y condiciones equivalentes. </span>
                    </div>
                </div>
            </section>

            <section className="seguroCtaFinal">
                <div className="seguroCtaFinal__container">
                    <div className="seguroCtaFinal__heading">
                        <h2>¿Quieres más información?</h2>
                        <p>Elige cómo prefieres que te atendamos.</p>
                    </div>

                    <div className="seguroCtaFinal__actions">
                        <div className="seguroCtaFinal__action">
                            <Suspense fallback={null}>
                                <SeguroClient action="whatsapp" />
                            </Suspense>
                        </div>

                        <div className="seguroCtaFinal__action">
                            <Suspense fallback={null}>
                                <SeguroClient action="agenda" />
                            </Suspense>
                        </div>
                    </div>

                    <p className="seguroCtaFinal__note">
                        Sin compromiso
                    </p>

                    <p className="seguroCtaFinal__copyright">
                        © {new Date().getFullYear()} Mudanza Fácil. Todos los derechos reservados.
                    </p>
                </div>
            </section>
        </div>
    );
}