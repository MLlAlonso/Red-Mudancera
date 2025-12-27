"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ErrorModal from "@/components/common/ErrorModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BuscoServicioPage() {
  const router = useRouter();

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const [form, setForm] = useState({
    volumen: "",
    origen: "",
    destino: "",
    inicio: "",
    fin: "",
    responsableId: "",
    responsableNombre: "",
    telefono: "",
    nota: "",
    tipoCarga: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  const [range, setRange] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  }]);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      inicio: range[0].startDate.toISOString().split("T")[0],
      fin: range[0].endDate.toISOString().split("T")[0],
    }));
  }, [range]);

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
    const u = usuarios.find(x => String(x.id) === e.target.value);
    if (!u) return;

    setForm(prev => ({
      ...prev,
      responsableId: u.id,
      responsableNombre: u.nombre,
      telefono: u.tel ?? u.telefono ?? "",
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
  tipo: "busco",
  volumen: form.volumen,
  origen: form.origen,
  destino: form.destino,
  inicio: form.inicio,
  fin: form.fin,
  tipo_carga: form.tipoCarga,
  nota: form.nota,
  responsable_nombre: form.responsableNombre,
  responsable_telefono: form.telefono,
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

      <main className="busco">
        <div className="busco__container">
          <form className="busco__form" onSubmit={handleSubmit}>
            <h1 className="title">Busco carga</h1>

            <Input label="Volumen" name="volumen" type="number" value={form.volumen} onChange={handleChange} />
            <Input label="Origen" name="origen" value={form.origen} onChange={handleChange} />
            <Input label="Destino" name="destino" value={form.destino} onChange={handleChange} />

            <label className="labels">Rango de salida</label>
            <DateRange
              ranges={range}
              onChange={item => setRange([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={false}
            />

            <div className="input-group">
              <label className="input-group__label">Responsable</label>
              <select className="input-group__field" value={form.responsableId} onChange={handleResponsableChange}>
                <option value="">Selecciona</option>
                {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
              </select>
            </div>

            <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />

            <div className="input-group">
              <label className="input-group__label">Descripción</label>
              <textarea name="nota" className="input-group__field" value={form.nota} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="input-group__label">Tipo de carga</label>
              <select name="tipoCarga" className="input-group__field" value={form.tipoCarga} onChange={handleChange}>
                <option value="">Selecciona</option>
                <option value="menaje">Menaje de casa</option>
                <option value="libre">Libre</option>
              </select>
            </div>

            <div className="busco__actions">
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
