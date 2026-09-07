"use client";

export default function SeguroExpedienteCompletado({ expediente, formatearMoneda, }) {
    function obtenerTipoSeguro() {
        switch (expediente?.tipo_seguro) {
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

    function formatearFecha(fecha) {
        if (!fecha) {
            return "No registrada";
        }

        const fechaNormalizada = String(fecha).substring(0, 10);
        const [year, month, day] = fechaNormalizada.split("-");

        if (!year || !month || !day) {
            return fechaNormalizada;
        }

        return `${day}/${month}/${year}`;
    }

    function obtenerTiempoLlegada(valor) {
        switch (valor) {
            case "1-7":
                return "1-7 días";

            case "8-12":
                return "8-12 días";

            case "13-18":
                return "13-18 días";

            case "18+":
                return "+18 días";

            default:
                return "No registrado";
        }
    }

    function obtenerTipoServicio(valor) {
        switch (valor) {
            case "contratado":
                return "Contratado";

            case "compartido":
                return "Compartido";

            case "exclusivo":
                return "Exclusivo";

            default:
                return "No especificado";
        }
    }

    function enviarWhatsApp() {
        const mensaje = encodeURIComponent(
            `Hola, buen día.\n\n` +
            `Mi nombre es ${expediente?.nombre || ""} y he realizado el pago correspondiente a mi seguro.\n\n` +
            `Nombre: ${expediente?.nombre || ""}\n` +
            `Folio: ${expediente?.folio || ""}\n\n` +
            `Quiero enviar mi comprobante de pago para continuar con el proceso.`
        );

        window.open(`https://wa.me/524421896433?text=${mensaje}`, "_blank", "noopener,noreferrer");
    }

    function enviarCorreo() {
        const asunto = encodeURIComponent(`Comprobante de pago - ${expediente?.nombre || ""} - Folio ${expediente?.folio || ""}`);

        const cuerpo = encodeURIComponent(
            `Hola, buen día.\n\n` +
            `Mi nombre es ${expediente?.nombre || ""} y adjunto mi comprobante de pago correspondiente a mi seguro.\n\n` +
            `Nombre: ${expediente?.nombre || ""}\n` +
            `Folio: ${expediente?.folio || ""}\n\n` +
            `Quedo atento(a) a la confirmación de la recepción de mi comprobante.\n\n` +
            `Saludos.`
        );

        window.location.href = `mailto:atnclientes@segurosdecarga.com?subject=${asunto}&body=${cuerpo}`;
    }

    return (
        <main className="seguro-publico">
            <section className="seguro-publico__card seguro-publico__card--completed">
                <div className="seguro-publico__completed-header">
                    <div className="seguro-publico__success-icon">
                        ✓
                    </div>

                    <span className="seguro-publico__eyebrow">
                        Expediente finalizado
                    </span>

                    <h1> ¡Tu expediente fue completado! </h1>

                    <p className="seguro-publico__completed-intro">
                        Tu expediente fue finalizado correctamente. La información completa y el documento generado fueron enviados al área encargada de revisar tu solicitud.
                    </p>
                </div>

                <div className="seguro-publico__folio">
                    <span>Folio</span>
                    <strong>{expediente?.folio}</strong>
                </div>

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <div>
                                <h2>Datos para realizar el pago</h2>
                                <p> Utiliza esta información para realizar el pago de tu seguro. </p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__payment">
                        <div className="seguro-publico__payment-header">
                            <span> Cuenta para pagos en moneda nacional </span>
                            <strong> PESOS MEXICANOS </strong>
                        </div>

                        <div className="seguro-publico__payment-grid">
                            <div className="seguro-publico__payment-item">
                                <span>Beneficiario</span>
                                <strong> Prevención Global de Carga SA de CV </strong>
                            </div>

                            <div className="seguro-publico__payment-item">
                                <span>R.F.C.</span>
                                <strong> PGC140409TC5 </strong>
                            </div>

                            <div className="seguro-publico__payment-item">
                                <span>Banco</span>
                                <strong> Scotiabank </strong>
                            </div>

                            <div className="seguro-publico__payment-item">
                                <span>Cuenta</span>
                                <strong> 01003103307 </strong>
                            </div>

                            <div className="seguro-publico__payment-item seguro-publico__payment-item--full">
                                <span>Cuenta CLABE</span>
                                <strong> 044320010031033073 </strong>
                            </div>

                            <div className="seguro-publico__payment-item seguro-publico__payment-item--full">
                                <span>Correo electrónico</span>
                                <strong> atnclientes@segurosdecarga.com </strong>
                            </div>
                        </div>

                        <div className="seguro-publico__payment-total">
                            <span> Importe a pagar </span>
                            <strong> {formatearMoneda(expediente?.prima_estimada)} </strong>
                        </div>
                    </div>

                    <div className="seguro-publico__payment-instructions">
                        <div>
                            <strong> ¿Ya realizaste el pago? </strong>
                            <p> Envíanos tu comprobante de pago para continuar con el proceso de tu seguro. </p>
                        </div>
                    </div>

                    <div className="seguro-publico__payment-actions">
                        <button type="button" className="seguro-publico__payment-button seguro-publico__payment-button--whatsapp" onClick={enviarWhatsApp} >
                            Enviar comprobante por WhatsApp
                        </button>

                        <button type="button" className="seguro-publico__payment-button seguro-publico__payment-button--email" onClick={enviarCorreo} >
                            Enviar comprobante por correo
                        </button>
                    </div>
                </div>

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <span>01</span>

                            <div>
                                <h2>Datos del cliente</h2>
                                <p>Información de contacto.</p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__completed-grid">
                        <div className="seguro-publico__completed-item">
                            <span>Nombre completo</span>
                            <strong>
                                {expediente?.nombre || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Correo electrónico</span>
                            <strong>
                                {expediente?.email || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Teléfono / WhatsApp</span>
                            <strong>
                                {expediente?.telefono || "No registrado"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <span>02</span>

                            <div>
                                <h2>Información del seguro</h2>
                                <p>Protección y valores declarados.</p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__completed-grid">
                        <div className="seguro-publico__completed-item">
                            <span>Tipo de seguro</span>
                            <strong>
                                {obtenerTipoSeguro()}
                            </strong>
                        </div>

                        {(expediente?.tipo_seguro === "menaje" || expediente?.tipo_seguro === "menaje_auto") && (
                            <div className="seguro-publico__completed-item">
                                <span> Valor declarado del menaje </span>

                                <strong>
                                    {formatearMoneda(expediente?.valor_menaje)}
                                </strong>
                            </div>
                        )}

                        {(expediente?.tipo_seguro === "automovil" || expediente?.tipo_seguro === "menaje_auto") && (
                            <div className="seguro-publico__completed-item">
                                <span> Valor declarado del automóvil</span>

                                <strong>
                                    {formatearMoneda(expediente?.valor_automovil)}
                                </strong>
                            </div>
                        )}
                    </div>

                    <div className="seguro-publico__completed-premium">
                        <span>Prima estimada</span>

                        <strong>
                            {formatearMoneda(expediente?.prima_estimada)}
                        </strong>
                    </div>
                </div>

                {(expediente?.tipo_seguro === "automovil" || expediente?.tipo_seguro === "menaje_auto") && (
                    <div className="seguro-publico__completed-section">
                        <div className="seguro-publico__completed-section-heading">
                            <div>
                                <div>
                                    <h2>Datos del automóvil</h2>
                                    <p>
                                        Información del vehículo declarado en el expediente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="seguro-publico__completed-grid">
                            <div className="seguro-publico__completed-item">
                                <span>Marca</span>
                                <strong>
                                    {expediente?.automovil_marca || "No registrada"}
                                </strong>
                            </div>

                            <div className="seguro-publico__completed-item">
                                <span>Modelo</span>
                                <strong>
                                    {expediente?.automovil_modelo || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguro-publico__completed-item">
                                <span>Número de serie</span>
                                <strong>
                                    {expediente?.automovil_numero_serie || "No registrado"}
                                </strong>
                            </div>

                            {expediente?.automovil_foto_circulacion_url && (
                                <div className="seguro-publico__completed-item seguro-publico__completed-item--full">
                                    <span>Tarjeta de circulación</span>

                                    <strong>
                                        <a href={expediente.automovil_foto_circulacion_url} target="_blank" rel="noopener noreferrer" >
                                            Ver documento
                                        </a>
                                    </strong>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <span>03</span>

                            <div>
                                <h2>Modalidad de atención</h2>
                                <p> Información sobre cómo se gestionó el expediente.</p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__completed-grid">
                        <div className="seguro-publico__completed-item">
                            <span>Modalidad</span>

                            <strong>
                                {expediente?.modalidad_datos === "asistida" ? "Póliza asistida" : expediente?.modalidad_datos === "autogestion" ? "Autogestión" : "No especificada"}
                            </strong>
                        </div>

                        {expediente?.modalidad_datos === "autogestion" && (
                            <div className="seguro-publico__completed-item">
                                <span> Quién proporciona los datos </span>

                                <strong>
                                    {expediente?.forma_proporcion_datos === "cliente" ? "Yo proporcionaré los datos"
                                        : expediente?.forma_proporcion_datos === "empresa" ? "La empresa de mudanza proporcionará los datos" : "No especificado"}
                                </strong>
                            </div>
                        )}

                        {expediente?.modalidad_datos === "asistida" && (
                            <>
                                <div className="seguro-publico__completed-item">
                                    <span>Empresa de mudanza</span>

                                    <strong>
                                        {expediente?.asistencia_empresa_mudanza || "No registrada"}
                                    </strong>
                                </div>

                                <div className="seguro-publico__completed-item">
                                    <span>Contacto</span>

                                    <strong>
                                        {expediente?.asistencia_contacto || "No registrado"}
                                    </strong>
                                </div>

                                <div className="seguro-publico__completed-item">
                                    <span>Teléfono / WhatsApp</span>

                                    <strong>
                                        {expediente?.asistencia_telefono || "No registrado"}
                                    </strong>
                                </div>
                            </>
                        )}
                    </div>

                    {expediente?.modalidad_datos === "asistida" && (
                        <div className="seguro-publico__completed-notice">
                            <div className="seguro-publico__completed-notice-icon">
                                i
                            </div>

                            <div>
                                <strong>Póliza asistida</strong>

                                <p>
                                    El equipo de Mudanza Fácil dará seguimiento a la información necesaria con la empresa
                                    de mudanza para continuar con el proceso de emisión de la póliza.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <span>04</span>

                            <div>
                                <h2>Datos de la mudanza</h2>
                                <p> Información relacionada con el traslado. </p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__completed-grid">
                        <div className="seguro-publico__completed-item">
                            <span>Origen</span>
                            <strong>
                                {expediente?.origen || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Destino</span>
                            <strong>
                                {expediente?.destino || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Fecha de salida</span>
                            <strong>
                                {formatearFecha(expediente?.fecha_salida)}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Tiempo aproximado de llegada</span>
                            <strong>
                                {obtenerTiempoLlegada(expediente?.fecha_llegada)}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Tipo de servicio</span>
                            <strong>
                                {obtenerTipoServicio(expediente?.tipo_servicio)}
                            </strong>
                        </div>

                        {expediente?.inventario && (
                            <div className="seguro-publico__completed-item seguro-publico__completed-item--full">
                                <span>Inventario</span>
                                <strong>
                                    {expediente.inventario}
                                </strong>
                            </div>
                        )}
                    </div>
                </div>

                <div className="seguro-publico__completed-section">
                    <div className="seguro-publico__completed-section-heading">
                        <div>
                            <span>05</span>

                            <div>
                                <h2>Datos de la unidad</h2>
                                <p>
                                    Información de la empresa de mudanza y del operador responsable.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="seguro-publico__completed-grid">
                        <div className="seguro-publico__completed-item">
                            <span>Empresa de mudanza</span>
                            <strong>
                                {expediente?.empresa_mudanza || "No registrada"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Propietario de la unidad</span>
                            <strong>
                                {expediente?.propietario_unidad || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Marca</span>
                            <strong>
                                {expediente?.marca_unidad || "No registrada"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Modelo</span>
                            <strong>
                                {expediente?.modelo_unidad || "No registrado"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Placas</span>
                            <strong>
                                {expediente?.placas || "No registradas"}
                            </strong>
                        </div>

                        <div className="seguro-publico__completed-item">
                            <span>Chofer</span>
                            <strong>
                                {expediente?.chofer || "No registrado"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__completed-footer">
                    <div className="seguro-publico__completed-footer-icon">
                        ✓
                    </div>

                    <div>
                        <strong> Tu información ha sido enviada correctamente </strong>

                        <p>
                            El expediente fue registrado y enviado para continuar con el proceso de revisión de tu solicitud de seguro.
                        </p>
                    </div>
                </div>

                <p className="seguro-publico__privacy">
                    Guarda tu folio para cualquier consulta relacionada con tu expediente de seguro.
                </p>
            </section>
        </main>
    );
}