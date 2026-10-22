"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { empresaMensajesWhatsapp } from "@/services/empresaMensajesWhatsapp";
import { WHATSAPP_VARIABLES } from "@/utils/whatsapp";
import ConfirmModal from "@/components/modals/ConfirmModal";
import "@/styles/components/_mensajesWhatsappManager.scss";

const NUEVO = { id: null, titulo: "", mensaje: "", tipo_contacto: "empresa_empresa", };

export default function MensajesWhatsappManager() {
    const [mensajes, setMensajes] = useState([]);
    const [formulario, setFormulario] = useState({ ...NUEVO });
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [eliminandoId, setEliminandoId] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const mensajeRef = useRef(null);
    const cursorPendiente = useRef(null);
    const [confirmacion, setConfirmacion] = useState(null);
    const variables = WHATSAPP_VARIABLES[formulario.tipo_contacto] || [];

    const cargarMensajes = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await empresaMensajesWhatsapp.listar();
            setMensajes(result.data || []);
        } catch (e) {
            setError(e.message || "No se pudieron cargar las plantillas.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { cargarMensajes(); }, [cargarMensajes]);

    useEffect(() => {
        if (!cursorPendiente.current || !mensajeRef.current) return;
        const posicion = cursorPendiente.current;
        mensajeRef.current.focus();
        mensajeRef.current.setSelectionRange(posicion, posicion);
        cursorPendiente.current = null;
    }, [formulario.mensaje]);

    const cambiarCampo = (campo, valor) => {
        setFormulario((actual) => ({ ...actual, [campo]: valor, }));
        setError("");
        setExito("");
    };

    const limpiarFormulario = (forzar = false) => {
        const tieneCambios = formulario.titulo.trim() !== "" || formulario.mensaje.trim() !== "";

        if (!forzar && tieneCambios) {
            solicitarConfirmacion({
                title: "Descartar cambios",
                message: "¿Estás seguro de que deseas descartar el contenido del formulario? Se perderán los cambios que no hayas guardado.",
                confirmText: "Descartar cambios",
                danger: true,
                onConfirm: () => limpiarFormulario(true),
            });

            return;
        }

        setFormulario({ ...NUEVO });
        setEditando(false);
        setError("");
        setExito("");
        cursorPendiente.current = null;
    };

    const insertarVariable = (key) => {
        const textarea = mensajeRef.current;
        const contenido = formulario.mensaje;
        const inicio = textarea?.selectionStart ?? contenido.length;
        const fin = textarea?.selectionEnd ?? contenido.length;
        const textoVariable = `{{${key}}}`;
        const nuevoMensaje = contenido.slice(0, inicio) + textoVariable + contenido.slice(fin);
        cursorPendiente.current = inicio + textoVariable.length;
        cambiarCampo("mensaje", nuevoMensaje);
    };

    const guardar = async (e) => {
        e.preventDefault();
        setError("");
        setExito("");
        const titulo = formulario.titulo.trim();
        const mensaje = formulario.mensaje.trim();

        if (titulo.length < 2) {
            setError("El título debe tener al menos 2 caracteres.");
            return;
        }

        if (!mensaje) {
            setError("Escribe el contenido de la plantilla.");
            return;
        }

        if (mensaje.length > 1000) {
            setError("El mensaje no puede superar los 1000 caracteres.");
            return;
        }

        setGuardando(true);

        try {
            const datos = { titulo, mensaje, tipo_contacto: formulario.tipo_contacto, };

            if (editando) {
                await empresaMensajesWhatsapp.actualizar(formulario.id, datos);
            } else {
                await empresaMensajesWhatsapp.crear(datos);
            }

            await cargarMensajes();
            setExito(editando ? "Los cambios se guardaron correctamente." : "Tu nueva plantilla ya está guardada.");
            setFormulario({ ...NUEVO });
            setEditando(false);
            cursorPendiente.current = null;
        } catch (e) {
            setError(e.message || "No fue posible guardar la plantilla.");
        } finally {
            setGuardando(false);
        }
    };

    const cargarEdicion = (item) => {
        setFormulario({
            id: item.id,
            titulo: item.titulo,
            mensaje: item.mensaje,
            tipo_contacto: item.tipo_contacto,
        });

        setEditando(true);
        setError("");
        setExito("");
        cursorPendiente.current = null;

        document.getElementById("mwm-editor")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const editar = (item) => {
        const tieneCambios = formulario.titulo.trim() !== "" || formulario.mensaje.trim() !== "";

        if (tieneCambios) {
            solicitarConfirmacion({
                title: "Cambiar plantilla",
                message: `Tienes contenido en el formulario. ¿Deseas descartarlo y comenzar a editar "${item.titulo}"?`,
                confirmText: "Continuar",
                onConfirm: () => cargarEdicion(item),
            });

            return;
        }

        cargarEdicion(item);
    };

    const eliminarConfirmado = async (item) => {
        setError("");
        setExito("");
        setEliminandoId(item.id);

        try {
            await empresaMensajesWhatsapp.eliminar(item.id);
            setMensajes((actuales) => actuales.filter((mensaje) => String(mensaje.id) !== String(item.id)));

            if (String(formulario.id) === String(item.id)) {
                setFormulario({ ...NUEVO });
                setEditando(false);
            }

            setExito("La plantilla se eliminó correctamente.");
        } catch (e) {
            setError(e.message || "No se pudo eliminar la plantilla.");
        } finally {
            setEliminandoId(null);
        }
    };

    const eliminar = (item) => {
        solicitarConfirmacion({
            title: "Eliminar plantilla",
            message: `¿Estás seguro de que deseas eliminar "${item.titulo}"? Esta acción no se puede deshacer.`,
            confirmText: "Sí, eliminar",
            cancelText: "Cancelar",
            danger: true,
            onConfirm: () => eliminarConfirmado(item),
        });
    };

    const solicitarConfirmacion = ({
        title,
        message,
        confirmText = "Confirmar",
        cancelText = "Cancelar",
        danger = false,
        onConfirm,
    }) => {
        setConfirmacion({
            title,
            message,
            confirmText,
            cancelText,
            danger,
            onConfirm,
        });
    };

    const ejecutarConfirmacion = () => {
        const accion = confirmacion?.onConfirm;
        setConfirmacion(null);
        accion?.();
    };

    const mensajesFiltrados = mensajes.filter((item) => {
        const coincideBusqueda = `${item.titulo} ${item.mensaje}`.toLowerCase().includes(busqueda.trim().toLowerCase());
        const coincideTipo = filtroTipo === "todos" || item.tipo_contacto === filtroTipo;
        return coincideBusqueda && coincideTipo;
    });

    const etiquetaTipo = (tipo) => tipo === "empresa_empresa" ? "Empresa a empresa" : "Empresa a cliente";

    return (
        <section className="mwm">
            <header className="mwm__header">
                <div className="mwm__heading">
                    <h2>Mis plantillas de WhatsApp</h2>
                    <p> Crea mensajes reutilizables para agilizar el contacto con empresas y clientes. </p>
                </div>

                <div className="mwm__total">
                    <span className="mwm__total-number">
                        {mensajes.length}
                    </span>
                    <span className="mwm__total-label">
                        {mensajes.length === 1 ? "plantilla guardada" : "plantillas guardadas"}
                    </span>
                </div>
            </header>

            {(error || exito) && (
                <div className={`mwm__notice ${error ? "mwm__notice--error" : "mwm__notice--success"}`} role={error ? "alert" : "status"}  >
                    <span className="mwm__notice-icon" aria-hidden="true">
                        {error ? "!" : "✓"}
                    </span>

                    <p>{error || exito}</p>

                    <button type="button" className="mwm__notice-close" aria-label="Cerrar aviso" onClick={() => { setError(""); setExito(""); }}  >
                        ×
                    </button>
                </div>
            )}

            <div className="mwm__editor" id="mwm-editor">
                <div className="mwm__editor-heading">
                    <div className="mwm__editor-icon" aria-hidden="true">
                        {editando ? "✎" : "+"}
                    </div>

                    <div>
                        <h3> {editando ? "Editar plantilla" : "Crear nueva plantilla"} </h3>
                        <p> {editando ? "Actualiza el contenido y guarda los cambios." : "Personaliza un mensaje y guárdalo para reutilizarlo."}  </p>
                    </div>

                    {editando && (
                        <span className="mwm__editing-badge">
                            Modo edición
                        </span>
                    )}
                </div>

                <form className="mwm__form" onSubmit={guardar}>
                    <div className="mwm__field">
                        <label htmlFor="mwm-titulo">
                            Nombre de la plantilla <span> *</span>
                        </label>

                        <input
                            id="mwm-titulo"
                            value={formulario.titulo}
                            onChange={(e) => cambiarCampo("titulo", e.target.value)}
                            maxLength={60}
                            minLength={2}
                            required
                            placeholder="Ej. Primer contacto comercial"
                        />

                        <div className="mwm__field-footer">
                            <span>Elige un nombre fácil de reconocer.</span>
                            <span>{formulario.titulo.length}/60</span>
                        </div>
                    </div>

                    <div className="mwm__field">
                        <label htmlFor="mwm-tipo">
                            ¿A quién va dirigido? <span> *</span>
                        </label>

                        <select id="mwm-tipo" value={formulario.tipo_contacto} onChange={(e) => cambiarCampo("tipo_contacto", e.target.value)} >
                            <option value="empresa_empresa">
                                Empresa a empresa
                            </option>
                            <option value="empresa_cliente">
                                Empresa a cliente
                            </option>
                        </select>

                        <p className="mwm__hint">
                            Las variables disponibles cambian según el tipo de destinatario.
                        </p>
                    </div>

                    <div className="mwm__field">
                        <div className="mwm__message-heading">
                            <label htmlFor="mwm-mensaje">
                                Contenido del mensaje <span> *</span>
                            </label>

                            <span className="mwm__message-limit">
                                {formulario.mensaje.length}/1000
                            </span>
                        </div>

                        <textarea
                            ref={mensajeRef}
                            id="mwm-mensaje"
                            value={formulario.mensaje}
                            onChange={(e) => cambiarCampo("mensaje", e.target.value)}
                            maxLength={1000}
                            required
                            rows={7}
                            placeholder="Escribe aquí el mensaje que quieres guardar..."
                        />

                        <div className="mwm__variable-box">
                            <div className="mwm__variable-heading">
                                <strong>Variables dinámicas</strong>
                                <span>
                                    Pulsa una variable para insertarla
                                </span>
                            </div>

                            <div className="mwm__variable-list">
                                {variables.map((variable) => (
                                    <button key={variable.key} type="button" className="mwm__variable" onClick={() =>
                                        insertarVariable(variable.key)} title={`Insertar {{${variable.key}}}`}
                                    >
                                        <span aria-hidden="true">+</span>
                                        {variable.label}
                                    </button>
                                ))}
                            </div>

                            <p className="mwm__variable-help">
                                Las variables se sustituirán automáticamente con
                                los datos disponibles al seleccionar la plantilla para contactar.
                            </p>
                        </div>
                    </div>

                    <div className="mwm__form-actions">
                        {editando && (
                            <button type="button" className="mwm__button mwm__button--ghost" onClick={() => limpiarFormulario()} disabled={guardando} >
                                Descartar cambios
                            </button>
                        )}

                        <button type="submit" className="mwm__button mwm__button--primary" disabled={guardando} >
                            {guardando ? (
                                <>
                                    <span className="mwm__spinner" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <span aria-hidden="true">
                                        {editando ? "✓" : "+"}
                                    </span>
                                    {editando ? "Guardar cambios" : "Guardar plantilla"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <section className="mwm__library">
                <div className="mwm__library-heading">
                    <div>
                        <h3>Plantillas guardadas</h3>
                        <p> Administra los mensajes que utilizas con más frecuencia. </p>
                    </div>
                </div>

                <div className="mwm__filters">
                    <div className="mwm__search">
                        <span aria-hidden="true">⌕</span>

                        <input type="search" aria-label="Buscar plantillas" placeholder="Buscar por nombre o contenido..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                    </div>

                    <select aria-label="Filtrar por destinatario" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} >
                        <option value="todos">Todos los destinatarios</option>
                        <option value="empresa_empresa">
                            Empresa a empresa
                        </option>
                        <option value="empresa_cliente">
                            Empresa a cliente
                        </option>
                    </select>
                </div>

                {loading ? (
                    <div className="mwm__state">
                        <span className="mwm__spinner mwm__spinner--large" />
                        <strong>Cargando tus plantillas</strong>
                        <p>Estamos recuperando tus mensajes guardados.</p>
                    </div>
                ) : mensajesFiltrados.length === 0 ? (
                    <div className="mwm__empty">
                        <div className="mwm__empty-icon" aria-hidden="true">
                            {mensajes.length === 0 ? "✉" : "⌕"}
                        </div>

                        <h4>
                            {mensajes.length === 0 ? "Todavía no tienes plantillas" : "No encontramos coincidencias"}
                        </h4>

                        <p>
                            {mensajes.length === 0
                                ? "Crea tu primer mensaje para tenerlo disponible cuando contactes a una empresa o a un cliente."
                                : "Prueba con otra búsqueda o cambia el filtro de destinatario."}
                        </p>

                        {mensajes.length > 0 && (
                            <button type="button" className="mwm__button mwm__button--ghost" onClick={() => { setBusqueda(""); setFiltroTipo("todos"); }}  >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="mwm__cards">
                        {mensajesFiltrados.map((item) => (
                            <article className="mwm__card" key={item.id}>
                                <div className="mwm__card-top">
                                    <span className={`mwm__type ${item.tipo_contacto === "empresa_empresa" ? "mwm__type--business" : "mwm__type--client"}`} >
                                        {etiquetaTipo(item.tipo_contacto)}
                                    </span>

                                    <span className="mwm__card-menu-label">
                                        Plantilla personalizada
                                    </span>
                                </div>

                                <h4>{item.titulo}</h4>

                                <p className="mwm__card-message">
                                    {item.mensaje}
                                </p>

                                <div className="mwm__card-footer">
                                    <span className="mwm__card-length">
                                        {item.mensaje.length} caracteres
                                    </span>

                                    <div className="mwm__card-actions">
                                        <button type="button" className="mwm__card-delete" onClick={() => eliminar(item)} disabled={guardando || eliminandoId !== null} >
                                            {eliminandoId === item.id ? "Eliminando..." : "Eliminar"}
                                        </button>

                                        <button type="button" className="mwm__card-edit" onClick={() => editar(item)} disabled={guardando || eliminandoId !== null}  >
                                            <span aria-hidden="true">✎</span>
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <div className="mwm__footer-note">
                <span aria-hidden="true">✓</span>
                <p>
                    Tus plantillas personalizadas también están disponibles
                    desde el perfil de empresa y desde Configuración.
                </p>
            </div>

            {confirmacion && (
                <ConfirmModal
                    title={confirmacion.title}
                    message={confirmacion.message}
                    confirmText={confirmacion.confirmText}
                    cancelText={confirmacion.cancelText}
                    danger={confirmacion.danger}
                    onConfirm={ejecutarConfirmacion}
                    onClose={() => setConfirmacion(null)}
                />
            )}
        </section>
    );
}
