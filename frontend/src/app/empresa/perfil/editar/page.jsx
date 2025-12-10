"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

import "@/styles/pages/empresa/_empresaEditar.scss";

export default function EmpresaEditar() {
  const router = useRouter();

  // =============================
  // ESTADOS PRINCIPALES
  // =============================
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  // =============================
  // FORMULARIO
  // =============================
  const [form, setForm] = useState({
    empresa: "",
    email: "",
    representante: "",
    telefono: "",
    descripcion: "",
    base: "",
    rfc: "",
    logo: "",
  });

  // =============================
  // HELPER COOKIE
  // =============================
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  // =============================
  // CARGAR EMPRESA
  // =============================
  useEffect(() => {
    const token = getCookie("token_empresa");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpresa(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // =============================
  // SI YA HAY EMPRESA → RELLENAR FORM
  // =============================
  useEffect(() => {
    if (!empresa) return;

    setForm({
      empresa: empresa.empresa ?? "",
      email: empresa.email ?? "",
      representante: empresa.representante ?? "",
      telefono: empresa.tel ?? "",
      descripcion: empresa.descripcion ?? "",
      base: empresa.base ?? "",
      rfc: empresa.rfc ?? "",
      logo: empresa.logo ?? "",
    });
  }, [empresa]);

  // =============================
  // HANDLER
  // =============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("token_empresa");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/empresa/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Datos actualizados correctamente");
      router.push("/empresa/perfil");
    } else {
      alert("Error al actualizar");
    }
  };

  // =============================
  // RENDER
  // =============================
  if (loading) return <p>Cargando...</p>;
  if (!empresa) return <p>No se pudo cargar la información.</p>;

  return (
    <>
      <Header />

      <main className="empresa-editar">
        <h1 className="empresa-editar__title">Actualizar datos empresa</h1>
        <p className="empresa-editar__subtitle">Editar datos de una empresa</p>

        <form className="empresa-editar__form" onSubmit={handleSubmit}>
          <label>Nombre de la empresa</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
          />

          <label>Correo</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>RFC</label>
          <input name="rfc" value={form.rfc} onChange={handleChange} />

          <label>Representante</label>
          <input
            name="representante"
            value={form.representante}
            onChange={handleChange}
          />

          <label>Teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <label>Sede</label>
          <input name="base" value={form.base} onChange={handleChange} />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          ></textarea>

          <label>Foto de perfil (URL temporal)</label>
          <input name="logo" value={form.logo} onChange={handleChange} />

          <div className="empresa-editar__buttons">
            <Button_error
              value="Cancelar"
              onClick={() => router.push("/empresa/perfil")}
            />

            <Button_success value="Aceptar" type="submit" />
          </div>

          <p className="empresa-editar__delete">
            ¿Desea eliminar su perfil de empresa?
          </p>
        </form>
      </main>

      <Footer />
    </>
  );
}
