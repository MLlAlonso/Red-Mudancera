"use client";

export default function SeguroStepUno({
    tipoSeguro,
    valorMenaje,
    valorAutomovil,
    automovilMarca,
    automovilModelo,
    automovilNumeroSerie,
    automovilFotoCirculacionUrl,
    uploadingAutomovilFoto,
    pasoUnoGuardado,
    expediente,
    error,
    saving,
    onTipoSeguroChange,
    onValorMenajeChange,
    onValorAutomovilChange,
    onAutomovilMarcaChange,
    onAutomovilModeloChange,
    onAutomovilNumeroSerieChange,
    onAutomovilFotoChange,
    onGuardar,
    formatearMoneda,
}) {
    const valorMenajeNumero = valorMenaje === "" ? 0 : Number(String(valorMenaje).replace(/,/g, ""));
    const valorAutomovilNumero = valorAutomovil === "" ? 0 : Number(String(valorAutomovil).replace(/,/g, ""));
    let basePrima = 0;

    if (tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") {
        basePrima += valorMenajeNumero > 0 ? valorMenajeNumero : 0;
    }

    if (tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") {
        basePrima += valorAutomovilNumero > 0 ? valorAutomovilNumero : 0;
    }

    const primaEstimada = basePrima > 0 ? basePrima * 0.0135 : 0;
    const incluyeAutomovil = tipoSeguro === "automovil" || tipoSeguro === "menaje_auto";

    const mostrarPrima = tipoSeguro && (
        (tipoSeguro === "menaje" && valorMenajeNumero > 0) ||
        (tipoSeguro === "automovil" && valorAutomovilNumero > 0) ||
        (tipoSeguro === "menaje_auto" && (valorMenajeNumero > 0 || valorAutomovilNumero > 0))
    );

    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <h2> ¿Qué deseas asegurar? </h2>
                <p> Selecciona el tipo de protección que necesitas para tu mudanza. </p>
            </div>

            <div className="seguro-publico__insurance-options">
                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "menaje" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("menaje")}
                    disabled={saving}
                >
                    <div className="insurance-option__icon">
                        <img src="/icons/truck.png" alt="" aria-hidden="true" />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Menaje </strong>
                        <p>  Protege los artículos y bienes de tu mudanza. </p>
                    </div>

                    <div className="insurance-option__radio">
                        <span />
                    </div>
                </button>

                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "menaje_auto" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("menaje_auto")}
                    disabled={saving}
                >
                    <div className="insurance-option__icon">
                        <img src="/icons/seguro.png" alt="" aria-hidden="true" />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Menaje + Automóvil </strong>
                        <p> Protege tus artículos y un automóvil. </p>
                    </div>

                    <div className="insurance-option__radio">
                        <span />
                    </div>
                </button>

                <button
                    type="button"
                    className={`insurance-option ${tipoSeguro === "automovil" ? "is-selected" : ""}`}
                    onClick={() => onTipoSeguroChange("automovil")}
                    disabled={saving}
                >
                    <div className="insurance-option__icon">
                        <img src="/icons/auto.png" alt="" aria-hidden="true" />
                    </div>

                    <div className="insurance-option__content">
                        <strong> Automóvil </strong>
                        <p> Protección para el automóvil transportado. </p>
                    </div>

                    <div className="insurance-option__radio">
                        <span />
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
                                disabled={saving}
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
                incluyeAutomovil && (
                    <>
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
                                    disabled={saving}
                                />

                                <small> MXN </small>
                            </div>

                            <p className="field-help">
                                Indica el valor aproximado del automóvil que deseas proteger.
                            </p>
                        </div>

                        <div className="seguro-publico__form-section">
                            <div className="seguro-publico__form-section-heading">
                                <h3> Datos del automóvil </h3>
                                <p> Necesitamos estos datos para identificar correctamente el automóvil que deseas asegurar. </p>
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="automovil_marca">
                                    Marca
                                </label>

                                <input
                                    id="automovil_marca"
                                    className="seguro-publico__text-input"
                                    type="text"
                                    maxLength={100}
                                    placeholder="Ej. Toyota"
                                    value={automovilMarca}
                                    onChange={(e) => onAutomovilMarcaChange(  e.target.value ) }
                                    disabled={saving}
                                />
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="automovil_modelo">
                                    Modelo
                                </label>

                                <input
                                    id="automovil_modelo"
                                    className="seguro-publico__text-input"
                                    type="text"
                                    maxLength={100}
                                    placeholder="Ej. Corolla"
                                    value={automovilModelo}
                                    onChange={(e) => onAutomovilModeloChange( e.target.value ) }
                                    disabled={saving}
                                />
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="automovil_numero_serie">
                                    Número de serie
                                </label>

                                <input
                                    id="automovil_numero_serie"
                                    className="seguro-publico__text-input"
                                    type="text"
                                    maxLength={150}
                                    placeholder="Ej. 9BR..."
                                    value={automovilNumeroSerie}
                                    onChange={(e) => onAutomovilNumeroSerieChange( e.target.value ) }
                                    disabled={saving}
                                />

                                <p className="field-help">
                                    Captura el número de serie que aparece en la documentación del vehículo.
                                </p>
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="automovil_foto_circulacion">
                                    Foto de la tarjeta de circulación
                                </label>

                                <div className="seguro-publico__upload">
                                    <label htmlFor="automovil_foto_circulacion" className="seguro-publico__upload-label" >
                                        <div className="seguro-publico__upload-icon">
                                            <img src="/icons/docs.png" alt=""  aria-hidden="true" />
                                        </div>

                                        <div className="seguro-publico__upload-content">
                                            <strong>
                                                {automovilFotoCirculacionUrl ? "Fotografía cargada" : "Tomar o seleccionar fotografía"}
                                            </strong>

                                            <span> JPG, PNG o WEBP </span>
                                        </div>

                                        <div className="seguro-publico__upload-action">
                                            {automovilFotoCirculacionUrl ? "Cambiar" : "Seleccionar"}
                                        </div>
                                    </label>

                                    <input
                                        id="automovil_foto_circulacion"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        capture="environment"
                                        onChange={(e) => onAutomovilFotoChange( e.target.files?.[0] || null ) }
                                    />
                                </div>

                                <p className="field-help">
                                    Toma una fotografía clara de la tarjeta de circulación.
                                    Desde tu celular podrás utilizar directamente la cámara.
                                </p>

                                {automovilFotoCirculacionUrl && (
                                    <div className="seguro-publico__file-preview">
                                        <img src={automovilFotoCirculacionUrl} alt="Fotografía de la tarjeta de circulación" />

                                        <div>
                                            <strong>Fotografía cargada correctamente</strong>
                                            <span> Puedes cambiarla si necesitas utilizar otra. </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )
            }

            {
                mostrarPrima && (
                    <div className="seguro-publico__premium-box">
                        <div className="seguro-publico__premium-header">
                            <div>
                                <span> PRIMA ESTIMADA </span>

                                <strong>
                                    { formatearMoneda( primaEstimada ) }
                                </strong>
                            </div>

                            <div className="seguro-publico__tooltip">
                                <button type="button" aria-label="Información sobre el cálculo de la prima" >
                                    ?
                                </button>

                                <div className="seguro-publico__tooltip-content">
                                    Valor declarado × 1.35%
                                </div>
                            </div>
                        </div>

                        <p>
                            Esta prima se calcula con el valor que indicaste. 
                            Puedes cambiarlo cuando quieras y la prima se actualizará automáticamente.
                            Antes de contratar verás y confirmarás el importe final.
                        </p>
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
                        <span> ✓ </span>

                        <div>
                            <strong> Información guardada </strong>
                            <p> Los datos del Paso 1 fueron registrados correctamente. </p>
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__actions">
                <button type="button" className="seguro-publico__button" onClick={onGuardar} disabled={saving} >
                    {
                        saving ? uploadingAutomovilFoto ? "Subiendo fotografía..." : "Guardando..." : pasoUnoGuardado ? "Guardar y continuar" : "Continuar"
                    }
                </button>
            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}