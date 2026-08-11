"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { getExpedienteSeguro } from "@/services/superAdminSeguros";
import { enviarCorreoSeguro } from "@/services/superAdminSeguros";

export default function SuperAdminSeguroDetallePage() {
    const { id } = useParams();
    const [expediente, setExpediente] = useState(null);
    const [sending, setSending] = useState(false);

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
        if (sending)
            return;

        setSending(true);
        await enviarCorreoSeguro(id);
        await cargar();
        setSending(false);
    }

    if (!expediente)
        return null;

    return (
        <SuperAdminLayout title={expediente.folio} subtitle="Detalle del expediente">
            <section className="seguroDetail">
                <div className="detailCard">
                    <div className="cardHeader">
                        <h2>
                            Información del cliente
                        </h2>

                        <button className="btn-primary" onClick={enviarCorreo} >
                            {sending ? "Enviando..." : "Enviar correo"}
                        </button>
                    </div>

                    <p>
                        <strong>Nombre:</strong>
                        {expediente.nombre}
                    </p>

                    <p>
                        <strong>Correo:</strong>
                        {expediente.email}
                    </p>

                    <p>
                        <strong>Teléfono:</strong>
                        {expediente.telefono}
                    </p>

                </div>

                <div className="detailCard">
                    <h2> Mudanza </h2>

                    <p>
                        <strong>Origen:</strong>
                        {expediente.origen}
                    </p>

                    <p>
                        <strong>Destino:</strong>
                        {expediente.destino}
                    </p>

                    <p>
                        <strong>Inventario:</strong>
                        {expediente.inventario}
                    </p>
                </div>

                <div className="detailCard">
                    <h2> Seguro </h2>

                    <p>
                        <strong>Estado:</strong>
                        {expediente.estado}
                    </p>

                    <p>
                        <strong>Progreso:</strong>
                        {expediente.progreso}%
                    </p>

                    <p>
                        <strong>Tipo:</strong>
                        {expediente.tipo_seguro ?? "Sin capturar"}
                    </p>
                </div>
            </section>
        </SuperAdminLayout>
    );
}