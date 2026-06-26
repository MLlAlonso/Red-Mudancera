"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "@/styles/pages/empresa/_empresaLogout.scss";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

                if (token) {
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/logout`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }
            } catch (err) {
                console.error("Error cerrando sesión:", err);
            }

            document.cookie = "token_empresa=; path=/; max-age=0";
            localStorage.removeItem("token_empresa");
            localStorage.removeItem("plan");
            setTimeout(() => {router.push("/empresa/login");}, 1400);
        };

        logout();
    }, [router]);

    return (
        <main className="logout-page">
            <div className="logout-card">
                <div className="logout-icon">
                    <Image src="/icons/logout.png" alt="Cerrar sesión" width={56} height={56} />
                    <span className="loader"></span>
                </div>

                <h1>Hasta pronto</h1>
                <p> Estamos cerrando tu sesión de forma segura y protegiendo tu información.</p>

                <div className="logout-status">
                    Cerrando sesión...
                </div>
            </div>
        </main>
    );
}