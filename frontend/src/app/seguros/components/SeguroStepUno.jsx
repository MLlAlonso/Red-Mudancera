"use client";

export default function SeguroStepUno({
    tipoSeguro,
    valorMenaje,
    valorAutomovil,
    pasoUnoGuardado,
    expediente,
    error,
    saving,
    onTipoSeguroChange,
    onValorMenajeChange,
    onValorAutomovilChange,
    onGuardar,
    formatearMoneda,
}) {
    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <span> Paso 1 </span>
                <h2> ¿Qué deseas asegurar? </h2>
                <p> Selecciona el tipo de protección que necesitas para tu mudanza. </p>
            </div>

            <div className="seguro-publico__insurance-options">
                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "menaje" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("menaje")}
                >
                    <div className="insurance-option__radio">
                        <span />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Menaje </strong>
                        <p> Protege los artículos y bienes de tu mudanza. </p>
                    </div>
                </button>

                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "menaje_auto" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("menaje_auto")}
                >
                    <div className="insurance-option__radio">
                        <span />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Menaje + Automóvil </strong>
                        <p> Protege tus artículos y un automóvil. </p>
                    </div>
                </button>

                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "automovil" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("automovil")}
                >
                    <div className="insurance-option__radio">
                        <span />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Automóvil </strong>
                        <p> Protección para el automóvil transportado. </p>
                    </div>
                </button>

            </div>

            {
                (tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") && (
                    <div className="seguro-publico__field">
                        <label htmlFor="valor_menaje">
                            Valor declarado del menaje
                        </label>

                        <div className="money-input">
                            <span> $ </span>

                            <input
                                id="valor_menaje"
                                type="number"
                                min="0"
                                step="0.01"
                                inputMode="decimal"
                                placeholder="Ej. 250000"
                                value={valorMenaje}
                                onChange={(e) => onValorMenajeChange(e.target.value)}
                            />

                            <small> MXN </small>
                        </div>

                        <p className="field-help">
                            Indica el valor aproximado de los artículos que deseas proteger.
                        </p>
                    </div>
                )
            }

            {
                (tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (
                    <div className="seguro-publico__field">
                        <label htmlFor="valor_automovil">
                            Valor declarado del automóvil
                        </label>

                        <div className="money-input">
                            <span> $ </span>

                            <input
                                id="valor_automovil"
                                type="number"
                                min="0"
                                step="0.01"
                                inputMode="decimal"
                                placeholder="Ej. 350000"
                                value={valorAutomovil}
                                onChange={(e) => onValorAutomovilChange(e.target.value)}
                            />

                            <small> MXN </small>
                        </div>

                        <p className="field-help">
                            Indica el valor aproximado del automóvil que deseas proteger.
                        </p>
                    </div>
                )
            }

            {
                pasoUnoGuardado && expediente?.prima_estimada !== null && expediente?.prima_estimada !== undefined && (
                    <div className="seguro-publico__premium-box">
                        <div className="seguro-publico__premium-header">
                            <div>
                                <span> Prima estimada </span>
                                <strong> {formatearMoneda(expediente.prima_estimada)}  </strong>
                            </div>

                            <div className="seguro-publico__tooltip">
                                <button type="button" aria-label="Información sobre el cálculo de la prima" >
                                    ?
                                </button>

                                <div className="seguro-publico__tooltip-content">
                                    Valor declarado por el cliente × 1.35%
                                </div>
                            </div>
                        </div>

                        <p> Esta es una estimación calculada con base en el valor declarado. </p>
                    </div>
                )
            }

            {
                error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )
            }

            {
                pasoUnoGuardado && (
                    <div className="seguro-publico__saved">
                        <span>  ✓ </span>

                        <div>
                            <strong> Información guardada </strong>
                            <p> Los datos del Paso 1 fueron registrados correctamente. </p>
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__actions">
                <button type="button" className="seguro-publico__button" onClick={onGuardar} disabled={saving} >
                    {saving ? "Guardando..." : pasoUnoGuardado ? "Actualizar información" : "Continuar"}
                </button>

            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}