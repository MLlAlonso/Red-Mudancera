"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuscoServicioPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        volumen: "",
        origen: "",
        destino: "",
        inicio: "",
        fin: "",
        responsableId: "",
        responsableNombre: "",
        telefono: "",
        nota: "",
        tipoCarga: "",
    });

    const [usuarios, setUsuarios] = useState([]);

    // Solo empresas
    useEffect(() => {
        const hasToken = document.cookie.includes("token_empresa");
        if (!hasToken) router.push("/empresa/login");
    }, [router]);

    // Usuarios empresa
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token_empresa="))
            ?.split("=")[1];

        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setUsuarios(data.usuarios || []))
            .catch(() => console.error("Error cargando usuarios"));
    }, []);

    // Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "volumen" && Number(value) > 120) return;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Responsable
    const handleResponsableChange = (e) => {
        const id = e.target.value;

        if (!id) {
            setForm(prev => ({
                ...prev,
                responsableId: "",
                responsableNombre: "",
                telefono: "",
            }));
            return;
        }

        const usuario = usuarios.find(u => String(u.id) === String(id));
        if (!usuario) return;

        setForm(prev => ({
            ...prev,
            responsableId: usuario.id,
            responsableNombre: usuario.nombre,
            telefono:
                usuario.tel ??
                usuario.telefono ??
                usuario.phone ??
                "",
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = document.cookie
                .split("; ")
                .find(row => row.startsWith("token_empresa="))
                ?.split("=")[1];

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    tipo: "busco",
                    volumen: form.volumen,
                    origen: form.origen,
                    destino: form.destino,
                    inicio: form.inicio,
                    fin: form.fin,
                    tipo_carga: form.tipoCarga,
                    nota: form.nota,
                    responsable: form.responsableNombre,
                    telefono: form.telefono,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Error al crear servicio");
                return;
            }

            router.push("/empresa/dashboard");
        } catch {
            alert("Error de conexión");
        }
    };

    return (
        <>
            <Header />

            <main className="busco">
                <div className="busco__container">
                    <form className="busco__form" onSubmit={handleSubmit}>
                        <div className="busco__header">
                            <h1 className="title">Busco carga</h1>
                            <h2 className="subtitle">Información requerida</h2>
                        </div>

                        <Input
                            label="Volumen"
                            name="volumen"
                            type="number"
                            placeholder="Volumen de carga"
                            value={form.volumen}
                            onChange={handleChange}
                        />

                        {/* BLOQUE RUTA */}
                        <div className="busco__route">
                            <h3 className="busco__route-title">Ruta próxima</h3>

                            <Input
                                label="Origen"
                                name="origen"
                                placeholder="Ciudad de origen"
                                value={form.origen}
                                onChange={handleChange}
                            />

                            <Input
                                label="Destino final"
                                name="destino"
                                placeholder="Ciudad de destino"
                                value={form.destino}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Calendario */}
                        <label className="labels">Rango de salida</label>
                        <div className="busco__calendar">
                            <div className="calendar-field">
                                <label>Inicio</label>
                                <input
                                    type="date"
                                    name="inicio"
                                    value={form.inicio}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="calendar-field">
                                <label>Fin</label>
                                <input
                                    type="date"
                                    name="fin"
                                    value={form.fin}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Responsable */}
                        <div className="input-group">
                            <label className="input-group__label">
                                Responsable del servicio
                            </label>
                            <select
                                className="input-group__field"
                                value={form.responsableId}
                                onChange={handleResponsableChange}
                            >
                                <option value="">Selecciona un usuario</option>
                                {usuarios.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Número alternativo"
                            name="telefono"
                            placeholder="Teléfono de contacto"
                            value={form.telefono}
                            onChange={handleChange}
                        />

                        <div className="input-group">
                            <label className="input-group__label">
                                Descripción
                            </label>
                            <textarea
                                name="nota"
                                className="input-group__field"
                                value={form.nota}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">
                                Tipo de carga
                            </label>
                            <select
                                name="tipoCarga"
                                className="input-group__field"
                                value={form.tipoCarga}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona</option>
                                <option value="libre">Libre</option>
                                <option value="mudanza">Mudanza</option>
                            </select>
                        </div>

                        <div className="busco__actions">
                            <Button_error value="Cancelar" onClick={() => router.back()} />
                            <Button_success value="Publicar servicio" type="submit" />
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}