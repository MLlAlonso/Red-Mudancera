"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Button_crud from "@/components/common/Button_crud";
import UserCard from "@/components/cards/UserCard";

import "@/styles/pages/empresa/_empresaUsuarios.scss";

export default function EmpresaUsuarios() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    };

    useEffect(() => {
        const token = getCookie("token_empresa");

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsuarios(data.usuarios || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <>
            <Header />

            <main className="empresa-usuarios">
                <div className="empresa-usuarios__header">
                    <div>
                        <h1 className="empresa-usuarios__title">Mis usuarios</h1>
                        <p className="empresa-usuarios__subtitle">Miembros de mi equipo</p>
                    </div>

                    <Button_crud
                        value="Añadir"
                        onClick={() => router.push("/empresa/usuarios/crear")}
                    />
                </div>


                <div className="empresa-usuarios__grid">
                    {usuarios.map((u) => (
                        <UserCard
                            key={u.id}
                            avatar={u.avatar}
                            nombre={u.nombre}
                            telefono={u.telefono}
                            email={u.email}
                            fechaUnion={u.fechaUnion}
                            onDelete={() => { }}
                            onPause={() => { }}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}
