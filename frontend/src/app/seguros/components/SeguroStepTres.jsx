"use client";

export default function SeguroStepTres({
    empresaMudanza,
    origen,
    destino,
    fechaSalida,
    fechaLlegada,
    propietarioUnidad,
    marcaUnidad,
    modeloUnidad,
    placas,
    chofer,
    error,
    saving,
    pasoTresGuardado,
    onEmpresaMudanzaChange,
    onOrigenChange,
    onDestinoChange,
    onFechaSalidaChange,
    onFechaLlegadaChange,
    onPropietarioUnidadChange,
    onMarcaUnidadChange,
    onModeloUnidadChange,
    onPlacasChange,
    onChoferChange,
    onGuardar,
    onAnterior,
    onGenerarEnlaceEmpresa,
    generandoEnlaceEmpresa,
    enlaceEmpresa,
}) {
    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <span> Paso 3 </span>
                <h2> Información de la mudanza </h2>
                <p> Confirma los datos de la mudanza y de la unidad que realizará el traslado. </p>
            </div>

            <div className="seguro-publico__form-section">
                <div className="seguro-publico__form-section-heading">
                    <h3> Datos de la mudanza </h3>
                    <p> Información relacionada con el traslado. </p>
                </div>

                <div className="seguro-publico__form-grid">
                    <div className="seguro-publico__field">
                        <label htmlFor="origen">
                            Origen
                        </label>

                        <input
                            id="origen"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={150}
                            placeholder="Ej. Veracruz, Veracruz"
                            value={origen}
                            onChange={(e) => onOrigenChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="destino">
                            Destino
                        </label>

                        <input
                            id="destino"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={150}
                            placeholder="Ej. Querétaro, Querétaro"
                            value={destino}
                            onChange={(e) => onDestinoChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="seguro-publico__form-grid">
                    <div className="seguro-publico__field">
                        <label htmlFor="fecha_salida">
                            Fecha de salida
                        </label>

                        <input
                            id="fecha_salida"
                            className="seguro-publico__text-input"
                            type="date"
                            value={fechaSalida}
                            onChange={(e) => onFechaSalidaChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="fecha_llegada">
                            Fecha de llegada
                        </label>

                        <input
                            id="fecha_llegada"
                            className="seguro-publico__text-input"
                            type="date"
                            value={fechaLlegada}
                            min={fechaSalida || undefined}
                            onChange={(e) => onFechaLlegadaChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="seguro-publico__company-help">
                <div className="seguro-publico__company-help-icon">
                    <span>↗</span>
                </div>

                <div className="seguro-publico__company-help-content">
                    <strong> ¿Necesitas ayuda con los datos de la unidad? </strong>

                    <p>
                        Puedes compartir un formulario privado con tu empresa de 
                        mudanza para que complete esta información directamente.
                    </p>

                    {
                        !enlaceEmpresa && (
                            <button type="button" className="seguro-publico__company-help-link" onClick={onGenerarEnlaceEmpresa} disabled={generandoEnlaceEmpresa} >
                                {
                                    generandoEnlaceEmpresa ? "Generando enlace..." : "Solicitar ayuda a mi empresa de mudanza"
                                }
                            </button>
                        )
                    }

                    {
                        enlaceEmpresa && (
                            <div className="seguro-publico__company-help-generated">
                                <span>
                                    Enlace privado generado
                                </span>

                                <button type="button"  onClick={() => {  navigator.clipboard.writeText(enlaceEmpresa); }} >
                                    Copiar enlace
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="seguro-publico__form-section">
                <div className="seguro-publico__form-section-heading">
                    <h3> Datos de la unidad </h3>
                    <p> Información del vehículo y del operador responsable. </p>
                </div>

                <div className="seguro-publico__field">
                    <label htmlFor="empresa_mudanza">
                        Empresa de mudanza
                    </label>

                    <input
                        id="empresa_mudanza"
                        className="seguro-publico__text-input"
                        type="text"
                        maxLength={150}
                        placeholder="Ej. Mudanzas del Golfo"
                        value={empresaMudanza}
                        onChange={(e) => onEmpresaMudanzaChange(e.target.value)}
                    />
                </div>

                <div className="seguro-publico__field">
                    <label htmlFor="propietario_unidad">
                        Propietario de la unidad
                    </label>

                    <input
                        id="propietario_unidad"
                        className="seguro-publico__text-input"
                        type="text"
                        maxLength={150}
                        placeholder="Ej. Juan Pérez"
                        value={propietarioUnidad}
                        onChange={(e) => onPropietarioUnidadChange(e.target.value)}
                    />
                </div>

                <div className="seguro-publico__form-grid">
                    <div className="seguro-publico__field">
                        <label htmlFor="marca_unidad">
                            Marca
                        </label>

                        <input
                            id="marca_unidad"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={100}
                            placeholder="Ej. Freightliner"
                            value={marcaUnidad}
                            onChange={(e) => onMarcaUnidadChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="modelo_unidad">
                            Modelo
                        </label>

                        <input
                            id="modelo_unidad"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={100}
                            placeholder="Ej. Cascadia"
                            value={modeloUnidad}
                            onChange={(e) => onModeloUnidadChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="seguro-publico__form-grid">
                    <div className="seguro-publico__field">
                        <label htmlFor="placas">
                            Placas
                        </label>

                        <input
                            id="placas"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={30}
                            placeholder="Ej. ABC-123-D"
                            value={placas}
                            onChange={(e) => onPlacasChange(e.target.value)}
                        />
                    </div>

                    <div className="seguro-publico__field">
                        <label htmlFor="chofer">
                            Chofer
                        </label>

                        <input
                            id="chofer"
                            className="seguro-publico__text-input"
                            type="text"
                            maxLength={150}
                            placeholder="Ej. Carlos Hernández"
                            value={chofer}
                            onChange={(e) => onChoferChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {
                error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )
            }

            {
                pasoTresGuardado && (
                    <div className="seguro-publico__saved">
                        <span> ✓ </span>

                        <div>
                            <strong>  Información guardada </strong>
                            <p> Los datos de la mudanza fueron registrados correctamente. </p>
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__actions seguro-publico__actions--step2">
                <button
                    type="button"
                    className="seguro-publico__button seguro-publico__button--secondary"
                    onClick={onAnterior}
                    disabled={saving}
                >
                    ← Anterior
                </button>

                <button type="button" className="seguro-publico__button" onClick={onGuardar} disabled={saving} >
                    {saving ? "Guardando..." : pasoTresGuardado ? "Actualizar información" : "Continuar"}
                </button>

            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}