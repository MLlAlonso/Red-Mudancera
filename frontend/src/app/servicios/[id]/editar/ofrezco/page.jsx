"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import "@/styles/pages/servicios/_eliminarServicio.scss";

export default function EditarOfrezcoServicioPage() {
    const router = useRouter();
    const { id } = useParams();

    const [form, setForm] = useState({
        volumen: "",
        origen: "",
        destino: "",
        rangoDias: "",
        responsableId: "",
        responsableNombre: "",
        telefono: "",
        nota: "",
        tipoCarga: "",
        importe: "",
    });

    const [usuarios, setUsuarios] = useState([]);

    /* ======================
       AUTH
    ====================== */
    useEffect(() => {
        if (!document.cookie.includes("token_empresa")) {
            router.push("/empresa/login");
        }
    }, [router]);

    /* ======================
       PRECARGAR SERVICIO
    ====================== */
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`)
            .then(res => res.json())
            .then(servicio => {
                if (!servicio || servicio.tipo !== "ofrezco") {
                    router.push("/empresa/dashboard");
                    return;
                }

                setForm({
                    volumen: servicio.volumen ?? "",
                    origen: servicio.origen ?? "",
                    destino: servicio.destino ?? "",
                    rangoDias: servicio.rangoDias ?? "",
                    responsableNombre: servicio.responsable_nombre ?? "",
                    telefono: servicio.responsable_telefono ?? "",
                    nota: servicio.nota ?? "",
                    tipoCarga: servicio.tipo_carga ?? "",
                    importe: servicio.importe ?? "",
                });
            });


    }, [id, router]);

    /* ======================
       USUARIOS
    ====================== */
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find(r => r.startsWith("token_empresa="))
            ?.split("=")[1];

        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setUsuarios(data.usuarios || []));
    }, []);

    /* ======================
       HANDLERS
    ====================== */
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "volumen" && Number(value) > 120) return;
        setForm(prev => ({ ...prev, [name]: value }));
    };

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

        const u = usuarios.find(x => String(x.id) === String(id));
        if (!u) return;

        setForm(prev => ({
            ...prev,
            responsableId: u.id,
            responsableNombre: u.nombre,
            telefono: u.tel ?? u.telefono ?? u.phone ?? "",
        }));
    };

    /* ======================
       SUBMIT
    ====================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document.cookie
            .split("; ")
            .find(r => r.startsWith("token_empresa="))
            ?.split("=")[1];

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: JSON.stringify({
                tipo: "ofrezco",
                volumen: form.volumen,
                origen: form.origen,
                destino: form.destino,
                rangoDias: form.rangoDias,
                tipo_carga: form.tipoCarga,
                nota: form.nota,
                responsable: form.responsableNombre,
                telefono: form.telefono,
                importe: form.importe,
            }),

        });

        const data = await res.json();
        if (!res.ok) return alert(JSON.stringify(data));

        router.push("/empresa/dashboard");
    };



    const [showConfirm1, setShowConfirm1] = useState(false);
    const [showConfirm2, setShowConfirm2] = useState(false);

    const handleDelete = async () => {
        const token = document.cookie
            .split("; ")
            .find(r => r.startsWith("token_empresa="))
            ?.split("=")[1];

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        if (!res.ok) return alert("Error al eliminar servicio");

        router.push("/empresa/dashboard");
    };


    return (
        <>
            <Header />

            <main className="ofrezco">
                <div className="ofrezco__container">
                    <form className="ofrezco__form" onSubmit={handleSubmit}>
                        <div className="ofrezco__header">
                            <h1 className="title">Editar servicio (Ofrezco)</h1>
                            <h2 className="subtitle">Actualiza la información</h2>
                        </div>

                        <Input
                            label="Volumen"
                            name="volumen"
                            type="number"
                            value={form.volumen}
                            onChange={handleChange}
                        />

                        {/* <Input
                            label="Origen"
                            name="origen"
                            value={form.origen}
                            onChange={handleChange}
                        />

                        <Input
                            label="Destino"
                            name="destino"
                            value={form.destino}
                            onChange={handleChange}
                        /> */}

                        <div className="input-group">
                            <label className="input-group__label">
                                Plazo máximo de entrega
                            </label>
                            <select
                                name="rangoDias"
                                className="input-group__field"
                                value={form.rangoDias}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona</option>
                                <option value="1-7">1 a 7 días</option>
                                <option value="8-15">8 a 15 días</option>
                                <option value="15-30">15 a 30 días</option>
                                <option value="+30">+30 días</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">Persona a cargo</label>
                            <select
                                className="input-group__field"
                                value={form.responsableId}
                                onChange={handleResponsableChange}
                            >
                                <option value="">Selecciona</option>
                                {usuarios.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Teléfono"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                        />

                        <div className="input-group">
                            <label className="input-group__label">Descripción</label>
                            <textarea
                                name="nota"
                                className="input-group__field"
                                value={form.nota}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">Tipo de carga</label>
                            <select
                                name="tipoCarga"
                                className="input-group__field"
                                value={form.tipoCarga}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona</option>
                                <option value="menaje">Menaje de casa</option>
                                <option value="vehiculo">Vehículo</option>
                                <option value="menaje_vehiculo">Menaje + vehículo</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <Input
                            label="Importe esperado"
                            name="importe"
                            type="number"
                            value={form.importe}
                            onChange={handleChange}
                        />

                        <div className="ofrezco__actions">
                            <Button_error value="Cancelar" onClick={() => router.back()} />
                            <Button_success value="Actualizar servicio" type="submit" />
                        </div>

                        <p
                            className="delete-legend"
                            onClick={() => setShowConfirm1(true)}
                        >
                            ¿Desea eliminar su servicio?
                        </p>

                    </form>
                </div>
            </main>

            <Footer />

            <ConfirmDeleteModal
                open={showConfirm1}
                title="¿Eliminar este servicio?"
                text={`Esta acción no se puede deshacer.
Si eliminas este servicio, dejará de aparecer en las búsquedas y no podrás recuperarlo.
¿Deseas continuar?`}
                onCancel={() => setShowConfirm1(false)}
                onConfirm={() => {
                    setShowConfirm1(false);
                    setShowConfirm2(true);
                }}
            />

            <ConfirmDeleteModal
                open={showConfirm2}
                title="¿En verdad quieres eliminar este servicio?"
                text={`¿Estás completamente seguro?
Al confirmar, este servicio será eliminado de forma permanente`}
                onCancel={() => setShowConfirm2(false)}
                onConfirm={handleDelete}
            />

        </>
    );
}
