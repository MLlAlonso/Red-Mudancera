"use client";

export default function SeguroStepTres({
    modalidadDatos,
    enlaceEmpresa,
    generandoEnlaceEmpresa,
    error,
    saving,
    vistaPasoTres,
    primaEstimada,
    valorMenaje,
    valorAutomovil,
    nombre,
    origen,
    destino,
    onSeleccionarModalidad,
    onAnteriorSeleccion,
    onContinuarEmpresa,
    onAnterior,
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

        const mensaje = `Hola, buen día Soy ${nombre || "el cliente"}, tengo contratada mi mudanza con ustedes de ${origen || "el origen"} a ${destino || "el destino"}. Muchas gracias por el servicio.

Decidí asegurar mi menaje por mi cuenta, y la aseguradora me pide los datos de la unidad: placas, operador y camión. Sé que se entregan un día antes de la salida o el mismo día, así que no busco apurarlos ni cambiar sus fechas. Cuando la unidad ya esté asignada, solo necesito que los llenen en este enlace privado, toma unos 2 minutos:

${enlaceEmpresa}

Para mí es muy importante dejar asegurado mi menaje, por eso prefiero mandarte esto desde ahora y no estarte recordando. Con este mensaje queda constancia de que te lo solicité con anticipación.

¡Muchas gracias por tu apoyo!`;

        const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank", "noopener,noreferrer");
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
                        Para preparar correctamente tu seguro necesitamos algunos datos del servicio
                        que solo puede proporcionar la empresa de mudanzas, como las fechas del
                        traslado, el origen y destino, y los datos de la unidad que transportará
                        tus bienes.
                        <strong> Tú no necesitas ingresar esta información.</strong>
                    </p>
                </div>

                <div className="seguro-publico__form-section seguro-publico__modality-selection">
                    <div className="seguro-publico__form-section-heading">
                        <h3> ¿Qué tienes que hacer? </h3>

                        <p>
                            Solo haz clic en el botón de abajo. Generaremos un enlace privado
                            que podrás copiar y enviar a tu contacto de la empresa de mudanzas
                            para que complete la información necesaria.
                        </p>
                    </div>

                    <div className="seguro-publico__modality-options">
                        <button
                            type="button"
                            className={`seguro-publico__modality-card ${modalidadDatos === "autogestion" ? "active" : ""}`}
                            onClick={() => onSeleccionarModalidad("autogestion")}
                            disabled={saving}
                        >
                            <div className="seguro-publico__modality-icon">
                                <span>01</span>
                            </div>

                            <div className="seguro-publico__modality-content">
                                <strong> Solicitar datos a la empresa de mudanzas </strong>

                                <p>
                                    Generaremos un enlace privado para que tu empresa de
                                    mudanza complete directamente la información necesaria
                                    para tu seguro.
                                </p>
                            </div>

                            <div className="seguro-publico__modality-check">
                                {modalidadDatos === "autogestion" ? "✓" : ""}
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
                    <button
                        type="button"
                        className="seguro-publico__button seguro-publico__button--secondary"
                        onClick={onAnterior}
                        disabled={saving}
                    >
                        ← Anterior
                    </button>
                </div>
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
                    <h2> Solicitar datos a la empresa de mudanzas </h2>

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
            </section>
        );
    }

    return null;
}