"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ErrorModal from "@/components/common/ErrorModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

import "@/styles/pages/usuario/_usuarioEditar.scss";

export default function UsuarioEditar() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    avatar: null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = getCookie("token_usuario");
    if (!token) {
      setLoadingPage(false);
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

        setPreviewAvatar(
          data.usuario.avatar || "/icons/user-placeholder.png"
        );

        setLoadingPage(false);
      })
      .catch(() => setLoadingPage(false));
  }, []);

  if (loadingPage) return <p style={{ padding: 40 }}>Cargando…</p>;
  if (!usuario) return <p>Error al cargar datos del usuario.</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     VALIDACIÓN DE IMAGEN
  =============================== */
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validar peso
    if (file.size > MAX_SIZE) {
      setErrorModal({
        show: true,
        message: "La imagen no puede superar los 5MB.",
      });
      return;
    }

    // Validar tipo real
    if (!file.type.startsWith("image/")) {
      setErrorModal({
        show: true,
        message: "El archivo seleccionado no es una imagen válida.",
      });
      return;
    }

    setForm({ ...form, avatar: file });
    setPreviewAvatar(URL.createObjectURL(file));
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loadingSubmit) return; // evitar doble click

    setLoadingSubmit(true);

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

      if (!res.ok) {
        setLoadingSubmit(false);
        setErrorModal({
          show: true,
          message: "No se pudo actualizar la información.",
        });
        return;
      }

      setShowSuccessModal(true);

      setTimeout(() => {
        router.push("/usuario/perfil");
      }, 1500);

    } catch (error) {
      setLoadingSubmit(false);
      setErrorModal({
        show: true,
        message: "Error de conexión.",
      });
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
        <h1 className="usuario-editar__title">
          Actualizar datos de usuario
        </h1>
        <p className="usuario-editar__subtitle">
          Editar información personal
        </p>

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

          <div className="input-group">
            <label className="input-group__label">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input-group__field"
            />
          </div>

          <Input
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <div className="input-group">
            <label className="input-group__label">
              Foto de perfil (máx 5MB)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="input-group__field"
              onChange={handleFile}
              onClick={(e) => (e.target.value = null)}
            />
          </div>

          <div className="usuario-editar__buttons">
            <Button_error
              value="Cancelar"
              onClick={() => router.push("/usuario/perfil")}
            />
            <Button_success
              value="Guardar"
              type="submit"
            />
          </div>
        </form>

        <p className="usuario-editar__delete" onClick={handleDelete}>
          ¿Deseas eliminar tu perfil de usuario?
        </p>
      </main>

      <Footer />

      <ErrorModal
        show={errorModal.show}
        title="Error"
        message={errorModal.message}
        onClose={() => setErrorModal({ show: false, message: "" })}
      />

      <LoadingOverlay
        show={loadingSubmit}
        message="Actualizando información..."
      />

      {showSuccessModal && (
        <div className="usuario-editar__modal">
          <div className="usuario-editar__modal-box">
            <img
              src="/icons/check.png"
              className="usuario-editar__modal-icon"
            />
            <p>Información actualizada correctamente</p>
          </div>
        </div>
      )}
    </>
  );
}