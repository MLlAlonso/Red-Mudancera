"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import SimpleEditor from "@/components/common/SimpleEditor";
import Button_success from "@/components/common/Button_success";

export default function CotizadorMudanzaClient() {

    const [form, setForm] = useState({
        origen: "",
        tipo_vivienda: "",
        origen_pisos: "",
        origen_elevador: "",
        origen_acarreo: "",
        origen_empaque: "",

        destino: "",
        vivienda_destino: "",
        destino_pisos: "",
        destino_elevador: "",
        destino_acarreo: "",
        destino_empaque: "",

        inventario: "",
        fecha_recoleccion: "",
        tipo_mudanza: "",
        nombre: "",
        email: "",
        telefono: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("COTIZACIÓN:", form);
        alert("Cotización generada (solo demo)");
    };

    return (
        <div className="cotizador-mudanza">

            <div className="cotizador-mudanza__hero">
                <div className="hero-logo">
                    <img src="/logo/logo.png" alt="Mudanza Fácil" />
                </div>

                <h1 className="title">Cotiza tu Mudanza</h1>

                <p className="subtitle">
                    Calcula un estimado en segundos según tus necesidades
                </p>
            </div>

            <div className="cotizador-mudanza__container">
                <form className="cotizador-mudanza__form" onSubmit={handleSubmit}>

                    {/* ORIGEN */}
                    <div className="form-section">
                        <h2 className="form-section__title">Origen</h2>

                        <Input label="Origen" name="origen" value={form.origen} onChange={handleChange} />

                        <label>Tipo de vivienda</label>
                        <select name="tipo_vivienda" value={form.tipo_vivienda} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="bodega">Bodega</option>
                        </select>

                        {form.tipo_vivienda === "departamento" && (
                            <>
                                <Input name="origen_pisos" label="Pisos" type="number" value={form.origen_pisos} onChange={handleChange} />

                                <label>¿Tiene elevador?</label>
                                <select name="origen_elevador" value={form.origen_elevador} onChange={handleChange}>
                                    <option value="">Selecciona</option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </>
                        )}

                        <label>Acarreo</label>
                        <select name="origen_acarreo" value={form.origen_acarreo} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>

                        {/* NUEVO */}
                        <label>Empaque</label>
                        <select name="origen_empaque" value={form.origen_empaque} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="listo">Todo listo para cargar</option>
                            <option value="basico">Requiero emplayado básico</option>
                            <option value="premium">Servicio premium de empaque</option>
                            <option value="asesoria">No sé, requiero asesoría</option>
                        </select>
                    </div>

                    {/* DESTINO */}
                    <div className="form-section">
                        <h2 className="form-section__title">Destino</h2>

                        <Input label="Destino" name="destino" value={form.destino} onChange={handleChange} />

                        <label>Tipo de vivienda</label>
                        <select name="vivienda_destino" value={form.vivienda_destino} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="bodega">Bodega</option>
                        </select>

                        {form.vivienda_destino === "departamento" && (
                            <>
                                <Input name="destino_pisos" label="Pisos" type="number" value={form.destino_pisos} onChange={handleChange} />

                                <label>¿Tiene elevador?</label>
                                <select name="destino_elevador" value={form.destino_elevador} onChange={handleChange}>
                                    <option value="">Selecciona</option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </>
                        )}

                        <label>Acarreo</label>
                        <select name="destino_acarreo" value={form.destino_acarreo} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>

                        {/* NUEVO */}
                        <label>Empaque</label>
                        <select name="destino_empaque" value={form.destino_empaque} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="listo">Todo listo para cargar</option>
                            <option value="basico">Requiero emplayado básico</option>
                            <option value="premium">Servicio premium de empaque</option>
                            <option value="asesoria">No sé, requiero asesoría</option>
                        </select>
                    </div>

                    {/* DETALLES */}
                    <div className="form-section">
                        <h2 className="form-section__title">Detalles</h2>

                        <SimpleEditor
                            value={form.inventario}
                            onChange={(val) => setForm(prev => ({ ...prev, inventario: val }))}
                        />

                        <label>Fecha</label>
                        <select name="fecha_recoleccion" value={form.fecha_recoleccion} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="1-7">1-7 días</option>
                            <option value="8-15">8-15 días</option>
                            <option value="15-30">15-30 días</option>
                        </select>

                        <label>Tipo de mudanza</label>
                        <select name="tipo_mudanza" value={form.tipo_mudanza} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="compartida">Compartida</option>
                            <option value="exclusiva">Exclusiva</option>
                        </select>

                        <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                        <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
                    </div>

                    <Button_success value="Calcular cotización" type="submit" />
                </form>
            </div>
        </div>
    );
}