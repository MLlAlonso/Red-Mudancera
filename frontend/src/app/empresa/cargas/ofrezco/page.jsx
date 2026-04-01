"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ErrorModal from "@/components/common/ErrorModal";
import SimpleEditor from "@/components/common/SimpleEditor";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";

export default function OfrezcoServicioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    estadoCarga: "",
    tipoVehiculo: "",
  });

  /**
   * imagenes = [{ file: File, preview: string }]
   */
  const [imagenes, setImagenes] = useState([]);
  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  /* =========================
     AUTH
  ========================= */
  useEffect(() => {
    if (!document.cookie.includes("token_empresa")) {
      router.push("/empresa/login");
    }
  }, [router]);

  /* =========================
     USUARIOS
  ========================= */
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
    if (usuarios.length > 0 && !form.responsableId) {
      const usuariosOrdenados = [...usuarios].sort((a, b) => a.id - b.id);
      const primerUsuario = usuariosOrdenados[0];

      setForm(prev => ({
        ...prev,
        responsableId: primerUsuario.id,
        responsableNombre: primerUsuario.nombre,
        telefono: primerUsuario.tel ?? primerUsuario.telefono ?? "",
      }));
    }
  }, [usuarios, form.responsableId]);

  /* =========================
     CLEANUP PREVIEWS
  ========================= */
  useEffect(() => {
    return () => {
      imagenes.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [imagenes]);

  /* =========================
     HANDLERS
  ========================= */
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
      telefono: u.tel ?? u.telefono ?? "",
    }));
  };

  const MAX_SIZE = 5 * 1024 * 1024;
  const MAX_IMAGES = 3;

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;
    const imagenesValidas = [];
    const errores = [];

    for (const file of files) {
      // Validar peso
      if (file.size > MAX_SIZE) {
        errores.push(`${file.name} supera los 5MB`);
        continue;
      }

      // Validar tipo real de imagen
      if (!file.type.startsWith("image/")) {
        errores.push(`${file.name} no es una imagen válida`);
        continue;
      }

      imagenesValidas.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    // Validar límite total
    if (imagenes.length + imagenesValidas.length > MAX_IMAGES) {
      setErrorModal({
        show: true,
        message: `Máximo ${MAX_IMAGES} imágenes por servicio`,
      });
      return;
    }

    // Mostrar errores si existen
    if (errores.length > 0) {
      setErrorModal({
        show: true,
        message: errores.join("\n"),
      });
    }

    // Agregar solo las válidas
    setImagenes(prev => [...prev, ...imagenesValidas]);
  };

  const eliminarImagen = (index) => {
    URL.revokeObjectURL(imagenes[index].preview);
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // evita doble click
    setLoading(true);

    const token = document.cookie
      .split("; ")
      .find(r => r.startsWith("token_empresa="))
      ?.split("=")[1];

    try {
      const imagenesCloud = [];

      for (const img of imagenes) {
        const uploaded = await uploadToCloudinary(img.file);
        imagenesCloud.push(uploaded);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/servicios`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            tipo: "ofrezco",
            volumen: form.tipoCarga === "vehiculo" ? null : form.volumen,
            tipo_vehiculo: form.tipoVehiculo || null,
            origen: form.origen,
            destino: form.destino,
            rangoDias: form.rangoDias,
            tipo_carga: form.tipoCarga,
            nota: form.nota,
            responsable_id: form.responsableId,
            responsable_nombre: form.responsableNombre,
            responsable_telefono: form.telefono,
            importe: form.importe,
            estado_carga: form.estadoCarga,
            imagenes: imagenesCloud,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorModal({
          show: true,
          message: data?.message || "No se pudo publicar el servicio",
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

  return (
    <>
      <Header />

      <main className="ofrezco">
        <div className="ofrezco__container">
          <form className="ofrezco__form" onSubmit={handleSubmit}>
            <div className="ofrezco__header">
              <h1 className="title">Publicar carga disponible</h1>
              <h2 className="subtitle">Detalles de la carga</h2>
            </div>

            <Input label="Origen *" name="origen" value={form.origen} placeholder={"Ciudad o zona donde se recoge la carga"} onChange={handleChange} autocomplete />
            <Input label="Destino *" name="destino" value={form.destino} placeholder={"Ciudad donde se entrega la carga"} onChange={handleChange} autocomplete />

            <div className="input-group">
              <label className="input-group__label">Tipo de carga *</label>

              <select name="tipoCarga" className="input-group__field" value={form.tipoCarga} onChange={handleChange}>
                <option value="">Selecciona una opción</option>
                <option value="menaje">Menaje de casa</option>
                <option value="vehiculo">Vehículo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {form.tipoCarga === "vehiculo" && (
              <div className="input-group">
                <label className="input-group__label">Tipo de vehículo *</label>

                <select name="tipoVehiculo" className="input-group__field" value={form.tipoVehiculo} onChange={handleChange} >
                  <option value="">Selecciona</option>
                  <option value="compacto">Auto compacto</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="motocicleta">Motocicleta</option>
                </select>
              </div>
            )}

            {form.tipoCarga && form.tipoCarga !== "vehiculo" && (
              <Input
                label="Volumen estimado (m³)*"
                name="volumen"
                type="number"
                value={form.volumen}
                placeholder="Espacio que ocupa la carga (m³)"
                onChange={handleChange}
              />
            )}

            <div className="input-group">
              <label>Descripción de carga</label>
              <SimpleEditor
                value={form.nota}
                onChange={(html) => setForm(prev => ({ ...prev, nota: html }))}
                placeholder={
                  form.tipoCarga === "vehiculo"
                    ? "Marca, modelo, año y especificaciones del vehículo"
                    : "Lista de muebles, cajas o mercancía. Puedes pegar el inventario del cliente."
                }
              />
            </div>

            <div className="input-group">
              <label className="input-group__label input-group__label--tooltip">
                <span className="tooltip">
                  ⓘ
                  <span className="tooltip__content">
                    Sube hasta 3 imágenes máximo para facilitar validación y negociación.
                  </span>
                </span>
                Fotos de la carga ({imagenes.length}/3)
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                disabled={imagenes.length >= 3}
                onChange={handleImagenesChange}
                onClick={(e) => (e.target.value = null)}
              />

              {imagenes.length > 0 && (
                <div className="imagenes-preview">
                  {imagenes.map((img, index) => (
                    <div key={index} className="imagenes-preview__item">
                      <img src={img.preview} alt={`imagen-${index}`} />
                      <button type="button" className="imagen-remove-btn" onClick={() => eliminarImagen(index)} aria-label="Eliminar imagen" >
                        <img src="/icons/delete.png" alt="Eliminar" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-group__label input-group__label--tooltip">
                Plazo máximo de entrega *
              </label>

              <select name="rangoDias" className="input-group__field" value={form.rangoDias} onChange={handleChange}>
                <option value="">Selecciona una opción</option>
                <option value="1-7">1 a 7 días</option>
                <option value="8-15">8 a 15 días</option>
                <option value="15-30">15 a 30 días</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-group__label input-group__label--tooltip">
                <span className="tooltip">
                  ⓘ
                  <span className="tooltip__content">
                    ¿Dónde está la carga actualmente?
                  </span>
                </span>
                Disponibilidad de la carga *
              </label>

              <select name="estadoCarga" className="input-group__field" value={form.estadoCarga} onChange={handleChange} >
                <option value="">Selecciona una opción</option>
                <option value="mi_almacen">En bodega</option>
                <option value="tu_almacen">Entrega directa en tu bodega</option>
                <option value="en_ruta">Pendiente de recolección</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-group__label">Persona de contacto</label>
              <select className="input-group__field" value={form.responsableId} onChange={handleResponsableChange}>
                <option value="">Selecciona una opción</option>
                {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
              </select>
            </div>

            <Input label="Teléfono de contacto" name="telefono" value={form.telefono} onChange={handleChange} />

            <div className="input-group">
              <label className="input-group__label input-group__label--tooltip">
                <span className="tooltip">
                  ⓘ
                  <span className="tooltip__content">
                    Si no indicas monto, se mostrará como
                    <strong> “Por convenir”</strong>. <br />
                    Las publicaciones con precio visible generan más interés.
                  </span>
                </span>
                Oferta
              </label>

              <input
                type="number"
                name="importe"
                className="input-group__field"
                value={form.importe}
                onChange={handleChange}
                placeholder="Ingresa el monto que ofreces por este servicio( negociable)"
              />
            </div>

            <div className="ofrezco__actions">
              <Button_error value="Cancelar" onClick={() => router.back()} />
              <Button_success value="Ofrecer carga" type="submit" />
            </div>
          </form>
        </div>
      </main>

      <ErrorModal
        show={errorModal.show}
        title="Revisa datos ingresados"
        message={errorModal.message}
        onClose={() =>
          setErrorModal({ show: false, message: "" })
        }
      />

      <Footer />
      <LoadingOverlay show={loading} message="Subiendo imágenes..." />

    </>
  );
}