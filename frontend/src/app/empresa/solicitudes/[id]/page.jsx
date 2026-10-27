"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEmpresaToken } from "@/utils/auth";
import { buildLeadWhatsappVariables, openWhatsappTemplate, } from "@/utils/whatsapp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_cta from "@/components/common/Button_cta";
import ServiceStatusDropdown from "@/components/common/ServiceStatusDropdown";
import ComprarLeadModal from "@/components/modals/ComprarLeadModal";
import EmpresaNotesModal from "@/components/modals/EmpresaNotesModal";
import WhatsappMensajeSelectorModal from "@/components/modals/WhatsappMensajeSelectorModal";
import LiveViewToast from "@/components/common/LiveViewToast";

import "@/styles/pages/solicitudes/_detalleSolicitud.scss";

const ESTADOS = ["activo", "asignado", "en_proceso", "sin_respuesta", "finalizado", "perdido",];

const ESTADOS_LABELS = {
    activo: "Pendiente",
    asignado: "Cotizado",
    en_proceso: "En proceso",
    sin_respuesta: "Sin respuesta",
    finalizado: "Vendido",
    perdido: "Perdido",
};

function Icon({ name, size = 22 }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        focusable: false,
    };

    const paths = {
        truck: (
            <>
                <path d="M3 6h11v12H3z" />
                <path d="M14 10h4l3 3v5h-7z" />
                <circle cx="7.5" cy="18" r="1.8" />
                <circle cx="17.5" cy="18" r="1.8" />
            </>
        ),
        home: (
            <>
                <path d="m3 10 9-7 9 7" />
                <path d="M5 9v12h14V9" />
                <path d="M9 21v-7h6v7" />
            </>
        ),
        calendar: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
            </>
        ),
        clock: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </>
        ),
        map: (
            <>
                <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
                <path d="M9 3v15M15 6v15" />
            </>
        ),
        notes: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M8 13h8M8 17h8" />
            </>
        ),
        quote: (
            <>
                <path d="M4 4h16v16H4z" />
                <path d="M8 9h8M8 13h8M8 17h4" />
            </>
        ),
        receipt: (
            <>
                <path d="M5 3h14v18l-3-2-4 2-4-2-3 2z" />
                <path d="M8 8h8M8 12h8M8 16h4" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
            </>
        ),
        whatsapp: (
            <>
                <path d="M20 11.5a8.4 8.4 0 0 1-12.4 7.4L4 20l1.1-3.4A8.4 8.4 0 1 1 20 11.5Z" />
                <path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1.2-1.2 2 1c-.2 1.5-1.2 2.2-2.5 2.2-3.5-.5-6.7-3.7-7.2-7.2 0-1.3.7-2.3 2.2-2.5l1 2z" />
            </>
        ),
    };

    return <svg {...common}>{paths[name] || paths.notes}</svg>;
}

function formatFecha(value) {
    const map = {
        "1-7": "1 a 7 días",
        "8-15": "8 a 15 días",
        "+15": "Más de 15 días",
        "30+": "Más de 30 días",
        lo_antes_posible: "Lo antes posible",
    };

    return map[value] || value || "No especificada";
}

function formatTipoServicio(value) {
    const normalized = String(value || "").toLowerCase();
    if (normalized === "local") return "Local";
    if (normalized === "foranea" || normalized === "foránea") return "Foránea";
    return value || "No especificado";
}

function formatModalidad(value) {
    const normalized = String(value || "").toLowerCase();
    const map = {
        compartida: "Compartida",
        exclusiva: "Exclusiva",
        asesoria: "Asesoría",
        asesoría: "Asesoría",
    };

    return map[normalized] || value || "No especificada";
}

function formatElevador(value) {
    const normalized = String(value || "").trim().toLowerCase();

    const map = {
        si: "Sí",
        no: "No",
        si_y_se_puede_usar: "Sí, se puede usar",
        si_pero_no_se_puede_usar: "Sí, pero no se puede usar",
        no_hay: "No hay elevador",
    };

    return map[normalized] || value || "—";
}

export default function DetalleSolicitudPage() {
    const params = useParams();
    const id = params?.id;
    const [empresa, setEmpresa] = useState(null);
    const [solicitud, setSolicitud] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [haComprado, setHaComprado] = useState(false);
    const [fueExclusivo, setFueExclusivo] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [showWhatsappSelector, setShowWhatsappSelector] = useState(false);
    const [actualizandoEstado, setActualizandoEstado] = useState(false);

    useEffect(() => {
        if (!id) return;
        let cancelado = false;

        const cargarDatos = async () => {
            setCargando(true);
            setErrorCarga("");
            const token = getEmpresaToken();

            const headers = {
                Accept: "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            try {
                const [solicitudResponse, empresaResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/${id}`, { headers }),
                    token ? fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, { headers, }) : Promise.resolve(null),
                ]);

                if (!solicitudResponse.ok) {
                    throw new Error("No fue posible cargar la solicitud.");
                }

                const data = await solicitudResponse.json();

                if (!cancelado) {
                    setSolicitud(data.data);
                    setHaComprado(Boolean(data.ha_comprado));
                    setFueExclusivo(Boolean(data.fue_exclusivo));
                }

                if (empresaResponse?.ok) {
                    const empresaData = await empresaResponse.json();

                    if (!cancelado) {
                        setEmpresa(empresaData);
                    }
                }
            } catch (error) {
                console.error("Error al cargar detalle de solicitud:", error);

                if (!cancelado) {
                    setErrorCarga(error.message || "Ocurrió un error al cargar la solicitud.");
                }
            } finally {
                if (!cancelado) {
                    setCargando(false);
                }
            }
        };

        cargarDatos();

        return () => {
            cancelado = true;
        };
    }, [id]);

    const contactarCliente = useCallback(() => {
        if (!haComprado) {
            setShowModal(true);
            return;
        }

        if (!solicitud?.telefono) {
            alert("Este contacto no tiene teléfono disponible.");
            return;
        }

        setShowWhatsappSelector(true);
    }, [haComprado, solicitud]);

    const cambiarEstado = useCallback(
        async (nuevoEstado) => {
            if (!haComprado || !solicitud?.id || actualizandoEstado) return;
            if (!ESTADOS.includes(nuevoEstado)) return;
            const token = getEmpresaToken();

            if (!token) {
                alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
                return;
            }

            const estadoAnterior = solicitud.estado_operacion || solicitud.estado || "activo";
            if (nuevoEstado === estadoAnterior) return;
            setActualizandoEstado(true);

            // Actualización optimista de la interfaz.
            setSolicitud((actual) => ({
                ...actual,
                estado_operacion: nuevoEstado,
                estado: nuevoEstado,
            }));

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${solicitud.id}/estado`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json", "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ estado: nuevoEstado }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || "No fue posible actualizar el estado.");
                }
            } catch (error) {
                console.error("Error al actualizar estado del lead:", error);

                setSolicitud((actual) => ({
                    ...actual,
                    estado_operacion: estadoAnterior,
                    estado: estadoAnterior,
                }));

                alert(error.message || "Error al actualizar el estado.");
            } finally {
                setActualizandoEstado(false);
            }
        },
        [haComprado, solicitud, actualizandoEstado]
    );

    if (cargando) {
        return (
            <>
                <Header />
                <main className="detalle-solicitud detalle-solicitud--feedback">
                    <p>Cargando información de la solicitud...</p>
                </main>
                <Footer />
            </>
        );
    }

    if (errorCarga || !solicitud) {
        return (
            <>
                <Header />
                <main className="detalle-solicitud detalle-solicitud--feedback">
                    <h1>No se pudo mostrar la solicitud</h1>
                    <p>{errorCarga || "La solicitud no está disponible."}</p>
                </main>
                <Footer />
            </>
        );
    }

    const estadoActual = solicitud.estado_operacion || solicitud.estado || "activo";

    const variablesWhatsapp = buildLeadWhatsappVariables({
        telefono: solicitud.telefono,
        empresaNombre: empresa?.empresa || "Mi empresa",
        empresaId: empresa?.id,
        nombreCliente: solicitud.nombre,
        emailCliente: solicitud.email,
        origen: solicitud.origen,
        destino: solicitud.destino,
        tipoVivienda: solicitud.tipo_vivienda,
        viviendaDestino: solicitud.vivienda_destino,
        origenPisos: solicitud.origen_pisos,
        origenElevador: solicitud.origen_elevador,
        origenAcarreo: solicitud.origen_acarreo,
        destinoPisos: solicitud.destino_pisos,
        destinoElevador: solicitud.destino_elevador,
        destinoAcarreo: solicitud.destino_acarreo,
        inventario: solicitud.inventario,
        fechaRecoleccion: solicitud.fecha_recoleccion,
        tipoServicio: solicitud.tipo_servicio,
        tipoMudanza: solicitud.tipo_mudanza,
    });

    return (
        <>
            <Header />

            <main className="detalle-solicitud">
                <header className="detalle-solicitud__header">
                    <h1 className="detalle-solicitud__title">
                        Detalle de Contacto
                    </h1>

                    <p className="detalle-solicitud__subtitle">
                        Información completa de la solicitud de mudanza
                    </p>
                </header>

                <div className="detalle-solicitud__content">
                    <section className="detalle-solicitud__card detalle-solicitud__summary">
                        <div className="detalle-solicitud__top-row">
                            <div className="detalle-solicitud__badges">
                                <span className="detalle-solicitud__badge detalle-solicitud__badge--contacto">
                                    <span className="detalle-solicitud__badge-dot" />
                                    Contacto
                                </span>

                                {haComprado && fueExclusivo && (
                                    <span className="detalle-solicitud__badge detalle-solicitud__badge--exclusivo">
                                        Exclusivo
                                    </span>
                                )}
                            </div>

                            {haComprado && (
                                <div className="detalle-solicitud__status">
                                    <ServiceStatusDropdown
                                        estado={estadoActual}
                                        options={ESTADOS}
                                        labels={ESTADOS_LABELS}
                                        onSelect={cambiarEstado}
                                        disabled={actualizandoEstado}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="detalle-solicitud__route">
                            <h2 className="detalle-solicitud__route-title">
                                <span>{solicitud.origen || "Origen no especificado"}</span>
                                <span className="detalle-solicitud__route-arrow" aria-hidden="true">
                                    →
                                </span>
                                <span>{solicitud.destino || "Destino no especificado"}</span>
                            </h2>
                        </div>

                        <div className="detalle-solicitud__quick-info">
                            <div className="detalle-solicitud__info-badge">
                                <Icon name="truck" />
                                <span>{formatTipoServicio(solicitud.tipo_servicio)}</span>
                            </div>

                            <div className="detalle-solicitud__info-badge">
                                <Icon name="home" />
                                <span>{formatModalidad(solicitud.tipo_mudanza)}</span>
                            </div>

                            <div className="detalle-solicitud__info-badge">
                                <Icon name="map" />
                                <span>
                                    {solicitud.distancia_km !== null && solicitud.distancia_km !== undefined && solicitud.distancia_km !== ""
                                        ? `${solicitud.distancia_km} km` : "Distancia no disponible"}
                                </span>
                            </div>

                            <div className="detalle-solicitud__info-badge">
                                <Icon name="calendar" />
                                <span>{formatFecha(solicitud.fecha_recoleccion)}</span>
                            </div>
                        </div>

                        <div className="detalle-solicitud__actions">
                            {haComprado ? (
                                <>
                                    <button type="button" className="detalle-solicitud__action detalle-solicitud__action--contact" onClick={contactarCliente} >
                                        <Icon name="whatsapp" />
                                        <span>Contactar</span>
                                    </button>

                                    {/* <button type="button" className="detalle-solicitud__action" disabled title="Disponible próximamente" >
                                        <Icon name="quote" />
                                        <span>Cotizar</span>
                                    </button> */}

                                    <button type="button" className="detalle-solicitud__action" onClick={() => setShowNotesModal(true)} >
                                        <Icon name="notes" />
                                        <span>Notas</span>
                                    </button>

                                    {/* <button type="button" className="detalle-solicitud__action" disabled title="Disponible próximamente" >
                                        <Icon name="receipt" />
                                        <span>Generar recibo</span>
                                    </button> */}
                                </>
                            ) : (
                                <Button_cta value="Comprar contacto" onClick={() => setShowModal(true)} />
                            )}
                        </div>
                    </section>

                    <section className="detalle-solicitud__locations">
                        <article className="detalle-solicitud__card detalle-solicitud__location-card">
                            <div className="detalle-solicitud__section-heading">
                                <span className="detalle-solicitud__section-icon">
                                    <Icon name="home" size={25} />
                                </span>
                                <h3>Origen</h3>
                            </div>

                            <div className="detalle-solicitud__location-details">
                                <div>
                                    <label>Tipo de vivienda</label>
                                    <span>{solicitud.tipo_vivienda || "—"}</span>
                                </div>

                                <div>
                                    <label>Pisos</label>
                                    <span>{solicitud.origen_pisos || "—"}</span>
                                </div>

                                <div>
                                    <label>Elevador</label>
                                    <span>{formatElevador(solicitud.origen_elevador)}</span>
                                </div>

                                <div>
                                    <label>Acarreo</label>
                                    <span>{solicitud.origen_acarreo || "—"}</span>
                                </div>
                            </div>
                        </article>

                        <div className="detalle-solicitud__locations-divider" aria-hidden="true">
                            <span />
                            <div>
                                <Icon name="truck" size={26} />
                            </div>
                            <span />
                        </div>

                        <article className="detalle-solicitud__card detalle-solicitud__location-card">
                            <div className="detalle-solicitud__section-heading">
                                <span className="detalle-solicitud__section-icon">
                                    <Icon name="home" size={25} />
                                </span>
                                <h3>Destino</h3>
                            </div>

                            <div className="detalle-solicitud__location-details">
                                <div>
                                    <label>Tipo de vivienda</label>
                                    <span>{solicitud.vivienda_destino || "—"}</span>
                                </div>

                                <div>
                                    <label>Pisos</label>
                                    <span>{solicitud.destino_pisos || "—"}</span>
                                </div>

                                <div>
                                    <label>Elevador</label>
                                    <span>{formatElevador(solicitud.destino_elevador)}</span>
                                </div>

                                <div>
                                    <label>Acarreo</label>
                                    <span>{solicitud.destino_acarreo || "—"}</span>
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="detalle-solicitud__card detalle-solicitud__section">
                        <div className="detalle-solicitud__section-heading">
                            <span className="detalle-solicitud__section-icon">
                                <Icon name="notes" size={25} />
                            </span>
                            <h3>Detalles generales</h3>
                        </div>

                        <div className="detalle-solicitud__details-grid">
                            <div>
                                <label>Tipo de servicio</label>
                                <span>{formatTipoServicio(solicitud.tipo_servicio)}</span>
                            </div>

                            <div>
                                <label>Modalidad</label>
                                <span>{formatModalidad(solicitud.tipo_mudanza)}</span>
                            </div>

                            <div>
                                <label>Distancia</label>
                                <span>
                                    {solicitud.distancia_km !== null && solicitud.distancia_km !== undefined && solicitud.distancia_km !== ""
                                        ? `${solicitud.distancia_km} km` : "—"}
                                </span>
                            </div>

                            <div>
                                <label>Fecha estimada</label>
                                <span>{formatFecha(solicitud.fecha_recoleccion)}</span>
                            </div>
                        </div>

                        <div className="detalle-solicitud__inventory">
                            <label>Inventario</label>
                            <div className="nota-html" dangerouslySetInnerHTML={{ __html: solicitud.inventario || "<p>Sin detalle</p>", }}
                            />
                        </div>
                    </section>

                    {haComprado && (
                        <section className="detalle-solicitud__card detalle-solicitud__section">
                            <div className="detalle-solicitud__section-heading">
                                <span className="detalle-solicitud__section-icon">
                                    <Icon name="user" size={25} />
                                </span>
                                <h3>Datos de contacto</h3>
                            </div>

                            <div className="detalle-solicitud__details-grid">
                                <div>
                                    <label>Nombre</label>
                                    <span>{solicitud.nombre || "—"}</span>
                                </div>

                                <div>
                                    <label>Teléfono</label>
                                    <span>{solicitud.telefono || "—"}</span>
                                </div>

                                <div>
                                    <label>Correo electrónico</label>
                                    <span>{solicitud.email || "—"}</span>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <LiveViewToast tipo="contacto" registroId={solicitud.id} />

            <Footer />

            {!haComprado && showModal && (
                <ComprarLeadModal solicitudId={id} onClose={() => setShowModal(false)} onSuccess={() => window.location.reload()} />
            )}

            {haComprado && (
                <EmpresaNotesModal open={showNotesModal} leadId={solicitud.id} onClose={() => setShowNotesModal(false)} />
            )}

            <WhatsappMensajeSelectorModal
                open={haComprado && showWhatsappSelector}
                onClose={() => setShowWhatsappSelector(false)}
                tipoContacto="empresa_cliente"
                telefono={solicitud.telefono}
                variables={variablesWhatsapp}
                onContactar={({ telefono, mensaje, conMensaje }) => {
                    setShowWhatsappSelector(false);
                    openWhatsappTemplate({ telefono, mensaje, conMensaje });
                }}
            />
        </>
    );
}
