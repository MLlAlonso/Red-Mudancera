"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import SimpleEditor from "@/components/common/SimpleEditor";
import Button_success from "@/components/common/Button_success";
import "@/styles/pages/_solicitarMudanza.scss";

export default function SolicitarMudanzaV2() {

  const [form, setForm] = useState({
    origen: "",
    tipo_vivienda: "casa",
    origen_pisos: "",
    origen_elevador: "",
    origen_elevador_utilizable: "",
    origen_acarreo: "",

    destino: "",
    vivienda_destino: "casa",
    destino_pisos: "",
    destino_elevador: "",
    destino_elevador_utilizable: "",
    destino_acarreo: "",

    inventario: "",
    fecha_recoleccion: "1-7",
    tipo_mudanza: "compartida",

    nombre: "",
    email: "",
    telefono: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="solicitar-mudanza">

      {/* HERO */}
      <div className="solicitar-mudanza__hero">
        <div className="hero-logo">
          <img src="/logo/logo.png" alt="Mudanza Fácil" />
        </div>

        <h1 className="title">Busco Mudanza</h1>

        <p className="subtitle">
          Publica tu solicitud en menos de 2 minutos y recibe contacto de empresas verificadas.
        </p>
      </div>

      {/* FORM CONTAINER */}
      <div className="solicitar-mudanza__container">
        <form className="solicitar-mudanza__form" onSubmit={handleSubmit}>

          {/* ================= ORIGEN ================= */}

          <Input
            label="Origen"
            placeholder="Ciudad / Estado"
            name="origen"
            value={form.origen}
            onChange={handleChange}
          />

          <label>Tipo de vivienda de origen</label>
          <select name="tipo_vivienda" value={form.tipo_vivienda} onChange={handleChange}>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="bodega">Bodega</option>
            <option value="otro">Otro</option>
          </select>

          {form.tipo_vivienda === "departamento" && (
            <>
              <Input
                label="Número de pisos"
                name="origen_pisos"
                type="number"
                value={form.origen_pisos}
                onChange={handleChange}
              />

              <label>¿Cuenta con elevador accesible para la mudanza?</label>
              <select name="destino_elevador" onChange={handleChange}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </>
          )}

          <label className="input-group__label input-group__label--tooltip">
            <span className="tooltip">
              ⓘ
              <span className="tooltip__content">
                Acarreo es cuando el camión no puede estacionarse cerca del acceso y se deben caminar más de 20 metros.
              </span>
            </span>
            ¿Acarreo mayor a 20 metros?
          </label>

          <select name="origen_acarreo" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="no_se">No estoy seguro</option>
          </select>

          {/* ================= DESTINO ================= */}

          <Input
            label="Destino"
            placeholder="Ciudad / Estado"
            name="destino"
            value={form.destino}
            onChange={handleChange}
          />

          <label>Tipo de vivienda de destino</label>
          <select
            name="vivienda_destino"
            value={form.vivienda_destino}
            onChange={handleChange}
          >
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="bodega">Bodega</option>
            <option value="otro">Otro</option>
          </select>

          {form.vivienda_destino === "departamento" && (
            <>
              <Input
                label="Número de pisos"
                name="destino_pisos"
                type="number"
                value={form.destino_pisos}
                onChange={handleChange}
              />

              <label>¿Cuenta con elevador accesible para la mudanza?</label>
              <select name="destino_elevador" onChange={handleChange}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </>
          )}

          <label className="input-group__label input-group__label--tooltip">
            <span className="tooltip">
              ⓘ
              <span className="tooltip__content">
                Acarreo es cuando el camión no puede estacionarse cerca del acceso y se deben caminar más de 20 metros.
              </span>
            </span>
            ¿Acarreo mayor a 20 metros?
          </label>

          <select name="destino_acarreo" onChange={handleChange}>
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="no_se">No estoy seguro</option>
          </select>

          {/* ================= DETALLES ================= */}

          <label>Inventario</label>
          <SimpleEditor
            value={form.inventario}
            placeholder="Ejemplo: 1 sala, comedor 6 sillas, 2 camas queen, refrigerador, lavadora. Incluye artículos especiales como piano, caja fuerte o mármol."
            onChange={(val) =>
              setForm(prev => ({ ...prev, inventario: val }))
            }
          />

          <label>¿Cuándo necesitas la mudanza?</label>
          <select name="fecha_recoleccion" value={form.fecha_recoleccion} onChange={handleChange}>
            <option value="1-7">1 – 7 días</option>
            <option value="8-15">8 – 15 días</option>
            <option value="15-30">15 – 30 días</option>
            <option value="30+">Más de 30 días</option>
            <option value="lo_antes_posible">Lo antes posible</option>
          </select>

          <label>¿Qué tipo de mudanza necesitas?</label>
          <select name="tipo_mudanza" value={form.tipo_mudanza} onChange={handleChange}>
            <option value="compartida">Compartida</option>
            <option value="exclusiva">Exclusiva</option>
            <option value="asesoria">Requiero asesoría</option>
          </select>

          <Input
            label="Persona de contacto"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <Input
            label="Correo electrónico de contacto"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Teléfono de contacto"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <Button_success value="Solicitar mudanza" type="submit" />

        </form>
      </div>
    </div>
  );
}