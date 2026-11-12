"use client";

import { useCallback, useEffect, useRef, useState, } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import FirmaCanvas from "./FirmaCanvas";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { dataUrlToFile } from "@/utils/reciboImagen";
import { obtenerDatosRecibo, generarRecibo, descargarRecibo, actualizarFirma, } from "@/services/recibos";
import "@/styles/components/_generarReciboModal.scss";

const TIPOS_PAGO = [
    { value: "anticipo", label: "Anticipo" },
    { value: "pago_parcial", label: "Pago parcial" },
    { value: "liquidacion", label: "Liquidación" },
];

const FORMAS_PAGO = [
    { value: "efectivo", label: "Efectivo" },
    { value: "transferencia", label: "Transferencia" },
    { value: "deposito", label: "Depósito" },
    { value: "retiro_sin_tarjeta", label: "Retiro sin tarjeta" },
    { value: "tarjeta", label: "Tarjeta" },
    { value: "cheque", label: "Cheque" },
];

const NOTAS = [
    "Este recibo ampara únicamente el pago descrito en este documento. No es una factura ni un comprobante fiscal.",
    "El saldo se liquida a la entrega, antes de descargar.",
    "Los datos de este recibo se usan solo para el servicio contratado.",
    "Conserva este documento hasta que concluya el servicio.",
];

function fechaHoy() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function Campo({ label, children, required }) {
    return (
        <div className="recibo-modal__field">
            <label>
                {label}
                {required && <span>*</span>}
            </label>

            {children}
        </div>
    );
}

export default function GenerarReciboModal({ solicitudId, onClose, onSuccess, }) {
    const modalRef = useRef(null);
    const ciudadRef = useRef(null);
    const [cargando, setCargando] = useState(true);
    const [generando, setGenerando] = useState(false);
    const [error, setError] = useState("");
    const [datos, setDatos] = useState(null);

    const [form, setForm] = useState({
        fecha_recibo: fechaHoy(),
        ciudad: "",
        nombre_cliente: "",
        origen: "",
        destino: "",
        tipo_pago: "anticipo",
        forma_pago: "efectivo",
        monto: "",
        total_acordado: "",
        observaciones: "",
    });

    const [firmaEmpresa, setFirmaEmpresa] = useState("");
    const [firmaCliente, setFirmaCliente] = useState("");
    const [guardarFirma, setGuardarFirma] = useState(true);
    const [usarFirmaGuardada, setUsarFirmaGuardada] = useState(true);
    const [firmaClienteActiva, setFirmaClienteActiva] = useState(false);
    const [errores, setErrores] = useState({});
    const [googleListo, setGoogleListo] = useState(false);

    const cambiar = (campo, valor) => {
        setForm((actual) => ({ ...actual, [campo]: valor, }));
        setErrores((actual) => ({ ...actual, [campo]: null, }));
    };

    const cerrar = useCallback(() => {
        if (!generando) onClose?.();
    }, [generando, onClose]);

    useClickOutside(modalRef, cerrar);

    // ==========================================
    // CARGAR DATOS
    // ==========================================
    useEffect(() => {
        let activo = true;

        const cargar = async () => {
            try {
                const response = await obtenerDatosRecibo(solicitudId);
                if (!activo) return;

                setDatos(response);
                const solicitud = response?.solicitud ?? {};

                setForm((actual) => ({
                    ...actual,
                    nombre_cliente: solicitud.nombre ?? "",
                    origen: solicitud.origen ?? "",
                    destino: solicitud.destino ?? "",
                    ciudad: solicitud.ciudad ?? "",
                }));

                setUsarFirmaGuardada(Boolean(response?.firma?.disponible && response?.firma?.imagen));
            } catch (e) {
                if (activo) setError(e.message);
            } finally {
                if (activo) setCargando(false);
            }
        };

        cargar();
        return () => { activo = false; };
    }, [solicitudId]);

    // ==========================================
    // GOOGLE PLACES
    // ==========================================
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
            return;
        }

        if (window.google?.maps?.places) {
            setGoogleListo(true);
            return;
        }

        const existente = document.querySelector('script[data-google-places="recibo"]');

        if (existente) {
            existente.addEventListener("load", () => { setGoogleListo(true); });
            return;
        }

        const script = document.createElement("script");
        script.dataset.googlePlaces = "recibo";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=es&region=MX`;
        script.async = true;
        script.onload = () => setGoogleListo(true);

        script.onerror = () => {
            setError("No fue posible cargar Google Places.");
        };

        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!googleListo || !ciudadRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            ciudadRef.current,
            {
                types: ["(cities)"],
                componentRestrictions: { country: "mx", },
                fields: ["formatted_address", "name"],
            }
        );

        const listener = autocomplete.addListener(
            "place_changed",
            () => {
                const place = autocomplete.getPlace();
                cambiar("ciudad", place.formatted_address || place.name || "");
            }
        );

        return () => listener.remove();
    }, [googleListo]);

    // ==========================================
    // FIRMA
    // ==========================================
    const firmaPredeterminada = datos?.firma?.imagen || null;
    const firmaFinal = usarFirmaGuardada ? null : firmaEmpresa;

    // ==========================================
    // GENERAR
    // ==========================================
    const finalizar = async (event) => {
        event.preventDefault();
        setError("");
        setErrores({});

        if (!form.ciudad.trim()) {
            setErrores({ ciudad: ["Selecciona una ciudad."], });
            return;
        }

        if (!form.nombre_cliente.trim()) {
            setError("El nombre del cliente es obligatorio.");
            return;
        }

        if (!form.origen.trim() || !form.destino.trim()) {
            setError("El origen y destino son obligatorios.");
            return;
        }

        if (!usarFirmaGuardada && !firmaEmpresa) {
            setError("Debes agregar tu firma para continuar.");
            return;
        }

        setGenerando(true);

        try {
            let firmaEmpresaUrl = null;
            let firmaClienteUrl = null;

            // ==========================================
            // FIRMA DE LA EMPRESA
            // ==========================================
            if (usarFirmaGuardada) {
                firmaEmpresaUrl = datos?.firma?.imagen ?? null;

                if (!firmaEmpresaUrl) {
                    throw new Error("No se encontró la firma predeterminada.");
                }
            } else {
                const archivoEmpresa = dataUrlToFile(firmaEmpresa, `firma-empresa-${solicitudId}.png`);
                const subidaEmpresa = await uploadToCloudinary(archivoEmpresa);
                firmaEmpresaUrl = subidaEmpresa.url;

                if (guardarFirma) {
                    await actualizarFirma(firmaEmpresaUrl);

                    setDatos((actual) => ({
                        ...actual,
                        firma: { disponible: true, imagen: firmaEmpresaUrl, },
                    }));
                }
            }

            if (firmaClienteActiva && firmaCliente) {
                const archivoCliente = dataUrlToFile(firmaCliente, `firma-cliente-${solicitudId}.png`);
                const subidaCliente = await uploadToCloudinary(archivoCliente);
                firmaClienteUrl = subidaCliente.url;
            }

            const response = await generarRecibo(
                solicitudId,
                {
                    ...form,
                    monto: Number(form.monto),
                    total_acordado: form.total_acordado === "" ? null : Number(form.total_acordado),
                    firma_empresa: firmaEmpresaUrl,
                    firma_cliente: firmaClienteUrl,
                    guardar_firma: false,
                }
            );

            if (response.data?.id) {
                await descargarRecibo(response.data.id);
            }

            onSuccess?.(response.data);
            onClose?.();
        } catch (e) {
            setError(e.message);

            if (e.errors) {
                setErrores(e.errors);
            }
        } finally {
            setGenerando(false);
        }
    };

    if (cargando) {
        return (
            <div className="recibo-modal__overlay">
                <div className="recibo-modal__loading">
                    Cargando información...
                </div>
            </div>
        );
    }

    return (
        <div className="recibo-modal__overlay">
            <div className="recibo-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="recibo-modal-title" >
                <header className="recibo-modal__header">
                    <div>
                        <h2 id="recibo-modal-title">
                            Generar recibo
                        </h2>
                        <p>  Registra el pago del servicio contratado. </p>
                    </div>

                    <button type="button" onClick={cerrar} disabled={generando} aria-label="Cerrar" >
                        ×
                    </button>
                </header>

                {error && (
                    <div className="recibo-modal__error">
                        {error}
                    </div>
                )}

                <form onSubmit={finalizar} className="recibo-modal__form" >
                    <section className="recibo-modal__section">
                        <h3>01. Cliente y servicio</h3>

                        <div className="recibo-modal__grid">
                            <Campo label="Fecha del recibo" required  >
                                <input type="date" value={form.fecha_recibo} onChange={(e) => cambiar("fecha_recibo", e.target.value)} required />
                            </Campo>

                            <Campo label="Ciudad" required  >
                                <input
                                    ref={ciudadRef}
                                    value={form.ciudad}
                                    onChange={(e) => cambiar("ciudad", e.target.value)}
                                    placeholder="Busca una ciudad"
                                    required
                                />

                                {errores.ciudad && (
                                    <small>
                                        {errores.ciudad[0]}
                                    </small>
                                )}
                            </Campo>

                            <Campo label="Nombre del cliente" required >
                                <input value={form.nombre_cliente} onChange={(e) => cambiar("nombre_cliente", e.target.value)} required />
                            </Campo>

                            <Campo label="Origen" required >
                                <input value={form.origen} onChange={(e) => cambiar("origen", e.target.value)} required />
                            </Campo>

                            <Campo label="Destino" required >
                                <input value={form.destino} onChange={(e) => cambiar("destino", e.target.value)} required />
                            </Campo>
                        </div>
                    </section>

                    <section className="recibo-modal__section">
                        <h3>02. Información del pago</h3>

                        <div className="recibo-modal__grid">
                            <Campo label="Tipo de pago" required>
                                <select value={form.tipo_pago} onChange={(e) => cambiar("tipo_pago", e.target.value)}  >
                                    {TIPOS_PAGO.map((item) => (
                                        <option key={item.value} value={item.value} >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </Campo>

                            <Campo label="Forma de pago" required>
                                <select value={form.forma_pago} onChange={(e) => cambiar("forma_pago", e.target.value)}  >
                                    {FORMAS_PAGO.map((item) => (
                                        <option key={item.value} value={item.value} >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </Campo>

                            <Campo label="Monto de este pago" required>
                                <div className="recibo-modal__money">
                                    <span>$</span>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={form.monto}
                                        onChange={(e) => cambiar("monto", e.target.value)}
                                        placeholder="0.00"
                                        required
                                    />
                                    <span>MXN</span>
                                </div>
                            </Campo>

                            <Campo label="Total acordado (opcional)">
                                <div className="recibo-modal__money">
                                    <span>$</span>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={form.total_acordado}
                                        onChange={(e) => cambiar("total_acordado", e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <span>MXN</span>
                                </div>
                            </Campo>
                        </div>
                    </section>

                    <section className="recibo-modal__section">
                        <h3>03. Notas del recibo</h3>

                        <div className="recibo-modal__notes">
                            {NOTAS.map((nota, index) => (
                                <p key={index}>
                                    <span>•</span>
                                    {nota}
                                </p>
                            ))}
                        </div>
                    </section>

                    <section className="recibo-modal__section">
                        <h3>04. Firmas y observaciones</h3>

                        <Campo label="Observaciones (opcional)">
                            <textarea rows={4} value={form.observaciones} onChange={(e) => cambiar("observaciones", e.target.value)} placeholder="Agrega alguna observación..." />
                        </Campo>

                        <div className="recibo-modal__signature">
                            <div className="recibo-modal__signature-heading">
                                <strong>
                                    Firma de {datos?.empresa?.representante || datos?.empresa?.nombre}
                                </strong>
                            </div>

                            {datos?.firma?.disponible && (
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={usarFirmaGuardada}
                                        onChange={(e) => { setUsarFirmaGuardada(e.target.checked); setFirmaEmpresa(""); }}
                                    />
                                    Usar mi firma guardada
                                </label>
                            )}

                            {usarFirmaGuardada && firmaPredeterminada ? (
                                <div className="recibo-modal__saved-signature">
                                    <img src={firmaPredeterminada} alt="Firma predeterminada" />
                                    <span>
                                        Firma predeterminada
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <FirmaCanvas onChange={setFirmaEmpresa} />

                                    <label>
                                        <input type="checkbox" checked={guardarFirma} onChange={(e) => setGuardarFirma(e.target.checked)} />
                                        Guardar esta firma para futuros recibos
                                    </label>
                                </>
                            )}

                        </div>

                        <div className="recibo-modal__signature">
                            <label className="recibo-modal__signature-toggle">
                                <input
                                    type="checkbox"
                                    checked={firmaClienteActiva}
                                    onChange={(e) => { setFirmaClienteActiva(e.target.checked); setFirmaCliente(""); }}
                                />

                                Agregar firma del cliente (opcional)
                            </label>

                            {firmaClienteActiva && (
                                <FirmaCanvas onChange={setFirmaCliente} />
                            )}
                        </div>
                    </section>

                    <div className="recibo-modal__custom-colors">
                        <div className="recibo-modal__custom-colors-info">
                            <span className="recibo-modal__custom-colors-icon">
                                <img src="/icons/color.png" alt="Personalizar recibo" />
                            </span>

                            <div>
                                <strong>Personaliza tu recibo</strong>
                                <p>
                                    Puedes cambiar los colores de tus recibos desde la configuración de tu empresa.
                                </p>
                            </div>
                        </div>

                        <button type="button" onClick={() => { window.location.href = "/empresa/configuracion#recibo-colores"; }} disabled={generando} >
                            Personalizar colores
                            <span>↗</span>
                        </button>
                    </div>

                    <footer className="recibo-modal__footer">
                        <button type="button" onClick={cerrar} disabled={generando} >
                            Cancelar
                        </button>

                        <button type="submit" disabled={generando} >
                            {generando ? "Generando documento..." : "Finalizar y generar recibo"}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}