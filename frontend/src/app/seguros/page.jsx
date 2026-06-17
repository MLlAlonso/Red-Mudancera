import Footer from "@/components/layout/Footer";
import SeguroClient from "./SeguroClient";
import { Suspense } from "react";
import FAQItem from "./FAQItem";
import "@/styles/pages/_seguros.scss";

export const metadata = {
    title: "Seguro para Mudanza | Protege tus pertenencias",
    description:
        "Protege tu mudanza con tarifa preferencial. Obtén cobertura para tus pertenencias y evita pérdidas económicas durante tu traslado.",
};

export default function SegurosPage() {
    const faqs = [
        {
            q: "¿Estoy obligado a contratar esta protección?",
            a: "No. Es una opción adicional para que conozcas una alternativa de protección.",
        },
        {
            q: "¿El beneficio es sólo económico?",
            a: "No, también te brinda tranquilidad y respaldo durante tu mudanza, permite a un experto que te lo explique, sin compromiso.",
        },
        {
            q: "¿Mudanza Fácil ofrece el seguro?",
            a: "No. El servicio es proporcionado directamente por la aseguradora. Mudanza Fácil solo facilita el acceso a condiciones preferenciales.",
        },
        {
            q: "¿Cuál es el costo?",
            a: "La tarifa preferencial es desde 1.25% del valor declarado, por debajo del promedio del mercado. Ejemplo si aseguras directo con la empresa que contrates puedes llegar a pagar por un valor declarado de 120,000 hasta $3,000.00 pesos Con la tarifa preferencial tendrías un ahorro directo de 1,500 pesos.",
        },
        {
            q: "¿Qué pasa si solo quiero informarme?",
            a: "Sin ningún problema, es simplememente una benefico que ponemos al alcance a nuestros clientes que nos contáctan, no existe ninguna obligación de contratar el seguro.",
        },
        {
            q: "¿Puedo usar este beneficio aunque no contrate en la plataforma?",
            a: "Por supuesto, el benefico ya es tuyo, tan solo por confiar en Mudanzafacil, puedes acceder a esta protección independientemente del proveedor que elijas.",
        },
    ];

    return (
        <div className="seguros">
            <section className="seguroHero">
                <div className="seguroHero__container">
                    <div className="seguroHero__content">
                        <h1>
                            Protege tu mudanza con una tarifa preferencial exclusiva
                        </h1>

                        <p>
                            Si te adelantas a la información, tendrás más control, certeza y tranquilidad
                        </p>
                    </div>

                    <div className="seguroHero__image">
                        <img src="/images/hero_seguro.png" alt="Seguro para mudanza" />
                    </div>
                </div>
            </section>

            <section className="seguroComparativa">
                <div className="seguroComparativa__container">
                    <div className="seguroComparativa__table">
                        <div className="seguroComparativa__header">
                            Protección por $100,000
                        </div>

                        <div className="seguroComparativa__body">
                            <div className="seguroComparativa__column seguroComparativa__column--preferencial">
                                <span>
                                    Tarifa preferencial Mudanza Fácil
                                </span>

                                <strong>
                                    $1,250
                                </strong>
                            </div>

                            <div className="seguroComparativa__column">
                                <span>
                                    Tarifas tradicionales
                                </span>

                                <strong>
                                    $2,500 a $3,500
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="seguroBeneficio">
                        <div className="seguroBeneficio__icon">
                            <img src="/icons/calendario.png" alt="Protección" />
                        </div>

                        <div className="seguroBeneficio__content">
                            Infórmate antes y viaja con{" "}
                            <strong>
                                más tranquilidad y confianza
                            </strong>
                        </div>
                    </div>

                </div>
            </section>

            <section className="ctaBottom">
                <Suspense fallback={<div></div>}>
                    <SeguroClient />
                </Suspense>
            </section>

            <section className="seguroVentajas">
                <ul className="seguroVentajas__list">
                    <li>
                        <img src="/icons/credito.png" alt="" />
                        <span>Tarifa preferencial exclusiva</span>
                    </li>

                    <li>
                        <img src="/icons/verificado.png" alt="" />
                        <span>Certeza de que la protección fue emitida</span>
                    </li>

                    <li>
                        <img src="/icons/truck.png" alt="" />
                        <span>Mayor visibilidad sobre tu traslado</span>
                    </li>

                    <li>
                        <img src="/icons/doc-verificado.png" alt="" />
                        <span>Más transparencia durante el proceso</span>
                    </li>

                    <li>
                        <img src="/icons/telefono.png" alt="" />
                        <span>Atención directa con un especialista</span>
                    </li>
                </ul>

                <div className="seguroInfo">
                    <div className="seguroInfo__icon">
                        <img src="/icons/verificado.png" alt="Protección" />
                    </div>

                    <div className="seguroInfo__content">
                        <h3>
                            Tu mudanza representa años de esfuerzo
                        </h3>

                        <p>
                            Tomarte unos minutos para conocer esta alternativa puede ayudarte
                            a tomar decisiones más informadas y proteger lo que más te importa.
                        </p>
                    </div>
                </div>
            </section>

            <section className="seguroFinalCtas">
                <div className="seguroFinalCta seguroFinalCta--primary">
                    <div className="seguroFinalCta__icon">
                        <img src="/icons/dialogo.png" alt="Información" />
                    </div>

                    <div className="seguroFinalCta__content">
                        <h3>Quiero más información sin compromiso</h3>

                        <p>
                            Un especialista podrá resolver tus dudas y explicarte cómo funciona.
                        </p>
                    </div>
                </div>
            </section>

            {/* <section className="faq">
                <div className="faq__container">
                    {faqs.map((item, index) => (
                        <FAQItem key={index} item={item} />
                    ))}
                </div>
            </section> */}

            <section className="ctaBottom">
                <Suspense fallback={<div></div>}>
                    <SeguroClient />
                </Suspense>
            </section>

            <Footer />
        </div>
    );
}