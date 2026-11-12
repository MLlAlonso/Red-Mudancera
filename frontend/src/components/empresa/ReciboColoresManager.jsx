"use client";

import { useEffect, useState } from "react";
import { getEmpresaToken } from "@/utils/auth";
import "@/styles/components/_reciboColoresManager.scss";

const API = process.env.NEXT_PUBLIC_API_URL;

const COLORES_DEFAULT = {
    primary: "#09233E",
    accent: "#1C8F6A",
};

const esHexValido = (color) => /^#[0-9A-Fa-f]{6}$/.test(color);

function ColorField({ title, description, value, onChange, error, }) {
    const colorSeguro = esHexValido(value) ? value : "#FFFFFF";

    return (
        <div className="recibo-colores__field">
            <div className="recibo-colores__field-info">
                <strong>{title}</strong>
                <p>{description}</p>
            </div>

            <div className="recibo-colores__picker">
                <input type="color" value={colorSeguro} onChange={(e) => onChange(e.target.value.toUpperCase())} aria-label={`Seleccionar ${title}`} />

                <div className="recibo-colores__hex">
                    <span>#</span>

                    <input
                        type="text"
                        value={value.startsWith("#") ? value.slice(1) : value}
                        maxLength={6}
                        placeholder="09233E"
                        onChange={(e) => {
                            const limpio = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                            onChange(`#${limpio.toUpperCase()}`);
                        }}
                        aria-label={`Código HEX de ${title}`}
                    />
                </div>
            </div>

            {error && (
                <small className="recibo-colores__error">
                    {error}
                </small>
            )}
        </div>
    );
}

export default function ReciboColoresManager() {
    const [colores, setColores] = useState(COLORES_DEFAULT);
    const [originales, setOriginales] = useState(COLORES_DEFAULT);
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const token = () => getEmpresaToken();

    const obtenerColores = async () => {
        const accessToken = token();

        if (!accessToken) {
            throw new Error("Tu sesión ha expirado.");
        }

        const response = await fetch(
            `${API}/solicitudes-mudanza/empresa/recibos/colores`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "No fue posible cargar los colores.");
        }

        return data;
    };

    useEffect(() => {
        let activo = true;

        const cargar = async () => {
            try {
                const data = await obtenerColores();
                if (!activo) return;

                const nuevos = {
                    primary: data.colores?.primary || COLORES_DEFAULT.primary,
                    accent: data.colores?.accent || COLORES_DEFAULT.accent,
                };

                setColores(nuevos);
                setOriginales(nuevos);
            } catch (e) {
                if (activo) setError(e.message);
            } finally {
                if (activo) setLoading(false);
            }
        };

        cargar();
        return () => { activo = false; };
    }, []);

    const cambiarColor = (campo, valor) => {
        setColores((actual) => ({ ...actual, [campo]: valor, }));
        setError("");
        setMensaje("");
    };

    const guardar = async () => {
        setError("");
        setMensaje("");

        if (!esHexValido(colores.primary) || !esHexValido(colores.accent)) {
            setError("Verifica que ambos colores tengan un código HEX de 6 caracteres.");
            return;
        }

        setGuardando(true);

        try {
            const accessToken = token();

            if (!accessToken) {
                throw new Error("Tu sesión ha expirado.");
            }

            const response = await fetch(
                `${API}/solicitudes-mudanza/empresa/recibos/colores`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(colores),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "No fue posible guardar los colores.");
            }

            const nuevos = {
                primary: data.colores.primary,
                accent: data.colores.accent,
            };

            setColores(nuevos);
            setOriginales(nuevos);
            setMensaje(data.message);
        } catch (e) {
            setError(e.message);
        } finally {
            setGuardando(false);
        }
    };

    const restablecer = async () => {
        setError("");
        setMensaje("");
        setGuardando(true);

        try {
            const accessToken = token();

            if (!accessToken) {
                throw new Error("Tu sesión ha expirado.");
            }

            const response = await fetch(
                `${API}/solicitudes-mudanza/empresa/recibos/colores`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "No fue posible restablecer los colores.");
            }

            const nuevos = {
                primary: data.colores.primary,
                accent: data.colores.accent,
            };

            setColores(nuevos);
            setOriginales(nuevos);
            setMensaje(data.message);
        } catch (e) {
            setError(e.message);
        } finally {
            setGuardando(false);
        }
    };

    const hayCambios = colores.primary !== originales.primary || colores.accent !== originales.accent;
    const yaPredeterminados = colores.primary === COLORES_DEFAULT.primary && colores.accent === COLORES_DEFAULT.accent;

    if (loading) {
        return (
            <section className="recibo-colores configuracion__block">
                <h2>Personalización de recibos</h2>
                <p className="configuracion__copy">
                    Cargando configuración de colores...
                </p>
            </section>
        );
    }

    return (
        <section className="recibo-colores configuracion__block">
            <div className="recibo-colores__header">
                <div>
                    <h2>Personalización de recibos</h2>

                    <p className="configuracion__copy">
                        Personaliza los colores de los documentos PDF que generas para tus clientes.
                    </p>
                </div>
            </div>

            <div className="recibo-colores__content">

                <div className="recibo-colores__fields">
                    <ColorField
                        title="Color principal"
                        description="Se utiliza en el encabezado de tu recibo."
                        value={colores.primary}
                        onChange={(value) => cambiarColor("primary", value)}
                    />

                    <ColorField
                        title="Color de acento"
                        description="Se utiliza en títulos, bordes y monto recibido."
                        value={colores.accent}
                        onChange={(value) => cambiarColor("accent", value)}
                    />
                </div>

                <div className="recibo-colores__preview">
                    <div className="recibo-colores__preview-heading">
                        <span>VISTA PREVIA</span>
                        <strong>Ejemplo de recibo</strong>
                    </div>

                    <div className="recibo-colores__document">
                        <div className="recibo-colores__document-header" style={{ backgroundColor: colores.primary, }}  >
                            <div>
                                <strong>MI EMPRESA</strong>
                                <span>RECIBO DE PAGO</span>
                            </div>

                            <small>MF-20261111-XXXXXXXX</small>
                        </div>

                        <div className="recibo-colores__document-body">
                            <div className="recibo-colores__document-title" style={{ borderLeftColor: colores.accent, }} >
                                CLIENTE Y SERVICIO
                            </div>

                            <div className="recibo-colores__document-lines">
                                <span>Nombre del cliente</span>
                                <span>Origen — Destino</span>
                            </div>

                            <div className="recibo-colores__document-title" style={{ borderLeftColor: colores.accent, }} >
                                INFORMACIÓN DEL PAGO
                            </div>

                            <div className="recibo-colores__document-amount">
                                <span>MONTO DE ESTE PAGO</span>

                                <strong style={{ color: colores.accent, }} >
                                    $5,000.00 MXN
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="recibo-colores__alert recibo-colores__alert--error">
                    {error}
                </div>
            )}

            {mensaje && (
                <div className="recibo-colores__alert recibo-colores__alert--success">
                    {mensaje}
                </div>
            )}

            <div className="recibo-colores__actions">
                <button type="button" className="recibo-colores__reset" onClick={restablecer} disabled={guardando || yaPredeterminados} >
                    Restablecer colores
                </button>

                <button type="button" className="configuracion__btn" onClick={guardar} disabled={guardando || !hayCambios} >
                    {guardando ? "Guardando..." : "Guardar colores"}
                </button>
            </div>

            <p className="recibo-colores__footnote">
                Los cambios se aplicarán únicamente a los recibos
                que generes después de guardar esta configuración.
                Tus documentos anteriores no se modificarán.
            </p>
        </section>
    );
}