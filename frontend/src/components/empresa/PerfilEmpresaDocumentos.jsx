"use client";

import { useEffect, useRef, useState } from "react";
import ReciboColoresManager from "@/components/empresa/ReciboColoresManager";
import { empresaConfiguracionDocumentos } from "@/services/empresaConfiguracionDocumentos";
import { uploadLogoEmpresaToCloudinary } from "@/utils/cloudinaryUpload";

import "@/styles/components/_perfilEmpresaDocumentos.scss";

const CONFIG_DEFAULT = {
    nombre_comercial: "",
    clausulas: {
        politica_seguro: "",
        incluye_servicio: "",
        condiciones_pago_cancelacion: "",
    },
    seguro_porcentaje: 0,
    pie_pagina: "",
};

export default function PerfilEmpresaDocumentos({ empresa }) {
    const fileRef = useRef(null);
    const [form, setForm] = useState(CONFIG_DEFAULT);
    const [logoActual, setLogoActual] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        let activo = true;

        const cargarConfiguracion = async () => {
            try {
                const data = await empresaConfiguracionDocumentos.obtener();
                if (!activo) return;
                const configuracion = data.configuracion || {};

                setForm({
                    nombre_comercial: configuracion.nombre_comercial ?? data.empresa?.nombre_comercial ?? data.empresa?.empresa ?? empresa?.empresa ?? "",

                    clausulas: {
                        politica_seguro: configuracion.clausulas?.politica_seguro || "",
                        incluye_servicio: configuracion.clausulas?.incluye_servicio || "",
                        condiciones_pago_cancelacion: configuracion.clausulas?.condiciones_pago_cancelacion || "",
                    },

                    seguro_porcentaje: configuracion.seguro_porcentaje ?? 0,
                    pie_pagina: configuracion.pie_pagina || "",
                });

                const logo = data.empresa?.logo_url || empresa?.logo_url || null;
                setLogoActual(logo);
                setLogoPreview(logo);
            } catch (e) {
                if (activo) setError(e.message);
            } finally {
                if (activo) setLoading(false);
            }
        };

        cargarConfiguracion();

        return () => {
            activo = false;
        };
    }, [empresa]);

    const cambiarCampo = (campo, valor) => {
        setForm((actual) => ({
            ...actual,
            [campo]: valor,
        }));

        setMensaje("");
        setError("");
    };

    const cambiarClausula = (campo, valor) => {
        setForm((actual) => ({
            ...actual,
            clausulas: {
                ...actual.clausulas,
                [campo]: valor,
            },
        }));

        setMensaje("");
        setError("");
    };

    const seleccionarLogo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!tiposPermitidos.includes(file.type)) {
            setError("Selecciona una imagen JPG, PNG o WEBP.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("El logo no puede superar los 5MB.");
            return;
        }

        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
        setMensaje("");
        setError("");
    };

    const quitarLogoNuevo = () => {
        setLogoFile(null);
        setLogoPreview(logoActual);

        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    const guardar = async () => {
        if (guardando) return;
        setError("");
        setMensaje("");
        const porcentaje = Number(form.seguro_porcentaje);

        if (!Number.isFinite(porcentaje) || porcentaje < 0 || porcentaje > 100) {
            setError("El porcentaje de seguro debe estar entre 0 y 100.");
            return;
        }

        if (!form.nombre_comercial.trim()) {
            setError("Ingresa el nombre comercial de tu empresa.");
            return;
        }

        setGuardando(true);

        try {
            let logoUrl = logoActual;

            if (logoFile) {
                const uploaded = await uploadLogoEmpresaToCloudinary(logoFile);
                logoUrl = uploaded.url;
            }

            const payload = {
                ...form,
                nombre_comercial: form.nombre_comercial.trim(),
                seguro_porcentaje: porcentaje,
                logo_url: logoFile ? logoUrl : undefined,
            };

            const data = await empresaConfiguracionDocumentos.actualizar(payload);

            if (data.empresa?.logo_url) {
                setLogoActual(data.empresa.logo_url);
                setLogoPreview(data.empresa.logo_url);
            } else if (logoFile) {
                setLogoActual(logoUrl);
                setLogoPreview(logoUrl);
            }

            setLogoFile(null);

            if (fileRef.current) {
                fileRef.current.value = "";
            }

            if (data.configuracion) {
                setForm({
                    ...CONFIG_DEFAULT,
                    ...data.configuracion,
                    clausulas: {
                        ...CONFIG_DEFAULT.clausulas,
                        ...data.configuracion.clausulas,
                    },
                });
            }

            setMensaje(data.message || "Tu configuración se guardó correctamente.");
        } catch (e) {
            setError(e.message);
        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return (
            <section className="perfil-documentos configuracion__block">
                <p className="configuracion__copy">
                    Cargando configuración ...
                </p>
            </section>
        );
    }

    return (
        <section className="perfil-documentos configuracion__block">
            <div className="perfil-documentos__header">
                <h2>Perfil</h2>

                <p className="configuracion__copy">
                    Configura la identidad y las condiciones comerciales que aparecerán en tus cotizaciones.
                </p>
            </div>

            <div className="perfil-documentos__section">
                <div className="perfil-documentos__section-heading">
                    <h3>Identidad</h3>

                    <p>
                        Aquí puedes personalizar tus cotizaciones con el logo, nombre y color de tu empresa.
                    </p>
                </div>

                <div className="perfil-documentos__identity">
                    <div className="perfil-documentos__logo">
                        <div className="perfil-documentos__logo-preview">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo empresarial" />
                            ) : (
                                <span>Sin logo</span>
                            )}
                        </div>

                        <div className="perfil-documentos__logo-actions">
                            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={seleccionarLogo} />

                            {logoFile && (
                                <button type="button" onClick={quitarLogoNuevo} >
                                    Deshacer cambio
                                </button>
                            )}

                            <small>
                                JPG, PNG o WEBP. Máximo 5MB.
                            </small>
                        </div>
                    </div>

                    <div className="perfil-documentos__field">
                        <label>Nombre comercial</label>

                        <input
                            type="text"
                            maxLength={150}
                            value={form.nombre_comercial}
                            onChange={(e) => cambiarCampo("nombre_comercial", e.target.value)}
                            placeholder="Nombre comercial de tu empresa"
                        />

                        <small>
                            Este nombre se utilizará en tus cotizaciones.
                            No modifica el nombre registrado de tu empresa.
                        </small>
                    </div>
                </div>

                <div className="perfil-documentos__colors">
                    <ReciboColoresManager />
                </div>

                <div className="perfil-documentos__section-heading">
                    <h3>Pie de página</h3>

                    <p>
                        Aquí puedes agregar los datos que quieres mostrar
                        al final de tus cotizaciones, por ejemplo teléfono,
                        WhatsApp, dirección o página web.
                    </p>
                </div>

                <div className="perfil-documentos__field">
                    <textarea
                        rows={4}
                        maxLength={1000}
                        value={form.pie_pagina}
                        onChange={(e) => cambiarCampo("pie_pagina", e.target.value)}
                        placeholder="Ej. WhatsApp 55 1234 5678 · www.mudanzasempresa.com"
                    />

                    <small>
                        {form.pie_pagina.length}/1000 caracteres
                    </small>
                </div>
            </div>

            <div className="perfil-documentos__section">
                <div className="perfil-documentos__section-heading"  id="clausulas-heading">
                    <h3>Cláusulas y condiciones</h3>

                    <p>
                        Aquí puedes explicar las condiciones de tu servicio:
                        forma de pago, anticipos, cancelaciones, seguro,
                        qué incluye la mudanza y cualquier otra condición
                        que quieras dejar clara al cliente.
                    </p>
                </div>

                <div className="perfil-documentos__field">
                    <label>Qué incluye y qué no incluye el servicio</label>

                    <textarea
                        rows={5}
                        value={form.clausulas.incluye_servicio}
                        onChange={(e) => cambiarClausula("incluye_servicio", e.target.value)}
                        placeholder="Aquí puedes explicar qué está incluido en tu precio (carga, transporte, descarga, materiales de protección) y qué no (desinstalaciones, mascotas, objetos perecederos, trámites especiales)."
                    />
                </div>

                <div className="perfil-documentos__field">
                    <label>Condiciones de pago y cancelación</label>

                    <textarea
                        rows={5}
                        value={form.clausulas.condiciones_pago_cancelacion}
                        onChange={(e) => cambiarClausula("condiciones_pago_cancelacion", e.target.value)}
                        placeholder="Aquí puedes explicar tu anticipo requerido, cómo se liquida el saldo, y tu política de cancelación (por ejemplo, tiempo mínimo de aviso)."
                    />
                </div>

                <div className="perfil-documentos__field">
                    <label>Política de seguros</label>

                    <textarea
                        rows={5}
                        value={form.clausulas.politica_seguro}
                        onChange={(e) => cambiarClausula("politica_seguro", e.target.value)}
                        placeholder="Aquí puedes explicar cómo funciona tu seguro: si cubres el valor declarado por el cliente, qué porcentaje cobras, y qué queda fuera (objetos no declarados, daños preexistentes, etc.)"
                    />
                </div>
            </div>

            <div className="perfil-documentos__section">
                <div className="perfil-documentos__section-heading" id="clausulas-heading">
                    <h3>Seguro</h3>

                    <p>
                        Define el porcentaje de seguro que normalmente manejas.
                        Podrás cambiarlo en cada cotización si lo necesitas.
                    </p>
                </div>

                <div className="perfil-documentos__field perfil-documentos__field--percentage">
                    <label>% por defecto de seguro</label>

                    <div className="perfil-documentos__percentage-input">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={form.seguro_porcentaje}
                            onChange={(e) => cambiarCampo("seguro_porcentaje", e.target.value)}
                        />

                        <span>%</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="perfil-documentos__alert perfil-documentos__alert--error">
                    {error}
                </div>
            )}

            {mensaje && (
                <div className="perfil-documentos__alert perfil-documentos__alert--success">
                    {mensaje}
                </div>
            )}

            <div className="perfil-documentos__actions">
                <button type="button" onClick={guardar} disabled={guardando} className="configuracion__btn" >
                    {guardando ? "Guardando configuración..." : "Guardar configuración"}
                </button>
            </div>
        </section>
    );
}