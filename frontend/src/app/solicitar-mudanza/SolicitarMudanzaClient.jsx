"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import SimpleEditor from "@/components/common/SimpleEditor";
import Button_success from "@/components/common/Button_success";
import BaseModal from "@/components/modals/BaseModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function SolicitarMudanza({ empresaSlug = null, landingConfig = {} }) {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [errorModal, setErrorModal] = useState("");
    const router = useRouter();

    const [form, setForm] = useState({
        origen: "",
        tipo_vivienda: "",
        origen_pisos: "",
        origen_elevador: "",
        origen_acarreo: "",
        destino: "",
        vivienda_destino: "",
        destino_pisos: "",
        destino_elevador: "",
        destino_acarreo: "",
        inventario: "",
        fecha_recoleccion: "",
        tipo_mudanza: "",
        nombre: "",
        email: "",
        telefono: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [solicitudId, setSolicitudId] = useState(null);
    const [resumeModal, setResumeModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    /* =========================
       VALIDACIÓN
    ========================= */
    const validate = () => {
        const newErrors = {};
        if (!form.origen) newErrors.origen = "El origen es obligatorio.";
        if (!form.destino) newErrors.destino = "El destino es obligatorio.";
        if (!form.inventario || form.inventario.replace(/<[^>]*>/g, "").length < 10) {
            newErrors.inventario = "Describe al menos 10 caracteres.";
        }

        if (!form.nombre) newErrors.nombre = "La persona de contacto es obligatorio.";
        if (!form.email) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Correo inválido.";
        }

        if (!form.telefono) {
            newErrors.telefono = "El teléfono de contacto es obligatorio.";
        } else if (!/^[0-9]{8,15}$/.test(form.telefono)) {
            newErrors.telefono = "Solo números (8-15 dígitos).";
        }
        if (form.tipo_vivienda === "departamento" && !form.origen_elevador) {
            newErrors.origen_elevador = "Indica si tiene elevador.";
        }

        if (form.vivienda_destino === "departamento" && !form.destino_elevador) {
            newErrors.destino_elevador = "Indica si tiene elevador.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* =========================
       SUBMIT
    ========================= */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        if (!validate()) return;

        setResumeModal(true);
    };

    const createSolicitud = async () => {
        if (loading) return;
        setLoading(true);

        console.log("empresaSlug:", empresaSlug);

        try {
            const res = await fetch(`${API}/solicitudes-mudanza`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    ...(empresaSlug ? { empresa_referente_slug: empresaSlug } : {})
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setSolicitudId(data.data.id);
            setResumeModal(false);
            setSuccessModal(true);
        } catch (err) {
            setErrorModal(err.message || "Ocurrió un error inesperado.");
        }
        setLoading(false);
    };

    const cleanInventario = (html) => {
        if (!html) return "—";

        return html
            .replace(/<\/(div|p|br)>/gi, ", ")
            .replace(/<[^>]*>/g, "")
            .replace(/\s*,\s*/g, ", ")
            .replace(/\s+/g, " ")
            .trim();
    };

    const heroTitle =
        landingConfig.heroTitle || "Comencemos con tu Mudanza";

    const heroSubtitle =
        landingConfig.heroSubtitle ||
        "Solicita tu presupuesto  en menos de 2 minutos y recibe  las mejores propuestas.";

    const buttonText =
        landingConfig.buttonText ||
        "Solicitar Mudanza";

    return (
        <div className="solicitar-mudanza">
            {loading && <LoadingOverlay />}

            <div className="solicitar-mudanza__hero">
                <div className="hero-logo">
                    <img src="/logo/logo.png" alt="Mudanza Fácil" />
                </div>

                <h1 className="title">{heroTitle}</h1>
                <p className="subtitle"> {heroSubtitle} </p>
            </div>

            <div className="solicitar-mudanza__container">
                <form className="solicitar-mudanza__form" onSubmit={handleSubmit}>

                    <div className="form-section">
                        <h2 className="form-section__title">Datos de Origen</h2>

                        <Input label="Origen *" placeholder="Ciudad o zona donde se recoge la mudanza" name="origen" autocomplete value={form.origen} onChange={handleChange} />
                        {errors.origen && <p className="form-error">{errors.origen}</p>}

                        <label className="input-group__label input-group__label--tooltip">
                            <span className="tooltip">
                                ⓘ
                                <span className="tooltip__content">
                                    Tipo de vivienda en la cual se va a recoger la mudanza
                                </span>
                            </span>
                            Tipo de vivienda de origen *
                        </label>
                        <select name="tipo_vivienda" value={form.tipo_vivienda} onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="bodega">Bodega</option>
                            <option value="otro">Otro</option>
                        </select>

                        {form.tipo_vivienda === "departamento" && (
                            <>
                                <Input
                                    label="Número de pisos *"
                                    name="origen_pisos"
                                    type="number"
                                    value={form.origen_pisos}
                                    onChange={handleChange}
                                />

                                <label>¿El edificio cuenta con elevador? *</label>
                                <select name="origen_elevador" value={form.origen_elevador} onChange={handleChange}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="no_hay">No hay elevador</option>
                                    <option value="si_y_se_puede_usar">Sí hay y se puede usar para la mudanza</option>
                                    <option value="si_solo_algunos">Sí hay pero solo para algunos muebles</option>
                                    <option value="si_no_se_permite">Sí hay pero no se permite utilizar</option>
                                    <option value="no_lo_se">No lo sé</option>
                                </select>
                            </>
                        )}

                        <label className="input-group__label input-group__label--tooltip">
                            <span className="tooltip">
                                ⓘ
                                <span className="tooltip__content">
                                    Acarreo es cuando el camión no puede estacionarse cerca del acceso y se debe caminar más de 20 metros con los muebles.
                                </span>
                            </span>
                            ¿Considera que hay acarreo mayor a 20 metros? *
                        </label>
                        <select name="origen_acarreo" value={form.origen_acarreo} onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                            <option value="no_se">No estoy seguro</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section__title">Datos de Destino</h2>

                        <Input label="Destino *" placeholder="Ciudad donde se entrega la mudanza" name="destino" autocomplete value={form.destino} onChange={handleChange} />
                        {errors.destino && <p className="form-error">{errors.destino}</p>}

                        <label className="input-group__label input-group__label--tooltip">
                            <span className="tooltip">
                                ⓘ
                                <span className="tooltip__content">
                                    Tipo de vivienda donde se entregará la mudanza
                                </span>
                            </span>
                            Tipo de vivienda de destino *
                        </label>

                        <select
                            name="vivienda_destino"
                            value={form.vivienda_destino}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="bodega">Bodega</option>
                            <option value="otro">Otro</option>
                        </select>

                        {form.vivienda_destino === "departamento" && (
                            <>
                                <Input
                                    label="Número de pisos"
                                    name="destino_pisos"
                                    type="number"
                                    value={form.destino_pisos}
                                    onChange={handleChange}
                                />

                                <label>¿El edificio cuenta con elevador? *</label>
                                <select name="destino_elevador" value={form.destino_elevador} onChange={handleChange}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="no_hay">No hay elevador</option>
                                    <option value="si_y_se_puede_usar">Sí hay y se puede usar para la mudanza</option>
                                    <option value="si_solo_algunos">Sí hay pero solo para algunos muebles</option>
                                    <option value="si_no_se_permite">Sí hay pero no se permite utilizar</option>
                                    <option value="no_lo_se">No lo sé</option>
                                </select>
                            </>
                        )}

                        <label className="input-group__label input-group__label--tooltip">
                            <span className="tooltip">
                                ⓘ
                                <span className="tooltip__content">
                                    Acarreo es cuando el camión no puede estacionarse cerca del acceso y se debe caminar más de 20 metros con los muebles.
                                </span>
                            </span>
                            ¿Considera que hay acarreo mayor a 20 metros en el destino? *
                        </label>

                        <select
                            name="destino_acarreo"
                            value={form.destino_acarreo}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                            <option value="no_se">No estoy seguro</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section__title">Detalles y contacto</h2>

                        <label htmlFor="inventario">
                            Artículos a transportar <span className="hint">(mínimo 10 caracteres)</span>
                        </label>
                        <SimpleEditor
                            value={form.inventario}
                            placeholder="Lista de muebles, cajas o mercancía, puedes pegar el inventario aqui."
                            onChange={(val) => setForm(prev => ({ ...prev, inventario: val }))}
                        />
                        {errors.inventario && <p className="form-error">{errors.inventario}</p>}

                        <label htmlFor="fecha_recoleccion">¿Cuándo necesitas la mudanza? *</label>
                        <select name="fecha_recoleccion" value={form.fecha_recoleccion} onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="1-7">1-7 días</option>
                            <option value="8-15">8-15 días</option>
                            <option value="15-30">15-30 días</option>
                            <option value="30+">Más de 30 días</option>
                            <option value="lo_antes_posible">Lo antes posible</option>
                        </select>

                        <label htmlFor="tipo_mudanza">
                            ¿Qué tipo de mudanza necesito? *
                        </label>
                        <select name="tipo_mudanza" value={form.tipo_mudanza} onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="compartida">Compartida</option>
                            <option value="exclusiva">Exclusiva</option>
                            <option value="asesoria">Requiero asesoría</option>
                        </select>

                        <Input label="Persona de contacto" name="nombre" value={form.nombre} onChange={handleChange} />
                        {errors.nombre && <p className="form-error">{errors.nombre}</p>}

                        <Input label="Correo electrónico de contacto *" name="email" type="email" value={form.email} onChange={handleChange} />
                        {errors.email && <p className="form-error">{errors.email}</p>}

                        <Input label="Teléfono de contacto *" name="telefono" value={form.telefono} onChange={handleChange} />
                        {errors.telefono && <p className="form-error">{errors.telefono}</p>}
                    </div>

                    <Button_success value={buttonText} type="submit" />

                    <p className="form-info">
                        Al enviar esta solicitud, aceptas nuestros <a href="/reglas" target="_blank" rel="noopener noreferrer">términos y condiciones</a>. Tus datos serán utilizados únicamente para gestionar tu solicitud de mudanza.
                    </p>
                </form>
            </div>

            {/* MODAL Resumen */}
            {resumeModal && (
                <BaseModal onClose={() => setResumeModal(false)}>
                    <div className="resumen-modal">

                        <div className="resumen-modal__header">
                            <h3>Protegemos tu solicitud</h3>
                        </div>

                        <p id="code_header">
                            Trabajamos únicamente con empresas verificadas para brindarte una experiencia más segura.
                        </p>

                        <div className="resumen-modal__body">
                            <ul>
                                <li><strong>Origen:</strong> {form.origen}</li>
                                <li><strong>Vivienda origen:</strong> {form.tipo_vivienda}</li>
                                <li><strong>Pisos origen:</strong> {form.origen_pisos || "—"}</li>
                                <li><strong>Elevador origen:</strong> {form.origen_elevador || "—"}</li>
                                <li><strong>Acarreo origen:</strong> {form.origen_acarreo || "—"}</li>

                                <li><strong>Destino:</strong> {form.destino}</li>
                                <li><strong>Vivienda destino:</strong> {form.vivienda_destino}</li>
                                <li><strong>Pisos destino:</strong> {form.destino_pisos || "—"}</li>
                                <li><strong>Elevador destino:</strong> {form.destino_elevador || "—"}</li>
                                <li><strong>Acarreo destino:</strong> {form.destino_acarreo || "—"}</li>
                                <li><strong>Inventario:</strong> {cleanInventario(form.inventario)}</li>

                                <li><strong>Fecha:</strong> {form.fecha_recoleccion}</li>
                                <li><strong>Tipo mudanza:</strong> {form.tipo_mudanza}</li>
                                <li><strong>Contacto:</strong> {form.nombre}</li>
                                <li><strong>Email:</strong> {form.email}</li>
                                <li><strong>Teléfono:</strong> {form.telefono}</li>
                            </ul>
                        </div>

                        <div className="resumen-modal__footer" id="footer_solicitudes">
                            <Button_success value="Confirmar" onClick={createSolicitud} />

                            <button className="btn-edit" onClick={() => setResumeModal(false)} >
                                Editar información
                            </button>
                        </div>

                        <p id="codigo_msg">
                            <img src="/icons/derechos.png" alt="Mensaje" />
                            No compartimos tu información públicamente y solo empresas verificadas podran contactarte.
                        </p>
                    </div>
                </BaseModal>
            )}

            {successModal && (
                <BaseModal
                    onClose={() => {
                        setSuccessModal(false);
                        router.push(`/seguros?id=${solicitudId}`);
                    }}
                >
                    <div className="success-modal">

                        <img
                            src="/icons/check_success.png"
                            alt="Solicitud publicada"
                            className="success-modal__icon"
                        />

                        <h2 className="success-modal__title">
                            ¡Tu solicitud está publicada!
                        </h2>

                        <p className="success-modal__subtitle">
                            Hemos notificado a empresas verificadas que pueden ayudarte con tu mudanza.
                        </p>

                        <div className="success-modal__info">

                            <img
                                src="/icons/check.png"
                                alt="Información"
                            />

                            <span>
                                En breve podrás recibir cotizaciones de empresas interesadas.
                            </span>

                        </div>

                        <div className="success-modal__steps">

                            <h3>
                                <img
                                    src="/icons/help.png"
                                    alt="¿Qué sigue?"
                                />

                                ¿Qué sigue?
                            </h3>

                            <ul>
                                <li>
                                    Empresas verificadas verán tu solicitud.
                                </li>

                                <li>
                                    Podrás comparar cotizaciones.
                                </li>

                                <li>
                                    Eliges la mejor opción para tu mudanza.
                                </li>
                            </ul>

                        </div>

                        <Button_success
                            value="Continuar"
                            onClick={() => {
                                setSuccessModal(false);
                                router.push(`/seguros?id=${solicitudId}`);
                            }}
                        />

                    </div>
                </BaseModal>
            )}

            {/* MODAL ERROR */}
            {errorModal && (
                <BaseModal onClose={() => setErrorModal("")}>
                    <div className="error-modal">
                        <h3>Error</h3>
                        <p>{errorModal}</p>
                        <Button_success
                            value="Cerrar"
                            onClick={() => setErrorModal("")}
                        />
                    </div>
                </BaseModal>
            )}
        </div>
    );
}