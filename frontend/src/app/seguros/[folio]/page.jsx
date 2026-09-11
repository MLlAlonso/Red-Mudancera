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
    finalizarExpedienteSeguro,
} from "@/services/seguro";

import SeguroStepUno from "../components/SeguroStepUno";
import SeguroStepDos from "../components/SeguroStepDos";
import SeguroStepTres from "../components/SeguroStepTres";
import SeguroStep4 from "../components/SeguroStep4";
import SeguroExpedienteCompletado from "../components/SeguroExpedienteCompletado";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
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
    const [automovilMarca, setAutomovilMarca] = useState("");
    const [automovilModelo, setAutomovilModelo] = useState("");
    const [automovilNumeroSerie, setAutomovilNumeroSerie] = useState("");
    const [automovilFotoCirculacionUrl, setAutomovilFotoCirculacionUrl] = useState("");
    const [automovilFotoCirculacionPublicId, setAutomovilFotoCirculacionPublicId] = useState("");
    const [automovilFotoFile, setAutomovilFotoFile] = useState(null);
    const [uploadingAutomovilFoto, setUploadingAutomovilFoto] = useState(false);
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
    const [modalidadDatos, setModalidadDatos] = useState("");
    const [asistenciaEmpresaMudanza, setAsistenciaEmpresaMudanza] = useState("");
    const [asistenciaContacto, setAsistenciaContacto] = useState("");
    const [asistenciaTelefono, setAsistenciaTelefono] = useState("");
    const [pasoTresGuardado, setPasoTresGuardado] = useState(false);
    const [enlaceEmpresa, setEnlaceEmpresa] = useState("");
    const [generandoEnlaceEmpresa, setGenerandoEnlaceEmpresa] = useState(false);
    const [vistaPasoTres, setVistaPasoTres] = useState("seleccion");

    /*
    |--------------------------------------------------------------------------
    | Paso 4
    |--------------------------------------------------------------------------
    */
    const [finalizando, setFinalizando] = useState(false);
    const [showFinalizarModal, setShowFinalizarModal] = useState(false);

    const datosEmpresaCompletos =
        Boolean(expediente?.empresa_mudanza?.trim()) &&
        Boolean(expediente?.origen?.trim()) &&
        Boolean(expediente?.destino?.trim()) &&
        Boolean(expediente?.fecha_salida) &&
        Boolean(expediente?.fecha_llegada) &&
        Boolean(expediente?.propietario_unidad?.trim()) &&
        Boolean(expediente?.marca_unidad?.trim()) &&
        Boolean(expediente?.modelo_unidad?.trim()) &&
        Boolean(expediente?.placas?.trim()) &&
        Boolean(expediente?.chofer?.trim());

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

    useEffect(() => {
        if (!folio || paso !== 4) {
            return;
        }

        cargarExpediente();
    }, [folio, paso]);

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

            if (data.automovil_marca !== null && data.automovil_marca !== undefined) {
                setAutomovilMarca(String(data.automovil_marca));
            }

            if (data.automovil_modelo !== null && data.automovil_modelo !== undefined) {
                setAutomovilModelo(String(data.automovil_modelo));
            }

            if (data.automovil_numero_serie !== null && data.automovil_numero_serie !== undefined) {
                setAutomovilNumeroSerie(String(data.automovil_numero_serie));
            }

            if (data.automovil_foto_circulacion_url !== null && data.automovil_foto_circulacion_url !== undefined) {
                setAutomovilFotoCirculacionUrl(String(data.automovil_foto_circulacion_url));
            }

            if (data.automovil_foto_circulacion_public_id !== null && data.automovil_foto_circulacion_public_id !== undefined) {
                setAutomovilFotoCirculacionPublicId(String(data.automovil_foto_circulacion_public_id));
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

            if (data.modalidad_datos) {
                setModalidadDatos(data.modalidad_datos);
            }

            if (data.asistencia_empresa_mudanza) {
                setAsistenciaEmpresaMudanza(data.asistencia_empresa_mudanza);
            }

            if (data.asistencia_contacto) {
                setAsistenciaContacto(data.asistencia_contacto);
            }

            if (data.asistencia_telefono) {
                setAsistenciaTelefono(data.asistencia_telefono);
            }

            if (!data.modalidad_datos) {
                setVistaPasoTres("seleccion");
            }

            if (data.modalidad_datos === "autogestion") {
                if (data.empresa_datos_finalizados_at) {
                    setVistaPasoTres("seleccion");
                    setPaso(4);
                } else {
                    setVistaPasoTres("esperando_empresa");
                }
            }

            if (data.modalidad_datos === "asistida") {
                if (data.empresa_datos_finalizados_at) {
                    setVistaPasoTres("seleccion");
                    setPaso(4);
                } else if (
                    data.asistencia_empresa_mudanza &&
                    data.asistencia_contacto &&
                    data.asistencia_telefono
                ) {
                    setVistaPasoTres("esperando_asistida");
                } else {
                    setVistaPasoTres("asistida");
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Determinar paso actual
            |--------------------------------------------------------------------------
            */
            if (data.estado === "completado") {
                setPasoUnoGuardado(true);
                setPasoDosGuardado(true);
                setPasoTresGuardado(true);
                setPaso(4);
            } else if (
                data.empresa_datos_finalizados_at &&
                data.progreso >= 100
            ) {
                setPasoUnoGuardado(true);
                setPasoDosGuardado(true);
                setPasoTresGuardado(true);
                setPaso(4);
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
    | Refrescar expediente
    |--------------------------------------------------------------------------
    */
    async function refrescarExpediente() {
        if (!folio) {
            return;
        }

        try {
            const response = await getExpedienteSeguroPublico(folio);
            const data = response.data;

            setExpediente(data);

            if (data.empresa_mudanza !== undefined) {
                setEmpresaMudanza(data.empresa_mudanza || "");
            }

            if (data.modalidad_datos !== undefined) {
                setModalidadDatos(data.modalidad_datos || "");
            }

            if (data.asistencia_empresa_mudanza !== undefined) {
                setAsistenciaEmpresaMudanza(
                    data.asistencia_empresa_mudanza || ""
                );
            }

            if (data.asistencia_contacto !== undefined) {
                setAsistenciaContacto(
                    data.asistencia_contacto || ""
                );
            }

            if (data.asistencia_telefono !== undefined) {
                setAsistenciaTelefono(
                    data.asistencia_telefono || ""
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Verificar si la empresa ya finalizó los datos
            |--------------------------------------------------------------------------
            */
            if (data.empresa_datos_finalizados_at) {
                setPaso(4);
                setVistaPasoTres("seleccion");
                setPasoTresGuardado(true);
            }
        } catch (error) {
            console.error( "No fue posible refrescar el expediente:", error );
        }
    }

    useEffect(() => {
        if (!folio || paso !== 4) {
            return;
        }

        refrescarExpediente();
    }, [folio, paso]);

    useEffect(() => {
        if (!folio) {
            return;
        }

        function handleVisibilityChange() {
            if (document.visibilityState === "visible" && paso === 4) {
                refrescarExpediente();
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [folio, paso]);

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
            setAutomovilMarca("");
            setAutomovilModelo("");
            setAutomovilNumeroSerie("");
            setAutomovilFotoCirculacionUrl("");
            setAutomovilFotoCirculacionPublicId("");
            setAutomovilFotoFile(null);
        }

        if (tipo === "automovil") {
            setValorMenaje("");
        }
    }

    function handleAutomovilFotoChange(file) {
        setError("");

        if (!file) {
            setAutomovilFotoFile(null);
            return;
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp",];

        if (!allowedTypes.includes(file.type)) {
            setAutomovilFotoFile(null);
            setError("Formato no permitido. Solo se permiten imágenes JPG, PNG o WEBP.");
            return;
        }

        setAutomovilFotoFile(file);
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

        const incluyeAutomovil = tipoSeguro === "automovil" || tipoSeguro === "menaje_auto";

        /*
        |--------------------------------------------------------------------------
        | Validar datos del automóvil
        |--------------------------------------------------------------------------
        */
        if (incluyeAutomovil) {
            if (!automovilMarca.trim()) {
                setError("Ingresa la marca del automóvil.");
                return;
            }

            if (!automovilModelo.trim()) {
                setError("Ingresa el modelo del automóvil.");
                return;
            }
        }

        try {
            setSaving(true);
            let fotoCirculacionUrl = automovilFotoCirculacionUrl || null;
            let fotoCirculacionPublicId = automovilFotoCirculacionPublicId || null;

            /*
            |--------------------------------------------------------------------------
            | Subir fotografía a Cloudinary
            |--------------------------------------------------------------------------
            */
            if (incluyeAutomovil && automovilFotoFile) {
                setUploadingAutomovilFoto(true);
                const uploaded = await uploadToCloudinary(automovilFotoFile);
                fotoCirculacionUrl = uploaded.url;
                fotoCirculacionPublicId = uploaded.public_id;
                setAutomovilFotoCirculacionUrl(uploaded.url);
                setAutomovilFotoCirculacionPublicId(uploaded.public_id);
                setAutomovilFotoFile(null);
                setUploadingAutomovilFoto(false);
            }

            /*
            |--------------------------------------------------------------------------
            | Guardar Paso 1
            |--------------------------------------------------------------------------
            */
            const response = await guardarPasoUnoSeguro(
                folio,
                {
                    tipo_seguro: tipoSeguro,
                    valor_menaje: menaje,
                    valor_automovil: automovil,
                    automovil_marca: incluyeAutomovil ? automovilMarca.trim() : null,
                    automovil_modelo: incluyeAutomovil ? automovilModelo.trim() : null,
                    automovil_numero_serie: incluyeAutomovil ? automovilNumeroSerie.trim() : null,
                    automovil_foto_circulacion_url: incluyeAutomovil ? fotoCirculacionUrl : null,
                    automovil_foto_circulacion_public_id: incluyeAutomovil ? fotoCirculacionPublicId : null,
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Actualizar expediente local
            |--------------------------------------------------------------------------
            */
            setExpediente((prev) => ({
                ...prev,
                estado: response.data.estado,
                progreso: response.data.progreso,
                tipo_seguro: response.data.tipo_seguro,
                valor_menaje: response.data.valor_menaje,
                valor_automovil: response.data.valor_automovil,
                automovil_marca: response.data.automovil_marca,
                automovil_modelo: response.data.automovil_modelo,
                automovil_numero_serie: response.data.automovil_numero_serie,
                automovil_foto_circulacion_url: response.data.automovil_foto_circulacion_url,
                automovil_foto_circulacion_public_id: response.data.automovil_foto_circulacion_public_id,
                prima_estimada: response.data.prima_estimada,
            }));

            /*
            |--------------------------------------------------------------------------
            | Mantener flujo existente
            |--------------------------------------------------------------------------
            */
            setPasoUnoGuardado(true);
            setPaso(2);
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar la información.");
        } finally {
            setUploadingAutomovilFoto(false);
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
            setError("Ingresa tu nombre completo y apellidos para continuar.");
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
            const response = await guardarPasoDosSeguro(folio, { nombre: nombre.trim(), email: email.trim(), telefono: telefono.trim(), });

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
    function solicitarFinalizacion() {
        if (finalizando) {
            return;
        }

        if (!datosEmpresaCompletos) {
            setError("No puedes finalizar el expediente hasta que la empresa de mudanza complete todos los datos requeridos.");
            return;
        }

        setError("");
        setShowFinalizarModal(true);
    }

    async function finalizarExpediente() {
        if (finalizando) {
            return;
        }

        try {
            setFinalizando(true);
            setShowFinalizarModal(false);
            setError("");
            const response = await finalizarExpedienteSeguro(folio);
            const data = response.data;
            setExpediente((prev) => ({ ...prev, ...data, }));
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible finalizar tu expediente.");
        } finally {
            setFinalizando(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Seleccionar modalidad de Paso 3
    |--------------------------------------------------------------------------
    */
    async function seleccionarModalidad(valor) {
        if (saving) {
            return;
        }

        setError("");
        setModalidadDatos(valor);

        if (valor === "autogestion") {
            setAsistenciaEmpresaMudanza("");
            setAsistenciaContacto("");
            setAsistenciaTelefono("");

            try {
                setSaving(true);

                const response = await guardarPasoTresSeguro(
                    folio,
                    {
                        modalidad_datos: "autogestion",
                        asistencia_empresa_mudanza: null,
                        asistencia_contacto: null,
                        asistencia_telefono: null,
                    }
                );

                setExpediente((prev) => ({
                    ...prev,
                    ...response.data,
                }));

                await generarEnlaceEmpresa();
                setVistaPasoTres("empresa");
            } catch (error) {
                console.error(error);
                setError(error.message || "No fue posible preparar el enlace para tu empresa.");
            } finally {
                setSaving(false);
            }

            return;
        }

        if (valor === "asistida") {
            setVistaPasoTres("asistida");
        }
    }

    async function continuarEmpresa() {
        if (!enlaceEmpresa) {
            setError("Primero genera el enlace privado para tu empresa.");
            return;
        }

        setError("");
        setVistaPasoTres("esperando_empresa");
    }

    function continuarAsistida() {
        setError("");
        setVistaPasoTres("asistida_contacto");
    }

    async function guardarAsistenciaYContinuar() {
        if (saving) {
            return;
        }

        setError("");

        if (!asistenciaEmpresaMudanza.trim()) {
            setError("Ingresa el nombre de la empresa de mudanza.");
            return;
        }

        if (!asistenciaContacto.trim()) {
            setError("Ingresa el nombre del contacto.");
            return;
        }

        if (!asistenciaTelefono.trim()) {
            setError("Ingresa el teléfono o WhatsApp de contacto.");
            return;
        }

        try {
            setSaving(true);

            const response = await guardarPasoTresSeguro(
                folio,
                {
                    modalidad_datos: "asistida",
                    asistencia_empresa_mudanza: asistenciaEmpresaMudanza.trim(),
                    asistencia_contacto: asistenciaContacto.trim(),
                    asistencia_telefono: asistenciaTelefono.trim(),
                }
            );

            setExpediente((prev) => ({
                ...prev,
                ...response.data,
            }));

            setModalidadDatos("asistida");
            setAsistenciaEmpresaMudanza(response.data.asistencia_empresa_mudanza || "");
            setAsistenciaContacto(response.data.asistencia_contacto || "");
            setAsistenciaTelefono(response.data.asistencia_telefono || "");
            setPasoTresGuardado(true);
            setVistaPasoTres("esperando_asistida");
        } catch (error) {
            console.error(error);
            setError(error.message || "No fue posible guardar los datos de contacto.");
        } finally {
            setSaving(false);
        }
    }

    function volverSeleccionPasoTres() {
        setError("");
        setVistaPasoTres("seleccion");
    }

    function volverPasoDos() {
        setError("");
        setPaso(2);
    }

    useEffect(() => {
        if (!folio || paso !== 3) {
            return;
        }

        if (vistaPasoTres !== "esperando_empresa" && vistaPasoTres !== "esperando_asistida") {
            return;
        }

        const intervalo = setInterval(async () => {
            try {
                const response = await getExpedienteSeguroPublico(folio);
                const data = response.data;
                setExpediente(data);

                if (data.empresa_datos_finalizados_at) {
                    setPaso(4);
                    return;
                }

                if (data.modalidad_datos === "autogestion") {
                    setVistaPasoTres("esperando_empresa");
                }

                if (data.modalidad_datos === "asistida") {
                    setVistaPasoTres("esperando_asistida");
                }
            } catch (error) {
                console.error("No fue posible verificar el estado del expediente:", error);
            }
        }, 5000);

        return () => {
            clearInterval(intervalo);
        };
    }, [folio, paso, vistaPasoTres]);

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

    if (expediente?.estado === "completado") {
        return (
            <SeguroExpedienteCompletado
                expediente={expediente}
                formatearMoneda={formatearMoneda}
            />
        );
    }

    const datosRevision = {
        nombre,
        email,
        telefono,
        tipoSeguro,
        valorMenaje,
        valorAutomovil,
        primaEstimada: expediente?.prima_estimada,
        automovilMarca,
        automovilModelo,
        automovilNumeroSerie,
        automovilFotoCirculacionUrl,
        modalidadDatos,
        asistenciaEmpresaMudanza,
        asistenciaContacto,
        asistenciaTelefono,
        empresaMudanza: expediente?.empresa_mudanza,
        origen: expediente?.origen,
        destino: expediente?.destino,
        fechaSalida: expediente?.fecha_salida,
        fechaLlegada: expediente?.fecha_llegada,
        propietarioUnidad: expediente?.propietario_unidad,
        marcaUnidad: expediente?.marca_unidad,
        modeloUnidad: expediente?.modelo_unidad,
        placas: expediente?.placas,
        chofer: expediente?.chofer,
    };

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
                        <h1>Así se ve tu expediente</h1>
                    </div>

                    <div className="seguro-publico__folio seguro-publico__folio--small">
                        <span> Folio </span>
                        <strong> {expediente?.folio} </strong>
                    </div>
                </div>

                <div className="seguro-publico__subtitle">
                    <p>
                        Conoce paso a paso la información necesaria para preparar tu seguro.
                        Puedes avanzar y ver cómo funciona sin compromiso y sin necesidad de terminarlo hoy.
                    </p>
                </div>

                <div className="seguro-publico__progress">
                    <div className="seguro-publico__progress-header">
                        <span>  Paso {paso} de 4 </span>
                    </div>
                </div>

                {
                    paso === 1 && (
                        <SeguroStepUno
                            tipoSeguro={tipoSeguro}
                            valorMenaje={valorMenaje}
                            valorAutomovil={valorAutomovil}
                            automovilMarca={automovilMarca}
                            automovilModelo={automovilModelo}
                            automovilNumeroSerie={automovilNumeroSerie}
                            automovilFotoCirculacionUrl={automovilFotoCirculacionUrl}
                            uploadingAutomovilFoto={uploadingAutomovilFoto}
                            pasoUnoGuardado={pasoUnoGuardado}
                            expediente={expediente}
                            error={error}
                            saving={saving}
                            onTipoSeguroChange={handleTipoSeguro}
                            onValorMenajeChange={setValorMenaje}
                            onValorAutomovilChange={setValorAutomovil}
                            onAutomovilMarcaChange={setAutomovilMarca}
                            onAutomovilModeloChange={setAutomovilModelo}
                            onAutomovilNumeroSerieChange={setAutomovilNumeroSerie}
                            onAutomovilFotoChange={handleAutomovilFotoChange}
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
                            onAnterior={() => { setError(""); setPaso(1); }}
                        />
                    )
                }

                {
                    paso === 3 && (
                        <SeguroStepTres
                            modalidadDatos={modalidadDatos}
                            asistenciaEmpresaMudanza={asistenciaEmpresaMudanza}
                            asistenciaContacto={asistenciaContacto}
                            asistenciaTelefono={asistenciaTelefono}
                            enlaceEmpresa={enlaceEmpresa}
                            generandoEnlaceEmpresa={generandoEnlaceEmpresa}
                            empresaDatosFinalizados={Boolean(expediente?.empresa_datos_finalizados_at)}
                            error={error}
                            saving={saving}
                            vistaPasoTres={vistaPasoTres}
                            primaEstimada={expediente?.prima_estimada}
                            valorMenaje={valorMenaje}
                            valorAutomovil={valorAutomovil}
                            onSeleccionarModalidad={seleccionarModalidad}
                            onAnteriorSeleccion={volverSeleccionPasoTres}
                            onContinuarEmpresa={continuarEmpresa}
                            onContinuarAsistida={continuarAsistida}
                            onAnterior={volverPasoDos}
                            onAsistenciaEmpresaMudanzaChange={setAsistenciaEmpresaMudanza}
                            onAsistenciaContactoChange={setAsistenciaContacto}
                            onAsistenciaTelefonoChange={setAsistenciaTelefono}
                            onGuardarAsistencia={guardarAsistenciaYContinuar}
                        />
                    )
                }

                {
                    paso === 4 && (
                        <SeguroStep4
                            expediente={expediente}
                            formData={datosRevision}
                            datosEmpresaCompletos={datosEmpresaCompletos}
                            onAnterior={(pasoAnterior) => { setError(""); setPaso(pasoAnterior); }}
                            onFinalizar={solicitarFinalizacion}
                            finalizando={finalizando}
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

            {
                showFinalizarModal && (
                    <ConfirmModal
                        title="Finalizar expediente"
                        message="¿Confirmas que deseas finalizar tu expediente? Una vez confirmado, enviaremos la información completa para revisión y ya no podrás modificar los datos."
                        confirmText={finalizando ? "Finalizando..." : "Finalizar expediente"}
                        cancelText="Revisar información"
                        onConfirm={finalizarExpediente}
                        onClose={() => setShowFinalizarModal(false)}
                    />
                )
            }
        </main>
    );
}