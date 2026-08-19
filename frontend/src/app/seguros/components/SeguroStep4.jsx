"use client";

export default function SeguroStep4({ expediente, formData, onAnterior, onFinalizar, finalizando, }) {
    const {
        nombre,
        email,
        telefono,
        tipoSeguro,
        valorMenaje,
        valorAutomovil,
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

    return (
        <section className="seguro-publico__step seguro-publico__step--review">
            <div className="seguro-publico__step-heading">
                <span> Paso 4 </span>

                <h2> Revisa tu expediente </h2>

                <p>
                    Verifica que toda la información sea correcta antes de finalizar tu expediente.
                </p>
            </div>

            <div className="seguro-publico__review-notice">
                <div className="seguro-publico__review-notice-icon">
                    i
                </div>

                <div>
                    <strong> Revisa cuidadosamente la información </strong>

                    <p>
                        Si necesitas realizar algún cambio, puedes regresar al paso correspondiente antes de finalizar el expediente.
                    </p>
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
                        <strong>  {telefono || "No registrado"}  </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>  02 </span>

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
                                <strong>  {formatearMoneda(valorMenaje)}  </strong>
                            </div>
                        )
                    }

                    {
                        (tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (
                            <div className="seguro-publico__review-item">
                                <span> Valor declarado del automóvil </span>
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
                            <h3>  Datos de la mudanza </h3>
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
                        <span> Destino </span>
                        <strong> {destino || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Fecha de salida </span>
                        <strong> {fechaSalida || "No registrada"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span>  Fecha de llegada </span>
                        <strong> {fechaLlegada || "No registrada"}  </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>  03 </span>

                        <div>
                            <h3> Datos de la unidad </h3>
                            <p> Información proporcionada por la empresa de mudanza. </p>
                        </div>
                    </div>

                    <button type="button"  onClick={() => onAnterior(3)}  disabled={finalizando} >
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
                        <strong>  {propietarioUnidad || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span>  Marca </span>
                        <strong> {marcaUnidad || "No registrada"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Modelo </span>
                        <strong>  {modeloUnidad || "No registrado"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Placas </span>
                        <strong> {placas || "No registradas"} </strong>
                    </div>

                    <div className="seguro-publico__review-item">
                        <span> Chofer </span>
                        <strong> {chofer || "No registrado"}  </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-confirmation">
                <div className="seguro-publico__review-confirmation-icon">
                    ✓
                </div>

                <div>
                    <strong>
                        ¿Todo está correcto?
                    </strong>

                    <p>
                        Al finalizar enviaremos tu expediente para revisión. 
                        También se generará el documento correspondiente con toda la información capturada.
                    </p>
                </div>
            </div>

            <div className="seguro-publico__actions seguro-publico__actions--review">
                <button
                    type="button"
                    className="seguro-publico__button seguro-publico__button--secondary"
                    onClick={() => onAnterior(3)}
                    disabled={finalizando}
                >
                    ← Anterior
                </button>

                <button type="button"  className="seguro-publico__button"  onClick={onFinalizar}  disabled={finalizando} >
                    { finalizando ? "Finalizando..." : "Finalizar expediente" }
                </button>
            </div>

            <p className="seguro-publico__privacy">
                Al finalizar confirmas que revisaste la información proporcionada y que es correcta.
            </p>
        </section>
    );
}