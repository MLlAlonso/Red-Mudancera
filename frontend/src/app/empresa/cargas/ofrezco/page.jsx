"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OfrezcoServicioPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    volumen: "",
    origen: "",
    destino: "",
    rangoDias: "",
    responsableId: "",
    responsableNombre: "",
    telefono: "",
    nota: "",
    estadoCarga: "",
    tipoCarga: "",
    importe: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  // 🔐 Solo empresas
  useEffect(() => {
    const hasToken = document.cookie.includes("token_empresa");
    if (!hasToken) {
      router.push("/empresa/login");
    }
  }, [router]);

  // 👥 Cargar usuarios de la empresa
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token_empresa="))
      ?.split("=")[1];

    if (!token) return;

    const fetchUsuarios = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setUsuarios(data.usuarios || []);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };

    fetchUsuarios();
  }, []);

  // 🔁 Inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "volumen" && Number(value) > 120) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 👤 Selección de responsable
  const handleResponsableChange = (e) => {
    const selectedId = e.target.value;

    if (!selectedId) {
      setForm((prev) => ({
        ...prev,
        responsableId: "",
        responsableNombre: "",
        telefono: "",
      }));
      return;
    }

    const usuario = usuarios.find(
      (u) => String(u.id) === String(selectedId)
    );

    if (!usuario) return;

    // 🔑 TOMAR EL TELÉFONO REAL (según backend)
    const telefonoUsuario =
      usuario.tel ??
      usuario.telefono ??
      usuario.telefonoAlterno ??
      usuario.phone ??
      "";

    setForm((prev) => ({
      ...prev,
      responsableId: usuario.id,
      responsableNombre: usuario.nombre,
      telefono: telefonoUsuario,
    }));
  };

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
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
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

      if (!res.ok) {
        alert(data.message || "Error al crear servicio");
        return;
      }

      router.push("/empresa/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <>
      <Header />

      <main className="ofrezco">
        <div className="ofrezco__container">
          <form className="ofrezco__form" onSubmit={handleSubmit}>
            <div className="ofrezco__header">
              <h1 className="title">Ofrezco carga</h1>
              <h2 className="subtitle">Información requerida</h2>
            </div>

            <Input
              label="Volumen"
              name="volumen"
              type="number"
              placeholder="Volumen de carga máximo 120 (m³)"
              value={form.volumen}
              onChange={handleChange}
            />

            <Input
              label="Origen"
              name="origen"
              placeholder="Ciudad de origen"
              value={form.origen}
              onChange={handleChange}
            />

            <Input
              label="Destino"
              name="destino"
              placeholder="Ciudad destino"
              value={form.destino}
              onChange={handleChange}
            />

            {/* Rango de días */}
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
                <option value="">Selecciona una opción</option>
                <option value="1-7">1 a 7 días</option>
                <option value="8-15">8 a 15 días</option>
                <option value="15-30">15 a 30 días</option>
                <option value="+30">+30 días</option>
              </select>
            </div>

            {/* Responsable */}
            <div className="input-group">
              <label className="input-group__label">
                Persona a cargo del servicio
              </label>
              <select
                className="input-group__field"
                value={form.responsableId}
                onChange={handleResponsableChange}
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Teléfono editable */}
            <Input
              label="Número alternativo"
              name="telefono"
              placeholder="Teléfono de contacto"
              value={form.telefono}
              onChange={handleChange}
            />

            {/* Nota */}
            <div className="input-group">
              <label className="input-group__label">
                Descripción de la carga
              </label>
              <textarea
                name="nota"
                className="input-group__field"
                placeholder="Describe la carga"
                value={form.nota}
                onChange={handleChange}
              />
            </div>

            {/* Estado carga */}
            <div className="input-group">
              <label className="input-group__label">
                Estatus de la carga
              </label>
              <select
                name="estadoCarga"
                className="input-group__field"
                value={form.estadoCarga}
                onChange={handleChange}
              >
                <option value="">Selecciona</option>
                <option value="almacen">En mis instalaciones</option>
                <option value="ruta">Por recolectar</option>
              </select>
            </div>

            {/* Tipo carga */}
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

            <Input
              label="Importe esperado"
              name="importe"
              type="number"
              placeholder="Pago esperado (opcional)"
              value={form.importe}
              onChange={handleChange}
            />

            {/* BOTONES */}
            <div className="ofrezco__actions">
              <Button_error
                value="Cancelar"
                onClick={() => router.back()}
              />
              <Button_success
                value="Publicar servicio"
                type="submit"
              />
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}