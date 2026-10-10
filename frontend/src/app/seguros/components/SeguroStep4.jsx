
"use client";

import { useState } from "react";

export default function SeguroStep4({ expediente, formData, onGuardarCliente, onGuardarSeguro, onGuardarAsistencia, onFinalizar, finalizando, datosEmpresaCompletos, }) {
    const {
        nombre,
        email,
        telefono,
        tipoSeguro,
        valorMenaje,
        valorAutomovil,
        modalidadDatos,
        asistenciaEmpresaMudanza,
        asistenciaContacto,
        asistenciaTelefono,
        origen,
        destino,
        fechaSalida,
        fechaLlegada,
        tipoServicio,
        empresaMudanza,
        propietarioUnidad,
        marcaUnidad,
        modeloUnidad,
        placas,
        chofer,
        automovilFotoCirculacionUrl,
    } = formData;

    const [modal, setModal] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [errorModal, setErrorModal] = useState("");
    const [fotoPreviewUrl, setFotoPreviewUrl] = useState("");
    const [clienteDraft, setClienteDraft] = useState({ nombre: "", email: "", telefono: "", });

    const [seguroDraft, setSeguroDraft] = useState({
        tipoSeguro: "",
        valorMenaje: "",
        valorAutomovil: "",
        foto: "",
        fotoFile: null,
        eliminarFoto: false,
    });

    const [asistenciaDraft, setAsistenciaDraft] = useState({ empresa: "", contacto: "", telefono: "", });
    const muestraMenaje = tipoSeguro === "menaje" || tipoSeguro === "menaje_auto";
    const muestraAutomovil = tipoSeguro === "automovil" || tipoSeguro === "menaje_auto";
    const muestraMenajeDraft = seguroDraft.tipoSeguro === "menaje" || seguroDraft.tipoSeguro === "menaje_auto";
    const muestraAutomovilDraft = seguroDraft.tipoSeguro === "automovil" || seguroDraft.tipoSeguro === "menaje_auto";
    const fotoActual = automovilFotoCirculacionUrl || expediente?.automovil_foto_circulacion_url || "";
    const fotoVisible = seguroDraft.fotoFile ? fotoPreviewUrl : seguroDraft.eliminarFoto ? "" : seguroDraft.foto;
    const [mostrarFoto, setMostrarFoto] = useState(false);

    function formatearMoneda(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return "$0.00";
        }

        const numero = Number(String(valor).replace(/,/g, ""));

        if (Number.isNaN(numero)) {
            return "$0.00";
        }

        return numero.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function obtenerTipoSeguro(tipo = tipoSeguro) {
        switch (tipo) {
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

    function abrirModalCliente() {
        setClienteDraft({ nombre: nombre || "", email: email || "", telefono: telefono || "", });
        setErrorModal("");
        setModal("cliente");
    }

    function abrirModalSeguro() {
        setSeguroDraft({
            tipoSeguro: tipoSeguro || "",
            valorMenaje: valorMenaje ?? "",
            valorAutomovil: valorAutomovil ?? "",
            foto: fotoActual,
            fotoFile: null,
            eliminarFoto: false,
        });
        setFotoPreviewUrl("");
        setErrorModal("");
        setModal("seguro");
    }

    function abrirModalAsistencia() {
        setAsistenciaDraft({ empresa: asistenciaEmpresaMudanza || "", contacto: asistenciaContacto || "", telefono: asistenciaTelefono || "", });
        setErrorModal("");
        setModal("asistencia");
    }

    function cerrarModal() {
        if (guardando) {
            return;
        }

        setModal("");
        setErrorModal("");
    }

    function cambiarTipoSeguro(tipo) {
        setSeguroDraft((prev) => ({
            ...prev,
            tipoSeguro: tipo,
            valorMenaje: tipo === "automovil" ? "" : prev.valorMenaje,
            valorAutomovil: tipo === "menaje" ? "" : prev.valorAutomovil,
            fotoFile: tipo === "menaje" ? null : prev.fotoFile,
            foto: tipo === "menaje" ? "" : prev.foto,
            eliminarFoto: tipo === "menaje" ? true : prev.eliminarFoto,
        }));
    }

    function seleccionarFoto(file) {
        setErrorModal("");

        if (!file) {
            return;
        }

        const tiposPermitidos = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (!tiposPermitidos.includes(file.type)) {
            setErrorModal("Formato no permitido. Selecciona una imagen JPG, PNG o WEBP.");
            return;
        }

        setFotoPreviewUrl(URL.createObjectURL(file));

        setSeguroDraft((prev) => ({
            ...prev,
            fotoFile: file,
            eliminarFoto: false,
        }));
    }

    function eliminarFoto() {
        setFotoPreviewUrl("");
        setSeguroDraft((prev) => ({
            ...prev,
            fotoFile: null,
            foto: "",
            eliminarFoto: true,
        }));
    }

    async function guardarCliente() {
        setErrorModal("");
        const nombreLimpio = clienteDraft.nombre.trim();
        const emailLimpio = clienteDraft.email.trim();
        const telefonoLimpio = clienteDraft.telefono.trim();

        if (!nombreLimpio || !emailLimpio || !telefonoLimpio) {
            setErrorModal("Completa el nombre, correo electrónico y teléfono.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
            setErrorModal("Ingresa un correo electrónico válido.");
            return;
        }

        try {
            setGuardando(true);

            await onGuardarCliente({
                nombre: nombreLimpio,
                email: emailLimpio,
                telefono: telefonoLimpio,
            });

            setModal("");
        } catch (error) {
            setErrorModal(error.message || "No fue posible guardar los datos del cliente.");
        } finally {
            setGuardando(false);
        }
    }

    async function guardarSeguro() {
        setErrorModal("");

        if (!seguroDraft.tipoSeguro) {
            setErrorModal("Selecciona el tipo de seguro.");
            return;
        }

        const menaje = seguroDraft.valorMenaje === "" ? null : Number(String(seguroDraft.valorMenaje).replace(/,/g, ""));
        const automovil = seguroDraft.valorAutomovil === "" ? null : Number(String(seguroDraft.valorAutomovil).replace(/,/g, ""));

        if (muestraMenajeDraft && (!menaje || !Number.isFinite(menaje) || menaje <= 0)) {
            setErrorModal("Indica un valor de menaje mayor que cero.");
            return;
        }

        if (muestraAutomovilDraft && (!automovil || !Number.isFinite(automovil) || automovil <= 0)) {
            setErrorModal("Indica un valor de automóvil mayor que cero.");
            return;
        }

        const incluyeAutomovil = muestraAutomovilDraft;
        const fotoFinal = seguroDraft.fotoFile ? seguroDraft.fotoFile : seguroDraft.eliminarFoto ? null : seguroDraft.foto;

        if (incluyeAutomovil && !fotoFinal) {
            setErrorModal("Adjunta la fotografía de la tarjeta de circulación para continuar.");
            return;
        }

        try {
            setGuardando(true);

            await onGuardarSeguro({
                tipoSeguro: seguroDraft.tipoSeguro,
                valorMenaje: muestraMenajeDraft ? menaje : null,
                valorAutomovil: incluyeAutomovil ? automovil : null,
                automovilFotoFile: seguroDraft.fotoFile,
                eliminarFotoAutomovil: seguroDraft.eliminarFoto,
            });

            setModal("");
        } catch (error) {
            setErrorModal(error.message || "No fue posible guardar la información del seguro.");
        } finally {
            setGuardando(false);
        }
    }

    async function guardarAsistencia() {
        setErrorModal("");

        if (!asistenciaDraft.empresa.trim() || !asistenciaDraft.contacto.trim() || !asistenciaDraft.telefono.trim()) {
            setErrorModal("Completa el nombre de la empresa, el contacto y el teléfono.");
            return;
        }

        try {
            setGuardando(true);

            await onGuardarAsistencia({
                asistencia_empresa_mudanza: asistenciaDraft.empresa.trim(),
                asistencia_contacto: asistenciaDraft.contacto.trim(),
                asistencia_telefono: asistenciaDraft.telefono.trim(),
            });

            setModal("");
        } catch (error) {
            setErrorModal(error.message || "No fue posible guardar los datos de asistencia.");
        } finally {
            setGuardando(false);
        }
    }

    const faltantesCliente = [];

    if (!nombre?.trim()) faltantesCliente.push("Nombre");
    if (!email?.trim()) {
        faltantesCliente.push("Correo electrónico");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        faltantesCliente.push("Correo electrónico válido");
    }
    if (!telefono?.trim()) faltantesCliente.push("Teléfono");

    const faltantesSeguro = [];

    if (!tipoSeguro) {
        faltantesSeguro.push("Tipo de seguro");
    }

    if (muestraMenaje && !(Number(valorMenaje) > 0)) {
        faltantesSeguro.push("Valor del menaje");
    }

    if (muestraAutomovil && !(Number(valorAutomovil) > 0)) {
        faltantesSeguro.push("Valor del automóvil");
    }

    if (muestraAutomovil && !fotoActual) {
        faltantesSeguro.push("Fotografía de la tarjeta de circulación");
    }

    const faltantesAsistencia = [];

    if (modalidadDatos === "asistida") {
        if (!asistenciaEmpresaMudanza?.trim()) {
            faltantesAsistencia.push("Empresa para la asistencia");
        }

        if (!asistenciaContacto?.trim()) {
            faltantesAsistencia.push("Contacto de asistencia");
        }

        if (!asistenciaTelefono?.trim()) {
            faltantesAsistencia.push("Teléfono de asistencia");
        }
    }

    const datosRevisionCompletos = faltantesCliente.length === 0 && faltantesSeguro.length === 0 && faltantesAsistencia.length === 0 && datosEmpresaCompletos;

    const faltantesEmpresa = [
        { valor: expediente?.empresa_mudanza, nombre: "Empresa de mudanza" },
        { valor: expediente?.origen, nombre: "Origen" },
        { valor: expediente?.destino, nombre: "Destino" },
        { valor: expediente?.fecha_salida, nombre: "Fecha de salida" },
        { valor: expediente?.fecha_llegada, nombre: "Fecha de llegada" },
        { valor: expediente?.propietario_unidad, nombre: "Propietario de la unidad" },
        { valor: expediente?.marca_unidad, nombre: "Marca de la unidad" },
        { valor: expediente?.modelo_unidad, nombre: "Modelo de la unidad" },
        { valor: expediente?.placas, nombre: "Placas" },
        { valor: expediente?.chofer, nombre: "Chofer" },
    ]
        .filter((campo) => campo.valor === null || campo.valor === undefined || String(campo.valor).trim() === "")
        .map((campo) => campo.nombre);

    return (
        <section className="seguro-publico__step seguro-publico__step--review">
            <div className="seguro-publico__step-heading">
                <h2>Revisa tu expediente</h2>
                <p> Comprueba tu información y corrige cualquier dato antes de finalizar. </p>
            </div>

            <div className="seguro-publico__review-notice">
                <div className="seguro-publico__review-notice-icon">i</div>
                <div>
                    <strong>Antes de finalizar</strong>
                    <p>
                        Puedes editar tus datos de contacto, los valores asegurados y la información de asistencia desde esta pantalla.
                        Los datos de la mudanza y de la unidad son administrados por la empresa de mudanza.
                    </p>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>01</span>
                        <div>
                            <h3>Datos del cliente</h3>
                            <p>Información de contacto.</p>
                        </div>
                    </div>

                    <button type="button" onClick={abrirModalCliente} disabled={finalizando || guardando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span>Nombre completo</span>
                        <strong>{nombre || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Correo electrónico</span>
                        <strong>{email || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Teléfono / WhatsApp</span>
                        <strong>{telefono || "No registrado"}</strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>02</span>
                        <div>
                            <h3>Información del seguro</h3>
                            <p>Tipo de protección y valores declarados.</p>
                        </div>
                    </div>

                    <button type="button" onClick={abrirModalSeguro} disabled={finalizando || guardando} >
                        Editar
                    </button>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span>Tipo de seguro</span>
                        <strong>{obtenerTipoSeguro()}</strong>
                    </div>

                    {muestraMenaje && (
                        <div className="seguro-publico__review-item">
                            <span>Valor declarado del menaje</span>
                            <strong>{formatearMoneda(valorMenaje)}</strong>
                        </div>
                    )}

                    {muestraAutomovil && (
                        <div className="seguro-publico__review-item">
                            <span>Valor declarado del automóvil</span>
                            <strong>{formatearMoneda(valorAutomovil)}</strong>
                        </div>
                    )}

                    <div className="seguro-publico__review-item seguro-publico__review-item--highlight">
                        <span>Prima estimada</span>
                        <strong>{formatearMoneda(expediente?.prima_estimada)}</strong>
                    </div>
                </div>
            </div>

            {muestraAutomovil && (
                <div className="seguro-publico__review-section">
                    <div className="seguro-publico__review-section-heading">
                        <div>
                            <span>03</span>
                            <div>
                                <h3>Tarjeta de circulación</h3>
                                <p>Fotografía asociada al automóvil asegurado.</p>
                            </div>
                        </div>

                        <button type="button" onClick={abrirModalSeguro} disabled={finalizando || guardando} >
                            Editar
                        </button>
                    </div>

                    {fotoActual ? (
                        <div className="seguro-publico__review-notice">
                            <div className="seguro-publico__review-notice-icon">✓</div>
                            <div>
                                <strong>Tarjeta de circulación adjunta</strong>
                                <p>La fotografía está registrada en el expediente.</p>
                                <a href={fotoActual} target="_blank" rel="noopener noreferrer">
                                    Ver fotografía
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p className="seguro-publico__review-missing">
                            Falta adjuntar la fotografía de la tarjeta de circulación.
                        </p>
                    )}
                </div>
            )}

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>04</span>
                        <div>
                            <h3>Modalidad de atención</h3>
                            <p>Modalidad seleccionada al completar el expediente.</p>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span>Modalidad</span>
                        <strong>{obtenerModalidad()}</strong>
                    </div>

                    {modalidadDatos === "asistida" && (
                        <>
                            <div className="seguro-publico__review-item">
                                <span>Empresa de mudanza</span>
                                <strong>{asistenciaEmpresaMudanza || "No registrada"}</strong>
                            </div>
                            <div className="seguro-publico__review-item">
                                <span>Contacto</span>
                                <strong>{asistenciaContacto || "No registrado"}</strong>
                            </div>
                            <div className="seguro-publico__review-item">
                                <span>Teléfono de asistencia</span>
                                <strong>{asistenciaTelefono || "No registrado"}</strong>
                            </div>
                        </>
                    )}
                </div>

                {modalidadDatos === "asistida" && (
                    <div className="seguro-publico__review-inline-action">
                        <button type="button" onClick={abrirModalAsistencia} disabled={finalizando || guardando} >
                            Editar datos de asistencia
                        </button>
                    </div>
                )}

                {modalidadDatos === "autogestion" && (
                    <p className="seguro-publico__review-help">
                        Los datos de la mudanza y de la unidad los completa la empresa mediante su enlace privado.
                    </p>
                )}
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>05</span>
                        <div>
                            <h3>Datos de la mudanza</h3>
                            <p>Información administrada por la empresa de mudanza.</p>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span>Origen</span>
                        <strong>{origen || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Destino</span>
                        <strong>{destino || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Fecha de salida</span>
                        <strong>{fechaSalida || "No registrada"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Tiempo aproximado de llegada</span>
                        <strong>
                            {fechaLlegada === "1-7" ? "1-7 días"
                                : fechaLlegada === "8-12" ? "8-12 días"
                                    : fechaLlegada === "13-18" ? "13-18 días"
                                        : fechaLlegada === "18+" ? "+18 días" : "No registrado"}
                        </strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Tipo de servicio</span>
                        <strong>
                            {(tipoServicio || expediente?.tipo_servicio) === "contratado" ? "Contratado"
                                : (tipoServicio || expediente?.tipo_servicio) === "compartido" ? "Compartido"
                                    : (tipoServicio || expediente?.tipo_servicio) === "exclusivo" ? "Exclusivo" : "No especificado"}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="seguro-publico__review-section">
                <div className="seguro-publico__review-section-heading">
                    <div>
                        <span>06</span>
                        <div>
                            <h3>Datos de la unidad</h3>
                            <p>Información proporcionada por la empresa de mudanza.</p>
                        </div>
                    </div>
                </div>

                <div className="seguro-publico__review-grid">
                    <div className="seguro-publico__review-item">
                        <span>Empresa de mudanza</span>
                        <strong>{empresaMudanza || "No registrada"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Propietario de la unidad</span>
                        <strong>{propietarioUnidad || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Marca</span>
                        <strong>{marcaUnidad || "No registrada"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Modelo</span>
                        <strong>{modeloUnidad || "No registrado"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Placas</span>
                        <strong>{placas || "No registradas"}</strong>
                    </div>
                    <div className="seguro-publico__review-item">
                        <span>Chofer</span>
                        <strong>{chofer || "No registrado"}</strong>
                    </div>
                </div>
            </div>

            {!datosEmpresaCompletos && (
                <div className="seguro-publico__review-notice seguro-publico__review-notice--warning">
                    <div className="seguro-publico__review-notice-icon">!</div>
                    <div>
                        <strong>Falta información de la empresa</strong>
                        <p>
                            La empresa de mudanza debe completar los datos pendientes
                            de la mudanza y de la unidad antes de que puedas finalizar.
                        </p>
                        {faltantesEmpresa.length > 0 && (
                            <p>
                                <strong>Pendientes:</strong>{" "}
                                {faltantesEmpresa.join(", ")}.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {faltantesCliente.length > 0 ||
                faltantesSeguro.length > 0 ||
                faltantesAsistencia.length > 0 ? (
                <div className="seguro-publico__review-notice seguro-publico__review-notice--warning">
                    <div className="seguro-publico__review-notice-icon">!</div>
                    <div>
                        <strong>Tu información está incompleta</strong>
                        <p>
                            Corrige los siguientes datos antes de finalizar:
                        </p>
                        <p>
                            {[
                                ...faltantesCliente,
                                ...faltantesSeguro,
                                ...faltantesAsistencia,
                            ].join(", ")}.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="seguro-publico__review-confirmation">
                    <div className="seguro-publico__review-confirmation-icon">✓</div>
                    <div>
                        <strong>Revisión de tus datos completada</strong>
                        <p>
                            Cuando toda la información de la empresa esté completa,
                            podrás finalizar el expediente.
                        </p>
                    </div>
                </div>
            )}

            <div className="seguro-publico__actions seguro-publico__actions--review">
                <button type="button" className="seguro-publico__button" onClick={onFinalizar} disabled={finalizando || guardando || !datosRevisionCompletos} >
                    {finalizando ? "Finalizando..." : !datosRevisionCompletos ? "Completa los datos pendientes" : "Finalizar expediente"}
                </button>
            </div>

            {modal && (
                <div className="seguro-review-modal" role="dialog" aria-modal="true" aria-labelledby="seguro-review-modal-title" onClick={cerrarModal} >
                    <div className="seguro-review-modal__panel" onClick={(event) => event.stopPropagation()} >
                        <div className="seguro-review-modal__header">
                            <div>
                                <span className="seguro-review-modal__eyebrow">
                                    Editar expediente
                                </span>
                                <h3 id="seguro-review-modal-title">
                                    {modal === "cliente" ? "Datos del cliente"
                                        : modal === "seguro" ? "Información del seguro" : "Datos de asistencia"}
                                </h3>
                            </div>

                            <button type="button" className="seguro-review-modal__close" onClick={cerrarModal} disabled={guardando} aria-label="Cerrar ventana" >
                                ×
                            </button>
                        </div>

                        <div className="seguro-review-modal__body">
                            {modal === "cliente" && (
                                <>
                                    <label>
                                        Nombre completo
                                        <input
                                            type="text"
                                            value={clienteDraft.nombre}
                                            onChange={(event) => setClienteDraft((prev) => ({ ...prev, nombre: event.target.value, }))}
                                            disabled={guardando}
                                            autoComplete="name"
                                        />
                                    </label>

                                    <label>
                                        Correo electrónico
                                        <input
                                            type="email"
                                            value={clienteDraft.email}
                                            onChange={(event) => setClienteDraft((prev) => ({ ...prev, email: event.target.value, }))}
                                            disabled={guardando}
                                            autoComplete="email"
                                        />
                                    </label>

                                    <label>
                                        Teléfono / WhatsApp
                                        <input
                                            type="tel"
                                            value={clienteDraft.telefono}
                                            onChange={(event) => setClienteDraft((prev) => ({ ...prev, telefono: event.target.value, }))}
                                            disabled={guardando}
                                            autoComplete="tel"
                                        />
                                    </label>
                                </>
                            )}

                            {modal === "seguro" && (
                                <>
                                    <label>
                                        Tipo de seguro
                                        <select value={seguroDraft.tipoSeguro} onChange={(event) => cambiarTipoSeguro(event.target.value)} disabled={guardando} >
                                            <option value="">Selecciona una opción</option>
                                            <option value="menaje">Menaje</option>
                                            <option value="automovil">Automóvil</option>
                                            <option value="menaje_auto">
                                                Menaje + Automóvil
                                            </option>
                                        </select>
                                    </label>

                                    {muestraMenajeDraft && (
                                        <label>
                                            Valor declarado del menaje (MXN)
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={seguroDraft.valorMenaje}
                                                onChange={(event) => setSeguroDraft((prev) => ({ ...prev, valorMenaje: event.target.value, }))}
                                                disabled={guardando}
                                            />
                                        </label>
                                    )}

                                    {muestraAutomovilDraft && (
                                        <>
                                            <label>
                                                Valor declarado del automóvil (MXN)
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={seguroDraft.valorAutomovil}
                                                    onChange={(event) => setSeguroDraft((prev) => ({ ...prev, valorAutomovil: event.target.value, }))}
                                                    disabled={guardando}
                                                />
                                            </label>

                                            <label>
                                                Fotografía de la tarjeta de circulación
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    capture="environment"
                                                    onChange={(event) => seleccionarFoto(event.target.files?.[0] || null)}
                                                    disabled={guardando}
                                                />
                                            </label>

                                            {fotoVisible && (
                                                <div className="seguro-review-modal__photo">
                                                    <img src={fotoVisible} alt="Tarjeta de circulación" />

                                                    <a href={fotoVisible} target="_blank" rel="noopener noreferrer" >
                                                        Ver imagen
                                                    </a>

                                                    <button type="button" onClick={eliminarFoto} disabled={guardando} >
                                                        Quitar fotografía
                                                    </button>
                                                </div>
                                            )}

                                            {seguroDraft.fotoFile && (
                                                <p className="seguro-review-modal__hint">
                                                    La nueva fotografía se subirá al guardar.
                                                </p>
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            {modal === "asistencia" && (
                                <>
                                    <label>
                                        Empresa de mudanza
                                        <input
                                            type="text"
                                            value={asistenciaDraft.empresa}
                                            onChange={(event) => setAsistenciaDraft((prev) => ({ ...prev, empresa: event.target.value, }))}
                                            disabled={guardando}
                                        />
                                    </label>

                                    <label>
                                        Nombre del contacto
                                        <input
                                            type="text"
                                            value={asistenciaDraft.contacto}
                                            onChange={(event) => setAsistenciaDraft((prev) => ({ ...prev, contacto: event.target.value, }))}
                                            disabled={guardando}
                                        />
                                    </label>

                                    <label>
                                        Teléfono / WhatsApp
                                        <input
                                            type="tel"
                                            value={asistenciaDraft.telefono}
                                            onChange={(event) => setAsistenciaDraft((prev) => ({ ...prev, telefono: event.target.value, }))}
                                            disabled={guardando}
                                        />
                                    </label>
                                </>
                            )}

                            {errorModal && (
                                <div className="seguro-publico__inline-error">
                                    {errorModal}
                                </div>
                            )}
                        </div>

                        <div className="seguro-review-modal__actions">
                            <button
                                type="button"
                                className="seguro-publico__button seguro-publico__button--secondary"
                                onClick={cerrarModal}
                                disabled={guardando}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="seguro-publico__button"
                                onClick={
                                    modal === "cliente" ? guardarCliente
                                        : modal === "seguro" ? guardarSeguro : guardarAsistencia
                                }
                                disabled={guardando || finalizando}
                            >
                                {guardando ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}