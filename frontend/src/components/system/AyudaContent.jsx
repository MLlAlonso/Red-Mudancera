"use client";

import { useState } from "react";
import Link from "next/link";

export default function AyudaContent({ isPrivate = false }) {
    const [openPrivacy, setOpenPrivacy] = useState(true);
    const [openTerms, setOpenTerms] = useState(false);

    return (
        <main className="ayuda">
            <h1 className="ayuda__title">
                Ayuda y Soporte
            </h1>

            <p className="ayuda__subtitle">
                Aquí puedes consultar <span>términos, privacidad</span> y resolver dudas sobre el uso de <span>Mudanza Fácil</span>.
            </p>

            {/* ========================= PRIVACIDAD ========================= */}
            <div className="ayuda__block">
                <div className="ayuda__accordion-header" onClick={() => setOpenPrivacy(!openPrivacy)} >
                    <span>Aviso de Privacidad</span>
                    <img src="/icons/arrow_down.png" className={`ayuda__arrow ${openPrivacy ? "open" : ""}`} />
                </div>

                {openPrivacy && (
                    <div className="ayuda__content">
                        <div className="ayuda__cards">

                            <div className="ayuda__card">
                                <img src="/icons/team.png" />
                                <div>
                                    <h4>¿Quién es responsable?</h4>
                                    <p>Mudanza Fácil es responsable del tratamiento de tus datos personales y se compromete a utilizarlos conforme a la legislación aplicable, protegiendo tu información en todo momento.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/docs.png" />
                                <div>
                                    <h4>Datos que recopilamos</h4>
                                    <p>Recopilamos información como nombre, datos de contacto, rutas, perfil, actividad dentro de la plataforma, información de verificación, pagos y contenido que generas al utilizar el servicio.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/datos.png" />
                                <div>
                                    <h4>Uso de tus datos</h4>
                                    <p>Utilizamos tus datos para conectarte con oportunidades, facilitar la operación de servicios, procesar pagos, mejorar la experiencia en la plataforma y optimizar el funcionamiento del sistema.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/ojo.png" />
                                <div>
                                    <h4>Visibilidad entre usuarios</h4>
                                    <p>Parte de tu información puede ser visible para otros usuarios con el fin de facilitar el contacto, la negociación y la operación de servicios dentro de la red.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/candado.png" />
                                <div>
                                    <h4>Seguridad</h4>
                                    <p>Aplicamos medidas de seguridad técnicas y administrativas para proteger tu información. Sin embargo, ningún sistema es completamente invulnerable.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/share.png" />
                                <div>
                                    <h4>Compartición de datos</h4>
                                    <p>Tu información solo se comparte con otros usuarios de la red, proveedores tecnológicos necesarios para la operación o cuando sea requerido por ley.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/derechos.png" />
                                <div>
                                    <h4>Tus derechos</h4>
                                    <p>Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos en cualquier momento, de acuerdo con la normativa aplicable.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/cookies.png" />
                                <div>
                                    <h4>Cookies</h4>
                                    <p>Utilizamos cookies para mejorar tu experiencia, analizar el uso de la plataforma y ofrecer un servicio más eficiente.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/cambios.png" />
                                <div>
                                    <h4>Cambios</h4>
                                    <p>Podemos actualizar este aviso en cualquier momento. Te recomendamos revisarlo periódicamente para mantenerte informado.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/correo_verificado.png" />
                                <div>
                                    <h4>Contacto</h4>
                                    <p>Si tienes dudas o solicitudes relacionadas con tus datos, puedes contactarnos en: soporte@mudanzafacil.com.mx</p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            {/* ========================= TERMINOS ========================= */}
            <div className="ayuda__block">
                <div className="ayuda__accordion-header" onClick={() => setOpenTerms(!openTerms)} >
                    <span>Términos y Condiciones</span>
                    <img src="/icons/arrow_down.png" className={`ayuda__arrow ${openTerms ? "open" : ""}`} />
                </div>

                {openTerms && (
                    <div className="ayuda__content">
                        <div className="ayuda__cards">

                            <div className="ayuda__card">
                                <img src="/icons/check.png" />
                                <div>
                                    <h4>Aceptación</h4>
                                    <p>Al utilizar la plataforma, aceptas estos términos y condiciones, así como las políticas aplicables al uso del servicio.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/icon.svg" />
                                <div>
                                    <h4>Qué es Mudanza Fácil</h4>
                                    <p>Mudanza Fácil es una plataforma que conecta empresas, transportistas y clientes. No realizamos servicios de mudanza directamente.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/user-placeholder.png" />
                                <div>
                                    <h4>Cuenta</h4>
                                    <p>Debes proporcionar información verídica y mantener tus datos actualizados. Eres responsable de la seguridad y uso de tu cuenta.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/prohibicion.png" />
                                <div>
                                    <h4>Uso permitido</h4>
                                    <p>Está prohibido el uso de la plataforma para actividades fraudulentas, spam o cualquier uso indebido que afecte a otros usuarios o al sistema.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/docs.png" />
                                <div>
                                    <h4>Publicaciones</h4>
                                    <p>Eres responsable del contenido que publicas. La información debe ser clara, verídica y relacionada con los servicios ofrecidos dentro de la plataforma.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/token_blue.png" />
                                <div>
                                    <h4>Créditos</h4>
                                    <p>Los créditos no son reembolsables. El uso de los contactos adquiridos y la gestión de las oportunidades es responsabilidad del usuario.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/planes.png" />
                                <div>
                                    <h4>Planes</h4>
                                    <p>Las funcionalidades disponibles dependen del plan activo y pueden variar según el nivel de suscripción contratado.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/team.png" />
                                <div>
                                    <h4>Interacción</h4>
                                    <p>Mudanza Fácil no participa en acuerdos, negociaciones ni servicios realizados entre usuarios.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/candado.png" />
                                <div>
                                    <h4>Seguridad</h4>
                                    <p>Implementamos medidas de seguridad, pero no garantizamos la veracidad total de la información proporcionada por otros usuarios.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/suspendido.png" />
                                <div>
                                    <h4>Suspensión</h4>
                                    <p>Nos reservamos el derecho de suspender o eliminar cuentas que incumplan estos términos o hagan uso indebido de la plataforma.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 🔗 LINK A REGLAS */}
            <div style={{ marginBottom: "20px" }}>
                <Link href={isPrivate ? "/empresa/reglas" : "/reglas"} className="ayuda__link">
                    Ver Reglas de la Comunidad →
                </Link>
            </div>
        </main>
    );
}