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
                            Tu solicitud se está publicando en la plataforma
                        </h1>

                        <p>
                            En breve recibirás un correo con los detalles de tu solicitud.
                            <br />
                            Mientras tanto, puedes aprovechar un beneficio adicional para tu mudanza.
                        </p>
                    </div>

                    <div className="seguroHero__image">
                        <img src="/images/hero_seguro.png" alt="Seguro para mudanza" />
                    </div>
                </div>
            </section>

            <section className="seguroInfo">
                <div className="seguroInfo__container">
                    <div className="seguroInfo__header">
                        <h2>Protege tu mudanza con tarifa preferencial</h2>
                        <p className="subtitulo">
                            Muchas personas asumen que su mudanza ya cuenta con protección, pero no siempre conocen los detalles.
                        </p>
                    </div>

                    <div className="seguroInfo__textWithLine">
                        <blockquote></blockquote>

                        <p>
                            Tienes acceso a una <strong>protección con tarifa preferencial exclusiva</strong>.
                        </p>
                    </div>

                    <div className="seguroInfo__highlight">
                        💡 Por solo <strong>$1,250</strong> protege hasta <strong>$100,000</strong>
                    </div>

                    <ul className="seguroInfo__list">
                        <li>Evita pérdidas económicas</li>
                        <li>Puedes ahorrar hasta un 70% en tu seguro</li>
                        <li>Proceso simple con la aseguradora</li>
                        <li>Aplica aunque contrates fuera</li>
                    </ul>
                </div>

                {/* CLIENT */}
                <Suspense fallback={<div></div>}>
                    <SeguroClient />
                </Suspense>

                <div className="seguroInfo__textWithLine" id="btnLegend">
                    <blockquote></blockquote>

                    <p>
                        Un especialista te contactará sin compromiso.
                    </p>
                </div>
            </section>

            <section className="faq">
                <div className="faq__container">
                    {faqs.map((item, index) => (
                        <FAQItem key={index} item={item} />
                    ))}
                </div>
            </section>

            <section className="ctaBottom">
                <Suspense fallback={<div></div>}>
                    <SeguroClient />
                </Suspense>
            </section>

            <Footer />
        </div>
    );
}