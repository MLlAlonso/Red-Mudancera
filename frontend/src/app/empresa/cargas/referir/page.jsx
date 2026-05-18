"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/pages/empresa/_empresaReferir.scss";

export default function ReferirPage() {
    const [empresa, setEmpresa] = useState(null);
    const [openScript, setOpenScript] = useState(false);
    const [copiadoMensaje, setCopiadoMensaje] = useState(false);
    const [copiadoCorreo, setCopiadoCorreo] = useState(false);
    const [copiadoLink, setCopiadoLink] = useState(false);

    const getCookie = (name) => {
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? match[2] : null;
    };

    const [stats, setStats] = useState({
        referidos_mes: 0,
        creditos_mes: 0
    });

    // =========================
    // FETCH EMPRESA
    // =========================
    useEffect(() => {
        const token = getCookie("token_empresa");
        if (!token) return;

        // PERFIL EMPRESA
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setEmpresa(data))
            .catch(() => { });

        // STATS REFERIDOS
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/referidos/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => { });

    }, []);

    if (!empresa) return null;

    // =========================
    // GENERAR LINK REFERIDOS
    // (MISMA LOGICA QUE PERFIL)
    // =========================
    const slug = empresa.empresa
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
    const referLink = `app.mudanzafacil.com.mx/solicitar-mudanza/${slug}`;

    // =========================
    // MENSAJE SUGERIDO (WhatsAoo)
    // =========================
    const mensaje = `Hola 😊 muchas gracias por contactarnos.

Nos da pena no poder ayudarte directamente en esta ocasión, ya que actualmente no trabajamos esa ruta de forma directa.

Sin embargo, formamos parte de una red profesional de empresas de mudanzas verificadas llamada Mudanza Fácil 🚛

Puedes registrar tu solicitud en el siguiente enlace seguro y nuestro sistema buscará empresas que ya trabajen tu ruta o la realicen con frecuencia.

Solo te contactarán hasta 3 empresas que realmente coincidan con tu mudanza, para ayudarte a ahorrar tiempo, vueltas innecesarias… y probablemente también dinero 

${referLink}
`;

    // =========================
    // MENSAJE SUGERIDO (Email)
    // =========================
    const mensajeEmail = `Hola, gracias por contactarnos.

Actualmente nuestra empresa no trabaja esa ruta directamente, pero formamos parte de Mudanza Fácil, una red profesional de empresas de mudanzas verificadas.

Puedes registrar tu solicitud en el siguiente enlace seguro y un máximo de 3 empresas que realmente cubren tu ruta te contactarán.

${referLink}

Esto suele ayudar a encontrar mejores opciones de precio y disponibilidad.
`;

    const asuntoEmail = `Solicitud de mudanza - Mudanza Fácil`;

    // =========================
    // ACCIONES
    // =========================
    const copiarLink = () => {
        navigator.clipboard.writeText(referLink);
        setCopiadoLink(true);
        setTimeout(() => {
            setCopiadoLink(false);
        }, 2000);
    };

    const copiarMensaje = () => {
        navigator.clipboard.writeText(mensaje);

        setCopiadoMensaje(true);

        setTimeout(() => {
            setCopiadoMensaje(false);
        }, 2000);
    };

    const copiarCorreo = () => {
        const texto = `Asunto: ${asuntoEmail}\n\n${mensajeEmail}`;

        navigator.clipboard.writeText(texto);

        setCopiadoCorreo(true);

        setTimeout(() => {
            setCopiadoCorreo(false);
        }, 2000);
    };

    const compartirWhatsapp = () => {
        const text = encodeURIComponent(mensaje);
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    return (
        <>
            <Header />

            <main className="referir">
                <h1 className="referir__title">
                    Referir contacto a la red
                </h1>

                <p className="referir__subtitle">
                    Si no trabajas esa ruta, <span>comparte tu enlace</span>  y el cliente podrá registrar su mudanza en <span>Mudanza Fácil</span>.
                </p>

                {/* =========================
                     LINK REFERIDOS
                    ========================= */}
                <div className="referir__block">
                    <h3>Tu enlace para referir contactos</h3>

                    <div className="referir__link">
                        <span>{referLink}</span>
                        <button onClick={copiarLink} title="Copiar enlace">
                            <img src="/icons/copy.png" alt="Copiar" />
                        </button>
                    </div>

                    <div className="referir__actions">
                        <button
                            className="referir__btn referir__btn--primary"
                            onClick={copiarLink}
                        >
                            <img src="/icons/copyw.png" alt="Copiar" />
                            {copiadoLink ? "Enlace copiado" : "Compartir enlace"}
                        </button>

                        <button className="referir__btn referir__btn--success" onClick={compartirWhatsapp} >
                            <img src="/icons/shareW.png" alt="WhatsApp" />
                            WhatsApp
                        </button>
                    </div>
                </div>

                {/* =========================
                     BENEFICIOS + STATS
                    ========================= */}
                <div className="referir__grid">
                    {/* BENEFICIOS */}
                    <div className="referir__block">
                        <h3>Tus beneficios por referir</h3>

                        <div className="referir__benefits">
                            <div className="referir__benefit">
                                <img src="/icons/check.png" alt="check" />
                                <span>Gana créditos cuando el cliente registre su mudanza</span>
                            </div>

                            <div className="referir__benefit">
                                <img src="/icons/check.png" alt="check" />
                                <span>Solo 3 empresas podrán adquirir ese contacto</span>
                            </div>

                            <div className="referir__benefit">
                                <img src="/icons/check.png" alt="check" />
                                <span>Ayudas al cliente a encontrar empresas confiables</span>
                            </div>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="referir__block">
                        <h3>Tus referidos</h3>

                        <div className="referir__stats">
                            <div className="referir__stat">
                                <span className="referir__stat-value">
                                    {stats.referidos_mes}
                                </span>

                                <span className="referir__stat-label">
                                    Referidos este mes
                                </span>
                            </div>

                            <div className="referir__stat">
                                <span className="referir__stat-value">
                                    {stats.creditos_mes}
                                </span>

                                <span className="referir__stat-label">
                                    Ventas realizadas este mes
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================
                      MENSAJE SUGERIDO (WhatsApp)
                    ========================= */}
                <div className="referir__block">
                    <h3>Mensaje sugerido para el cliente vía WhatsApp</h3>

                    <div className="referir__message">
                        <p>{mensaje}</p>

                        <button onClick={copiarMensaje} className="referir__copy-message">
                            <img src="/icons/copy.png" alt="Copiar" />
                            {copiadoMensaje ? "Mensaje copiado" : "Copiar mensaje"}
                        </button>
                    </div>
                </div>

                {/* =========================
                     MENSAJE PARA CORREO (Email)
                    ========================= */}
                <div className="referir__block">
                    <h3>Mensaje para correo electrónico</h3>

                    <div className="referir__message">
                        <p>
                            <strong>Asunto:</strong> {asuntoEmail}
                        </p>

                        <p>{mensajeEmail}</p>

                        <button onClick={copiarCorreo} className="referir__copy-message">
                            <img src="/icons/copy.png" alt="Copiar" />
                            {copiadoCorreo ? "Mensaje copiado" : "Copiar mensaje"}
                        </button>

                    </div>

                </div>

                {/* =========================
                     SCRIPT TELEFÓNICO
                    ========================= */}
                <div className="referir__block">
                    <div className="referir__script-header" onClick={() => setOpenScript(!openScript)} >
                        <div className="referir__script-title">
                            <img src="/icons/telefono.png" className="referir__script-icon" alt="Teléfono" />

                            <span className="referir__script-text">
                                Script para llamada telefónica
                            </span>
                        </div>

                        <img
                            src="/icons/arrow_down.png"
                            className={`referir__script-arrow ${openScript ? "referir__script-arrow--open" : ""}`}
                            alt="Abrir"
                        />
                    </div>

                    {openScript && (
                        <div className="referir__script">
                            <p className="referir__script-time">
                                Duración aproximada: <strong>20 segundos.</strong>
                            </p>

                            <ul>
                                <li> Te comento algo con toda transparencia: nosotros no trabajamos directamente esa ruta. </li>
                                <li> Pero formamos parte de una red profesional llamada Mudanza Fácil, donde hay empresas verificadas que sí realizan ese trayecto. </li>
                                <li>
                                    Si quieres, te comparto un enlace seguro donde puedes registrar los datos de tu mudanza y un máximo de 3 empresas que mejor coincidan con tu ruta te contactarán.
                                    Así normalmente consigues mejores opciones de precio y tiempo.
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}