"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/pages/servicios/_eliminarServicio.scss";

export default function EditarBuscoServicioPage() {
  const router = useRouter();
  const { id } = useParams();

  /* ======================
     STATES
  ====================== */
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
  const [showConfirm1, setShowConfirm1] = useState(false);
  const [showConfirm2, setShowConfirm2] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  /* ======================
     AUTH
  ====================== */
  useEffect(() => {
    if (!document.cookie.includes("token_empresa")) {
      router.push("/empresa/login");
    }
  }, [router]);

  /* ======================
     LOAD SERVICE
  ====================== */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`)
      .then(res => res.json())
      .then(servicio => {
        if (!servicio || servicio.tipo !== "busco") {
          router.push("/empresa/dashboard");
          return;
        }

        setForm({
          volumen: servicio.volumen ?? "",
          origen: servicio.origen ?? "",
          destino: servicio.destino ?? "",
          inicio: servicio.inicio ?? "",
          fin: servicio.fin ?? "",
          responsableNombre: servicio.responsable_nombre ?? "",
          telefono: servicio.responsable_telefono ?? "",
          nota: servicio.nota ?? "",
          tipoCarga: servicio.tipo_carga ?? "",
        });

        if (servicio.inicio && servicio.fin) {
          setRange([
            {
              startDate: new Date(servicio.inicio),
              endDate: new Date(servicio.fin),
              key: "selection",
            },
          ]);
        }
      });
  }, [id, router]);

  /* ======================
     SYNC DATES
  ====================== */
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      inicio: range[0].startDate.toISOString().split("T")[0],
      fin: range[0].endDate.toISOString().split("T")[0],
    }));
  }, [range]);

  /* ======================
     USERS
  ====================== */
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

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "volumen" && Number(value) > 120) return;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleResponsableChange = e => {
    const u = usuarios.find(x => String(x.id) === e.target.value);
    if (!u) return;

    setForm(prev => ({
      ...prev,
      responsableId: u.id,
      responsableNombre: u.nombre,
      telefono: u.tel ?? u.telefono ?? "",
    }));
  };

  /* ======================
     UPDATE
  ====================== */
  const handleSubmit = async e => {
    e.preventDefault();

    const token = document.cookie
      .split("; ")
      .find(r => r.startsWith("token_empresa="))
      ?.split("=")[1];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`,
      {
        method: "PATCH",
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
          responsable: form.responsableNombre,
          telefono: form.telefono,
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return alert(JSON.stringify(data));
    }

    router.push("/empresa/dashboard");
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async () => {
    const token = document.cookie
      .split("; ")
      .find(r => r.startsWith("token_empresa="))
      ?.split("=")[1];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) return alert("Error al eliminar servicio");

    router.push("/empresa/dashboard");
  };

  return (
    <>
      <Header />

      <main className="busco">
        <div className="busco__container">
          <form className="busco__form" onSubmit={handleSubmit}>
            <h1 className="title">Editar servicio (Busco)</h1>

            <Input label="Volumen" name="volumen" type="number" value={form.volumen} onChange={handleChange} />
            {/* <Input label="Origen" name="origen" value={form.origen} onChange={handleChange} />
            <Input label="Destino" name="destino" value={form.destino} onChange={handleChange} /> */}

            <label className="labels">Rango de salida</label>
            <DateRange ranges={range} onChange={item => setRange([item.selection])} minDate={new Date()} />

            <div className="input-group">
              <label className="input-group__label">Responsable</label>
              <select className="input-group__field" value={form.responsableId} onChange={handleResponsableChange}>
                <option value="">Selecciona</option>
                {usuarios.map(u => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </select>
            </div>

            <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />

            <div className="input-group">
              <label className="input-group__label">Nota</label>
              <textarea name="nota" className="input-group__field" value={form.nota} onChange={handleChange} />
            </div>

            {/* <div className="input-group">
              <label className="input-group__label">Tipo de carga</label>
              <select name="tipoCarga" className="input-group__field" value={form.tipoCarga} onChange={handleChange}>
                <option value="">Selecciona</option>
                <option value="menaje">Menaje de casa</option>
                <option value="libre">Libre</option>
              </select>
            </div> */}

            <div className="busco__actions">
              <Button_error value="Cancelar" onClick={() => router.back()} />
              <Button_success value="Actualizar servicio" type="submit" />
            </div>

            <p className="delete-legend" onClick={() => setShowConfirm1(true)}>
              ¿Desea eliminar su servicio?
            </p>
          </form>
        </div>
      </main>

      <Footer />

      <ConfirmDeleteModal
        open={showConfirm1}
        title="¿Eliminar este servicio?"
        text={`Esta acción no se puede deshacer.
Si eliminas este servicio, dejará de aparecer en las búsquedas y no podrás recuperarlo.
¿Deseas continuar?`}
        onCancel={() => setShowConfirm1(false)}
        onConfirm={() => {
          setShowConfirm1(false);
          setShowConfirm2(true);
        }}
      />

      <ConfirmDeleteModal
        open={showConfirm2}
        title="¿En verdad quieres eliminar este servicio?"
        text={`¿Estás completamente seguro?
Al confirmar, este servicio será eliminado de forma permanente`}
        onCancel={() => setShowConfirm2(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
