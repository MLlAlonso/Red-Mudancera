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

                <div className="seguroCaracteristicas__action">
                    <Suspense>
                        <SeguroClient />
                    </Suspense>

                    <p className="seguroCaracteristicas__note">
                        Gracias a nuestro acuerdo con Chubb, accede a <strong> tarifas preferenciales </strong> para proteger tu mudanza.
                        <br />
                        Sin compromiso y aunque todavía no tengas todos los datos.
                    </p>

                    <div className="seguro-publico__insurance-company">
                        <span>La cobertura de seguro es respaldada por</span>
                        <img src="/logo/chubb_logo.png" alt="Chubb" />
                    </div>
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

            <section className="seguroPrecios">
                <div className="seguroPrecios__container">
                    <div className="seguroPrecios__heading">
                        <h2 className="seguroPrecios__title">
                            Tarifa preferencial
                        </h2>

                        <span className="seguroPrecios__badge">
                            Incluye IVA
                        </span>
                    </div>

                    <div className="seguroPrecios__intro">
                        <h3>
                            Misma protección, menor costo.
                        </h3>

                        <p>
                            Comparamos una cobertura equivalente con las mismas condiciones de póliza,
                            para que tengas la misma protección y pagues menos.
                        </p>
                    </div>

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
                                <br />
                                (1.35% del valor asegurado)
                            </span>

                            <div className="seguroPrecio__footer">
                                <span className="seguroPrecio__footerIcon">
                                    <img src="/icons/check_success.png" alt="" aria-hidden="true" />
                                </span>

                                <span>Pago directo a CHUBB</span>
                            </div>
                        </div>

                        <div className="seguroPrecio seguroPrecio--referencia">
                            <p className="seguroPrecio__label">
                                Lo que cobran las empresas de mudanza
                            </p>

                            <span className="seguroPrecio__tag">
                                de referencia
                            </span>

                            <strong className="seguroPrecio__amount" id="amountMuted"  >
                                $2,500 – $3,500
                            </strong>

                            <span className="seguroPrecio__currency">
                                por cada $100,000 asegurados <br /> (2.5% - 3.5% del valor asegurado)
                            </span>

                            <div className="seguroPrecio__footer seguroPrecio__footer--muted">
                                <span className="seguroPrecio__footerIcon">
                                    <img src="/icons/prohibicion.png" alt="" aria-hidden="true" />
                                </span>

                                <span>Con intermediarios</span>
                            </div>
                        </div>
                    </div>

                    <div className="seguroPrecios__example">
                        <div className="seguroPrecios__exampleIcon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#2563EB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M12 3 2.8 19a1.5 1.5 0 0 0 1.3 2.2h15.8a1.5 1.5 0 0 0 1.3-2.2L12 3Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                            </svg>
                        </div>


                        <div className="seguroPrecios__exampleContent">
                            <h3>Este es solo un ejemplo</h3>

                            <p> El costo de tu seguro se calcula según el valor que deseas asegurar. </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="seguroBeneficios">
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
                                    <h3> Tarifa preferencial </h3>
                                    <p> Por ser parte de Mudanza Fácil. </p>
                                </div>
                            </article>

                            <article className="seguroBeneficioCard">
                                <div className="seguroBeneficioCard__check">
                                    ✓
                                </div>

                                <div className="seguroBeneficioCard__content">
                                    <h3> Póliza formal y verificable </h3>
                                    <p> Respaldo real para tu patrimonio. </p>
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
            </section> */}

            <section className="seguroCtaFinal">
                <div className="seguroCtaFinal__container">
                    <div className="seguroCtaFinal__content">
                        <h2> Tu próximo comienzo, <br /> con más tranquilidad. </h2>
                        <p>  Protege tu mudanza con un proceso claro, sencillo y verificable. </p>
                    </div>

                    <div className="seguroCtaFinal__actionWrapper">
                        <div className="seguroCtaFinal__action">
                            <Suspense>
                                <SeguroClient />
                            </Suspense>
                        </div>

                        <p className="seguroCtaFinal__note">
                            Sin compromiso. Recibirás información por correo.
                        </p>
                    </div>
                </div>

                <div className="seguroCtaFinal__copyright">
                    © {new Date().getFullYear()} Mudanza Fácil
                </div>
            </section>
        </div>
    );
}