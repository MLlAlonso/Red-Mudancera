"use client";

export default function SeguroStepTres({
    modalidadDatos,
    asistenciaEmpresaMudanza,
    asistenciaContacto,
    asistenciaTelefono,
    enlaceEmpresa,
    generandoEnlaceEmpresa,
    error,
    saving,
    vistaPasoTres,
    primaEstimada,
    valorMenaje,
    valorAutomovil,
    onSeleccionarModalidad,
    onAnteriorSeleccion,
    onContinuarEmpresa,
    onContinuarAsistida,
    onGuardarAsistencia,
    onAnterior,
    onAsistenciaEmpresaMudanzaChange,
    onAsistenciaContactoChange,
    onAsistenciaTelefonoChange,
}) {
    const basePrima = (Number(valorMenaje) || 0) + (Number(valorAutomovil) || 0);
    const porcentajePrima = modalidadDatos === "asistida" ? 0.0175 : 0.0135;
    const primaActual = basePrima > 0 ? basePrima * porcentajePrima : Number(primaEstimada) || 0;

    function formatearMoneda(valor) {
        return Number(valor || 0).toLocaleString(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );
    }

    function compartirWhatsApp() {
        if (!enlaceEmpresa) {
            return;
        }

        const mensaje = encodeURIComponent(`Hola, necesito que completes la información necesaria para mi seguro de mudanza. Puedes hacerlo desde este enlace privado: ${enlaceEmpresa}`);
        window.open(`https://wa.me/?text=${mensaje}`, "_blank", "noopener,noreferrer");
    }

    async function copiarEnlace() {
        if (!enlaceEmpresa) {
            return;
        }

        try {
            await navigator.clipboard.writeText(enlaceEmpresa);
        } catch (error) {
            console.error("No fue posible copiar el enlace:", error);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Prima estimada
    |--------------------------------------------------------------------------
    */
    function PrimaEstimada() {
        return (
            <div className="seguro-publico__premium">
                <span>
                    Prima estimada actual:{" "}
                    <strong>
                        {formatearMoneda(primaActual)}
                    </strong>
                    {" · "}
                    Se confirmará antes de contratar.
                </span>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Enlace privado de empresa
    |--------------------------------------------------------------------------
    */
    function EnlaceEmpresa() {
        return (
            <div className="seguro-publico__company-help-generated">
                <div>
                    <span> Tu enlace privado </span>

                    <strong>
                        {enlaceEmpresa || "Generando enlace..."}
                    </strong>
                </div>

                <div className="seguro-publico__company-help-actions">
                    <button type="button" onClick={compartirWhatsApp} disabled={!enlaceEmpresa} >
                        Compartir por WhatsApp
                    </button>

                    <button type="button" onClick={copiarEnlace} disabled={!enlaceEmpresa} >
                        Copiar enlace
                    </button>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Selección inicial
    |--------------------------------------------------------------------------
    */
    if (vistaPasoTres === "seleccion") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Datos necesarios para asegurar tu mudanza </h2>
                    <p id="empresa_info">
                        Para preparar tu seguro necesitamos algunos datos de la empresa que realizará la mudanza y del servicio contratado.
                        Por ejemplo: nombre de la empresa, fechas de traslado y datos de la unidad que transportará tus bienes.
                        No necesitas tener toda esta información ahora. <strong>Puedes elegir cómo obtenerla.</strong>
                    </p>
                </div>

                <div className="seguro-publico__form-section seguro-publico__modality-selection">
                    <div className="seguro-publico__form-section-heading">
                        <h3> ¿Cómo quieres completar la información? </h3>
                        <p> Elige cómo prefieres obtener los datos necesarios para tu seguro. </p>
                    </div>

                    <div className="seguro-publico__modality-options">
                        <button
                            type="button"
                            className={`seguro-publico__modality-card ${modalidadDatos === "autogestion" ? "active" : "" }`}
                            onClick={() => onSeleccionarModalidad("autogestion")}
                            disabled={saving}
                        >
                            <div className="seguro-publico__modality-icon">
                                <span>01</span>
                            </div>

                            <div className="seguro-publico__modality-content">
                                <strong> Solicitaré los datos a mi empresa </strong>

                                <p>
                                    Generaremos un enlace privado para que tu empresa
                                    de mudanza complete directamente la información necesaria.
                                </p>
                            </div>

                            <div className="seguro-publico__modality-check">
                                {modalidadDatos === "autogestion" ? "✓" : ""}
                            </div>
                        </button>

                        <button
                            type="button"
                            className={`seguro-publico__modality-card ${modalidadDatos === "asistida" ? "active" : "" }`}
                            onClick={() => onSeleccionarModalidad("asistida")}
                            disabled={saving}
                        >
                            <div className="seguro-publico__modality-icon">
                                <span>02</span>
                            </div>

                            <div className="seguro-publico__modality-content">
                                <strong> Quiero Póliza Asistida </strong>

                                <p>
                                    Nuestro equipo contactará a tu empresa de mudanza y recopilará la información necesaria por ti.
                                </p>
                            </div>

                            <div className="seguro-publico__modality-check">
                                {modalidadDatos === "asistida" ? "✓" : ""}
                            </div>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__actions seguro-publico__actions--step2">
                    <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={onAnterior} disabled={saving}  >
                        ← Anterior
                    </button>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Flujo: Solicitaré los datos a mi empresa
    |--------------------------------------------------------------------------
    */
    if (modalidadDatos === "autogestion" && vistaPasoTres === "empresa") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Solicitaré los datos a mi empresa </h2>

                    <p>
                        Generaremos un enlace privado para que tu empresa
                        de mudanza complete directamente la información necesaria.
                    </p>
                </div>

                <div className="seguro-publico__form-section">
                    <div className="seguro-publico__form-section-heading">
                        <h3> ¿Cómo funciona? </h3>
                    </div>

                    <div className="seguro-publico__company-help-steps">
                        <div>
                            <strong>1.</strong>
                            <span> Generamos un enlace privado. </span>
                        </div>

                        <div>
                            <strong>2.</strong>
                            <span> Tú copias el enlace y lo envías a tu empresa de mudanza. </span>
                        </div>

                        <div>
                            <strong>3.</strong>
                            <span> La empresa completa la información. </span>
                        </div>

                        <div>
                            <strong>4.</strong>
                            <span> Tú revisas los datos antes de continuar. </span>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__company-help-generated">
                    <div>
                        <span> Tu enlace privado </span>

                        <strong> {enlaceEmpresa || "Generando enlace..."} </strong>
                    </div>

                    <div className="seguro-publico__company-help-actions">
                        <button type="button" onClick={compartirWhatsApp} disabled={!enlaceEmpresa} >
                            Compartir por WhatsApp
                        </button>

                        <button type="button" onClick={copiarEnlace} disabled={!enlaceEmpresa} >
                            Copiar enlace
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__premium">
                    <span>
                        Prima estimada actual:{" "}
                        <strong>{formatearMoneda(primaActual)}</strong>
                        {" · "}
                        Se confirmará antes de contratar.
                    </span>
                </div>

                <div className="seguro-publico__actions seguro-publico__actions--step2">
                    <button
                        type="button"
                        className="seguro-publico__button seguro-publico__button--secondary"
                        onClick={onAnteriorSeleccion}
                        disabled={saving || generandoEnlaceEmpresa}
                    >
                        ← Anterior
                    </button>

                    <button
                        type="button"
                        className="seguro-publico__button"
                        onClick={onContinuarEmpresa}
                        disabled={saving || generandoEnlaceEmpresa || !enlaceEmpresa}
                    >
                        {saving ? "Guardando..." : "Continuar"}
                    </button>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Flujo: empresa completando información
    |--------------------------------------------------------------------------
    */
    if (modalidadDatos === "autogestion" && vistaPasoTres === "esperando_empresa") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Esperando información de tu empresa </h2>

                    <p>
                        Tu empresa de mudanza está completando la
                        información. Te avisaremos cuando esté lista para que la revises.
                    </p>
                </div>

                <div className="seguro-publico__company-help-generated">
                    <div>
                        <span> Tu enlace privado </span>
                        <strong> {enlaceEmpresa || "Generando enlace..."} </strong>
                    </div>

                    <div className="seguro-publico__company-help-actions">
                        <button type="button" onClick={compartirWhatsApp} disabled={!enlaceEmpresa} >
                            Compartir por WhatsApp
                        </button>

                        <button type="button" onClick={copiarEnlace} disabled={!enlaceEmpresa} >
                            Copiar enlace
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__premium">
                    <span>
                        Prima estimada actual:{" "}
                        <strong>{formatearMoneda(primaActual)}</strong>
                        {" · "}
                        Se confirmará antes de contratar.
                    </span>
                </div>

                <div className="seguro-publico__actions seguro-publico__actions--step2">
                    <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={onAnteriorSeleccion} disabled={saving} >
                        ← Anterior
                    </button>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Flujo: Póliza Asistida - explicación
    |--------------------------------------------------------------------------
    */
    if (modalidadDatos === "asistida" && vistaPasoTres === "asistida") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Quiero Póliza Asistida </h2>

                    <p>
                        Nosotros contactamos a tu empresa de mudanza, recopilamos la información necesaria y damos seguimiento al proceso por ti.
                    </p>
                </div>

                <div className="seguro-publico__form-section">
                    <div className="seguro-publico__form-section-heading">
                        <h3> ¿Cómo funciona? </h3>
                    </div>

                    <div className="seguro-publico__company-help-steps">
                        <div>
                            <strong>1.</strong>
                            <span> Nos compartes los datos de contacto de tu empresa. </span>
                        </div>

                        <div>
                            <strong>2.</strong>
                            <span> Nuestro equipo se comunica con ellos. </span>
                        </div>

                        <div>
                            <strong>3.</strong>
                            <span> Recopilamos la información necesaria y damos seguimiento. </span>
                        </div>

                        <div>
                            <strong>4.</strong>
                            <span> Tú revisas los datos antes de continuar. </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__premium">
                    <span>
                        Prima estimada actual:{" "}
                        <strong>{formatearMoneda(primaActual)}</strong>
                        {" · "}
                        Se confirmará antes de contratar.
                    </span>
                </div>

                <div className="seguro-publico__actions seguro-publico__actions--step2">
                    <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={onAnteriorSeleccion} disabled={saving} >
                        ← Anterior
                    </button>

                    <button type="button" className="seguro-publico__button" onClick={onContinuarAsistida} disabled={saving} >
                        Continuar
                    </button>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Flujo: Póliza Asistida - datos de contacto
    |--------------------------------------------------------------------------
    */
    if (modalidadDatos === "asistida" && vistaPasoTres === "asistida_contacto") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Datos de contacto de tu empresa </h2>

                    <p>
                        Compártenos los datos para que podamos comunicarnos con tu empresa de mudanza.
                    </p>
                </div>

                <div className="seguro-publico__form-section">
                    <div className="seguro-publico__field">
                        <label htmlFor="asistencia_empresa_mudanza">
                            Nombre de la empresa
                        </label>

                        <input
                            id="asistencia_empresa_mudanza"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={150}
                            placeholder="Escribe el nombre de la empresa"
                            value={asistenciaEmpresaMudanza}
                            onChange={(e) => onAsistenciaEmpresaMudanzaChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="asistencia_contacto">
                            Nombre del contacto / vendedor
                        </label>

                        <input
                            id="asistencia_contacto"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={150}
                            placeholder="Escribe el nombre del contacto"
                            value={asistenciaContacto}
                            onChange={(e) => onAsistenciaContactoChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="asistencia_telefono">
                            Teléfono / WhatsApp
                        </label>

                        <input
                            id="asistencia_telefono"
                            className="seguro-publico__text-input"
                            type="tel"
                            maxLength={30}
                            placeholder="Ej. 55 1234 5678"
                            value={asistenciaTelefono}
                            onChange={(e) => onAsistenciaTelefonoChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__assistance-info">
                        <p>
                            Estos datos se utilizarán únicamente para contactar a tu empresa y
                            gestionar la información necesaria para tu seguro.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__premium">
                    <span>
                        Prima estimada actual:{" "}
                        <strong>{formatearMoneda(primaActual)}</strong>
                        {" · "}
                        Se confirmará antes de contratar.
                    </span>
                </div>

                <div className="seguro-publico__actions seguro-publico__actions--step2">
                    <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={onAnterior} disabled={saving} >
                        ← Anterior
                    </button>

                    <button type="button" className="seguro-publico__button" onClick={onGuardarAsistencia} disabled={saving} >
                        {saving ? "Guardando..." : "Continuar"}
                    </button>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Flujo: Póliza Asistida - esperando información
    |--------------------------------------------------------------------------
    */
    if (modalidadDatos === "asistida" && vistaPasoTres === "esperando_asistida") {
        return (
            <section className="seguro-publico__step">
                <div className="seguro-publico__step-heading">
                    <h2> Estamos en contacto con tu empresa de mudanza </h2>

                    <p>
                        Nuestro equipo está recopilando con ellos la información necesaria.
                        Te avisaremos cuando tengamos todo listo para que puedas revisar los datos.
                    </p>
                </div>

                {error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )}

                <div className="seguro-publico__premium">
                    <span>
                        Prima estimada actual:{" "}
                        <strong>{formatearMoneda(primaActual)}</strong>
                        {" · "}
                        Se confirmará antes de contratar.
                    </span>
                </div>

                <p className="seguro-publico__privacy">
                    Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                </p>
            </section>
        );
    }

    return null;
}