"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ErrorModal from "@/components/common/ErrorModal";
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
    tipoCarga: "",
    importe: "",
    estadoCarga: "mi_almacen",
  });

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (!document.cookie.includes("token_empresa")) {
      router.push("/empresa/login");
    }
  }, [router]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = document.cookie
      .split("; ")
      .find(r => r.startsWith("token_empresa="))
      ?.split("=")[1];

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          tipo: "ofrezco",
          volumen: form.volumen,
          origen: form.origen,
          destino: form.destino,
          rangoDias: form.rangoDias,
          tipo_carga: form.tipoCarga,
          nota: form.nota,
          responsable_nombre: form.responsableNombre,
          responsable_telefono: form.telefono,
          importe: form.importe,
          estado_carga: form.estadoCarga,
        }),

      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data?.errors?.servicio?.[0] ??
          data?.message ??
          "No se pudo publicar el servicio";

        setErrorModal({
          show: true,
          message: msg,
        });
        return;
      }

      router.push("/empresa/dashboard");
    } catch (err) {
      setErrorModal({
        show: true,
        message: "Error de conexión con el servidor",
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
              <h1 className="title">Ofrezco carga</h1>
              <h2 className="subtitle">Información requerida</h2>
            </div>

            <Input label="Origen" name="origen" value={form.origen} onChange={handleChange} autocomplete />
            <Input label="Destino" name="destino" value={form.destino} onChange={handleChange} autocomplete />
            <Input label="Volumen" name="volumen" type="number" value={form.volumen} onChange={handleChange} />

            <div className="input-group">
              <label className="input-group__label">Tipo de carga</label>
              <select name="tipoCarga" className="input-group__field" value={form.tipoCarga} onChange={handleChange}>
                <option value="">Selecciona</option>
                <option value="menaje">Menaje de casa</option>
                <option value="vehiculo">Vehículo</option>
                <option value="menaje_vehiculo">Menaje + vehículo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-group__label">Descripción de carga</label>
              <textarea name="nota" className="input-group__field" value={form.nota} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="input-group__label">Plazo máximo de entrega</label>
              <select name="rangoDias" className="input-group__field" value={form.rangoDias} onChange={handleChange}>
                <option value="">Selecciona</option>
                <option value="1-7">1 a 7 días</option>
                <option value="8-15">8 a 15 días</option>
                <option value="15-30">15 a 30 días</option>
                <option value="+30">+30 días</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-group__label">Estado de la carga</label>
              <select
                name="estadoCarga"
                className="input-group__field"
                value={form.estadoCarga}
                onChange={handleChange}
              >
                <option value="mi_almacen">Mi almacén</option>
                <option value="tu_almacen">Tu almacén</option>
                <option value="en_ruta">En ruta</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-group__label">Persona a cargo</label>
              <select className="input-group__field" value={form.responsableId} onChange={handleResponsableChange}>
                <option value="">Selecciona</option>
                {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
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

              <input
                type="number"
                name="importe"
                className="input-group__field"
                value={form.importe}
                onChange={handleChange}
                placeholder="Monto opcional"
              />
            </div>

            <div className="ofrezco__actions">
              <Button_error value="Cancelar" onClick={() => router.back()} />
              <Button_success value="Publicar servicio" type="submit" />
            </div>
          </form>
        </div>
      </main>

      <ErrorModal
        show={errorModal.show}
        title="Publicación duplicada"
        message={errorModal.message}
        onClose={() =>
          setErrorModal({ show: false, message: "" })
        }
      />

      <Footer />
    </>
  );
}