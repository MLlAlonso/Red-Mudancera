"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { getExpedienteSeguro, enviarCorreoSeguro, descargarPdfSeguro, } from "@/services/superAdminSeguros";

export default function SuperAdminSeguroDetallePage() {
    const { id } = useParams();

    const [expediente, setExpediente] = useState(null);
    const [sending, setSending] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            cargar();
        }
    }, [id]);

    async function cargar() {
        const data = await getExpedienteSeguro(id);
        setExpediente(data.data);
    }

    async function enviarCorreo() {
        if (sending) {
            return;
        }

        setSending(true);

        try {
            await enviarCorreoSeguro(id);
            await cargar();
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setSending(false);
        }
    }

    async function descargarPdf() {
        if (downloading) {
            return;
        }

        try {
            setDownloading(true);
            await descargarPdfSeguro(id);
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setDownloading(false);
        }
    }

    async function copiarEnlaceEmpresa() {
        if (!expediente?.enlace_empresa) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                expediente.enlace_empresa
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(error);

            alert(
                "No fue posible copiar el enlace. Puedes seleccionarlo y copiarlo manualmente."
            );
        }
    }

    if (!expediente) {
        return null;
    }

    return (
        <SuperAdminLayout title={expediente.folio} subtitle="Detalle del expediente" >
            <section className="seguroDetail">
                <div className="detailCard">
                    <div className="cardHeader">
                        <h2> Información del cliente </h2>

                        <div className="cardHeader__actions">
                            <button type="button" className="btn-secondary" onClick={descargarPdf} disabled={downloading} >
                                {downloading ? "Generando PDF..." : "Descargar PDF"}
                            </button>

                            <button type="button" className="btn-primary" onClick={enviarCorreo} disabled={sending} >
                                {sending ? "Enviando..." : "Enviar correo"}
                            </button>
                        </div>
                    </div>

                    <div className="detailGrid">
                        <div>
                            <span> Nombre </span>
                            <strong> {expediente.nombre || "No registrado"} </strong>
                        </div>

                        <div>
                            <span> Correo </span>
                            <strong> {expediente.email || "No registrado"} </strong>
                        </div>

                        <div>
                            <span> Teléfono </span>
                            <strong> {expediente.telefono || "No registrado"} </strong>
                        </div>
                    </div>
                </div>

                <div className="detailCard">
                    <h2> Información del seguro  </h2>

                    <div className="detailGrid">
                        <div>
                            <span> Tipo de seguro </span>

                            <strong>
                                {expediente.tipo_seguro === "menaje" ? "Menaje"
                                    : expediente.tipo_seguro === "automovil" ? "Automóvil"
                                        : expediente.tipo_seguro === "menaje_auto" ? "Menaje + Automóvil" : "Sin capturar"}
                            </strong>
                        </div>

                        <div>
                            <span> Valor del menaje </span>

                            <strong>
                                {expediente.valor_menaje ? `$${Number(expediente.valor_menaje).toLocaleString("es-MX", { minimumFractionDigits: 2, })} 
                                MXN` : "No registrado"}
                            </strong>
                        </div>

                        <div>
                            <span> Valor del automóvil </span>

                            <strong>
                                {expediente.valor_automovil ? `$${Number(expediente.valor_automovil).toLocaleString("es-MX", { minimumFractionDigits: 2, })} 
                                MXN` : "No registrado"}
                            </strong>
                        </div>

                        <div>
                            <span> Porcentaje aplicado </span>

                            <strong>
                                {expediente.modalidad_datos === "asistida" ? "1.75%" : "1.35%"}
                            </strong>
                        </div>

                        <div>
                            <span> Prima estimada </span>

                            <strong>
                                {expediente.prima_estimada ? `$${Number(expediente.prima_estimada).toLocaleString("es-MX", { minimumFractionDigits: 2, })} 
                                MXN` : "No calculada"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="detailCard">
                    <h2> Modalidad de póliza </h2>

                    <div className="detailGrid">
                        <div>
                            <span> Forma de completar </span>

                            <strong>
                                {expediente.modalidad_datos === "asistida" ? "Póliza asistida" : "Yo proporcionaré los datos"}
                            </strong>
                        </div>

                        {expediente.modalidad_datos === "autogestion" && (
                            <div>
                                <span> Cómo se proporcionan </span>

                                <strong>
                                    {expediente.forma_proporcion_datos === "empresa" ? "Solicitados a la empresa" : "Capturados por el cliente"}
                                </strong>
                            </div>
                        )}

                        {expediente.modalidad_datos === "asistida" && (
                            <>
                                <div>
                                    <span> Empresa de mudanza </span>

                                    <strong>
                                        {expediente.asistencia_empresa_mudanza || "No registrada"}
                                    </strong>
                                </div>

                                <div>
                                    <span> Contacto </span>

                                    <strong>
                                        {expediente.asistencia_contacto || "No registrado"}
                                    </strong>
                                </div>

                                <div>
                                    <span> Teléfono / WhatsApp </span>

                                    <strong>
                                        {expediente.asistencia_telefono || "No registrado"}
                                    </strong>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="detailCard">
                    <h2> Enlace privado de empresa </h2>

                    <div className="detailGrid">
                        <div className="detailGrid__full">
                            <span> Estado del enlace </span>

                            <strong>
                                {expediente.enlace_empresa ? "Enlace disponible" : "Enlace no disponible"}
                            </strong>
                        </div>

                        <div className="detailGrid__full">
                            <span> Enlace para la empresa de mudanza </span>

                            {expediente.enlace_empresa ? (
                                <div className="seguroDetail__companyLink">
                                    <input type="text" value={expediente.enlace_empresa} readOnly onFocus={(event) => { event.target.select(); }} />

                                    <button type="button" className="btn-secondary" onClick={copiarEnlaceEmpresa} >
                                        {copied ? "Copiado" : "Copiar enlace"}
                                    </button>
                                </div>
                            ) : (
                                <strong> No fue posible generar el enlace privado. </strong>
                            )}
                        </div>

                        <div>
                            <span> Enlace generado </span>

                            <strong>
                                {expediente.empresa_access_created_at ? new Date(expediente.empresa_access_created_at).toLocaleString("es-MX") : "No generado"}
                            </strong>
                        </div>

                        <div>
                            <span> Datos empresa finalizados </span>

                            <strong>
                                {expediente.empresa_datos_finalizados_at ? new Date(expediente.empresa_datos_finalizados_at).toLocaleString("es-MX") : "Pendientes"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="detailCard">
                    <h2> Información de la mudanza </h2>

                    <div className="detailGrid">
                        <div>
                            <span>  Origen </span>
                            <strong> {expediente.origen || "No registrado"} </strong>
                        </div>

                        <div>
                            <span>  Destino  </span>
                            <strong> {expediente.destino || "No registrado"} </strong>
                        </div>

                        <div>
                            <span> Fecha de recolección </span>
                            <strong> {expediente.fecha_recoleccion || "No registrada"} </strong>
                        </div>

                        <div className="detailGrid__full">
                            <span> Inventario </span>
                            <strong>  {expediente.inventario || "No registrado"} </strong>
                        </div>
                    </div>
                </div>

                <div className="detailCard">
                    <h2> Datos de la unidad </h2>

                    <div className="detailGrid">
                        <div>
                            <span> Empresa de mudanza </span>
                            <strong> {expediente.empresa_mudanza || "No registrada"} </strong>
                        </div>

                        <div>
                            <span> Propietario </span>
                            <strong> {expediente.propietario_unidad || "No registrado"} </strong>
                        </div>

                        <div>
                            <span> Marca </span>
                            <strong> {expediente.marca_unidad || "No registrada"} </strong>
                        </div>

                        <div>
                            <span>  Modelo </span>
                            <strong>  {expediente.modelo_unidad || "No registrado"} </strong>
                        </div>

                        <div>
                            <span>  Placas  </span>
                            <strong> {expediente.placas || "No registradas"} </strong>
                        </div>

                        <div>
                            <span> Chofer </span>
                            <strong>  {expediente.chofer || "No registrado"} </strong>
                        </div>

                        <div>
                            <span> Fecha de salida </span>
                            <strong> {expediente.fecha_salida || "No registrada"} </strong>
                        </div>

                        <div>
                            <span> Fecha de llegada </span>
                            <strong>  {expediente.fecha_llegada || "No registrada"} </strong>
                        </div>
                    </div>
                </div>

                <div className="detailCard">
                    <h2>Estado del expediente </h2>

                    <div className="detailGrid">
                        <div>
                            <span> Estado </span>

                            <strong> {expediente.estado} </strong>
                        </div>

                        <div>
                            <span>Progreso</span>

                            <strong> {expediente.progreso}% </strong>
                        </div>

                        <div>
                            <span>Expediente externo </span>

                            <strong> {expediente.es_externo ? "Sí" : "No"} </strong>
                        </div>

                        <div>
                            <span>Creado</span>

                            <strong>
                                {expediente.created_at ? new Date(expediente.created_at).toLocaleString("es-MX") : "No disponible"}
                            </strong>
                        </div>

                        <div>
                            <span> Inicio del cliente </span>

                            <strong>
                                {expediente.cliente_inicio_at ? new Date(expediente.cliente_inicio_at).toLocaleString("es-MX") : "No iniciado"}
                            </strong>
                        </div>

                        <div>
                            <span> Finalización del cliente </span>

                            <strong>
                                {expediente.cliente_finalizo_at ? new Date(expediente.cliente_finalizo_at).toLocaleString("es-MX") : "No finalizado"}
                            </strong>
                        </div>

                        <div>
                            <span> Datos empresa finalizados </span>

                            <strong>
                                {expediente.empresa_datos_finalizados_at ? new Date(expediente.empresa_datos_finalizados_at).toLocaleString("es-MX") : "No finalizados"}
                            </strong>
                        </div>

                        <div>
                            <span>  Último autoguardado </span>

                            <strong>
                                {expediente.ultimo_autoguardado_at ? new Date(expediente.ultimo_autoguardado_at).toLocaleString("es-MX") : "Sin registro"}
                            </strong>
                        </div>
                    </div>
                </div>
            </section>
        </SuperAdminLayout>
    );
}