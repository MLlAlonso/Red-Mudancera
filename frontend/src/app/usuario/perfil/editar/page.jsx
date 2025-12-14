"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

import "@/styles/pages/usuario/_usuarioEditar.scss";

export default function UsuarioEditar() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    avatar: null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const buildFileUrl = (file) => {
    if (!file) return "/icons/user-placeholder.png";
    const base = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");
    return `${base}/storage/${file}`;
  };

  useEffect(() => {
    const token = getCookie("token_usuario");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data.usuario);

        setForm({
          nombre: data.usuario.nombre,
          email: data.usuario.email,
          password: "",
          telefono: data.usuario.telefono,
          avatar: null,
        });

        setPreviewAvatar(buildFileUrl(data.usuario.avatar));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Cargando…</p>;
  if (!usuario) return <p>Error al cargar datos del usuario.</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, avatar: file });

    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("token_usuario");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuario/update`;

    const formData = new FormData();
    formData.append("_method", "PUT");

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setTimeout(() => router.push("/usuario/perfil"), 1500);
      }
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };

  const handleDelete = async () => {
    const token = getCookie("token_usuario");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    document.cookie = "token_usuario=; path=/; max-age=0";
    router.push("/usuario/login");
  };

  return (
    <>
      <Header />

      <main className="usuario-editar">
        <h1 className="usuario-editar__title">Actualizar datos de usuario</h1>
        <p className="usuario-editar__subtitle">Editar información personal</p>

        <div className="usuario-editar__avatar-wrapper">
          <img
            src={previewAvatar || "/icons/user-placeholder.png"}
            className="usuario-editar__avatar"
            alt="avatar"
          />
        </div>

        <form className="usuario-editar__form" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <Input
            label="Correo"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="input-group password-group">
            <label className="input-group__label">Contraseña</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input-group__field"
              />

              <img
                src={showPassword ? "/icons/eye_off.png" : "/icons/eye.png"}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />

              <button
                type="button"
                className="password-help"
                onClick={() => setShowPasswordHelp(!showPasswordHelp)}
              >
                ?
              </button>
            </div>

            {showPasswordHelp && (
              <p className="password-help-text">
                La contraseña debe incluir al menos 8 caracteres, 1 mayúscula y
                1 número.
              </p>
            )}
          </div>

          <Input
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <div className="input-group">
            <label className="input-group__label">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              className="input-group__field"
              onChange={handleFile}
            />
          </div>

          <div className="usuario-editar__buttons">
            <Button_error
              value="Cancelar"
              onClick={() => router.push("/usuario/perfil")}
            />
            <Button_success value="Guardar" type="submit" />
          </div>
        </form>

        <p className="usuario-editar__delete" onClick={handleDelete}>
          ¿Deseas eliminar tu perfil de usuario?
        </p>
      </main>

      <Footer />

      {showSuccessModal && (
        <div className="usuario-editar__modal">
          <div className="usuario-editar__modal-box">
            <img src="/icons/check.png" className="usuario-editar__modal-icon" />
            <p>Información actualizada correctamente</p>
          </div>
        </div>
      )}
    </>
  );
}
