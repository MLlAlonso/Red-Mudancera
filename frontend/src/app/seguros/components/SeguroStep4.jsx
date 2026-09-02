"use client";

export default function SeguroStep4({ expediente, formData, onAnterior, onFinalizar, finalizando, datosEmpresaCompletos, }) {
    const {
        nombre,
        email,
        telefono,
        tipoSeguro,
        valorMenaje,
        valorAutomovil,
        modalidadDatos,
        formaProporcionDatos,
        asistenciaEmpresaMudanza,
        asistenciaContacto,
        asistenciaTelefono,
        origen,
        destino,
        fechaSalida,
        fechaLlegada,
        empresaMudanza,
        propietarioUnidad,
        marcaUnidad,
        modeloUnidad,
        placas,
        chofer,
        automovilMarca,
        automovilModelo,
        automovilNumeroSerie,
        automovilFotoCirculacionUrl,
    } = formData;

    function formatearMoneda(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return "$0.00";
        }

        const numero = Number(String(valor).replace(/,/g, ""));

        if (Number.isNaN(numero)) {
            return "$0.00";
        }

        return numero.toLocaleString(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );
    }

    function obtenerTipoSeguro() {
        switch (tipoSeguro) {
            case "menaje":
                return "Menaje";

            case "automovil":
                return "Automóvil";

            case "menaje_auto":
                return "Menaje + Automóvil";

            default:
                return "No especificado";
        }
    }

    function obtenerModalidad() {
        switch (modalidadDatos) {
            case "autogestion":
                return "Autogestión";

            case "asistida":
                return "Póliza asistida";

            default:
                return "No especificada";
        }
    }

    function obtenerFormaProporcionDatos() {
        switch (formaProporcionDatos) {
            case "cliente":
                return "Yo proporcionaré los datos";

            case "empresa":
                return "La empresa de mudanza proporcionará los datos";

            default:
                return "No especificado";
        }
    }

    function obtenerDatosEmpresaFaltantes() {
        const campos = [
            {
                valor: expediente?.empresa_mudanza,
                nombre: "Empresa de mudanza",
            },
            {
                valor: expediente?.origen,
                nombre: "Origen",
            },
            {
                valor: expediente?.destino,
                nombre: "Destino",
            },
            {
                valor: expediente?.fecha_salida,
                nombre: "Fecha de salida",
            },
            {
                valor: expediente?.fecha_llegada,
                nombre: "Fecha de llegada",
            },
            {
                valor: expediente?.propietario_unidad,
                nombre: "Propietario de la unidad",
            },
            {
                valor: expediente?.marca_unidad,
                nombre: "Marca de la unidad",
            },
            {
                valor: expediente?.modelo_unidad,
                nombre: "Modelo de la unidad",
            },
            {
                valor: expediente?.placas,
                nombre: "Placas",
            },
            {
                valor: expediente?.chofer,
                nombre: "Chofer",
            },
        ];

        return campos
            .filter((campo) => campo.valor === null || campo.valor === undefined || String(campo.valor).trim() === "")
            .map((campo) => campo.nombre);
    }

    const muestraAutomovil = tipoSeguro === "automovil" || tipoSeguro === "menaje_auto";

    return (
        <section className="seguro-publico__step seguro-publico__step--review">
            <div className="seguro-publico__step-heading">
                <h2> Revisa tu expediente </h2>
                <p> Verifica que toda la información sea correcta antes de finalizar tu expediente. </p>
            </div>

            <div className="seguro-publico__review-notice">
                <div className="seguro-publico__review-notice-icon">
                    i
                </div>

                <div>
                    <strong> Revisa cuidadosamente la información </strong>
                    <p> Si necesitas realizar algún cambio, puedes regresar al paso correspondiente antes de finalizar el expediente. </p>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span> 01 </span>

                        <div>
                            <h3> Datos del cliente </h3>
                            <p> Información de contacto. </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => onAnterior(2)} disabled={finalizando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span> Nombre completo </span>
                        <strong> {nombre || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Correo electrónico </span>
                        <strong> {email || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Teléfono / WhatsApp </span>
                        <strong> {telefono || "No registrado"} </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span> 02 </span>

                        <div>
                            <h3> Información del seguro </h3>
                            <p> Protección seleccionada y valores declarados. </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => onAnterior(1)} disabled={finalizando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span> Tipo de seguro </span>
                        <strong> {obtenerTipoSeguro()} </strong>
                    </div>

                    {
                        (tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") && (
                            <div className="seguro-publico__review-item">
                                <span> Valor declarado del menaje </span>
                                <strong> {formatearMoneda(valorMenaje)} </strong>
                            </div>
                        )
                    }

                    {
                        (tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (
                            <div className="seguro-publico__review-item">
                                <span>  Valor declarado del automóvil </span>
                                <strong> {formatearMoneda(valorAutomovil)} </strong>
                            </div>
                        )
                    }

                    <div className="seguro-publico__review-item seguro-publico__review-item--highlight">
                        <span> Prima estimada </span>
                        <strong> {formatearMoneda(expediente?.prima_estimada)} </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span> 03 </span>

                        <div>
                            <h3> Modalidad de atención  </h3>
                            <p>  Información sobre cómo se completará el expediente. </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => onAnterior(3)} disabled={finalizando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span> Modalidad </span>
                        <strong> {obtenerModalidad()} </strong>
                    </div>

                    {
                        modalidadDatos === "autogestion" && (
                            <div className="seguro-publico__review-item">
                                <span> Quién proporciona los datos </span>
                                <strong> {obtenerFormaProporcionDatos()}  </strong>
                            </div>
                        )
                    }

                    {
                        modalidadDatos === "asistida" && (
                            <>
                                <div className="seguro-publico__review-item">
                                    <span> Empresa de mudanza </span>
                                    <strong> {asistenciaEmpresaMudanza || "No registrada"} </strong>
                                </div>

                                <div className="seguro-publico__review-item">
                                    <span> Contacto </span>
                                    <strong> {asistenciaContacto || "No registrado"} </strong>
                                </div>

                                <div className="seguro-publico__review-item">
                                    <span> Teléfono / WhatsApp </span>
                                    <strong> {asistenciaTelefono || "No registrado"} </strong>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span> 04 </span>

                        <div>
                            <h3> Datos de la mudanza </h3>
                            <p> Información relacionada con el traslado. </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => onAnterior(3)} disabled={finalizando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span> Origen </span>
                        <strong> {origen || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span>  Destino </span>
                        <strong> {destino || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Fecha de salida </span>
                        <strong> {fechaSalida || "No registrada"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Fecha de llegada </span>
                        <strong> {fechaLlegada || "No registrada"} </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span> 05 </span>

                        <div>
                            <h3>  Datos de la unidad </h3>
                            <p> Información proporcionada por la empresa de mudanza. </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => onAnterior(3)} disabled={finalizando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span> Empresa de mudanza </span>

                        <strong> {empresaMudanza || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Propietario de la unidad </span>

                        <strong> {propietarioUnidad || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span>  Marca  </span>

                        <strong>  {marcaUnidad || "No registrada"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Modelo </span>

                        <strong> {modeloUnidad || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span>  Placas </span>

                        <strong> {placas || "No registradas"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Chofer </span>

                        <strong> {chofer || "No registrado"} </strong>
                    </div>
                </div>
            </div>

            {
                muestraAutomovil && (
                    <div className="seguro-publico__review-section">
                        <div className="seguro-publico__review-section-heading">
                            <div>
                                <span> 06 </span>

                                <div>
                                    <h3> Datos del automóvil </h3>
                                    <p> Información del automóvil considerado para el seguro. </p>
                                </div>
                            </div>

                            <button type="button" onClick={() => onAnterior(1)} disabled={finalizando} >
                                Editar
                            </button>
                        </div>

                        <div className="seguro-publico__review-grid">
                            <div className="seguro-publico__review-item">
                                <span> Marca </span>
                                <strong> {automovilMarca || expediente?.automovil_marca || "No registrada"} </strong>
                            </div>

                            <div className="seguro-publico__review-item">
                                <span> Modelo </span>
                                <strong> {automovilModelo || expediente?.automovil_modelo || "No registrado"} </strong>
                            </div>

                            <div className="seguro-publico__review-item">
                                <span> Número de serie </span>
                                <strong> {automovilNumeroSerie || expediente?.automovil_numero_serie || "No registrado"} </strong>
                            </div>
                        </div>

                        {
                            (automovilFotoCirculacionUrl || expediente?.automovil_foto_circulacion_url) && (
                                <div className="seguro-publico__review-notice">
                                    <div className="seguro-publico__review-notice-icon">
                                        ✓
                                    </div>

                                    <div>
                                        <strong> Tarjeta de circulación adjunta </strong>
                                        <p> Se ha registrado una fotografía de la tarjeta de circulación del automóvil. </p>

                                        <a href={automovilFotoCirculacionUrl || expediente?.automovil_foto_circulacion_url} target="_blank" rel="noopener noreferrer" >
                                            Ver / descargar imagen
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }

            {
                !datosEmpresaCompletos && (
                    <div className="seguro-publico__review-notice">
                        <div className="seguro-publico__review-notice-icon">
                            !
                        </div>

                        <div>
                            <strong>  La información de la empresa está incompleta </strong>

                            <p>
                                No puedes finalizar el expediente todavía.
                                La empresa de mudanza debe completar todos los datos correspondientes a la unidad y a la mudanza.
                            </p>

                            {
                                obtenerDatosEmpresaFaltantes().length > 0 && (
                                    <p>
                                        <strong> Datos pendientes: </strong>{" "}
                                        { obtenerDatosEmpresaFaltantes().join(", ") }.
                                    </p>
                                )
                            }
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__review-confirmation">
                <div className="seguro-publico__review-confirmation-icon">
                    ✓
                </div>

                <div>
                    <strong> ¿Todo está correcto? </strong>

                    <p>
                        Al finalizar enviaremos tu expediente para revisión.
                        También se generará el documento correspondiente con toda la información capturada.
                    </p>
                </div>
            </div>

            <div className="seguro-publico__actions seguro-publico__actions--review">
                <button type="button" className="seguro-publico__button seguro-publico__button--secondary" onClick={() => onAnterior(3)} disabled={finalizando} >
                    ← Anterior
                </button>

                <button type="button" className="seguro-publico__button" onClick={onFinalizar} disabled={ finalizando || !datosEmpresaCompletos } >
                    { finalizando ? "Finalizando..." : !datosEmpresaCompletos ? "Datos incompletos" : "Finalizar expediente" }
                </button>
            </div>

            <p className="seguro-publico__privacy">
                Al finalizar confirmas que revisaste la información proporcionada y que es correcta.
            </p>
        </section>
    );
}