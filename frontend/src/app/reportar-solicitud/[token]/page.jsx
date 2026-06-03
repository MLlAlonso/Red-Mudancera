"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ReportarSolicitudPage() {

    const { token } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const eliminarSolicitud = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/reportar/${token}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            setDeleted(true);

        } catch {

            alert(
                "No fue posible eliminar la solicitud."
            );

        } finally {

            setLoading(false);

        }
    };

    if (deleted) {
        return (
            <main className="reportar-solicitud success">
                <img src="/icons/check_success.png" alt="" />

                <h1>
                    Solicitud eliminada
                </h1>

                <p>
                    Tu solicitud ha sido eliminada correctamente.
                </p>

                <button className="reportar-solicitud__new-request" onClick={() => router.push("/solicitar-mudanza")} >
                    Solicitar otra mudanza
                </button>
            </main>
        );
    }

    return (
        <main className="reportar-solicitud">
            <div className="reportar-solicitud__card">
                <img src="/icons/delete.png" alt="" />

                <h1>
                    ¿Deseas eliminar esta solicitud?
                </h1>

                <p>
                    Si no realizaste esta solicitud o fue creada por error,
                    puedes eliminarla permanentemente.
                </p>

                <button onClick={eliminarSolicitud} disabled={loading} >
                    {
                        loading
                            ? "Eliminando..."
                            : "Eliminar solicitud"
                    }
                </button>
            </div>
        </main>
    );
}