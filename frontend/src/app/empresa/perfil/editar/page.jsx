"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

import "@/styles/pages/empresa/_empresaEditar.scss";

export default function EmpresaEditar() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [form, setForm] = useState({
    empresa: "",
    email: "",
    representante: "",
    telefono: "",
    descripcion: "",
    base: "",
    rfc: "",
    logo: null,

    // NUEVOS
    password: "",
    password_confirmation: "",
  });

  const [previewLogo, setPreviewLogo] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = getCookie("token_empresa");

    if (!API || !token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/empresa/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpresa(data);
        setForm({
          empresa: data.empresa || "",
          email: data.email || "",
          representante: data.representante || "",
          telefono: data.tel || "",
          descripcion: data.descripcion || "",
          base: data.base || "",
          rfc: data.rfc || "",
          logo: null,

          // MANTENER
          password: "",
          password_confirmation: "",
        });

        setPreviewLogo(data.logo_url || "/icons/user-placeholder.png");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API]);

  if (loading) return <p>Cargando...</p>;
  if (!empresa) return <p>Error al cargar perfil.</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    if (file) setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("token_empresa");
    if (!API || !token) return;

    const formData = new FormData();
    formData.append("_method", "PUT");

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch(`${API}/empresa/update`, {
        method: "POST", // 🔥 NO CAMBIAR
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error backend");

      setShowSuccessModal(true);
      setTimeout(() => router.push("/empresa/perfil"), 1500);
    } catch (err) {
      console.error("Error al actualizar empresa", err);
    }
  };

  const handleDelete = async () => {
    const token = getCookie("token_empresa");

    const res = await fetch(`${API}/empresa/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      document.cookie = "token_empresa=; path=/; max-age=0";
      router.push("/empresa/login");
    }
  };

  return (
    <>
      <Header />

      <main className="empresa-editar">
        <h1 className="empresa-editar__title">Actualizar datos empresa</h1>
        <p className="empresa-editar__subtitle">Editar datos de una empresa</p>

        <div className="empresa-editar__avatar-wrapper">
          <img
            src={previewLogo || "/icons/user-placeholder.png"}
            className="empresa-editar__avatar"
          />
        </div>

        <form className="empresa-editar__form" onSubmit={handleSubmit}>
          <Input label="Nombre" name="empresa" value={form.empresa} onChange={handleChange} />
          <Input label="Correo" type="email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Nueva contraseña" type="password" name="password" placeholder="Dejar vacío para no cambiar" value={form.password} onChange={handleChange} />
          <Input label="Confirmar contraseña" type="password" name="password_confirmation" placeholder="Repite la contraseña" value={form.password_confirmation} onChange={handleChange} />


          <Input label="RFC" name="rfc" value={form.rfc} onChange={handleChange} />
          <Input label="Representante" name="representante" value={form.representante} onChange={handleChange} />
          <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
          <Input label="Sede" name="base" value={form.base} onChange={handleChange} autocomplete />

          <div className="input-group">
            <label className="input-group__label">Descripción</label>
            <textarea
              name="descripcion"
              className="input-group__field textarea"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-group__label">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              className="input-group__field"
              onChange={handleFile}
            />
          </div>

          <div className="empresa-editar__buttons">
            <Button_error
              value="Cancelar"
              onClick={() => router.push("/empresa/perfil")}
            />
            <Button_success value="Aceptar" type="submit" />
          </div>
        </form>

        <p
          className="empresa-editar__delete"
          onClick={() => setShowDeleteModal(true)}
        >
          ¿Desea eliminar su perfil de empresa?
        </p>
      </main>

      <Footer />

      {showSuccessModal && (
        <div className="empresa-editar__modal">
          <div className="empresa-editar__modal-box">
            <img src="/icons/check.png" className="empresa-editar__modal-icon" />
            <p>Tu perfil ha sido actualizado correctamente</p>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="empresa-delete__modal"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}
        >
          <div className="empresa-delete__box">
            <h2>¿Desea eliminar su perfil de empresa?</h2>
            <p>Esta acción es permanente.</p>

            <div className="empresa-delete__buttons">
              <Button_error
                value="Cancelar"
                onClick={() => setShowDeleteModal(false)}
              />
              <Button_success
                value="Aceptar"
                onClick={() => {
                  setShowDeleteModal(false);
                  setShowDeleteConfirmModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div
          className="empresa-delete__modal"
          onClick={(e) =>
            e.target === e.currentTarget && setShowDeleteConfirmModal(false)
          }
        >
          <div className="empresa-delete__box">
            <h2>¿En verdad quieres eliminar tu perfil?</h2>

            <div className="empresa-delete__buttons">
              <Button_error
                value="Cancelar"
                onClick={() => setShowDeleteConfirmModal(false)}
              />
              <Button_success
                value="Eliminar definitivamente"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
