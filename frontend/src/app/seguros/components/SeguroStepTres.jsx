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
    modalidadDatos,
    formaProporcionDatos,
    asistenciaEmpresaMudanza,
    asistenciaContacto,
    asistenciaTelefono,
    empresaDatosFinalizados,
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
    onModalidadDatosChange,
    onFormaProporcionDatosChange,
    onAsistenciaEmpresaMudanzaChange,
    onAsistenciaContactoChange,
    onAsistenciaTelefonoChange,
    onContinuar,
    onAnterior,
    onGenerarEnlaceEmpresa,
    generandoEnlaceEmpresa,
    enlaceEmpresa,
    primaEstimada,
    valorMenaje,
    valorAutomovil,
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

    const mostrarCamposCliente = modalidadDatos === "autogestion" && formaProporcionDatos === "cliente";
    const mostrarSolicitudEmpresa = modalidadDatos === "autogestion" && formaProporcionDatos === "empresa";
    const mostrarAsistencia = modalidadDatos === "asistida";

    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <h2> Información de la mudanza </h2>

                <p>
                    Confirma los datos de la mudanza y selecciona cómo quieres completar la información necesaria para tu póliza.
                </p>
            </div>

            <div className="seguro-publico__form-section">
                <div className="seguro-publico__form-section-heading">
                    <h3> ¿Cómo quieres completar la información? </h3>

                    <p>
                        Puedes proporcionar los datos directamente o solicitar que nuestro equipo te ayude con el proceso.
                    </p>
                </div>

                <div className="seguro-publico__field">
                    <label htmlFor="modalidad_datos">
                        Forma de completar los datos
                    </label>

                    <select id="modalidad_datos" className="seguro-publico__text-input" value={modalidadDatos} onChange={(e) => onModalidadDatosChange(e.target.value)} >
                        <option value="">
                            Selecciona una opción
                        </option>

                        <option value="autogestion">
                            Yo proporcionaré los datos
                        </option>

                        <option value="asistida">
                            Quiero póliza asistida
                        </option>
                    </select>
                </div>

                {
                    modalidadDatos === "autogestion" && (
                        <div className="seguro-publico__selection-description">
                            <p>
                                Puedes capturarlos tú mismo o solicitar a tu
                                empresa de mudanza que los complete mediante
                                un enlace privado.
                            </p>

                            <div className="seguro-publico__field">
                                <label htmlFor="forma_proporcion_datos">
                                    ¿Cómo quieres proporcionar los datos?
                                </label>

                                <select id="forma_proporcion_datos" className="seguro-publico__text-input" value={formaProporcionDatos} onChange={(e) => onFormaProporcionDatosChange(e.target.value)} >
                                    <option value="">
                                        Selecciona una opción
                                    </option>

                                    <option value="cliente">
                                        Capturarlos yo mismo
                                    </option>

                                    <option value="empresa">
                                        Solicitarlos a mi empresa de mudanza
                                    </option>
                                </select>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                modalidadDatos && (
                    <div className="seguro-publico__premium">
                        <div>
                            <span> Prima estimada </span>
                            <strong> {formatearMoneda(primaActual)} </strong>
                        </div>

                        <div>
                            {modalidadDatos === "asistida" ? (
                                <p>
                                    Póliza asistida: cálculo del <strong> 1.75% </strong> sobre el valor declarado.
                                </p>
                            ) : (
                                <p>
                                    Póliza estándar: cálculo del <strong> 1.35% </strong> sobre el valor declarado.
                                </p>
                            )}
                        </div>
                    </div>
                )
            }

            {
                mostrarAsistencia && (
                    <div className="seguro-publico__form-section">
                        <div className="seguro-publico__form-section-heading">
                            <h3> Póliza asistida </h3>

                            <p>
                                Nosotros contactamos a tu empresa de mudanza,
                                recopilamos la información necesaria y damos
                                seguimiento al proceso por ti.
                            </p>
                        </div>

                        <div className="seguro-publico__field">
                            <label htmlFor="asistencia_empresa_mudanza">
                                Empresa de mudanza
                            </label>

                            <input
                                id="asistencia_empresa_mudanza"
                                className="seguro-publico__text-input"
                                type="text"
                                maxLength={150}
                                placeholder="Nombre de la empresa"
                                value={asistenciaEmpresaMudanza}
                                onChange={(e) => onAsistenciaEmpresaMudanzaChange(e.target.value)}
                            />
                        </div>

                        <div className="seguro-publico__field">
                            <label htmlFor="asistencia_contacto">
                                Nombre del vendedor o contacto
                            </label>

                            <input
                                id="asistencia_contacto"
                                className="seguro-publico__text-input"
                                type="text"
                                maxLength={150}
                                placeholder="Ej. Juan Pérez"
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
                                placeholder="Ej. 4421234567"
                                value={asistenciaTelefono}
                                onChange={(e) => onAsistenciaTelefonoChange(e.target.value)}
                            />
                        </div>

                        <div className="seguro-publico__assistance-info">
                            <p>
                                Con estos datos nuestro equipo se encargará
                                de solicitar la información necesaria a tu
                                empresa de mudanza y preparar el expediente
                                para la emisión de tu póliza.
                            </p>

                            <strong> ¿Qué incluye la póliza asistida? </strong>

                            <ul>
                                <li>  Solicitamos los datos a tu empresa de mudanza </li>
                                <li> Revisamos y validamos la información </li>
                                <li> Damos seguimiento con la aseguradora </li>
                                <li> Te mantenemos informado en todo el proceso </li>
                            </ul>
                        </div>
                    </div>
                )
            }

            {
                mostrarSolicitudEmpresa && (
                    <div className="seguro-publico__company-help">
                        <div className="seguro-publico__company-help-icon">
                            <span>↗</span>
                        </div>

                        <div className="seguro-publico__company-help-content">
                            <strong>
                                Solicitar información a mi empresa
                            </strong>

                            <p>
                                Genera un enlace privado y compártelo con tu empresa de mudanza.
                                La empresa deberá completar los datos de la mudanza y de la unidad.
                            </p>

                            <div className="seguro-publico__company-help-steps">
                                <div>
                                    <strong>1.</strong>
                                    <span>Generar enlace privado</span>
                                </div>

                                <div>
                                    <strong>2.</strong>
                                    <span>Compartir enlace a la empresa</span>
                                </div>

                                <div>
                                    <strong>3.</strong>
                                    <span>La empresa completa la información</span>
                                </div>

                                <div>
                                    <strong>4.</strong>
                                    <span>Recibe y valida los datos</span>
                                </div>
                            </div>

                            {
                                !enlaceEmpresa && !empresaDatosFinalizados && (
                                    <button type="button" className="seguro-publico__company-help-link" onClick={onGenerarEnlaceEmpresa} disabled={generandoEnlaceEmpresa} >
                                        {generandoEnlaceEmpresa ? "Generando enlace..." : "Generar enlace privado"}
                                    </button>
                                )
                            }

                            {
                                enlaceEmpresa && !empresaDatosFinalizados && (
                                    <div className="seguro-publico__company-help-generated">
                                        <span> Enlace privado generado </span>

                                        <button type="button" onClick={() => { navigator.clipboard.writeText(enlaceEmpresa); }}  >
                                            Copiar enlace
                                        </button>
                                    </div>
                                )
                            }

                            {
                                empresaDatosFinalizados && (
                                    <div className="seguro-publico__saved">
                                        <span>✓</span>

                                        <div>
                                            <strong> Información de la empresa completada </strong>

                                            <p>
                                                La empresa de mudanza ya proporcionó los
                                                datos necesarios. Puedes continuar con la
                                                revisión y finalización del expediente.
                                            </p>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                !empresaDatosFinalizados && (
                                    <div className="seguro-publico__company-help-warning">
                                        <strong>
                                            Expediente pendiente de información
                                        </strong>

                                        <p>
                                            No podrás finalizar el expediente hasta que
                                            la empresa de mudanza complete y finalice sus datos.
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {
                mostrarCamposCliente && (
                    <>
                        <div className="seguro-publico__form-section">
                            <div className="seguro-publico__form-section-heading">
                                <h3> Datos de la mudanza </h3>

                                <p>
                                    Proporciona la información básica del traslado.
                                </p>
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="empresa_mudanza">
                                    Empresa de mudanza
                                </label>

                                <input id="empresa_mudanza" className="seguro-publico__text-input" type="text" maxLength={150} placeholder="Ej. Mudanzas del Golfo" value={empresaMudanza} onChange={(e) => onEmpresaMudanzaChange(e.target.value)} />
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="origen">
                                    Origen de la mudanza
                                </label>

                                <input id="origen" className="seguro-publico__text-input" type="text" maxLength={255} placeholder="Ej. Ciudad de México, CDMX" value={origen} onChange={(e) => onOrigenChange(e.target.value)} />
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="destino">
                                    Destino de la mudanza
                                </label>

                                <input id="destino" className="seguro-publico__text-input" type="text" maxLength={255} placeholder="Ej. Querétaro, Querétaro" value={destino} onChange={(e) => onDestinoChange(e.target.value)} />
                            </div>

                            <div className="seguro-publico__form-grid">
                                <div className="seguro-publico__field">
                                    <label htmlFor="fecha_salida">
                                        Fecha de salida
                                    </label>

                                    <input id="fecha_salida" className="seguro-publico__text-input" type="date" value={fechaSalida} onChange={(e) => onFechaSalidaChange(e.target.value)} />
                                </div>

                                <div className="seguro-publico__field">
                                    <label htmlFor="fecha_llegada">
                                        Fecha aproximada de llegada
                                    </label>

                                    <input id="fecha_llegada" className="seguro-publico__text-input" type="date" value={fechaLlegada} min={fechaSalida || undefined} onChange={(e) => onFechaLlegadaChange(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="seguro-publico__form-section">
                            <div className="seguro-publico__form-section-heading">
                                <h3> Datos de la unidad </h3>

                                <p>
                                    Información del vehículo y del operador responsable.
                                </p>
                            </div>

                            <div className="seguro-publico__field">
                                <label htmlFor="propietario_unidad">
                                    Propietario de la unidad
                                </label>

                                <input id="propietario_unidad" className="seguro-publico__text-input" type="text" maxLength={150} placeholder="Ej. Juan Pérez" value={propietarioUnidad} onChange={(e) => onPropietarioUnidadChange(e.target.value)} />
                            </div>

                            <div className="seguro-publico__form-grid">
                                <div className="seguro-publico__field">
                                    <label htmlFor="marca_unidad">
                                        Marca
                                    </label>

                                    <input id="marca_unidad" className="seguro-publico__text-input" type="text" maxLength={100} placeholder="Ej. Freightliner" value={marcaUnidad} onChange={(e) => onMarcaUnidadChange(e.target.value)} />
                                </div>

                                <div className="seguro-publico__field">
                                    <label htmlFor="modelo_unidad">
                                        Modelo
                                    </label>

                                    <input id="modelo_unidad" className="seguro-publico__text-input" type="text" maxLength={100} placeholder="Ej. Cascadia" value={modeloUnidad} onChange={(e) => onModeloUnidadChange(e.target.value)} />
                                </div>
                            </div>

                            <div className="seguro-publico__form-grid">
                                <div className="seguro-publico__field">
                                    <label htmlFor="placas">
                                        Placas
                                    </label>

                                    <input id="placas" className="seguro-publico__text-input" type="text" maxLength={30} placeholder="Ej. ABC-123-D" value={placas} onChange={(e) => onPlacasChange(e.target.value)} />
                                </div>

                                <div className="seguro-publico__field">
                                    <label htmlFor="chofer">
                                        Chofer
                                    </label>

                                    <input id="chofer" className="seguro-publico__text-input" type="text" maxLength={150} placeholder="Ej. Carlos Hernández" value={chofer} onChange={(e) => onChoferChange(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </>
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
                pasoTresGuardado && (
                    <div className="seguro-publico__saved">
                        <span>✓</span>

                        <div>
                            <strong> Información guardada </strong>

                            <p> Los datos de la mudanza fueron registrados correctamente. </p>
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__actions seguro-publico__actions--step2">
                <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={onAnterior} disabled={saving}  >
                    ← Anterior
                </button>

                <button type="button" className="seguro-publico__button" onClick={onContinuar} disabled={saving} >
                    {saving ? "Guardando..." : pasoTresGuardado ? "Actualizar información" : "Continuar"}
                </button>
            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}