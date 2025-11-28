"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <main style={{ padding: "20px" }}>
            <h1>Bienvenido a tu dashboard</h1>
        </main>
    );
}
