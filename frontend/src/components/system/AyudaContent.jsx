"use client";

import { useState } from "react";

export default function AyudaContent() {
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
                                    <p>Mudanza Fácil es responsable del tratamiento de tus datos personales.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/docs.png" />
                                <div>
                                    <h4>Datos que recopilamos</h4>
                                    <p>Nombre, contacto, rutas, perfil, actividad, verificación, pagos y contenido generado.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/datos.png" />
                                <div>
                                    <h4>Uso de tus datos</h4>
                                    <p>Para conectarte con oportunidades, gestionar servicios, pagos y mejorar la plataforma.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/ojo.png" />
                                <div>
                                    <h4>Visibilidad entre usuarios</h4>
                                    <p>Parte de tu información puede ser visible para facilitar contacto y operación.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/candado.png" />
                                <div>
                                    <h4>Seguridad</h4>
                                    <p>Aplicamos medidas de protección, pero ningún sistema es 100% invulnerable.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/share.png" />
                                <div>
                                    <h4>Compartición de datos</h4>
                                    <p>Solo con usuarios, proveedores tecnológicos o por requerimiento legal.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/derechos.png" />
                                <div>
                                    <h4>Tus derechos</h4>
                                    <p>Puedes acceder, rectificar, eliminar u oponerte al uso de tus datos.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/cookies.png" />
                                <div>
                                    <h4>Cookies</h4>
                                    <p>Usamos cookies para mejorar experiencia y analizar uso.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/cambios.png" />
                                <div>
                                    <h4>Cambios</h4>
                                    <p>Podemos actualizar este aviso en cualquier momento.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/correo_verificado.png" />
                                <div>
                                    <h4>Contacto</h4>
                                    <p>soporte@mudanzafacil.com.mx</p>
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
                                    <p>Al usar la plataforma aceptas estos términos.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/icon.svg" />
                                <div>
                                    <h4>Qué es Mudanza Fácil</h4>
                                    <p>Conectamos empresas, transportistas y clientes. No realizamos mudanzas.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/user-placeholder.png" />
                                <div>
                                    <h4>Cuenta</h4>
                                    <p>Debes proporcionar datos reales y eres responsable de tu cuenta.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/prohibicion.png" />
                                <div>
                                    <h4>Uso permitido</h4>
                                    <p>Prohibido spam, fraude o uso indebido.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/docs.png" />
                                <div>
                                    <h4>Publicaciones</h4>
                                    <p>Eres responsable del contenido que publicas.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/token_blue.png" />
                                <div>
                                    <h4>Créditos</h4>
                                    <p>No son reembolsables y el contacto es tu responsabilidad.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/planes.png" />
                                <div>
                                    <h4>Planes</h4>
                                    <p>Las funciones dependen del plan activo.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/team.png" />
                                <div>
                                    <h4>Interacción</h4>
                                    <p>No participamos en acuerdos entre usuarios.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/candado.png" />
                                <div>
                                    <h4>Seguridad</h4>
                                    <p>No garantizamos veracidad total de usuarios.</p>
                                </div>
                            </div>

                            <div className="ayuda__card">
                                <img src="/icons/suspendido.png" />
                                <div>
                                    <h4>Suspensión</h4>
                                    <p>Podemos eliminar cuentas que incumplan reglas.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}