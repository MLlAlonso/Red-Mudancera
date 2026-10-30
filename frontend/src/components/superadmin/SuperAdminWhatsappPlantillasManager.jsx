"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { actualizarPlantillaWhatsapp, crearPlantillaWhatsapp, eliminarPlantillaWhatsapp, listarPlantillasWhatsapp, } from "@/services/superAdminWhatsappPlantillas";
import "@/styles/components/_superAdminWhatsappPlantillas.scss";

const NUEVA_PLANTILLA = { id: null, titulo: "", mensaje: "", };

const VARIABLES_SEGUROS = [
    { key: "nombre", label: "Nombre del cliente" },
    { key: "email", label: "Correo del cliente" },
    { key: "telefono", label: "Teléfono del cliente" },
    { key: "folio", label: "Folio del expediente" },
    { key: "origen", label: "Origen de la mudanza" },
    { key: "destino", label: "Destino de la mudanza" },
    { key: "fechaRecoleccion", label: "Fecha de recolección" },
    { key: "tipoSeguro", label: "Tipo de seguro" },
    { key: "valorMenaje", label: "Valor del menaje" },
    { key: "valorAutomovil", label: "Valor del automóvil" },
    { key: "primaEstimada", label: "Prima estimada" },
    { key: "modalidad", label: "Modalidad de captura" },
    { key: "enlaceExpediente", label: "Enlace al expediente" },
    { key: "enlaceEmpresa", label: "Enlace para la empresa" },
];

function renderMensaje(mensaje, variables = {}) {
    return String(mensaje || "").replace(/\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}/g, (_, key) => {
        const valor = variables[key];
        if (valor === null || valor === undefined) { return "—"; }
        const texto = String(valor).trim();
        return texto || "—";
    });
}

export default function SuperAdminWhatsappPlantillasManager() {
    const [plantillas, setPlantillas] = useState([]);
    const [formulario, setFormulario] = useState({ ...NUEVA_PLANTILLA });
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [eliminandoId, setEliminandoId] = useState(null);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const [vistaPrevia, setVistaPrevia] = useState(false);
    const mensajeRef = useRef(null);
    const cursorPendiente = useRef(null);
    const editando = formulario.id !== null;

    const cargarPlantillas = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await listarPlantillasWhatsapp("seguros");
            setPlantillas(result.data || []);
        } catch (e) {
            setError(e.message || "No se pudieron cargar las plantillas.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { cargarPlantillas(); }, [cargarPlantillas]);

    useEffect(() => {
        if (cursorPendiente.current === null || !mensajeRef.current) {
            return;
        }

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

    const limpiarFormulario = () => {
        setFormulario({ ...NUEVA_PLANTILLA });
        setError("");
        setExito("");
        setVistaPrevia(false);
        cursorPendiente.current = null;
    };

    const guardar = async (event) => {
        event.preventDefault();
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
            const datos = { titulo, mensaje, area: "seguros", };

            if (editando) {
                await actualizarPlantillaWhatsapp(formulario.id, datos);
            } else {
                await crearPlantillaWhatsapp(datos);
            }

            await cargarPlantillas();
            limpiarFormulario();
            setExito(editando ? "La plantilla se actualizó correctamente." : "La plantilla se creó correctamente.");
        } catch (e) {
            setError(e.message || "No se pudo guardar la plantilla.");
        } finally {
            setGuardando(false);
        }
    };

    const editar = (plantilla) => {
        setFormulario({
            id: plantilla.id,
            titulo: plantilla.titulo,
            mensaje: plantilla.mensaje,
        });

        setError("");
        setExito("");
        setVistaPrevia(false);
        document.getElementById("superadmin-whatsapp-editor")?.scrollIntoView({ behavior: "smooth", block: "start", });
    };

    const eliminar = async (plantilla) => {
        const confirmar = window.confirm(`¿Eliminar la plantilla "${plantilla.titulo}"? Esta acción no se puede deshacer.`);

        if (!confirmar) {
            return;
        }

        setError("");
        setExito("");
        setEliminandoId(plantilla.id);

        try {
            await eliminarPlantillaWhatsapp(plantilla.id);
            setPlantillas((actuales) => actuales.filter((item) => String(item.id) !== String(plantilla.id)));

            if (String(formulario.id) === String(plantilla.id)) {
                limpiarFormulario();
            }

            setExito("La plantilla se eliminó correctamente.");
        } catch (e) {
            setError(e.message || "No se pudo eliminar la plantilla.");
        } finally {
            setEliminandoId(null);
        }
    };

    const plantillasFiltradas = plantillas.filter((item) => `${item.titulo} ${item.mensaje}`.toLowerCase().includes(busqueda.trim().toLowerCase()));

    const ejemploVariables = {
        nombre: "María García",
        email: "correo@ejemplo.com",
        telefono: "9211234567",
        folio: "SEG-2026-0001",
        origen: "Coatzacoalcos, Veracruz",
        destino: "Puebla, Puebla",
        fechaRecoleccion: "15/11/2026",
        tipoSeguro: "Menaje + Automóvil",
        valorMenaje: "$150,000.00 MXN",
        valorAutomovil: "$250,000.00 MXN",
        primaEstimada: "$5,400.00 MXN",
        modalidad: "Póliza asistida",
        enlaceExpediente: "https://app.mudanzafacil.com.mx/seguros/SEG-2026-0001",
        enlaceEmpresa: "https://app.mudanzafacil.com.mx/seguros/empresa/ejemplo",
    };

    return (
        <section className="sawp">
            <header className="sawp__header">
                <div>
                    <span className="sawp__eyebrow">Comunicación</span>
                    <h2>Plantillas de WhatsApp</h2>
                    <p>
                        Administra los mensajes utilizados para contactar a los
                        clientes de seguros desde sus expedientes.
                    </p>
                </div>

                <div className="sawp__total">
                    <strong>{plantillas.length}</strong>
                    <span>
                        {plantillas.length === 1 ? "plantilla" : "plantillas"}
                    </span>
                </div>
            </header>

            {(error || exito) && (
                <div className={`sawp__notice ${error ? "sawp__notice--error" : "sawp__notice--success"}`} role={error ? "alert" : "status"} >
                    <p>{error || exito}</p>
                    <button type="button" onClick={() => { setError(""); setExito(""); }} aria-label="Cerrar aviso" >
                        ×
                    </button>
                </div>
            )}

            <div className="sawp__editor" id="superadmin-whatsapp-editor">
                <div className="sawp__editor-heading">
                    <div>
                        <h3>
                            {editando ? "Editar plantilla" : "Crear plantilla"}
                        </h3>
                        <p>
                            Las variables se reemplazarán con la información disponible en cada expediente.
                        </p>
                    </div>

                    {editando && (
                        <span className="sawp__badge">Editando</span>
                    )}
                </div>

                <form onSubmit={guardar}>
                    <div className="sawp__field">
                        <label htmlFor="sawp-titulo">
                            Nombre de la plantilla
                        </label>

                        <input
                            id="sawp-titulo"
                            value={formulario.titulo}
                            onChange={(e) => cambiarCampo("titulo", e.target.value)}
                            maxLength={60}
                            minLength={2}
                            required
                            placeholder="Ej. Primer contacto de seguros"
                        />

                        <span>{formulario.titulo.length}/60 caracteres</span>
                    </div>

                    <div className="sawp__field">
                        <label htmlFor="sawp-mensaje">
                            Contenido del mensaje
                        </label>

                        <textarea
                            ref={mensajeRef}
                            id="sawp-mensaje"
                            value={formulario.mensaje}
                            onChange={(e) => cambiarCampo("mensaje", e.target.value)}
                            rows={8}
                            maxLength={1000}
                            required
                            placeholder="Escribe el mensaje que deseas utilizar..."
                        />

                        <span>{formulario.mensaje.length}/1000 caracteres</span>
                    </div>

                    <div className="sawp__variables">
                        <div>
                            <h4>Variables dinámicas</h4>
                            <p>
                                Selecciona una variable para insertarla en el mensaje donde esté el cursor.
                            </p>
                        </div>

                        <div className="sawp__variable-list">
                            {VARIABLES_SEGUROS.map((variable) => (
                                <button type="button" key={variable.key} onClick={() => insertarVariable(variable.key)} title={`Insertar {{${variable.key}}}`} >
                                    + {variable.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {vistaPrevia && (
                        <div className="sawp__preview">
                            <h4>Vista previa con datos de ejemplo</h4>
                            <pre>
                                {renderMensaje(formulario.mensaje, ejemploVariables)}
                            </pre>
                            <p>
                                Los datos mostrados son ilustrativos; al
                                contactar al cliente se usarán los del expediente.
                            </p>
                        </div>
                    )}

                    <div className="sawp__form-actions">
                        <button type="button" className="sawp__button sawp__button--secondary" onClick={() => setVistaPrevia((actual) => !actual)} >
                            {vistaPrevia ? "Ocultar vista previa" : "Vista previa"}
                        </button>

                        {editando && (
                            <button type="button" className="sawp__button sawp__button--secondary" onClick={limpiarFormulario} disabled={guardando}  >
                                Cancelar edición
                            </button>
                        )}

                        <button type="submit" className="sawp__button sawp__button--primary" disabled={guardando} >
                            {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Crear plantilla"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="sawp__library">
                <div className="sawp__library-heading">
                    <div>
                        <h3>Plantillas guardadas</h3>
                        <p>
                            Estos mensajes estarán disponibles desde el detalle de cada expediente de seguro.
                        </p>
                    </div>

                    <input type="search" aria-label="Buscar plantillas" placeholder="Buscar plantilla..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </div>

                {loading ? (
                    <p className="sawp__state">Cargando plantillas...</p>
                ) : plantillasFiltradas.length === 0 ? (
                    <div className="sawp__empty">
                        <h4>
                            {plantillas.length ? "No hay coincidencias" : "Todavía no hay plantillas"}
                        </h4>
                        <p>
                            {plantillas.length ? "Prueba con otro término de búsqueda." : "Crea tu primera plantilla en el formulario anterior."}
                        </p>
                    </div>
                ) : (
                    <div className="sawp__cards">
                        {plantillasFiltradas.map((plantilla) => (
                            <article className="sawp__card" key={plantilla.id} >
                                <div className="sawp__card-heading">
                                    <span>Seguros</span>
                                    <small> {plantilla.mensaje.length} caracteres </small>
                                </div>

                                <h4>{plantilla.titulo}</h4>

                                <p className="sawp__card-message">
                                    {plantilla.mensaje}
                                </p>

                                <div className="sawp__card-actions">
                                    <button type="button" onClick={() => editar(plantilla)} disabled={eliminandoId !== null}  >
                                        Editar
                                    </button>

                                    <button type="button" className="sawp__delete" onClick={() => eliminar(plantilla)} disabled={eliminandoId !== null} >
                                        {eliminandoId === plantilla.id ? "Eliminando..." : "Eliminar"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}