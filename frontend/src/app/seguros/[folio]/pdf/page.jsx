"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExpedienteSeguroPublico, descargarPdfSeguro } from "@/services/seguro";

export default function SeguroPdfPage() {
    const { folio } = useParams();
    const [expediente, setExpediente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!folio) {
            return;
        }

        cargarExpediente();
    }, [folio]);

    async function cargarExpediente() {
        try {
            setLoading(true);
            setError("");
            const response = await getExpedienteSeguroPublico(folio);
            const data = response?.data ?? response;

            if (!data) {
                throw new Error("No se encontró información del expediente.");
            }

            setExpediente(data);
        } catch (error) {
            console.error(error);
            setError(error?.message || "No fue posible cargar el expediente.");
        } finally {
            setLoading(false);
        }
    }

    async function descargarPdf() {
        if (downloading || !folio) {
            return;
        }

        try {
            setDownloading(true);
            await descargarPdfSeguro(folio);
        } catch (error) {
            console.error(error);
            alert(error?.message || "No fue posible generar el PDF.");
        } finally {
            setDownloading(false);
        }
    }

    function formatearMoneda(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return "No registrado";
        }

        return `$${Number(valor).toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} MXN`;
    }

    function formatearFecha(fecha) {
        if (!fecha) {
            return "No registrada";
        }

        const date = new Date(fecha);

        if (Number.isNaN(date.getTime())) {
            return fecha;
        }

        return date.toLocaleString("es-MX", {
            dateStyle: "long",
            timeStyle: "short",
        });
    }

    function obtenerTipoSeguro(tipo) {
        switch (tipo) {
            case "menaje":
                return "Menaje";

            case "automovil":
                return "Automóvil";

            case "menaje_auto":
                return "Menaje + Automóvil";

            default:
                return "No registrado";
        }
    }

    if (loading) {
        return (
            <main className="seguroPdf">
                <div className="seguroPdf__loading">
                    <div className="seguroPdf__spinner" />

                    <p>
                        Cargando expediente...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !expediente) {
        return (
            <main className="seguroPdf">
                <div className="seguroPdf__error">
                    <div className="seguroPdf__error-icon">
                        !
                    </div>

                    <h1>
                        No fue posible cargar el expediente
                    </h1>

                    <p>
                        {error ||
                            "El expediente solicitado no está disponible."
                        }
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="seguroPdf">
            <div className="seguroPdf__container">
                <header className="seguroPdf__header">
                    <div className="seguroPdf__brand">
                        <div className="seguroPdf__brand-icon">
                            MF
                        </div>

                        <div>
                            <strong> Mudanza Fácil </strong>
                            <span> Expediente de seguro  </span>
                        </div>
                    </div>

                    <div className="seguroPdf__actions">
                        <button type="button" className="seguroPdf__download" onClick={descargarPdf} disabled={downloading} >
                            <span>  ↓ </span>

                            {downloading ? "Generando PDF..." : "Descargar PDF"}
                        </button>
                    </div>
                </header>

                <article className="seguroPdf__document">
                    <section className="seguroPdf__hero">
                        <span className="seguroPdf__eyebrow">
                            EXPEDIENTE DE SEGURO
                        </span>

                        <h1> Expediente de Seguro </h1>

                        <p> Información registrada y confirmada para la solicitud de seguro.  </p>

                        <div className="seguroPdf__folio">
                            <span> Folio </span>
                            <strong> {expediente.folio} </strong>
                        </div>
                    </section>

                    <section className="seguroPdf__status">
                        <div>
                            <span> Estado </span>

                            <strong>
                                {expediente.estado === "completado" ? "Completado" : expediente.estado || "Sin estado"}
                            </strong>
                        </div>

                        <div>
                            <span>  Progreso  </span>
                            <strong> {expediente.progreso ?? 0}%  </strong>
                        </div>

                        <div>
                            <span>  Finalizado </span>

                            <strong>
                                {formatearFecha(expediente.cliente_finalizo_at)}
                            </strong>
                        </div>

                    </section>

                    <section className="seguroPdf__section">
                        <div className="seguroPdf__section-heading">
                            <span> 01 </span>

                            <div>
                                <h2> Datos del cliente </h2>
                                <p> Información de contacto del solicitante. </p>
                            </div>
                        </div>

                        <div className="seguroPdf__grid">
                            <div className="seguroPdf__field">
                                <span>  Nombre completo </span>

                                <strong>
                                    {expediente.nombre || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Correo electrónico </span>

                                <strong>
                                    {expediente.email || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Teléfono / WhatsApp </span>

                                <strong>
                                    {expediente.telefono || "No registrado"}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <section className="seguroPdf__section">
                        <div className="seguroPdf__section-heading">
                            <span>  02 </span>

                            <div>
                                <h2> Información del seguro </h2>
                                <p> Valores declarados y prima estimada. </p>
                            </div>
                        </div>

                        <div className="seguroPdf__grid">
                            <div className="seguroPdf__field">
                                <span> Tipo de seguro  </span>

                                <strong>
                                    {obtenerTipoSeguro(expediente.tipo_seguro)}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span>  Valor declarado del menaje  </span>

                                <strong>
                                    {formatearMoneda(expediente.valor_menaje)}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Valor declarado del automóvil </span>

                                <strong>
                                    {formatearMoneda(expediente.valor_automovil)}
                                </strong>
                            </div>
                        </div>

                        <div className="seguroPdf__premium">
                            <div>
                                <span> Prima estimada </span>

                                <strong>
                                    {formatearMoneda(expediente.prima_estimada)}
                                </strong>
                            </div>

                            <p> Cálculo: valor declarado por el cliente × 1.35% </p>
                        </div>
                    </section>

                    <section className="seguroPdf__section">
                        <div className="seguroPdf__section-heading">
                            <span> 03 </span>

                            <div>
                                <h2>  Datos de la mudanza </h2>

                                <p> Información relacionada con el traslado.  </p>
                            </div>
                        </div>

                        <div className="seguroPdf__grid">
                            <div className="seguroPdf__field">
                                <span> Origen </span>

                                <strong>
                                    {expediente.origen || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Destino </span>

                                <strong>
                                    {expediente.destino || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Fecha de recolección </span>

                                <strong>
                                    {formatearFecha(expediente.fecha_recoleccion)}
                                </strong>
                            </div>
                        </div>

                        {expediente.inventario && (
                            <div className="seguroPdf__inventory">
                                <span> Inventario </span>

                                <p>  {expediente.inventario} </p>
                            </div>
                        )}
                    </section>

                    <section className="seguroPdf__section">
                        <div className="seguroPdf__section-heading">
                            <span> 04 </span>

                            <div>
                                <h2>  Datos de la unidad </h2>
                                <p> Información de la empresa y vehículo involucrado en el traslado. </p>
                            </div>
                        </div>

                        <div className="seguroPdf__grid">
                            <div className="seguroPdf__field">
                                <span> Empresa de mudanza </span>

                                <strong>
                                    {expediente.empresa_mudanza || "No registrada"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span>  Propietario de la unidad </span>

                                <strong>
                                    {expediente.propietario_unidad || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Marca </span>

                                <strong>
                                    {expediente.marca_unidad || "No registrada"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Modelo </span>

                                <strong>
                                    {expediente.modelo_unidad || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Placas </span>

                                <strong>
                                    {expediente.placas || "No registradas"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Chofer </span>

                                <strong>
                                    {expediente.chofer || "No registrado"}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Fecha de salida </span>

                                <strong>
                                    {formatearFecha(expediente.fecha_salida)}
                                </strong>
                            </div>

                            <div className="seguroPdf__field">
                                <span> Fecha de llegada </span>

                                <strong>
                                    {formatearFecha(expediente.fecha_llegada)}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <footer className="seguroPdf__footer">
                        <strong> Mudanza Fácil </strong>

                        <span>  Documento correspondiente al expediente  {` ${expediente.folio}`}.
                        </span>

                        <span>
                            Este documento se genera automáticamente a partir de la información registrada.
                        </span>
                    </footer>
                </article>
            </div>
        </main>
    );
}