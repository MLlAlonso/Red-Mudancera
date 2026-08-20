"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFormularioEmpresaSeguro, guardarDatosEmpresaSeguro, finalizarDatosEmpresaSeguro, } from "@/services/seguro";
import ConfirmModal from "@/components/modals/ConfirmModal";
import "@/styles/pages/seguros/_empresa.scss";

export default function SeguroEmpresaPage() {
    const params = useParams();
    const token = params?.token;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [finishing, setFinishing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [empresaMudanza, setEmpresaMudanza] = useState("");
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");
    const [fechaLlegada, setFechaLlegada] = useState("");
    const [propietarioUnidad, setPropietarioUnidad] = useState("");
    const [marcaUnidad, setMarcaUnidad] = useState("");
    const [modeloUnidad, setModeloUnidad] = useState("");
    const [placas, setPlacas] = useState("");
    const [chofer, setChofer] = useState("");
    const [datosFinalizados, setDatosFinalizados] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (!token) {
            return;
        }

        cargarFormulario();
    }, [token]);

    async function cargarFormulario() {
        try {
            setLoading(true);
            setError("");
            const response = await getFormularioEmpresaSeguro(token);
            const data = response.data;
            setEmpresaMudanza(data.empresa_mudanza || "");
            setOrigen(data.origen || "");
            setDestino(data.destino || "");
            setFechaSalida(data.fecha_salida || "");
            setFechaLlegada(data.fecha_llegada || "");
            setPropietarioUnidad(data.propietario_unidad || "");
            setMarcaUnidad(data.marca_unidad || "");
            setModeloUnidad(data.modelo_unidad || "");
            setPlacas(data.placas || "");
            setChofer(data.chofer || "");
            setDatosFinalizados(Boolean(data.empresa_datos_finalizados_at));
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible cargar el formulario.");
        } finally {
            setLoading(false);
        }
    }

    function validar() {
        if (!origen.trim()) {
            return "Ingresa el origen de la mudanza.";
        }

        if (!destino.trim()) {
            return "Ingresa el destino de la mudanza.";
        }

        if (!fechaSalida) {
            return "Selecciona la fecha de salida.";
        }

        if (!fechaLlegada) {
            return "Selecciona la fecha de llegada.";
        }

        if (!empresaMudanza.trim()) {
            return "Ingresa el nombre de la empresa de mudanza.";
        }

        if (!propietarioUnidad.trim()) {
            return "Ingresa el propietario de la unidad.";
        }

        if (!marcaUnidad.trim()) {
            return "Ingresa la marca de la unidad.";
        }

        if (!modeloUnidad.trim()) {
            return "Ingresa el modelo de la unidad.";
        }

        if (!placas.trim()) {
            return "Ingresa las placas de la unidad.";
        }

        if (!chofer.trim()) {
            return "Ingresa el nombre del chofer.";
        }

        return "";
    }

    async function guardar() {
        if (saving || finishing) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            setSaving(true);

            const response = await guardarDatosEmpresaSeguro(
                token,
                {
                    empresa_mudanza: empresaMudanza.trim(),
                    origen: origen.trim(),
                    destino: destino.trim(),
                    fecha_salida: fechaSalida,
                    fecha_llegada: fechaLlegada,
                    propietario_unidad: propietarioUnidad.trim(),
                    marca_unidad: marcaUnidad.trim(),
                    modelo_unidad: modeloUnidad.trim(),
                    placas: placas.trim(),
                    chofer: chofer.trim(),
                }
            );

            const data = response.data;
            setOrigen(data.origen || "");
            setDestino(data.destino || "");
            setFechaSalida(data.fecha_salida || "");
            setFechaLlegada(data.fecha_llegada || "");
            setEmpresaMudanza(data.empresa_mudanza || "");
            setPropietarioUnidad(data.propietario_unidad || "");
            setMarcaUnidad(data.marca_unidad || "");
            setModeloUnidad(data.modelo_unidad || "");
            setPlacas(data.placas || "");
            setChofer(data.chofer || "");
            setSuccess("La información fue guardada correctamente.");
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar la información.");
        } finally {
            setSaving(false);
        }
    }

    async function finalizar() {
        if (saving || finishing) {
            return;
        }

        setError("");
        setSuccess("");
        const validationError = validar();

        if (validationError) {
            setError(validationError);
            return;
        }

        setShowConfirmModal(true);
    }

    async function confirmarFinalizacion() {
        if (saving || finishing) {
            return;
        }

        setShowConfirmModal(false);
        setError("");
        setSuccess("");

        try {
            setFinishing(true);

            const guardarResponse = await guardarDatosEmpresaSeguro(
                token,
                {
                    empresa_mudanza: empresaMudanza.trim(),
                    origen: origen.trim(),
                    destino: destino.trim(),
                    fecha_salida: fechaSalida,
                    fecha_llegada: fechaLlegada,
                    propietario_unidad: propietarioUnidad.trim(),
                    marca_unidad: marcaUnidad.trim(),
                    modelo_unidad: modeloUnidad.trim(),
                    placas: placas.trim(),
                    chofer: chofer.trim(),
                }
            );

            const datosGuardados = guardarResponse.data;

            setEmpresaMudanza(datosGuardados.empresa_mudanza || "");
            setOrigen(datosGuardados.origen || "");
            setDestino(datosGuardados.destino || "");
            setFechaSalida(datosGuardados.fecha_salida || "");
            setFechaLlegada(datosGuardados.fecha_llegada || "");
            setPropietarioUnidad(datosGuardados.propietario_unidad || "");
            setMarcaUnidad(datosGuardados.marca_unidad || "");
            setModeloUnidad(datosGuardados.modelo_unidad || "");
            setPlacas(datosGuardados.placas || "");
            setChofer(datosGuardados.chofer || "");

            const response = await finalizarDatosEmpresaSeguro(token);
            setDatosFinalizados(true);
            setSuccess(response.message || (
                datosFinalizados
                    ? "Los datos fueron actualizados correctamente."
                    : "Los datos fueron finalizados correctamente y el cliente fue notificado."
            ));

        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible finalizar la información.");
        } finally {
            setFinishing(false);
        }
    }

    if (loading) {
        return (
            <main className="seguro-empresa">
                <section className="seguro-empresa__loading">
                    <div className="loading-spinner" />
                    <p> Cargando formulario... </p>
                </section>
            </main>
        );
    }

    if (error && !empresaMudanza && !propietarioUnidad) {
        return (
            <main className="seguro-empresa">
                <section className="seguro-empresa__card">
                    <div className="seguro-empresa__error-icon">
                        !
                    </div>
                    <h1> Formulario no disponible </h1>
                    <p> {error} </p>
                    <p> Verifica que el enlace recibido sea correcto. </p>
                </section>
            </main>
        );
    }

    return (
        <main className="seguro-empresa">
            <section className="seguro-empresa__card">
                <div className="seguro-empresa__brand">
                    <img src="/logo/logo_A.png" alt="Mudanza Fácil" />
                </div>

                <span className="seguro-empresa__eyebrow">
                    Formulario para empresa de mudanza
                </span>

                <h1> Datos de la unidad </h1>

                <p className="seguro-empresa__intro">
                    Completa la información de la unidad y del operador responsable de realizar la mudanza.
                </p>

                <div className="seguro-empresa__privacy">
                    <span className="seguro-empresa__privacy-icon">
                        i
                    </span>

                    <p>
                        Puedes guardar la información y continuar más adelante desde este mismo enlace.
                        Cuando completes todos los datos, selecciona <strong>Finalizar</strong> para avisar al cliente que la información está lista.
                    </p>
                </div>

                {
                    datosFinalizados && (
                        <div className="seguro-empresa__completed">
                            <span> ✓ </span>

                            <div>
                                <strong> Información enviada al cliente </strong>

                                <p>
                                    Los datos ya fueron enviados al cliente para su revisión.
                                    Puedes seguir editándolos y actualizarlos si es necesario.
                                </p>
                            </div>
                        </div>
                    )
                }

                <div className="seguro-empresa__form">
                    <div className="seguro-empresa__field">
                        <label htmlFor="empresa_mudanza">
                            Empresa de mudanza
                        </label>

                        <input
                            id="empresa_mudanza"
                            type="text"
                            maxLength={150}
                            placeholder="Ej. Mudanzas ..."
                            value={empresaMudanza}
                            onChange={(e) => setEmpresaMudanza(e.target.value)}
                        />
                    </div>

                    <div className="seguro-empresa__grid">
                        <div className="seguro-empresa__field">
                            <label htmlFor="origen">
                                Origen
                            </label>

                            <input id="origen" type="text" maxLength={150} placeholder="Ej. Veracruz, Veracruz" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                        </div>

                        <div className="seguro-empresa__field">
                            <label htmlFor="destino">
                                Destino
                            </label>

                            <input id="destino" type="text" maxLength={150} placeholder="Ej. Querétaro, Querétaro" value={destino} onChange={(e) => setDestino(e.target.value)} />
                        </div>
                    </div>

                    <div className="seguro-empresa__grid">
                        <div className="seguro-empresa__field">
                            <label htmlFor="fecha_salida">
                                Fecha de salida
                            </label>

                            <input
                                id="fecha_salida"
                                type="date"
                                value={fechaSalida}
                                onChange={(e) => {
                                    setFechaSalida(e.target.value);
                                    if (fechaLlegada && e.target.value > fechaLlegada) {
                                        setFechaLlegada("");
                                    }
                                }}
                            />
                        </div>

                        <div className="seguro-empresa__field">
                            <label htmlFor="fecha_llegada">
                                Fecha de llegada
                            </label>

                            <input id="fecha_llegada" type="date" min={fechaSalida || undefined} value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value)} />
                        </div>
                    </div>

                    <div className="seguro-empresa__field">
                        <label htmlFor="propietario_unidad">
                            Propietario de la unidad
                        </label>

                        <input
                            id="propietario_unidad"
                            type="text"
                            maxLength={150}
                            placeholder="Ej. Nombre Apellido Paterno Apellido Materno"
                            value={propietarioUnidad}
                            onChange={(e) => setPropietarioUnidad(e.target.value)}
                        />
                    </div>

                    <div className="seguro-empresa__grid">
                        <div className="seguro-empresa__field">
                            <label htmlFor="marca_unidad">
                                Marca
                            </label>

                            <input
                                id="marca_unidad"
                                type="text"
                                maxLength={100}
                                placeholder="Ej. Marca de camion de mudanza"
                                value={marcaUnidad}
                                onChange={(e) => setMarcaUnidad(e.target.value)}
                            />
                        </div>

                        <div className="seguro-empresa__field">

                            <label htmlFor="modelo_unidad">
                                Modelo
                            </label>

                            <input
                                id="modelo_unidad"
                                type="text"
                                maxLength={100}
                                placeholder="Ej. Cascadia"
                                value={modeloUnidad}
                                onChange={(e) =>
                                    setModeloUnidad(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="seguro-empresa__grid">
                        <div className="seguro-empresa__field">
                            <label htmlFor="placas">
                                Placas
                            </label>

                            <input
                                id="placas"
                                type="text"
                                maxLength={30}
                                placeholder="Ej. ABC-123-D"
                                value={placas}
                                onChange={(e) => setPlacas(e.target.value)}
                            />
                        </div>

                        <div className="seguro-empresa__field">
                            <label htmlFor="chofer">
                                Chofer
                            </label>

                            <input
                                id="chofer"
                                type="text"
                                maxLength={150}
                                placeholder="Ej. Nombre Apellido Paterno Apellido Materno"
                                value={chofer}
                                onChange={(e) => setChofer(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {
                    error && (
                        <div className="seguro-empresa__error">
                            {error}
                        </div>
                    )
                }

                {
                    success && (
                        <div className="seguro-empresa__success">
                            {success}
                        </div>
                    )
                }

                <div className="seguro-empresa__actions">
                    <button
                        type="button"
                        className="seguro-empresa__button seguro-empresa__button--secondary"
                        onClick={guardar}
                        disabled={saving || finishing}
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </button>

                    <button type="button" className="seguro-empresa__button" onClick={finalizar} disabled={saving || finishing} >
                        {finishing ? "Procesando..." : datosFinalizados ? "Actualizar" : "Finalizar"}
                    </button>
                </div>

                <p className="seguro-empresa__footer">
                    La información proporcionada será utilizada únicamente para completar el expediente de seguro.
                </p>

                <div className="seguro-empresa__help">
                    <div className="seguro-empresa__help-icon">
                        <img src="/icons/help.png" alt="Ayuda" />
                    </div>

                    <div className="seguro-empresa__help-content">
                        <h3> ¿Necesitas ayuda? </h3>

                        <p> Contáctanos por Whatsapp y con gusto te ayudamos </p>

                        <a href="https://wa.me/524421896433" target="_blank" rel="noopener noreferrer" >
                            Contáctanos
                        </a>
                    </div>
                </div>

                {
                    showConfirmModal && (
                        <ConfirmModal
                            title={datosFinalizados ? "Actualizar información" : "Finalizar información"}
                            message={
                                datosFinalizados
                                    ? "¿Deseas actualizar la información de la unidad? Los cambios se guardarán correctamente."
                                    : "¿Confirmas que la información de la unidad está completa? Al finalizar se notificará al cliente que los datos están listos para su revisión."
                            }
                            confirmText={datosFinalizados ? "Actualizar" : "Finalizar"}
                            cancelText="Cancelar"
                            onConfirm={confirmarFinalizacion}
                            onClose={() => setShowConfirmModal(false)}
                        />
                    )
                }
            </section>
        </main>
    );
}