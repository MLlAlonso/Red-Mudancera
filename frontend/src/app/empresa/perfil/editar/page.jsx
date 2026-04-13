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
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";

import "@/styles/pages/empresa/_empresaEditar.scss";

export default function EmpresaEditar() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [empresa, setEmpresa] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [imagenesActuales, setImagenesActuales] = useState([]);
  const [imagenesEliminar, setImagenesEliminar] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const [form, setForm] = useState({
    empresa: "",
    email: "",
    representante: "",
    telefono: "",
    descripcion: "",
    base: "",
    rfc: "",
    logo: null,
    password: "",
    password_confirmation: "",
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const MAX_SIZE = 5 * 1024 * 1024;

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  /* ===============================
     CARGAR EMPRESA
  =============================== */
  useEffect(() => {
    const token = getCookie("token_empresa");

    if (!API || !token) {
      setLoadingPage(false);
      return;
    }

    fetch(`${API}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al cargar empresa");
        return res.json();
      })
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
          password: "",
          password_confirmation: "",
        });

        setPreviewLogo(data.logo_url || "/icons/user-placeholder.png");
        setImagenesActuales(data.imagenes || []);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPage(false);
      });
  }, [API]);

  if (loadingPage) return <p style={{ padding: 40 }}>Cargando...</p>;
  if (!empresa) return <p>Error al cargar perfil.</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const imagenesValidas = [];
    const errores = [];

    const disponibles =
      5 - (imagenesActuales.length - imagenesEliminar.length + imagenesNuevas.length);

    if (disponibles <= 0) {
      return setErrorModal({ show: true, message: "Máximo 5 imágenes" });
    }

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        errores.push(`${file.name} supera los 5MB`);
        continue;
      }

      if (!file.type.startsWith("image/")) {
        errores.push(`${file.name} no es imagen válida`);
        continue;
      }

      imagenesValidas.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    if (imagenesValidas.length > disponibles) {
      errores.push(`Solo puedes subir ${disponibles} más`);
    }

    const final = imagenesValidas.slice(0, disponibles);

    if (errores.length > 0) {
      setErrorModal({
        show: true,
        message: errores.join("\n"),
      });
    }

    setImagenesNuevas(prev => [...prev, ...final]);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      return setErrorModal({
        show: true,
        message: "El logo no puede superar los 5MB.",
      });
    }

    if (!file.type.startsWith("image/")) {
      return setErrorModal({
        show: true,
        message: "Archivo no válido",
      });
    }

    setForm({ ...form, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loadingSubmit) return;
    setLoadingSubmit(true);

    const token = getCookie("token_empresa");

    if (!API || !token) {
      setLoadingSubmit(false);
      return;
    }

    try {
      const nuevasCloud = [];

      for (const img of imagenesNuevas) {
        const uploaded = await uploadToCloudinary(img.file);
        nuevasCloud.push(uploaded);
      }

      const formData = new FormData();
      formData.append("_method", "PUT");

      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      formData.append("imagenes", JSON.stringify(nuevasCloud));
      formData.append("eliminar_imagenes", JSON.stringify(imagenesEliminar));

      const res = await fetch(`${API}/empresa/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("BACK ERROR:", data);
        throw new Error(data?.message || "Error backend");
      }

      setShowSuccessModal(true);

      setTimeout(() => {
        router.push("/empresa/perfil");
      }, 1500);

    } catch (err) {
      console.error("ERROR:", err);
      setErrorModal({
        show: true,
        message: err.message || "Error de conexión",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async () => {
    const token = getCookie("token_empresa");

    const res = await fetch(`${API}/empresa/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
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
        <h1 className="empresa-editar__title">
          Actualizar datos empresa
        </h1>
        <p className="empresa-editar__subtitle">
          Editar datos de una empresa
        </p>

        <div className="empresa-editar__avatar-wrapper">
          <img
            src={previewLogo || "/icons/user-placeholder.png"}
            className="empresa-editar__avatar"
            alt="logo"
          />
        </div>

        <form className="empresa-editar__form" onSubmit={handleSubmit}>
          <Input label="Nombre" name="empresa" value={form.empresa} onChange={handleChange} />
          <Input label="Correo" type="email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Nueva contraseña" type="password" name="password" placeholder="Dejar vacío para no cambiar" value={form.password} onChange={handleChange} />
          <Input label="Confirmar contraseña" type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />
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
            <label className="input-group__label">
              Logo empresa (máx 5MB)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="input-group__field"
              onChange={handleFile}
              onClick={(e) => (e.target.value = null)}
            />
          </div>



          <div className="input-group">
            <label>Fotos empresa</label>

            <p className="imagenes-counter">
              {imagenesActuales.length - imagenesEliminar.length + imagenesNuevas.length} / 5 imágenes
            </p>

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onClick={(e) => (e.target.value = null)}
              onChange={handleImagenesChange}
            />

            <div className="imagenes-preview">
              {/* EXISTENTES */}
              {imagenesActuales.map(img => (
                <div key={img.id} className="imagen-item">
                  <img src={img.url} />

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

              {/* NUEVAS */}
              {imagenesNuevas.map((img, i) => (
                <div key={i} className="imagen-item">
                  <img src={img.preview} />

                  <button
                    type="button"
                    className="img_button"
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

          <div className="empresa-editar__buttons">
            <Button_error value="Cancelar" onClick={() => router.push("/empresa/perfil")} />
            <Button_success value="Aceptar" type="submit" />
          </div>
        </form>

        <p className="empresa-editar__delete" onClick={() => setShowDeleteModal(true)} >
          ¿Desea eliminar su perfil de empresa?
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
        message="Actualizando empresa..."
      />

      {showSuccessModal && (
        <div className="empresa-editar__modal">
          <div className="empresa-editar__modal-box">
            <img src="/icons/check.png" className="empresa-editar__modal-icon" />
            <p>Tu perfil ha sido actualizado correctamente</p>
          </div>
        </div>
      )}

      {/* Mantengo tus modales de eliminación intactos */}
      {showDeleteModal && (
        <div
          className="empresa-delete__modal"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}
        >
          <div className="empresa-delete__box">
            <h2>¿Desea eliminar su perfil de empresa?</h2>
            <p>Esta acción es permanente.</p>

            <div className="empresa-delete__buttons">
              <Button_error value="Cancelar" onClick={() => setShowDeleteModal(false)} />
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
          onClick={(e) => e.target === e.currentTarget && setShowDeleteConfirmModal(false)}
        >
          <div className="empresa-delete__box">
            <h2>¿En verdad quieres eliminar tu perfil?</h2>

            <div className="empresa-delete__buttons">
              <Button_error value="Cancelar" onClick={() => setShowDeleteConfirmModal(false)} />
              <Button_success value="Eliminar definitivamente" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}