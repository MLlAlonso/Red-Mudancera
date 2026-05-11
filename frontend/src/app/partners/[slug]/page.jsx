"use client";

import { useEffect, useState } from "react";

export default function PartnerDashboard({ params }) {

    const [data, setData] = useState(null);

    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    );

    const [year, setYear] = useState(
        new Date().getFullYear()
    );

    useEffect(() => {

        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/partners/${params.slug}?month=${month}&year=${year}`
        )
            .then(res => res.json())
            .then(res => setData(res.data));

    }, [month, year, params.slug]);

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        <main>

            <h1>{data.partner.nombre}</h1>

            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            >
                {Array.from({ length: 12 }).map((_, i) => (

                    <option
                        key={i + 1}
                        value={i + 1}
                    >
                        Mes {i + 1}
                    </option>

                ))}
            </select>

            <div>
                <h2>Solicitudes generadas</h2>

                <p>
                    {data.metricas.solicitudes_generadas}
                </p>
            </div>

            <div>
                <h2>Solicitudes vendidas</h2>

                <p>
                    {data.metricas.solicitudes_vendidas}
                </p>
            </div>

            <div>
                <h2>Ventas exclusivas</h2>

                <p>
                    {data.metricas.ventas_exclusivas}
                </p>
            </div>

            <div>
                <h2>Ventas normales</h2>

                <p>
                    {data.metricas.ventas_normales}
                </p>
            </div>

            <div>
                <h2>Créditos generados</h2>

                <p>
                    {data.metricas.creditos_generados}
                </p>
            </div>

        </main>
    );
}