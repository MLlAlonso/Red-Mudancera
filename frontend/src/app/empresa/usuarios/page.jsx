"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Button_crud from "@/components/common/Button_crud";
import Input from "@/components/common/Input";
import UserCard from "@/components/cards/UserCard";

import "@/styles/pages/empresa/_empresaUsuarios.scss";

export default function EmpresaUsuarios() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [empresaCodigo, setEmpresaCodigo] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    codigoEmpresa: "",
  });

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  // Obtener códigoEmpresa automáticamente
  const fetchEmpresa = () => {
    const token = getCookie("token_empresa");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpresaCodigo(data.codigoEmpresa);
      });
  };

  // Obtener usuarios dinámicos
  const fetchUsuarios = () => {
    const token = getCookie("token_empresa");

    // 🔥 RUTA CORRECTA YA ACTUALIZADA
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.usuarios || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmpresa();
    fetchUsuarios();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Registrar usuario
  const handleSubmit = async () => {
    const payload = {
      ...form,
      codigoEmpresa: empresaCodigo,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Error registrando usuario");
        return;
      }

      setModalOpen(false);

      setForm({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        codigoEmpresa: "",
      });

      fetchUsuarios();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <Header />

      <main className="empresa-usuarios">
        <div className="empresa-usuarios__header">
          <div>
            <h1 className="empresa-usuarios__title">Mis usuarios</h1>
            <p className="empresa-usuarios__subtitle">Miembros de mi equipo</p>
          </div>

          <Button_crud value="Añadir" onClick={() => setModalOpen(true)} />
        </div>

        <div className="empresa-usuarios__grid">
          {usuarios.map((u) => (
            <UserCard
              key={u.id}
              avatar={u.avatar}
              nombre={u.nombre}
              telefono={u.telefono}
              email={u.email}
              fechaUnion={new Date(u.created_at).toLocaleDateString()}
              onDelete={() => {}}
              onPause={() => {}}
              onShare={() => {}}
            />
          ))}
        </div>
      </main>

      <Footer />

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal__title">Registrar usuario</h2>

            <Input
              label="Nombre"
              name="nombre"
              placeholder="Nombre de usuario"
              value={form.nombre}
              onChange={handleInput}
            />

            <Input
              label="Correo"
              name="email"
              placeholder="Correo personal o de empresa"
              value={form.email}
              onChange={handleInput}
            />

            <div className="modal__password-row">
              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleInput}
              />

              <div className="modal__help">
                <img src="/icons/help.png" className="modal__help-icon" />
                <div className="modal__tooltip">
                  La contraseña debe incluir al menos 8 caracteres, 1 mayúscula y 1 número.
                </div>
              </div>
            </div>

            <Input
              label="Teléfono"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleInput}
            />

            <Button_crud value="Registrar" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
}
