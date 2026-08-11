"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getExpedienteSeguroPublico, iniciarExpedienteSeguro, guardarPasoUnoSeguro, } from "@/services/seguro";
import "@/styles/pages/seguros/_continuar.scss";

export default function SeguroPublicoPage() {
    const params = useParams();
    const folio = params?.folio;

    /*
    |--------------------------------------------------------------------------
    | Estado principal
    |--------------------------------------------------------------------------
    */
    const [expediente, setExpediente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Paso actual
    |--------------------------------------------------------------------------
    */
    const [paso, setPaso] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | Paso 1
    |--------------------------------------------------------------------------
    */
    const [tipoSeguro, setTipoSeguro] = useState("");
    const [valorMenaje, setValorMenaje] = useState("");
    const [valorAutomovil, setValorAutomovil] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Paso 1 completado
    |--------------------------------------------------------------------------
    */
    const [pasoUnoGuardado, setPasoUnoGuardado] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Cargar expediente
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (!folio) {
            return;
        }

        cargarExpediente();
    }, [folio]);

    /*
    |--------------------------------------------------------------------------
    | Obtener expediente
    |--------------------------------------------------------------------------
    */
    async function cargarExpediente() {
        try {
            setLoading(true);
            setError("");
            const response = await getExpedienteSeguroPublico(folio);
            const data = response.data;
            setExpediente(data);

            /*
            |--------------------------------------------------------------------------
            | Si ya existe información del Paso 1, cargarla en el formulario.
            |--------------------------------------------------------------------------
            */
            if (data.tipo_seguro) {
                setTipoSeguro(data.tipo_seguro);
            }

            if (data.valor_menaje !== null && data.valor_menaje !== undefined) {
                setValorMenaje(String(data.valor_menaje));
            }

            if (data.valor_automovil !== null && data.valor_automovil !== undefined) {
                setValorAutomovil(String(data.valor_automovil));
            }

            /*
            |--------------------------------------------------------------------------
            | Determinar paso actual
            |--------------------------------------------------------------------------
            */
            if (data.progreso >= 33) {
                setPasoUnoGuardado(true);
                setPaso(2);
            } else {
                setPaso(1);
            }

        } catch (error) {
            console.error(error);

            setError(error.message || "No fue posible cargar tu expediente.");
        } finally {
            setLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Iniciar expediente
    |--------------------------------------------------------------------------
    */
    async function iniciar() {
        if (starting || !folio) {
            return;
        }

        try {
            setStarting(true);
            setError("");
            const response = await iniciarExpedienteSeguro(folio);

            setExpediente((prev) => ({
                ...prev,
                estado: response.data.estado,
                progreso: response.data.progreso,
                cliente_inicio_at: response.data.cliente_inicio_at,
            }));

        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible iniciar el expediente.");
        } finally {
            setStarting(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Cambiar tipo de seguro
    |--------------------------------------------------------------------------
    */
    function handleTipoSeguro(tipo) {
        setTipoSeguro(tipo);

        /*
        |--------------------------------------------------------------------------
        | Limpiar valores que ya no correspondan
        |--------------------------------------------------------------------------
        */
        if (tipo === "menaje") {
            setValorAutomovil("");
        }

        if (tipo === "automovil") {
            setValorMenaje("");
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Formatear valor monetario para mostrar
    |--------------------------------------------------------------------------
    */
    function formatearNumero(valor) {
        if (!valor) {
            return "";
        }

        const numero = Number(String(valor).replace(/,/g, ""));

        if (Number.isNaN(numero)) {
            return valor;
        }

        return numero.toLocaleString("es-MX", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Guardar Paso 1
    |--------------------------------------------------------------------------
    */
    async function guardarPasoUno() {
        if (saving) {
            return;
        }

        setError("");

        /*
        |--------------------------------------------------------------------------
        | Validar tipo
        |--------------------------------------------------------------------------
        */
        if (!tipoSeguro) {
            setError("Selecciona qué tipo de seguro deseas solicitar.");
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Convertir valores
        |--------------------------------------------------------------------------
        */
        const menaje = valorMenaje === "" ? null : Number(String(valorMenaje).replace(/,/g, ""));
        const automovil = valorAutomovil === "" ? null : Number(String(valorAutomovil).replace(/,/g, ""));

        /*
        |--------------------------------------------------------------------------
        | Validar valor del menaje
        |--------------------------------------------------------------------------
        */
        if ((tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") && (!menaje || menaje <= 0)) {
            setError("Indica el valor aproximado del menaje.");
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Validar valor del automóvil
        |--------------------------------------------------------------------------
        */
        if ((tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (!automovil || automovil <= 0)) {
            setError("Indica el valor aproximado del automóvil.");
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Guardar
        |--------------------------------------------------------------------------
        */
        try {
            setSaving(true);

            const response = await guardarPasoUnoSeguro(folio,
                {
                    tipo_seguro: tipoSeguro,
                    valor_menaje: menaje,
                    valor_automovil: automovil,
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Actualizar expediente
            |--------------------------------------------------------------------------
            */
            setExpediente((prev) => ({
                ...prev,
                estado: response.data.estado,
                progreso: response.data.progreso,
                tipo_seguro: response.data.tipo_seguro,
                valor_menaje: response.data.valor_menaje,
                valor_automovil: response.data.valor_automovil,
                prima_estimada: response.data.prima_estimada,
            }));

            setPasoUnoGuardado(true);

            /*
            |--------------------------------------------------------------------------
            | Todavía no avanzamos automáticamente al Paso 2.
            | El endpoint del Paso 2 todavía no existe. Por ahora dejamos registrado el Paso 1.
            |--------------------------------------------------------------------------
            */
            setPaso(1);

        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar la información.");
        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */
    if (loading) {
        return (
            <main className="seguro-publico">
                <section className="seguro-publico__loading">
                    <div className="loading-spinner" />
                    <p> Cargando tu expediente... </p>
                </section>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error inicial
    |--------------------------------------------------------------------------
    */
    if (error && !expediente) {
        return (
            <main className="seguro-publico">
                <section className="seguro-publico__error">
                    <div className="seguro-publico__icon">
                        !
                    </div>

                    <h1> No pudimos abrir tu expediente </h1>
                    <p> {error} </p>
                    <p> Verifica que el folio de tu expediente sea correcto. </p>
                </section>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Expediente cancelado
    |--------------------------------------------------------------------------
    */
    if (expediente?.estado === "cancelado") {
        return (
            <main className="seguro-publico">
                <section className="seguro-publico__card">
                    <div className="seguro-publico__error-icon">
                        !
                    </div>

                    <h1> Expediente cancelado </h1>

                    <p> Este expediente ya no está disponible. </p>

                    <div className="seguro-publico__folio">
                        <span> Folio </span>
                        <strong> {expediente.folio} </strong>
                    </div>
                </section>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Expediente completado
    |--------------------------------------------------------------------------
    */
    if (expediente?.estado === "completado") {
        return (
            <main className="seguro-publico">
                <section className="seguro-publico__card">
                    <div className="seguro-publico__success-icon">
                        ✓
                    </div>

                    <h1> Expediente completado </h1>

                    <p> Tu expediente de seguro ya fue completado. </p>

                    <div className="seguro-publico__folio">
                        <span> Folio </span>
                        <strong> {expediente.folio} </strong>
                    </div>
                </section>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Expediente todavía no iniciado
    |--------------------------------------------------------------------------
    */
    if (expediente?.estado === "nuevo" || expediente?.estado === "correo_programado") {
        return (
            <main className="seguro-publico">
                <section className="seguro-publico__card">
                    <div className="seguro-publico__brand">
                        <img src="/logo/logo_A.png" alt="Mudanza Fácil" />
                    </div>

                    <span className="seguro-publico__eyebrow">
                        Expediente de seguro
                    </span>

                    <h1> Completa tu expediente </h1>

                    <p className="seguro-publico__intro">
                        Hola{" "} <strong> {expediente?.nombre} </strong>.
                    </p>

                    <p>
                        Hemos recibido tu solicitud de información   sobre seguro para tu mudanza.
                    </p>

                    <div className="seguro-publico__folio">
                        <span> Folio </span>
                        <strong> {expediente?.folio} </strong>
                    </div>

                    <div className="seguro-publico__summary">
                        <div>
                            <span> Origen </span>
                            <strong> {expediente?.origen || "Pendiente"} </strong>
                        </div>

                        <div>
                            <span> Destino </span>
                            <strong> {expediente?.destino || "Pendiente"} </strong>
                        </div>
                    </div>

                    {
                        expediente?.inventario && (
                            <div className="seguro-publico__inventory">
                                <span> Artículos a asegurar </span>
                                <p> {expediente.inventario} </p>
                            </div>
                        )
                    }

                    <div className="seguro-publico__notice">
                        <strong> ¿Qué sigue? </strong>
                        <p>
                            Te haremos algunas preguntas para completar la información necesaria para tu solicitud de seguro.
                        </p>
                    </div>

                    {
                        error && (
                            <div className="seguro-publico__inline-error">
                                {error}
                            </div>
                        )
                    }

                    <button className="seguro-publico__button" onClick={iniciar} disabled={starting} >
                        {
                            starting ? "Preparando expediente..." : "Comenzar expediente"
                        }
                    </button>

                    <p className="seguro-publico__privacy">
                        Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                    </p>
                </section>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Expediente en captura
    |--------------------------------------------------------------------------
    */
    return (
        <main className="seguro-publico">
            <section className="seguro-publico__card seguro-publico__card--form">
                <div className="seguro-publico__brand">
                    <img src="/logo/logo_A.png" alt="Mudanza Fácil" />
                </div>

                <div className="seguro-publico__top">
                    <div>
                        <span className="seguro-publico__eyebrow">
                            Expediente de seguro
                        </span>

                        <h1> Completa tu expediente </h1>
                    </div>

                    <div className="seguro-publico__folio seguro-publico__folio--small">
                        <span> Folio </span>
                        <strong> {expediente?.folio} </strong>
                    </div>
                </div>

                <div className="seguro-publico__progress">
                    <div className="seguro-publico__progress-header">
                        <span> Paso {paso} de 3 </span>
                        <strong> {expediente?.progreso || 0}% </strong>
                    </div>

                    <div className="seguro-publico__progress-bar">
                        <div className="seguro-publico__progress-fill" style={{ width: `${expediente?.progreso || 0}%`, }} />
                    </div>
                </div>

                {
                    paso === 1 && (
                        <section className="seguro-publico__step">
                            <div className="seguro-publico__step-heading">
                                <span> Paso 1 </span>
                                <h2> ¿Qué deseas asegurar? </h2>
                                <p> Selecciona el tipo de protección que necesitas para tu mudanza. </p>
                            </div>

                            <div className="seguro-publico__insurance-options">
                                <button
                                    type="button"
                                    className={`insurance-option ${tipoSeguro === "menaje" ? "is-selected" : ""}`}
                                    onClick={() => handleTipoSeguro("menaje")}
                                >

                                    <div className="insurance-option__radio">
                                        <span />
                                    </div>

                                    <div className="insurance-option__content">
                                        <strong> Menaje </strong>
                                        <p> Protege los artículos y bienes de tu mudanza. </p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`insurance-option ${tipoSeguro === "menaje_auto" ? "is-selected" : ""}`}
                                    onClick={() => handleTipoSeguro("menaje_auto")}
                                >

                                    <div className="insurance-option__radio">
                                        <span />
                                    </div>

                                    <div className="insurance-option__content">
                                        <strong>  Menaje + Automóvil </strong>
                                        <p>  Protege tus artículos y un automóvil. </p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`insurance-option ${tipoSeguro === "automovil" ? "is-selected" : ""}`}
                                    onClick={() => handleTipoSeguro("automovil")}
                                >

                                    <div className="insurance-option__radio">
                                        <span />
                                    </div>

                                    <div className="insurance-option__content">
                                        <strong> Automóvil </strong>
                                        <p> Protección para el automóvil transportado. </p>
                                    </div>
                                </button>
                            </div>

                            {
                                (tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") && (
                                    <div className="seguro-publico__field">
                                        <label htmlFor="valor_menaje">
                                            Valor aproximado del menaje
                                        </label>

                                        <div className="money-input">
                                            <span> $ </span>

                                            <input
                                                id="valor_menaje"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                inputMode="decimal"
                                                placeholder="Ej. 250000"
                                                value={valorMenaje}
                                                onChange={(e) => setValorMenaje(e.target.value)}
                                            />

                                            <small> MXN </small>
                                        </div>

                                        <p className="field-help">
                                            Indica el valor aproximado de los artículos que deseas proteger.
                                        </p>
                                    </div>
                                )
                            }

                            {
                                (tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (
                                    <div className="seguro-publico__field">
                                        <label htmlFor="valor_automovil">
                                            Valor aproximado del automóvil
                                        </label>

                                        <div className="money-input">
                                            <span> $ </span>

                                            <input
                                                id="valor_automovil"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                inputMode="decimal"
                                                placeholder="Ej. 350000"
                                                value={valorAutomovil}
                                                onChange={(e) => setValorAutomovil(e.target.value)}
                                            />

                                            <small> MXN </small>
                                        </div>

                                        <p className="field-help">
                                            Indica el valor aproximado del automóvil que deseas proteger.
                                        </p>
                                    </div>
                                )
                            }

                            {
                                error && (
                                    <div className="seguro-publico__inline-error">
                                        {error}
                                    </div>
                                )
                            }

                            {
                                pasoUnoGuardado && (
                                    <div className="seguro-publico__saved">
                                        <span> ✓ </span>

                                        <div>
                                            <strong>Información guardada</strong>
                                            <p>Los datos del Paso 1 fueron registrados correctamente.</p>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="seguro-publico__actions">
                                <button type="button" className="seguro-publico__button" onClick={guardarPasoUno} disabled={saving} >
                                    {
                                        saving ? "Guardando..." : pasoUnoGuardado ? "Actualizar información" : "Continuar"
                                    }
                                </button>
                            </div>

                            <p className="seguro-publico__privacy">
                                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
                            </p>
                        </section>
                    )
                }
            </section>
        </main>
    );
}