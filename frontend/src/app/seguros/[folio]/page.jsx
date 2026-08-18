"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    getExpedienteSeguroPublico,
    iniciarExpedienteSeguro,
    guardarPasoUnoSeguro,
    guardarPasoDosSeguro,
    guardarPasoTresSeguro,
    generarEnlaceEmpresaSeguro,
} from "@/services/seguro";

import SeguroStepUno from "../components/SeguroStepUno";
import SeguroStepDos from "../components/SeguroStepDos";
import SeguroStepTres from "../components/SeguroStepTres";
import "@/styles/pages/seguros/_continuar.scss";

export default function SeguroPublicoPage() {
    const params = useParams();
    const folio = params?.folio;
    const [expediente, setExpediente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [paso, setPaso] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | Paso 1
    |--------------------------------------------------------------------------
    */
    const [tipoSeguro, setTipoSeguro] = useState("");
    const [valorMenaje, setValorMenaje] = useState("");
    const [valorAutomovil, setValorAutomovil] = useState("");
    const [pasoUnoGuardado, setPasoUnoGuardado] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Paso 2
    |--------------------------------------------------------------------------
    */
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [pasoDosGuardado, setPasoDosGuardado] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Paso 3
    |--------------------------------------------------------------------------
    */
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
    const [pasoTresGuardado, setPasoTresGuardado] = useState(false);
    const [enlaceEmpresa, setEnlaceEmpresa] = useState("");
    const [generandoEnlaceEmpresa, setGenerandoEnlaceEmpresa] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Generar enlace privado para empresa
    |--------------------------------------------------------------------------
    */
    async function generarEnlaceEmpresa() {
        if (generandoEnlaceEmpresa || !folio) {
            return;
        }

        try {
            setGenerandoEnlaceEmpresa(true);
            setError("");
            const response = await generarEnlaceEmpresaSeguro(folio);
            setEnlaceEmpresa(response.data.url);
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible generar el enlace para la empresa.");
        } finally {
            setGenerandoEnlaceEmpresa(false);
        }
    }

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
            | Cargar Paso 1
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
            | Cargar Paso 2
            |--------------------------------------------------------------------------
            */
            if (data.nombre) {
                setNombre(data.nombre);
            }

            if (data.email) {
                setEmail(data.email);
            }

            if (data.telefono) {
                setTelefono(data.telefono);
            }

            /*
            |--------------------------------------------------------------------------
            | Cargar Paso 3
            |--------------------------------------------------------------------------
            */
            if (data.empresa_mudanza) {
                setEmpresaMudanza(data.empresa_mudanza);
            }

            if (data.origen) {
                setOrigen(data.origen);
            }

            if (data.destino) {
                setDestino(data.destino);
            }

            if (data.fecha_salida) {
                setFechaSalida(String(data.fecha_salida).substring(0, 10));
            }

            if (data.fecha_llegada) {
                setFechaLlegada(String(data.fecha_llegada).substring(0, 10));
            }

            if (data.propietario_unidad) {
                setPropietarioUnidad(data.propietario_unidad);
            }

            if (data.marca_unidad) {
                setMarcaUnidad(data.marca_unidad);
            }

            if (data.modelo_unidad) {
                setModeloUnidad(data.modelo_unidad);
            }

            if (data.placas) {
                setPlacas(data.placas);
            }

            if (data.chofer) {
                setChofer(data.chofer);
            }

            /*
            |--------------------------------------------------------------------------
            | Determinar paso actual
            |--------------------------------------------------------------------------
            */
            if (data.progreso >= 100) {
                setPasoUnoGuardado(true);
                setPasoDosGuardado(true);
                setPasoTresGuardado(true);
                setPaso(3);
            } else if (data.progreso >= 66) {
                setPasoUnoGuardado(true);
                setPasoDosGuardado(true);
                setPaso(3);
            } else if (data.progreso >= 33) {
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

        if (tipo === "menaje") {
            setValorAutomovil("");
        }

        if (tipo === "automovil") {
            setValorMenaje("");
        }
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

        if (!tipoSeguro) {
            setError("Selecciona qué tipo de seguro deseas solicitar.");
            return;
        }

        const menaje = valorMenaje === "" ? null : Number(String(valorMenaje).replace(/,/g, ""));
        const automovil = valorAutomovil === "" ? null : Number(String(valorAutomovil).replace(/,/g, ""));

        if ((tipoSeguro === "menaje" || tipoSeguro === "menaje_auto") && (!menaje || menaje <= 0)) {
            setError("Indica el valor aproximado del menaje.");
            return;
        }

        if ((tipoSeguro === "automovil" || tipoSeguro === "menaje_auto") && (!automovil || automovil <= 0)) {
            setError("Indica el valor aproximado del automóvil.");
            return;
        }

        try {
            setSaving(true);
            const response = await guardarPasoUnoSeguro(folio,
                {
                    tipo_seguro: tipoSeguro,
                    valor_menaje: menaje,
                    valor_automovil: automovil,
                }
            );

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
            setPaso(2);

        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar la información.");
        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Guardar Paso 2
    |--------------------------------------------------------------------------
    */
    async function guardarPasoDos() {
        if (saving) {
            return;
        }

        setError("");

        if (!nombre.trim()) {
            setError("Ingresa tu nombre completo.");
            return;
        }

        if (!email.trim()) {
            setError("Ingresa tu correo electrónico.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            setError("Ingresa un correo electrónico válido.");
            return;
        }

        if (!telefono.trim()) {
            setError("Ingresa tu teléfono de contacto.");
            return;
        }

        try {
            setSaving(true);

            const response = await guardarPasoDosSeguro(
                folio, {
                nombre: nombre.trim(),
                email: email.trim(),
                telefono: telefono.trim(),
            }
            );

            setExpediente((prev) => ({
                ...prev,
                estado: response.data.estado,
                progreso: response.data.progreso,
                nombre: response.data.nombre,
                email: response.data.email,
                telefono: response.data.telefono,
            }));

            setPasoDosGuardado(true);
            setPaso(3);
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar los datos del cliente.");
        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Guardar Paso 3
    |--------------------------------------------------------------------------
    */
    async function guardarPasoTres() {
        if (saving) {
            return;
        }

        setError("");

        if (!empresaMudanza.trim()) {
            setError("Ingresa el nombre de la empresa de mudanza.");
            return;
        }

        if (!origen.trim()) {
            setError("Ingresa el origen de la mudanza.");
            return;
        }

        if (!destino.trim()) {
            setError("Ingresa el destino de la mudanza.");
            return;
        }

        if (!fechaSalida) {
            setError("Selecciona la fecha de salida.");
            return;
        }

        if (!fechaLlegada) {
            setError("Selecciona la fecha de llegada.");
            return;
        }

        if (fechaLlegada < fechaSalida) {
            setError("La fecha de llegada debe ser igual o posterior a la fecha de salida.");
            return;
        }

        if (!propietarioUnidad.trim()) {
            setError("Ingresa el propietario de la unidad.");
            return;
        }

        if (!marcaUnidad.trim()) {
            setError("Ingresa la marca de la unidad.");
            return;
        }

        if (!modeloUnidad.trim()) {
            setError("Ingresa el modelo de la unidad.");
            return;
        }

        if (!placas.trim()) {
            setError("Ingresa las placas de la unidad.");
            return;
        }

        if (!chofer.trim()) {
            setError("Ingresa el nombre del chofer.");
            return;
        }

        try {
            setSaving(true);

            const response = await guardarPasoTresSeguro(
                folio,
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

            setExpediente((prev) => ({
                ...prev,
                estado: response.data.estado,
                progreso: response.data.progreso,
                empresa_mudanza: response.data.empresa_mudanza,
                origen: response.data.origen,
                destino: response.data.destino,
                fecha_salida: response.data.fecha_salida,
                fecha_llegada: response.data.fecha_llegada,
                propietario_unidad: response.data.propietario_unidad,
                marca_unidad: response.data.marca_unidad,
                modelo_unidad: response.data.modelo_unidad,
                placas: response.data.placas,
                chofer: response.data.chofer,
            }));

            setPasoTresGuardado(true);
            setPaso(3);
        } catch (error) {
            console.error(error);

            setError(
                error.message || "No fue posible guardar la información de la mudanza."
            );

        } finally {
            setSaving(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Formatear moneda
    |--------------------------------------------------------------------------
    */
    function formatearMoneda(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return "$0.00";
        }

        const numero = Number(String(valor).replace(/,/g, ""));

        if (Number.isNaN(numero)) {
            return "$0.00";
        }

        return numero.toLocaleString(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );
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

                    <p> Hemos recibido tu solicitud de información sobre seguro para tu mudanza. </p>

                    <div className="seguro-publico__folio">
                        <span> Folio </span>
                        <strong> {expediente?.folio} </strong>
                    </div>

                    <div className="seguro-publico__summary">
                        <div>
                            <span>
                                Origen
                            </span>

                            <strong>
                                {expediente?.origen || "Pendiente"}
                            </strong>
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
                        <p> Te haremos algunas preguntas para completar la información necesaria para tu solicitud de seguro. </p>
                    </div>

                    {
                        error && (<div className="seguro-publico__inline-error"> {error}  </div>)
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
                        <h1>  Completa tu expediente </h1>
                    </div>

                    <div className="seguro-publico__folio seguro-publico__folio--small">
                        <span> Folio </span>
                        <strong> {expediente?.folio} </strong>
                    </div>
                </div>

                <div className="seguro-publico__progress">
                    <div className="seguro-publico__progress-header">
                        <span>  Paso {paso} de 4 </span>
                        <strong> {expediente?.progreso || 0}% </strong>
                    </div>

                    <div className="seguro-publico__progress-bar">
                        <div className="seguro-publico__progress-fill" style={{ width: `${expediente?.progreso || 0}%`, }} />
                    </div>
                </div>

                {
                    paso === 1 && (
                        <SeguroStepUno
                            tipoSeguro={tipoSeguro}
                            valorMenaje={valorMenaje}
                            valorAutomovil={valorAutomovil}
                            pasoUnoGuardado={pasoUnoGuardado}
                            expediente={expediente}
                            error={error}
                            saving={saving}
                            onTipoSeguroChange={handleTipoSeguro}
                            onValorMenajeChange={setValorMenaje}
                            onValorAutomovilChange={setValorAutomovil}
                            onGuardar={guardarPasoUno}
                            formatearMoneda={formatearMoneda}
                        />
                    )
                }

                {
                    paso === 2 && (
                        <SeguroStepDos
                            nombre={nombre}
                            email={email}
                            telefono={telefono}
                            pasoDosGuardado={pasoDosGuardado}
                            error={error}
                            saving={saving}
                            onNombreChange={setNombre}
                            onEmailChange={setEmail}
                            onTelefonoChange={setTelefono}
                            onGuardar={guardarPasoDos}
                            onAnterior={() => {
                                setError("");
                                setPaso(1);
                            }}
                        />
                    )
                }

                {
                    paso === 3 && (
                        <SeguroStepTres
                            empresaMudanza={empresaMudanza}
                            origen={origen}
                            destino={destino}
                            fechaSalida={fechaSalida}
                            fechaLlegada={fechaLlegada}
                            propietarioUnidad={propietarioUnidad}
                            marcaUnidad={marcaUnidad}
                            modeloUnidad={modeloUnidad}
                            placas={placas}
                            chofer={chofer}
                            error={error}
                            saving={saving}
                            pasoTresGuardado={pasoTresGuardado}
                            onEmpresaMudanzaChange={setEmpresaMudanza}
                            onOrigenChange={setOrigen}
                            onDestinoChange={setDestino}
                            onFechaSalidaChange={setFechaSalida}
                            onFechaLlegadaChange={setFechaLlegada}
                            onPropietarioUnidadChange={setPropietarioUnidad}
                            onMarcaUnidadChange={setMarcaUnidad}
                            onModeloUnidadChange={setModeloUnidad}
                            onPlacasChange={setPlacas}
                            onChoferChange={setChofer}
                            onGenerarEnlaceEmpresa={generarEnlaceEmpresa}
                            generandoEnlaceEmpresa={generandoEnlaceEmpresa}
                            enlaceEmpresa={enlaceEmpresa}
                            onGuardar={guardarPasoTres}
                            onAnterior={() => { setError(""); setPaso(2); }}
                        />
                    )
                }

                <div className="seguro-publico__help">
                    <div className="seguro-publico__help-icon">
                        <img src="/icons/help.png" alt="Ayuda" />
                    </div>

                    <div className="seguro-publico__help-content">
                        <h3> ¿Necesitas ayuda? </h3>

                        <p> Contáctanos por Whatsapp y con gusto te ayudamos </p>

                        <a href="https://wa.me/524421896433" target="_blank" rel="noopener noreferrer" >
                            Contáctanos
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}