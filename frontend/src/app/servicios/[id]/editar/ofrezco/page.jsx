"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import SimpleEditor from "@/components/common/SimpleEditor";
import ErrorModal from "@/components/common/ErrorModal";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import "@/styles/pages/servicios/_eliminarServicio.scss";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function EditarOfrezcoServicioPage() {
    const router = useRouter();
    const { id } = useParams();
    const [imagenesActuales, setImagenesActuales] = useState([]);
    const [imagenesEliminar, setImagenesEliminar] = useState([]);
    const [imagenesNuevas, setImagenesNuevas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState({
        show: false,
        message: "",
    });

    const maxPermitidas =
        3 - (imagenesActuales.length - imagenesEliminar.length);

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
        tipoVehiculo: "",
        estadoCarga: "mi_almacen",
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
                    estadoCarga: servicio.estado_carga ?? "mi_almacen",
                });

                setImagenesActuales(servicio.imagenes || []);
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

    useEffect(() => {
        return () => {
            imagenesNuevas.forEach(img => URL.revokeObjectURL(img.preview));
        };
    }, [imagenesNuevas]);

    /* ======================
       HANDLERS
    ====================== */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "tipoCarga") {
            setForm(prev => ({
                ...prev,
                tipoCarga: value,
                volumen: value === "vehiculo" ? "" : prev.volumen,
                tipoVehiculo: value === "vehiculo" ? prev.tipoVehiculo : ""
            }));
            return;
        }

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
       VALIDACIÓN DE IMÁGENES
    ====================== */
    const handleImagenesChange = (e) => {
        const MAX_SIZE = 5 * 1024 * 1024;
        const files = Array.from(e.target.files);
        if (!files.length) return;
        const imagenesValidas = [];
        const errores = [];

        const disponibles =
            3 - (imagenesActuales.length - imagenesEliminar.length + imagenesNuevas.length);

        if (disponibles <= 0) {
            setErrorModal({
                show: true,
                message: "Ya alcanzaste el máximo de 3 imágenes",
            });
            return;
        }

        for (const file of files) {
            if (file.size > MAX_SIZE) {
                errores.push(`${file.name} supera los 4MB`);
                continue;
            }

            if (!file.type.startsWith("image/")) {
                errores.push(`${file.name} no es una imagen válida`);
                continue;
            }

            imagenesValidas.push({
                file,
                preview: URL.createObjectURL(file),
            });
        }

        if (imagenesValidas.length > disponibles) {
            errores.push(`Solo puedes agregar ${disponibles} imagen(es) más`);
        }

        const imagenesFinales = imagenesValidas.slice(0, disponibles);
        if (errores.length > 0) {
            setErrorModal({
                show: true,
                message: errores.join("\n"),
            });
        }
        setImagenesNuevas(prev => [...prev, ...imagenesFinales]);
    };

    /* ======================
       SUBMIT
    ====================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // evita doble click
        setLoading(true);

        const token = document.cookie
            .split("; ")
            .find(r => r.startsWith("token_empresa="))
            ?.split("=")[1];

        try {
            const nuevasCloud = [];
            for (const img of imagenesNuevas) {
                const uploaded = await uploadToCloudinary(img.file);
                nuevasCloud.push(uploaded);
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    volumen: form.tipoCarga === "vehiculo" ? null : form.volumen,
                    origen: form.origen,
                    destino: form.destino,
                    tipo_vehiculo: form.tipoVehiculo || null,
                    rangoDias: form.rangoDias,
                    tipo_carga: form.tipoCarga,
                    nota: form.nota,
                    responsable_nombre: form.responsableNombre,
                    responsable_telefono: form.telefono,
                    importe: form.importe,
                    estado_carga: form.estadoCarga,
                    eliminar_imagenes: imagenesEliminar,
                    imagenes: nuevasCloud,
                })
            });

            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                setErrorModal({
                    show: true,
                    message: data?.message || "No se pudo actualizar el servicio",
                });
                return;
            }
            router.push("/empresa/dashboard");

        } catch (err) {
            setLoading(false);
            setErrorModal({
                show: true,
                message: err.message || "Error de conexión",
            });
        }
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
                            <h1 className="title">Editar Ofrezco</h1>
                            <h2 className="subtitle">Actualiza la información</h2>
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">Tipo de carga</label>
                            <select name="tipoCarga" className="input-group__field" value={form.tipoCarga} onChange={handleChange}>
                                <option value="">Selecciona</option>
                                <option value="menaje">Menaje de casa</option>
                                <option value="vehiculo">Vehículo</option>
                                <option value="menaje_vehiculo">Menaje de casa + Vehículo</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        {form.tipoCarga === "vehiculo" && (
                            <div className="input-group">
                                <label className="input-group__label">Tipo de vehículo</label>

                                <select
                                    name="tipoVehiculo"
                                    className="input-group__field"
                                    value={form.tipoVehiculo}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="compacto">Auto compacto</option>
                                    <option value="camioneta">Camioneta</option>
                                    <option value="motocicleta">Motocicleta</option>
                                </select>
                            </div>
                        )}

                        {form.tipoCarga && form.tipoCarga !== "vehiculo" && (
                            <Input
                                label="Volumen"
                                name="volumen"
                                type="number"
                                value={form.volumen}
                                onChange={handleChange}
                            />
                        )}

                        <div className="input-group">
                            <label className="input-group__label">Descripción de la carga</label>
                            <SimpleEditor
                                value={form.nota}
                                onChange={(value) => setForm((prev) => ({ ...prev, nota: value }))}
                                placeholder={
                                    form.tipoCarga === "vehiculo"
                                        ? "Marca, modelo, año y especificaciones del vehículo"
                                        : "¿Qué lleva la mudanza? Escríbelo o pega la lista del cliente."
                                }
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">
                                Plazo máximo de entrega
                            </label>
                            <select name="rangoDias" className="input-group__field" value={form.rangoDias} onChange={handleChange} >
                                <option value="1-7">1 a 7 días</option>
                                <option value="8-15">8 a 15 días</option>
                                <option value="15-30">15 a 30 días</option>
                                <option value="+30">+30 días</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">Estado de la carga</label>
                            <select name="estadoCarga" className="input-group__field" value={form.estadoCarga} onChange={handleChange} >
                                <option value="mi_almacen">En bodega</option>
                                <option value="tu_almacen">Entrega directa en tu bodega</option>
                                <option value="en_ruta">Pendiente de recolección</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-group__label">Persona a cargo</label>
                            <select className="input-group__field" value={form.responsableId} onChange={handleResponsableChange} >
                                <option value="">Selecciona</option>
                                {usuarios.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />

                        <div className="input-group">
                            <label className="input-group__label input-group__label--tooltip">
                                <span className="tooltip">
                                    ⓘ
                                    <span className="tooltip__content">
                                        Este campo no es obligatorio.<br />
                                        Si lo dejas vacío, se publicará como
                                        <strong> “Por convenir”</strong>.
                                    </span>
                                </span>
                                Oferta
                            </label>

                            <Input name="importe" type="number" value={form.importe} onChange={handleChange} placeholder="Monto opcional" />
                        </div>

                        <div className="imagenes-preview">
                            {imagenesActuales.map(img => (
                                <div key={img.id} className="imagen-item">
                                    <img src={img.url} alt="" />

                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={imagenesEliminar.includes(img.id)}
                                            onChange={() =>
                                                setImagenesEliminar(prev =>
                                                    prev.includes(img.id)
                                                        ? prev.filter(i => i !== img.id)
                                                        : [...prev, img.id]
                                                )
                                            }
                                        />
                                        Eliminar
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="input-group">
                            {maxPermitidas > 0 && (
                                <div className="input-group">
                                    <label className="input-group__label">
                                        Agregar imágenes ({imagenesNuevas.length}/{maxPermitidas})
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        multiple
                                        onClick={(e) => (e.target.value = null)}
                                        onChange={handleImagenesChange}
                                    />

                                    <div className="imagenes-preview">
                                        {imagenesNuevas.map((img, i) => (
                                            <div key={i} className="imagenes-preview__item">
                                                <img src={img.preview} alt="" />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setImagenesNuevas(prev =>
                                                            prev.filter((_, x) => x !== i)
                                                        )
                                                    }
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="ofrezco__actions">
                            <Button_error value="Cancelar" onClick={() => router.back()} />
                            <Button_success value="Actualizar servicio" type="submit" />
                        </div>

                        <p className="delete-legend" onClick={() => setShowConfirm1(true)} >
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

            <ErrorModal
                show={errorModal.show}
                title="Error en imágenes"
                message={errorModal.message}
                onClose={() => setErrorModal({ show: false, message: "" })}
            />

            <LoadingOverlay show={loading} message="Actualizando servicio..." />
        </>
    );
}