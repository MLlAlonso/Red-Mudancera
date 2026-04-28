"use client";

import Link from "next/link";

export default function ReglasContent({ isPrivate = false }) {
    return (
        <main className="ayuda">
            <h1 className="ayuda__title">
                Reglas de la Comunidad
            </h1>

            <p className="ayuda__subtitle">
                Normas para el uso profesional de <span>Mudanza Fácil</span> y la correcta colaboración entre empresas.
            </p>

            <div className="ayuda__content">
                <div className="ayuda__cards">
                    <div className="ayuda__card">
                        <img src="/icons/team.png" />
                        <div>
                            <h4>Empresas reales y verificables</h4>
                            <p>Solo se permiten empresas legítimas. Buscamos elevar el estándar del gremio con colaboración profesional.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/check.png" />
                        <div>
                            <h4>Profesionalismo</h4>
                            <p>Comunicación respetuosa, trato profesional y colaboración entre colegas en todo momento.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/docs.png" />
                        <div>
                            <h4>Información clara</h4>
                            <p>Publica datos reales: volumen, rutas, fechas y condiciones para facilitar acuerdos eficientes.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/derechos.png" />
                        <div>
                            <h4>Contactos reales</h4>
                            <p>No se permiten clientes falsos ni manipulación del sistema para obtener beneficios.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/doc-verificado.png" />
                        <div>
                            <h4>Oportunidades reales</h4>
                            <p>Publica cargas y espacios reales y actualízalos cuando ya no estén disponibles.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/check.png" />
                        <div>
                            <h4>Cumplimiento</h4>
                            <p>Respeta acuerdos, mantén comunicación clara y cumple compromisos adquiridos.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/token_blue.png" />
                        <div>
                            <h4>Pagos y acuerdos</h4>
                            <p>Cumple pagos y condiciones en tiempo y forma. La confianza es clave.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/talento.png" />
                        <div>
                            <h4>Reputación</h4>
                            <p>Construye confianza con buenas prácticas, reseñas y colaboraciones exitosas.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/prohibicion.png" />
                        <div>
                            <h4>Uso adecuado</h4>
                            <p>Prohibido fraude, spam o contenido engañoso. Solo actividades relacionadas con mudanzas.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/cambios.png" />
                        <div>
                            <h4>Mejora continua</h4>
                            <p>La plataforma evoluciona constantemente. Tus sugerencias son bienvenidas.</p>
                        </div>
                    </div>

                    <div className="ayuda__card">
                        <img src="/icons/candado.png" />
                        <div>
                            <h4>Protección de la comunidad</h4>
                            <p>Podemos eliminar contenido o suspender cuentas que incumplan las reglas.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <Link href={isPrivate ? "/empresa/ayuda" : "/ayuda"} className="ayuda__link">
                    ← Ir a Ayuda y Soporte
                </Link>
            </div>
        </main>
    );
}